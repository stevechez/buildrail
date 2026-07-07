'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore, type ReactNode } from 'react';
import {
	ArrowRight,
	CheckCircle2,
	Circle,
	FileText,
	FolderOpen,
	Layers3,
	RotateCcw,
	Sparkles,
} from 'lucide-react';

import {
	CONTEXT_VAULT_STORAGE_KEY,
	contextTypeLabels,
} from '@/lib/context-vault-storage';
import type {
	BusinessProfile,
	ContentPackStatus,
	ContextItem,
	SavedContentPack,
} from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BUSINESS_PROFILE_STORAGE_KEY = 'localproof-business-profile';
const SAVED_CONTENT_PACKS_STORAGE_KEY = 'localproof-saved-content-packs';

const statusLabels: Record<ContentPackStatus, string> = {
	draft: 'Draft',
	ready: 'Ready',
	scheduled: 'Scheduled',
	published: 'Published',
	archived: 'Archived',
};

const emptyProfile: BusinessProfile = {
	businessName: '',
	industry: '',
	serviceArea: '',
	mainServices: '',
	targetCustomer: '',
	brandTone: '',
	preferredCta: '',
	website: '',
	wordsToAvoid: '',
};

// ─── Storage ──────────────────────────────────────────────────────────────────

function subscribeToLocalProofStorage(callback: () => void) {
	if (typeof window === 'undefined') return () => {};
	window.addEventListener('storage', callback);
	window.addEventListener('localproof-business-profile-updated', callback);
	window.addEventListener('localproof-context-vault-updated', callback);
	window.addEventListener('localproof-saved-content-packs-updated', callback);
	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener('localproof-business-profile-updated', callback);
		window.removeEventListener('localproof-context-vault-updated', callback);
		window.removeEventListener(
			'localproof-saved-content-packs-updated',
			callback,
		);
	};
}

function getStorageSnapshot() {
	if (typeof window === 'undefined')
		return JSON.stringify({ profile: null, context: null, packs: null });
	return JSON.stringify({
		profile: window.localStorage.getItem(BUSINESS_PROFILE_STORAGE_KEY),
		context: window.localStorage.getItem(CONTEXT_VAULT_STORAGE_KEY),
		packs: window.localStorage.getItem(SAVED_CONTENT_PACKS_STORAGE_KEY),
	});
}

function getStorageServerSnapshot() {
	return JSON.stringify({ profile: null, context: null, packs: null });
}

function parseSnapshot(snapshot: string) {
	try {
		return JSON.parse(snapshot) as {
			profile: string | null;
			context: string | null;
			packs: string | null;
		};
	} catch {
		return { profile: null, context: null, packs: null };
	}
}

function parseBusinessProfile(raw: string | null): BusinessProfile {
	if (!raw) return emptyProfile;
	try {
		return {
			...emptyProfile,
			...(JSON.parse(raw) as Partial<BusinessProfile>),
		};
	} catch {
		return emptyProfile;
	}
}

function parseContextItems(raw: string | null): ContextItem[] {
	if (!raw) return [];
	try {
		const items = JSON.parse(raw);
		return Array.isArray(items) ? (items as ContextItem[]) : [];
	} catch {
		return [];
	}
}

