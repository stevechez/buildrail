// src/app/dashboard/settings/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

function getBoolean(formData: FormData, key: string) {
	return formData.get(key) === 'on';
}

async function getCurrentOrganizationId() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const { data: membership } = await supabase
		.from('organization_members')
		.select('organization_id')
		.eq('user_id', user.id)
		.limit(1)
		.maybeSingle();

	if (!membership) {
		redirect('/onboarding');
	}

	return membership.organization_id;
}

export async function updateReceptionistSettingsAction(formData: FormData) {
	const organizationId = await getCurrentOrganizationId();
	const supabase = await createClient();

	const businessName = getString(formData, 'business_name');
	const industry = getString(formData, 'industry');
	const websiteUrl = getString(formData, 'website_url');
	const businessPhone = getString(formData, 'business_phone');
	const notificationEmail = getString(formData, 'notification_email');
	const notificationPhone = getString(formData, 'notification_phone');

	const greeting = getString(formData, 'greeting');
	const fallbackMessage = getString(formData, 'fallback_message');
	const serviceArea = getString(formData, 'service_area');
	const escalationInstructions = getString(formData, 'escalation_instructions');
	const aiPersonality = getString(formData, 'ai_personality');

	const afterHoursEnabled = getBoolean(formData, 'after_hours_enabled');
	const missedCallEnabled = getBoolean(formData, 'missed_call_enabled');

	if (!businessName) {
		redirect('/dashboard/settings?error=Business name is required');
	}

	const { error: organizationError } = await supabase
		.from('organizations')
		.update({
			name: businessName,
			industry: industry || null,
			website_url: websiteUrl || null,
			business_phone: businessPhone || null,
			notification_email: notificationEmail || null,
			notification_phone: notificationPhone || null,
		})
		.eq('id', organizationId);

	if (organizationError) {
		redirect(
			`/dashboard/settings?error=${encodeURIComponent(organizationError.message)}`,
		);
	}

	const { error: settingsError } = await supabase
		.from('receptionist_settings')
		.update({
			greeting: greeting || null,
			fallback_message: fallbackMessage || null,
			service_area: serviceArea || null,
			escalation_instructions: escalationInstructions || null,
			ai_personality: aiPersonality || 'friendly, concise, professional',
			after_hours_enabled: afterHoursEnabled,
			missed_call_enabled: missedCallEnabled,
		})
		.eq('organization_id', organizationId);

	if (settingsError) {
		redirect(
			`/dashboard/settings?error=${encodeURIComponent(settingsError.message)}`,
		);
	}

	revalidatePath('/dashboard');
	revalidatePath('/dashboard/settings');

	redirect('/dashboard/settings?saved=true');
}
