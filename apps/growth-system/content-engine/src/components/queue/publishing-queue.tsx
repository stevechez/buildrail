'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
	AlertTriangle,
	CalendarDays,
	CheckCircle2,
	Clipboard,
	ClipboardCheck,
	Clock3,
	Send,
	Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import {
	getSavedContentPacks,
	updateSavedContentPackSchedule,
	updateSavedContentPackStatus,
} from '@/lib/saved-content-packs';
import type { ContentAsset, SavedContentPack } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SAVED_CONTENT_PACKS_STORAGE_KEY = 'localproof-saved-content-packs';

type QueueGroup = {
	id: 'overdue' | 'today' | 'upcoming' | 'unscheduled' | 'published';
	title: string;
	description: string;
	icon: typeof Clock3;
	packs: SavedContentPack[];
};

function subscribeToSavedPacks(callback: () => void) {
	if (typeof window === 'undefined') {
		return () => {};
	}

	window.addEventListener('storage', callback);
	window.addEventListener('localproof-saved-content-packs-updated', callback);

	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener(
			'localproof-saved-content-packs-updated',
			callback,
		);
	};
}

function getSavedPacksSnapshot() {
	if (typeof window === 'undefined') {
		return null;
	}

	return window.localStorage.getItem(SAVED_CONTENT_PACKS_STORAGE_KEY);
}

function getSavedPacksServerSnapshot() {
	return null;
}

function parseSavedPacksSnapshot(snapshot: string | null): SavedContentPack[] {
	if (!snapshot) {
		return [];
	}

	try {
		const parsedPacks = JSON.parse(snapshot);

		if (!Array.isArray(parsedPacks)) {
			return [];
		}

		// Use the storage helper so older packs get normalized consistently.
		return getSavedContentPacks();
	} catch {
		return [];
	}
}

function getLocalDateKey(date = new Date()) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

function normalizeDateKey(value: string | null | undefined) {
	if (!value) {
		return null;
	}

	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value;
	}

	const parsedDate = new Date(value);

	if (Number.isNaN(parsedDate.getTime())) {
		return null;
	}

	return getLocalDateKey(parsedDate);
}

function formatDate(value: string | null | undefined) {
	const dateKey = normalizeDateKey(value);

	if (!dateKey) {
		return 'Not scheduled';
	}

	const [year, month, day] = dateKey.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	return new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date);
}

function getPrimaryAsset(pack: SavedContentPack): ContentAsset | null {
	return pack.pack.assets[0] ?? null;
}

function getScoreLabel(pack: SavedContentPack) {
	if (!pack.pack.score) {
		return 'No score';
	}

	return `${pack.pack.score.total}/100 · ${pack.pack.score.grade}`;
}

function sortBySchedule(a: SavedContentPack, b: SavedContentPack) {
	const aDate = normalizeDateKey(a.scheduledFor) ?? '9999-99-99';
	const bDate = normalizeDateKey(b.scheduledFor) ?? '9999-99-99';

	if (aDate !== bDate) {
		return aDate.localeCompare(bDate);
	}

	return b.updatedAt.localeCompare(a.updatedAt);
}

function groupQueuePacks(packs: SavedContentPack[]): QueueGroup[] {
	const today = getLocalDateKey();

	const overdue: SavedContentPack[] = [];
	const todayPacks: SavedContentPack[] = [];
	const upcoming: SavedContentPack[] = [];
	const unscheduled: SavedContentPack[] = [];
	const published: SavedContentPack[] = [];

	for (const pack of packs) {
		if (pack.status === 'published') {
			published.push(pack);
			continue;
		}

		const scheduledDate = normalizeDateKey(pack.scheduledFor);

		if (!scheduledDate) {
			unscheduled.push(pack);
			continue;
		}

		if (scheduledDate < today) {
			overdue.push(pack);
			continue;
		}

		if (scheduledDate === today) {
			todayPacks.push(pack);
			continue;
		}

		upcoming.push(pack);
	}

	return [
		{
			id: 'overdue',
			title: 'Overdue',
			description: 'Scheduled content that still needs action.',
			icon: AlertTriangle,
			packs: overdue.sort(sortBySchedule),
		},
		{
			id: 'today',
			title: 'Today',
			description: 'Your ready-to-publish work for today.',
			icon: Send,
			packs: todayPacks.sort(sortBySchedule),
		},
		{
			id: 'upcoming',
			title: 'Upcoming',
			description: 'Content already planned for later.',
			icon: CalendarDays,
			packs: upcoming.sort(sortBySchedule),
		},
		{
			id: 'unscheduled',
			title: 'Unscheduled',
			description: 'Saved packs that still need a publishing date.',
			icon: Clock3,
			packs: unscheduled.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
		},
		{
			id: 'published',
			title: 'Published',
			description: 'Content you have already marked as published.',
			icon: CheckCircle2,
			packs: published.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
		},
	];
}

