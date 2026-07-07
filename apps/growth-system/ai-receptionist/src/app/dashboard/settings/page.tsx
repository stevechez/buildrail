// src/app/dashboard/settings/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateReceptionistSettingsAction } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

type SettingsPageProps = {
	searchParams: Promise<{
		error?: string;
		saved?: string;
	}>;
};

async function getOrganizationId() {
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

export default async function SettingsPage({
	searchParams,
}: SettingsPageProps) {
	const params = await searchParams;
	const supabase = await createClient();
	const organizationId = await getOrganizationId();

	const { data: organization } = await supabase
		.from('organizations')
		.select(
			'name, industry, website_url, business_phone, notification_email, notification_phone',
		)
		.eq('id', organizationId)
		.single();

	const { data: settings } = await supabase
		.from('receptionist_settings')
		.select(
			'greeting, fallback_message, service_area, escalation_instructions, forwarding_number, assigned_phone_number, ai_personality, after_hours_enabled, missed_call_enabled',
		)
		.eq('organization_id', organizationId)
		.single();

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-slate-950">
					Receptionist settings
				</h1>
				<p className="mt-2 text-slate-600">
					Control how LunchBreak AI answers calls, captures leads, and alerts
					your team.
				</p>
			</div>

			{params.error ? (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{params.error}
				</div>
			) : null}

			{params.saved ? (
				<div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					Settings saved.
				</div>
			) : null}

			<form action={updateReceptionistSettingsAction} className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>Business details</CardTitle>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="business_name">Business name</Label>
							<Input
								id="business_name"
								name="business_name"
								defaultValue={organization?.name ?? ''}
								required
							/>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="industry">Industry</Label>
								<Input
									id="industry"
									name="industry"
									defaultValue={organization?.industry ?? ''}
									placeholder="movers"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website_url">Website</Label>
								<Input
									id="website_url"
									name="website_url"
									defaultValue={organization?.website_url ?? ''}
									placeholder="https://example.com"
								/>
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-3">
							<div className="space-y-2">
								<Label htmlFor="business_phone">Business phone</Label>
								<Input
									id="business_phone"
									name="business_phone"
									defaultValue={organization?.business_phone ?? ''}
									placeholder="+1 650 555 1212"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notification_email">Notification email</Label>
								<Input
									id="notification_email"
									name="notification_email"
									type="email"
									defaultValue={organization?.notification_email ?? ''}
									placeholder="owner@example.com"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notification_phone">Notification phone</Label>
								<Input
									id="notification_phone"
									name="notification_phone"
									defaultValue={organization?.notification_phone ?? ''}
									placeholder="+1 650 555 1212"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>AI receptionist behavior</CardTitle>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="greeting">Greeting</Label>
							<Textarea
								id="greeting"
								name="greeting"
								defaultValue={settings?.greeting ?? ''}
								placeholder="Thanks for calling. I can help get your request started."
								className="min-h-24"
							/>
							<p className="text-sm text-slate-500">
								This is the first thing callers hear.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="fallback_message">Fallback message</Label>
							<Textarea
								id="fallback_message"
								name="fallback_message"
								defaultValue={settings?.fallback_message ?? ''}
								placeholder="Thanks. I’ve sent your request to the team and someone will follow up soon."
								className="min-h-24"
							/>
							<p className="text-sm text-slate-500">
								Used when the AI needs to wrap up or cannot answer a question.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ai_personality">AI personality</Label>
							<Input
								id="ai_personality"
								name="ai_personality"
								defaultValue={
									settings?.ai_personality ?? 'friendly, concise, professional'
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="service_area">Service area</Label>
							<Input
								id="service_area"
								name="service_area"
								defaultValue={settings?.service_area ?? ''}
								placeholder="Mountain View, Palo Alto, San Jose"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="escalation_instructions">
								Escalation instructions
							</Label>
							<Textarea
								id="escalation_instructions"
								name="escalation_instructions"
								defaultValue={settings?.escalation_instructions ?? ''}
								placeholder="If the caller says this is urgent, mark as high urgency and tell them we will call back as soon as possible."
								className="min-h-28"
							/>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<ToggleRow
								title="After-hours answering"
								description="Answer calls outside normal business hours."
								name="after_hours_enabled"
								defaultChecked={settings?.after_hours_enabled ?? true}
							/>

							<ToggleRow
								title="Missed-call answering"
								description="Answer when the business cannot pick up."
								name="missed_call_enabled"
								defaultChecked={settings?.missed_call_enabled ?? true}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Phone setup</CardTitle>
					</CardHeader>

					<CardContent className="grid gap-6 md:grid-cols-2">
						<ReadOnlyInfo
							label="Assigned LunchBreak number"
							value={settings?.assigned_phone_number}
						/>

						<ReadOnlyInfo
							label="Forwarding number"
							value={settings?.forwarding_number}
						/>

						<p className="text-sm text-slate-500 md:col-span-2">
							These will be editable after the phone provider integration is
							connected.
						</p>
					</CardContent>
				</Card>

				<div className="flex justify-end">
					<Button className="rounded-xl">Save settings</Button>
				</div>
			</form>
		</div>
	);
}

function ToggleRow({
	title,
	description,
	name,
	defaultChecked,
}: {
	title: string;
	description: string;
	name: string;
	defaultChecked: boolean;
}) {
	return (
		<div className="flex items-center justify-between rounded-2xl border p-4">
			<div>
				<p className="font-medium text-slate-950">{title}</p>
				<p className="mt-1 text-sm text-slate-500">{description}</p>
			</div>

			<Switch name={name} defaultChecked={defaultChecked} />
		</div>
	);
}

function ReadOnlyInfo({
	label,
	value,
}: {
	label: string;
	value?: string | null;
}) {
	return (
		<div className="rounded-2xl border bg-slate-50 p-4">
			<p className="text-sm font-medium text-slate-500">{label}</p>
			<p className="mt-1 text-slate-950">{value || 'Not assigned yet'}</p>
		</div>
	);
}
