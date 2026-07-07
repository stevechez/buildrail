// src/lib/notifications/send-lead-sms.ts
import type { SupabaseClient } from '@supabase/supabase-js';

type SendLeadSmsInput = {
	supabase: SupabaseClient;
	organizationId: string;
	leadId: string;
	callId?: string | null;
};

type LeadRecord = {
	id: string;
	caller_name: string | null;
	caller_phone: string | null;
	service_needed: string | null;
	summary: string | null;
	urgency: string | null;
};

type OrganizationRecord = {
	id: string;
	name: string;
	notification_phone: string | null;
};

export async function sendLeadSmsNotification({
	supabase,
	organizationId,
	leadId,
	callId = null,
}: SendLeadSmsInput) {
	const { data: organization, error: organizationError } = await supabase
		.from('organizations')
		.select('id, name, notification_phone')
		.eq('id', organizationId)
		.single<OrganizationRecord>();

	if (organizationError || !organization) {
		return {
			ok: false,
			error: organizationError?.message ?? 'Business not found',
		};
	}

	const { data: lead, error: leadError } = await supabase
		.from('receptionist_leads')
		.select('id, caller_name, caller_phone, service_needed, summary, urgency')
		.eq('id', leadId)
		.eq('organization_id', organizationId)
		.single<LeadRecord>();

	if (leadError || !lead) {
		return {
			ok: false,
			error: leadError?.message ?? 'Lead not found',
		};
	}

	if (!organization.notification_phone) {
		await supabase.from('notifications').insert({
			organization_id: organizationId,
			lead_id: leadId,
			call_id: callId,
			channel: 'sms',
			recipient: 'missing',
			subject: 'New LunchBreak AI lead',
			body: 'Notification phone is not configured.',
			status: 'failed',
			error_message: 'Business notification_phone is missing',
		});

		return {
			ok: false,
			error: 'Business notification_phone is missing',
		};
	}

	const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${lead.id}`;

	const body = [
		`New LunchBreak lead${lead.urgency === 'emergency' ? ' 🚨' : ''}`,
		`${lead.service_needed || 'Service request'}`,
		`Caller: ${lead.caller_name || 'Unknown'}`,
		`Phone: ${lead.caller_phone || 'Not provided'}`,
		lead.summary ? `Summary: ${truncate(lead.summary, 180)}` : null,
		`View: ${dashboardUrl}`,
	]
		.filter(Boolean)
		.join('\n');

	// Placeholder until Twilio/Telnyx is connected.
	// This logs the SMS that would be sent.
	await supabase.from('notifications').insert({
		organization_id: organizationId,
		lead_id: leadId,
		call_id: callId,
		channel: 'sms',
		recipient: organization.notification_phone,
		subject: 'New LunchBreak AI lead',
		body,
		status: 'pending',
		sent_at: null,
	});

	return {
		ok: true,
		mode: 'logged_only',
		recipient: organization.notification_phone,
	};
}

function truncate(value: string, maxLength: number) {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength - 1)}…`;
}
