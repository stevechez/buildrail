import type { SupabaseClient } from '@supabase/supabase-js';
import type { Invitation } from '@buildrail/types';

/**
 * Shared invite/accept flow (docs/platform/identity-foundation.md
 * Completion Criteria -> Organizations -> "Invite members"), generalized
 * from apps/field/lib/actions/auth-setup.ts. Operates on a canonical
 * `invitations` table: (id, organization_id, email, role, invited_by,
 * created_at, accepted_at).
 *
 * All three functions take the caller's Supabase client explicitly rather
 * than constructing one internally — inviting/revoking should run as the
 * authenticated admin (RLS-scoped to their org), while accepting typically
 * needs the admin/service-role client (see acceptInvitation's doc comment)
 * since a brand-new invitee has no membership yet for RLS to scope against.
 */

export interface CreateInvitationInput {
	organizationId: string;
	email: string;
	role: string;
	invitedBy: string;
}

export async function createInvitation(supabase: SupabaseClient, input: CreateInvitationInput): Promise<void> {
	const email = input.email.trim().toLowerCase();
	if (!email) throw new Error('Email is required.');

	const { error } = await supabase.from('invitations').upsert(
		{
			organization_id: input.organizationId,
			email,
			role: input.role,
			invited_by: input.invitedBy,
			accepted_at: null,
		},
		{ onConflict: 'organization_id,email' }
	);
	if (error) throw new Error(error.message);
}

export async function revokeInvitation(supabase: SupabaseClient, invitationId: string): Promise<void> {
	const { error } = await supabase.from('invitations').delete().eq('id', invitationId);
	if (error) throw new Error(error.message);
}

/**
 * Finds a pending (unaccepted) invitation for an email, e.g. to decide
 * whether a just-authenticated user with no membership should see an
 * "accept invite" screen or a "create your organization" screen (see
 * apps/field/app/no-access/page.tsx).
 *
 * Must run on an admin/service-role client: a brand-new user has no
 * organization_members row yet, so an RLS-scoped client has nothing to
 * scope this lookup against.
 */
export async function findPendingInvitation(
	adminSupabase: SupabaseClient,
	email: string
): Promise<(Invitation & { organization_name?: string }) | null> {
	const { data, error } = await adminSupabase
		.from('invitations')
		.select('id, organization_id, email, role, invited_by, created_at, accepted_at, organizations(name)')
		.eq('email', email.trim().toLowerCase())
		.is('accepted_at', null)
		.order('created_at', { ascending: false })
		.limit(1)
		.maybeSingle();

	if (error) {
		console.error('findPendingInvitation: query failed', error);
		return null;
	}
	if (!data) return null;

	const org = Array.isArray(data.organizations) ? data.organizations[0] : data.organizations;
	return { ...data, organization_name: (org as { name?: string } | null)?.name };
}

export interface AcceptInvitationInput {
	invitationId: string;
	userId: string;
	userEmail: string;
}

/**
 * Accepts a pending invitation: creates the membership row in the inviting
 * org and marks the invite used. Re-checks the invite's email against the
 * *current* session's email so a signed-in user can't accept an invite
 * meant for someone else by guessing an invitation id.
 *
 * Must run on an admin/service-role client — same reasoning as
 * findPendingInvitation.
 */
export async function acceptInvitation(adminSupabase: SupabaseClient, input: AcceptInvitationInput): Promise<void> {
	const { data: invite, error: inviteError } = await adminSupabase
		.from('invitations')
		.select('id, organization_id, email, role, accepted_at')
		.eq('id', input.invitationId)
		.maybeSingle();

	if (inviteError || !invite) throw new Error(inviteError?.message ?? 'Invite not found.');
	if (invite.accepted_at) throw new Error('This invite was already used.');
	if (invite.email !== input.userEmail.trim().toLowerCase()) {
		throw new Error('This invite was sent to a different email address.');
	}

	const { data: existingMembership } = await adminSupabase
		.from('organization_members')
		.select('id')
		.eq('user_id', input.userId)
		.eq('organization_id', invite.organization_id)
		.maybeSingle();

	if (!existingMembership) {
		const { error: membershipError } = await adminSupabase.from('organization_members').insert({
			user_id: input.userId,
			organization_id: invite.organization_id,
			role: invite.role,
		});
		if (membershipError) throw new Error(membershipError.message);
	}

	await adminSupabase.from('invitations').update({ accepted_at: new Date().toISOString() }).eq('id', input.invitationId);
}