function getQueueStats(groups: QueueGroup[]) {
	const overdue =
		groups.find(group => group.id === 'overdue')?.packs.length ?? 0;
	const today = groups.find(group => group.id === 'today')?.packs.length ?? 0;
	const upcoming =
		groups.find(group => group.id === 'upcoming')?.packs.length ?? 0;
	const unscheduled =
		groups.find(group => group.id === 'unscheduled')?.packs.length ?? 0;

	return {
		overdue,
		today,
		upcoming,
		unscheduled,
	};
}

export function PublishingQueue() {
	const savedPacksSnapshot = useSyncExternalStore(
		subscribeToSavedPacks,
		getSavedPacksSnapshot,
		getSavedPacksServerSnapshot,
	);

	const savedPacks = useMemo(() => {
		return parseSavedPacksSnapshot(savedPacksSnapshot);
	}, [savedPacksSnapshot]);

	const queueGroups = useMemo(() => {
		return groupQueuePacks(savedPacks);
	}, [savedPacks]);

	const stats = useMemo(() => {
		return getQueueStats(queueGroups);
	}, [queueGroups]);

	const [copiedKey, setCopiedKey] = useState<string | null>(null);

	async function copyText(key: string, text: string) {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedKey(key);

			window.setTimeout(() => {
				setCopiedKey(null);
			}, 1500);

			toast.success('Copied to clipboard');
		} catch {
			setCopiedKey(null);
			toast.error('Could not copy text');
		}
	}

	function markPublished(pack: SavedContentPack) {
		updateSavedContentPackStatus(pack.id, 'published');

		toast.success('Marked as published', {
			description: `${pack.title} moved to Published.`,
		});
	}

	function markReady(pack: SavedContentPack) {
		updateSavedContentPackStatus(pack.id, 'ready');

		toast.success('Moved back to ready', {
			description: `${pack.title} is back in the queue.`,
		});
	}

	function updateSchedule(pack: SavedContentPack, value: string) {
		updateSavedContentPackSchedule(pack.id, value || null);

		toast.success(value ? 'Schedule updated' : 'Schedule cleared', {
			description: value
				? `${pack.title} is scheduled for ${formatDate(value)}.`
				: `${pack.title} is unscheduled.`,
		});
	}

	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<Card className="overflow-hidden border-[#5B74FF]/30 bg-[linear-gradient(180deg,rgba(95,182,255,0.08)_0%,rgba(10,16,34,0.98)_42%,rgba(10,16,34,1)_100%)] shadow-[0_0_35px_rgba(91,116,255,0.14)]">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-6">
					<div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
						<div>
							<Badge variant="secondary" className="mb-3">
								Publishing Queue
							</Badge>

							<CardTitle className="text-3xl md:text-4xl">
								What should you post today?
							</CardTitle>

							<p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
								See overdue, today, upcoming, unscheduled, and published content
								packs in one place. Copy the content, publish manually, then
								mark it complete.
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button asChild>
								<Link href="/generate">
									<Sparkles className="mr-2 size-4" />
									Generate Pack
								</Link>
							</Button>

							<Button variant="outline" asChild>
								<Link href="/posts">Saved Packs</Link>
							</Button>
						</div>
					</div>
				</CardHeader>

				<CardContent className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
					<QueueStat label="Overdue" value={stats.overdue} />
					<QueueStat label="Today" value={stats.today} />
					<QueueStat label="Upcoming" value={stats.upcoming} />
					<QueueStat label="Unscheduled" value={stats.unscheduled} />
				</CardContent>
			</Card>

			{savedPacks.length === 0 ? (
				<EmptyQueueState />
			) : (
				<div className="space-y-6">
					{queueGroups.map(group => (
						<QueueGroupSection
							key={group.id}
							group={group}
							copiedKey={copiedKey}
							onCopy={copyText}
							onMarkPublished={markPublished}
							onMarkReady={markReady}
							onUpdateSchedule={updateSchedule}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function QueueStat({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
			<p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
				{label}
			</p>
			<p className="mt-2 text-3xl font-bold">{value}</p>
		</div>
	);
}

function EmptyQueueState() {
	return (
		<Card className="border-dashed border-white/10 bg-white/[0.03] shadow-sm backdrop-blur">
			<CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
				<div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
					<CalendarDays className="size-6" />
				</div>

				<h2 className="text-3xl font-bold tracking-tight">
					No saved content yet.
				</h2>

				<p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
					Generate a content pack, improve the score, save it, and schedule it.
					Your publishing queue will show what needs to go out next.
				</p>

				<Button className="mt-6" asChild>
					<Link href="/generate">
						Create Your First Pack
						<Sparkles className="ml-2 size-4" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

function QueueGroupSection({
	group,
	copiedKey,
	onCopy,
	onMarkPublished,
	onMarkReady,
	onUpdateSchedule,
}: {
	group: QueueGroup;
	copiedKey: string | null;
	onCopy: (key: string, text: string) => Promise<void>;
	onMarkPublished: (pack: SavedContentPack) => void;
	onMarkReady: (pack: SavedContentPack) => void;
	onUpdateSchedule: (pack: SavedContentPack, value: string) => void;
}) {
	const Icon = group.icon;

	return (
		<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
			<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
					<div className="flex gap-3">
						<div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06]">
							<Icon className="size-5" />
						</div>

						<div>
							<CardTitle>{group.title}</CardTitle>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								{group.description}
							</p>
						</div>
					</div>

					<Badge variant="secondary">
						{group.packs.length} pack{group.packs.length === 1 ? '' : 's'}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4 p-5">
				{group.packs.length === 0 ? (
					<p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm leading-6 text-muted-foreground">
						Nothing here right now.
					</p>
				) : (
					group.packs.map(pack => (
						<QueuePackCard
							key={pack.id}
							pack={pack}
							copiedKey={copiedKey}
							onCopy={onCopy}
							onMarkPublished={onMarkPublished}
							onMarkReady={onMarkReady}
							onUpdateSchedule={onUpdateSchedule}
						/>
					))
				)}
			</CardContent>
		</Card>
	);
}

function QueuePackCard({
	pack,
	copiedKey,
	onCopy,
	onMarkPublished,
	onMarkReady,
	onUpdateSchedule,
}: {
	pack: SavedContentPack;
	copiedKey: string | null;
	onCopy: (key: string, text: string) => Promise<void>;
	onMarkPublished: (pack: SavedContentPack) => void;
	onMarkReady: (pack: SavedContentPack) => void;
	onUpdateSchedule: (pack: SavedContentPack, value: string) => void;
}) {
	const primaryAsset = getPrimaryAsset(pack);
	const scheduledDate = normalizeDateKey(pack.scheduledFor) ?? '';

	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
			<div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
				<div className="min-w-0">
					<div className="mb-3 flex flex-wrap gap-2">
						<Badge variant="secondary">{pack.status}</Badge>
						<Badge variant="outline">{formatDate(pack.scheduledFor)}</Badge>
						<Badge variant="outline">{getScoreLabel(pack)}</Badge>
					</div>

					<p className="text-lg font-semibold">{pack.title}</p>

					<p className="mt-2 text-sm leading-6 text-muted-foreground">
						{pack.jobLocation} · {pack.industry}
					</p>

					<p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
						{pack.pack.summary}
					</p>
				</div>

				<div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
					<Input
						type="date"
						value={scheduledDate}
						onChange={event => onUpdateSchedule(pack, event.target.value)}
						className="min-w-[160px]"
					/>

					{pack.status === 'published' ? (
						<Button
							variant="outline"
							size="sm"
							onClick={() => onMarkReady(pack)}
						>
							Move Back to Ready
						</Button>
					) : (
						<Button size="sm" onClick={() => onMarkPublished(pack)}>
							<CheckCircle2 className="mr-2 size-4" />
							Mark Published
						</Button>
					)}
				</div>
			</div>

			<div className="mt-4 grid gap-3 md:grid-cols-3">
				<QueueCopyButton
					label="Copy Summary"
					copied={copiedKey === `${pack.id}-summary`}
					onClick={() => onCopy(`${pack.id}-summary`, pack.pack.summary)}
				/>

				{primaryAsset ? (
					<QueueCopyButton
						label={`Copy ${primaryAsset.platform}`}
						copied={copiedKey === `${pack.id}-${primaryAsset.title}`}
						onClick={() =>
							onCopy(`${pack.id}-${primaryAsset.title}`, primaryAsset.body)
						}
					/>
				) : null}

				<QueueCopyButton
					label="Copy Hashtags"
					copied={copiedKey === `${pack.id}-hashtags`}
					onClick={() =>
						onCopy(`${pack.id}-hashtags`, pack.pack.hashtags.join(' '))
					}
				/>
			</div>
		</div>
	);
}

function QueueCopyButton({
	label,
	copied,
	onClick,
}: {
	label: string;
	copied: boolean;
	onClick: () => void | Promise<void>;
}) {
	return (
		<Button variant="outline" size="sm" onClick={onClick}>
			{copied ? (
				<>
					<ClipboardCheck className="mr-2 size-4" />
					Copied
				</>
			) : (
				<>
					<Clipboard className="mr-2 size-4" />
					{label}
				</>
			)}
		</Button>
	);
}