function parseSavedPacks(raw: string | null): SavedContentPack[] {
	if (!raw) return [];
	try {
		const packs = JSON.parse(raw);
		if (!Array.isArray(packs)) return [];
		return (packs as SavedContentPack[]).map(p => ({
			...p,
			status: p.status ?? 'draft',
		}));
	} catch {
		return [];
	}
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hasProfile(p: BusinessProfile) {
	return Boolean(
		p.businessName || p.industry || p.serviceArea || p.mainServices,
	);
}

function getPackTitle(pack: SavedContentPack) {
	return (
		pack.title ||
		pack.input?.jobTitle ||
		pack.pack?.headlines?.[0] ||
		'Untitled Pack'
	);
}

function getPackLocation(pack: SavedContentPack) {
	return (
		pack.jobLocation ||
		pack.input?.jobLocation ||
		pack.serviceArea ||
		'Local area'
	);
}

function getPackIndustry(pack: SavedContentPack) {
	return pack.industry || pack.profile?.industry || 'Local service';
}

function getPackStatus(pack: SavedContentPack): ContentPackStatus {
	return pack.status ?? 'draft';
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DashboardOverview() {
	const storageSnapshot = useSyncExternalStore(
		subscribeToLocalProofStorage,
		getStorageSnapshot,
		getStorageServerSnapshot,
	);

	const { profile, contextItems, savedPacks } = useMemo(() => {
		const s = parseSnapshot(storageSnapshot);
		return {
			profile: parseBusinessProfile(s.profile),
			contextItems: parseContextItems(s.context),
			savedPacks: parseSavedPacks(s.packs),
		};
	}, [storageSnapshot]);

	const activeContext = contextItems.filter(i => i.enabled);
	const profileReady = hasProfile(profile);
	const contextReady = activeContext.length > 0;
	const packReady = savedPacks.length > 0;
	const recentPacks = savedPacks.slice(0, 3);

	const readyCount = savedPacks.filter(
		p => getPackStatus(p) === 'ready' || getPackStatus(p) === 'scheduled',
	).length;
	const publishedCount = savedPacks.filter(
		p => getPackStatus(p) === 'published',
	).length;

	// Determine which setup steps are done
	const setupSteps = [
		{ label: 'Business profile', done: profileReady, href: '/onboarding' },
		{ label: 'First content pack', done: packReady, href: '/generate' },
		{ label: 'Active context', done: contextReady, href: '/context' },
	];
	const setupComplete = setupSteps.every(s => s.done);

	return (
		<div className="mx-auto max-w-7xl space-y-8">
			{/* ── Hero action row ── */}
			<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
							{profileReady
								? profile.businessName || 'Your business'
								: 'LocalProof'}
						</p>
						<h1 className="mt-2 text-3xl font-bold tracking-tight">
							{packReady
								? "Turn today's job into content."
								: profileReady
									? 'Generate your first content pack.'
									: 'Start by setting up your business.'}
						</h1>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{packReady
								? `${savedPacks.length} pack${savedPacks.length === 1 ? '' : 's'} saved · ${readyCount} ready to post · ${publishedCount} published`
								: profileReady
									? 'Describe one real job and LocalProof writes your Google, Facebook, Instagram, and video content.'
									: 'Tell LocalProof about your business so every content pack sounds like you.'}
						</p>
					</div>

					<div className="flex shrink-0 flex-col gap-3 sm:flex-row">
						<Button asChild size="lg" className="h-12 rounded-xl px-6">
							<Link href="/generate">
								<Sparkles className="mr-2 size-4" />
								Generate Content Pack
							</Link>
						</Button>
						{packReady && (
							<Button
								asChild
								size="lg"
								variant="outline"
								className="h-12 rounded-xl border-white/15 px-6"
							>
								<Link href="/posts">View Library</Link>
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* ── Setup checklist (only shown until complete) ── */}
			{!setupComplete && (
				<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
					<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
						<div className="flex items-center justify-between gap-4">
							<div>
								<CardTitle>Get set up</CardTitle>
								<p className="mt-1 text-sm text-muted-foreground">
									Three steps to your first content pack.
								</p>
							</div>
							<Badge variant="secondary">
								{setupSteps.filter(s => s.done).length}/{setupSteps.length} done
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-3 p-5">
						{setupSteps.map(({ label, done, href }) => (
							<Link
								key={label}
								href={done ? '#' : href}
								className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
									done
										? 'cursor-default border-white/10 bg-white/[0.02] opacity-60'
										: 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
								}`}
							>
								{done ? (
									<CheckCircle2 className="size-5 shrink-0 text-[#5FB6FF]" />
								) : (
									<Circle className="size-5 shrink-0 text-muted-foreground" />
								)}
								<span
									className={`text-sm font-medium ${done ? 'line-through text-muted-foreground' : ''}`}
								>
									{label}
								</span>
								{!done && (
									<ArrowRight className="ml-auto size-4 text-muted-foreground" />
								)}
							</Link>
						))}
					</CardContent>
				</Card>
			)}

			{/* ── Stats row (only shown once user has packs) ── */}
			{packReady && (
				<div className="grid gap-4 sm:grid-cols-3">
					<StatCard
						icon={<FolderOpen className="size-5" />}
						label="Saved packs"
						value={savedPacks.length}
						href="/posts"
					/>
					<StatCard
						icon={<RotateCcw className="size-5" />}
						label="Ready to post"
						value={readyCount}
						href="/posts"
					/>
					<StatCard
						icon={<CheckCircle2 className="size-5" />}
						label="Published"
						value={publishedCount}
						href="/posts"
					/>
				</div>
			)}

			{/* ── Recent packs ── */}
			<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<div className="flex items-center justify-between gap-4">
						<div>
							<CardTitle>Recent content packs</CardTitle>
							<p className="mt-1 text-sm text-muted-foreground">
								Real jobs turned into local proof.
							</p>
						</div>
						{packReady && (
							<Button variant="outline" size="sm" asChild>
								<Link href="/posts">View all</Link>
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent className="p-5">
					{recentPacks.length === 0 ? (
						<EmptyState
							icon={<FileText className="size-8 text-muted-foreground" />}
							message="No saved packs yet. Generate one content pack from a real job note to start your library."
							cta="Generate your first pack"
							href="/generate"
						/>
					) : (
						<div className="space-y-3">
							{recentPacks.map(pack => (
								<Link
									key={pack.id}
									href="/posts"
									className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
								>
									<div className="flex-1 min-w-0">
										<div className="mb-1.5 flex flex-wrap gap-2">
											<Badge variant="secondary">
												{statusLabels[getPackStatus(pack)]}
											</Badge>
											<Badge variant="outline">{getPackLocation(pack)}</Badge>
											<Badge variant="outline">{getPackIndustry(pack)}</Badge>
										</div>
										<p className="truncate font-medium">{getPackTitle(pack)}</p>
										<p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
											{pack.pack?.summary ?? 'No summary.'}
										</p>
									</div>
									<ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
								</Link>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* ── Bottom row: context + quick actions ── */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Active context */}
				<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
					<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
						<div className="flex items-center justify-between gap-4">
							<div>
								<CardTitle>Active context</CardTitle>
								<p className="mt-1 text-sm text-muted-foreground">
									Brand rules, offers, and notes shaping your content.
								</p>
							</div>
							<Button variant="outline" size="sm" asChild>
								<Link href="/context">Manage</Link>
							</Button>
						</div>
					</CardHeader>
					<CardContent className="p-5">
						{activeContext.length === 0 ? (
							<EmptyState
								icon={<Layers3 className="size-8 text-muted-foreground" />}
								message="No active context yet. Add a brand note, offer, FAQ, or customer review to guide your content."
								cta="Add context"
								href="/context"
								variant="outline"
							/>
						) : (
							<div className="space-y-3">
								{activeContext.slice(0, 3).map(item => (
									<div
										key={item.id}
										className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
									>
										<div className="mb-1.5 flex gap-2">
											<Badge variant="secondary">
												{contextTypeLabels[item.type]}
											</Badge>
										</div>
										<p className="text-sm font-medium">{item.title}</p>
										<p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
											{item.body}
										</p>
									</div>
								))}
								{activeContext.length > 3 && (
									<p className="text-xs text-muted-foreground">
										+ {activeContext.length - 3} more active item
										{activeContext.length - 3 === 1 ? '' : 's'}
									</p>
								)}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Quick actions */}
				<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
					<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
						<CardTitle>Quick actions</CardTitle>
						<p className="mt-1 text-sm text-muted-foreground">
							Everything you can do from here.
						</p>
					</CardHeader>
					<CardContent className="space-y-2 p-5">
						{[
							{
								label: 'Generate a content pack',
								sub: 'Turn one real job into 10 pieces of content',
								href: '/generate',
								icon: <Sparkles className="size-4" />,
							},
							{
								label: 'View saved packs',
								sub: 'Browse, copy, remix, and repurpose your library',
								href: '/posts',
								icon: <FolderOpen className="size-4" />,
							},
							{
								label: 'Edit business profile',
								sub: 'Update your tone, services, CTA, or area',
								href: '/onboarding',
								icon: <CheckCircle2 className="size-4" />,
							},
							{
								label: 'Manage context',
								sub: 'Add brand rules, offers, FAQs, and reviews',
								href: '/context',
								icon: <Layers3 className="size-4" />,
							},
						].map(({ label, sub, href, icon }) => (
							<Link
								key={href}
								href={href}
								className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
							>
								<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-muted-foreground">
									{icon}
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium">{label}</p>
									<p className="text-xs text-muted-foreground">{sub}</p>
								</div>
								<ArrowRight className="size-4 shrink-0 text-muted-foreground" />
							</Link>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
	icon,
	label,
	value,
	href,
}: {
	icon: ReactNode;
	label: string;
	value: number;
	href: string;
}) {
	return (
		<Link
			href={href}
			className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]"
		>
			<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-muted-foreground">
				{icon}
			</div>
			<div>
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		</Link>
	);
}

function EmptyState({
	icon,
	message,
	cta,
	href,
	variant = 'default',
}: {
	icon: ReactNode;
	message: string;
	cta: string;
	href: string;
	variant?: 'default' | 'outline';
}) {
	return (
		<div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
			<div className="mx-auto mb-4 flex size-12 items-center justify-center">
				{icon}
			</div>
			<p className="text-sm leading-6 text-muted-foreground">{message}</p>
			<Button className="mt-5" variant={variant} asChild>
				<Link href={href}>
					{cta}
					<ArrowRight className="ml-2 size-4" />
				</Link>
			</Button>
		</div>
	);
}
