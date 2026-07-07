'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import {
	CalendarDays,
	Clipboard,
	ClipboardCheck,
	Plus,
	Trash2,
	Wand2,
	RefreshCcw,
} from 'lucide-react';
import {
	deleteSavedContentPack,
	updateSavedContentPackSchedule,
	updateSavedContentPackStatus,
} from '@/lib/saved-content-packs';
import type {
	ContentAsset,
	ContentPackStatus,
	SavedContentPack,
} from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SAVED_CONTENT_PACKS_STORAGE_KEY = 'localproof-saved-content-packs';

const statusLabels: Record<ContentPackStatus, string> = {
	draft: 'Draft',
	ready: 'Ready',
	scheduled: 'Scheduled',
	published: 'Published',
	archived: 'Archived',
};

const statusOptions: ContentPackStatus[] = [
	'draft',
	'ready',
	'scheduled',
	'published',
	'archived',
];

type StatusFilter = ContentPackStatus | 'all';

const statusFilterLabels: Record<StatusFilter, string> = {
	all: 'All',
	draft: 'Draft',
	ready: 'Ready',
	scheduled: 'Scheduled',
	published: 'Published',
	archived: 'Archived',
};

function getPackStatus(pack: SavedContentPack): ContentPackStatus {
	return pack.status ?? 'draft';
}

function formatScheduledDate(scheduledFor: string | null) {
	if (!scheduledFor) {
		return 'Not scheduled';
	}

	return new Date(`${scheduledFor}T12:00:00`).toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

function subscribeToSavedContentPacks(callback: () => void) {
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

function getSavedContentPacksSnapshot() {
	if (typeof window === 'undefined') {
		return null;
	}

	return window.localStorage.getItem(SAVED_CONTENT_PACKS_STORAGE_KEY);
}

function getSavedContentPacksServerSnapshot() {
	return null;
}

function parseSavedContentPacks(snapshot: string | null): SavedContentPack[] {
	if (!snapshot) {
		return [];
	}

	try {
		const parsedPacks = JSON.parse(snapshot);

		if (!Array.isArray(parsedPacks)) {
			return [];
		}

		return (parsedPacks as SavedContentPack[]).map(pack => ({
			...pack,
			status: pack.status ?? 'draft',
		}));
	} catch {
		return [];
	}
}

export function SavedContentPacksList() {
	const savedPacksSnapshot = useSyncExternalStore(
		subscribeToSavedContentPacks,
		getSavedContentPacksSnapshot,
		getSavedContentPacksServerSnapshot,
	);

	const savedPacks = useMemo(() => {
		return parseSavedContentPacks(savedPacksSnapshot);
	}, [savedPacksSnapshot]);

	const [expandedPackId, setExpandedPackId] = useState<string | null>(null);
	const [copiedKey, setCopiedKey] = useState<string | null>(null);
	const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

	const statusCounts = useMemo(() => {
		return savedPacks.reduce(
			(counts, pack) => {
				const status = getPackStatus(pack);

				return {
					...counts,
					all: counts.all + 1,
					[status]: counts[status] + 1,
				};
			},
			{
				all: 0,
				draft: 0,
				ready: 0,
				scheduled: 0,
				published: 0,
				archived: 0,
			} satisfies Record<StatusFilter, number>,
		);
	}, [savedPacks]);

	const visiblePacks = useMemo(() => {
		if (statusFilter === 'all') {
			return savedPacks;
		}

		return savedPacks.filter(pack => getPackStatus(pack) === statusFilter);
	}, [savedPacks, statusFilter]);

	const expandedPack =
		visiblePacks.find(pack => pack.id === expandedPackId) ??
		visiblePacks[0] ??
		null;

	function handleDelete(id: string) {
		deleteSavedContentPack(id);

		if (expandedPackId === id) {
			setExpandedPackId(null);
		}
	}

	function handleStatusChange(id: string, status: ContentPackStatus) {
		updateSavedContentPackStatus(id, status);
	}

	function handleScheduleChange(id: string, scheduledFor: string | null) {
		updateSavedContentPackSchedule(id, scheduledFor);
	}

	async function copyText(key: string, text: string) {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedKey(key);

			window.setTimeout(() => {
				setCopiedKey(null);
			}, 1600);
		} catch {
			setCopiedKey(null);
		}
	}

	if (savedPacks.length === 0) {
		return <EmptySavedPacksState />;
	}

	return (
		<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
			<div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Library</h2>
						<p className="text-sm text-muted-foreground">
							{visiblePacks.length} of {savedPacks.length} saved pack
							{savedPacks.length === 1 ? '' : 's'}
						</p>
					</div>

					<Button asChild>
						<Link href="/generate">
							<Plus className="mr-2 size-4" />
							New
						</Link>
					</Button>
				</div>

				<StatusFilterButtons
					statusFilter={statusFilter}
					statusCounts={statusCounts}
					onChange={setStatusFilter}
				/>

				{visiblePacks.length === 0 ? (
					<div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-center">
						<p className="text-sm font-semibold">
							No {statusFilterLabels[statusFilter].toLowerCase()} packs yet.
						</p>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							Change the filter or move a saved pack into this status.
						</p>
					</div>
				) : (
					visiblePacks.map(pack => (
						<button
							key={pack.id}
							type="button"
							onClick={() => setExpandedPackId(pack.id)}
							className={`w-full rounded-2xl border border-white/10 p-4 text-left transition hover:bg-white/[0.04] ${
								expandedPack?.id === pack.id
									? 'bg-white/[0.06]'
									: 'bg-white/[0.03]'
							}`}
						>
							<div className="mb-3 flex flex-wrap gap-2">
								<Badge variant="default">
									{statusLabels[getPackStatus(pack)]}
								</Badge>
								<Badge variant="secondary">{pack.industry}</Badge>
								<Badge variant="outline">{pack.jobLocation}</Badge>
							</div>

							<p className="font-semibold">{pack.title}</p>

							<p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
								{pack.pack.summary}
							</p>

							<p className="mt-3 text-xs text-muted-foreground">
								Saved {new Date(pack.createdAt).toLocaleDateString()}
							</p>
							{pack.scheduledFor ? (
								<p className="mt-1 text-xs text-muted-foreground">
									Scheduled {formatScheduledDate(pack.scheduledFor)}
								</p>
							) : null}
						</button>
					))
				)}
			</div>

			<div>
				{expandedPack ? (
					<SavedPackDetail
						pack={expandedPack}
						copiedKey={copiedKey}
						onCopy={copyText}
						onDelete={() => handleDelete(expandedPack.id)}
						onStatusChange={(status: ContentPackStatus) =>
							handleStatusChange(expandedPack.id, status)
						}
						onScheduleChange={scheduledFor =>
							handleScheduleChange(expandedPack.id, scheduledFor)
						}
					/>
				) : null}
			</div>
		</div>
	);
}

function EmptySavedPacksState() {
	return (
		<div className="mx-auto max-w-4xl">
			<Card className="border-dashed border-white/10 bg-white/[0.03] shadow-sm backdrop-blur">
				<CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
					<div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-white/[0.04]">
						<CalendarDays className="size-6" />
					</div>

					<h2 className="text-3xl font-bold tracking-tight">
						No saved content packs yet.
					</h2>

					<p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
						Generate a job-to-content pack, save it, and it will appear here as
						part of your local content library.
					</p>

					<Button className="mt-6" asChild>
						<Link href="/generate">
							<Plus className="mr-2 size-4" />
							Generate First Pack
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

function SavedPackDetail({
	pack,
	copiedKey,
	onCopy,
	onDelete,
	onStatusChange,
	onScheduleChange,
}: {
	pack: SavedContentPack;
	copiedKey: string | null;
	onCopy: (key: string, text: string) => Promise<void>;
	onDelete: () => void;
	onStatusChange: (status: ContentPackStatus) => void;
	onScheduleChange: (scheduledFor: string | null) => void;
}) {
	return (
		<div className="space-y-6">
			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
						<div>
							<div className="mb-3 flex flex-wrap gap-2">
								<Badge variant="default">
									{statusLabels[getPackStatus(pack)]}
								</Badge>
								<Badge variant="secondary">{pack.industry}</Badge>
								<Badge variant="outline">{pack.jobLocation}</Badge>
							</div>

							<CardTitle className="text-3xl">{pack.title}</CardTitle>

							<p className="mt-3 text-sm leading-7 text-muted-foreground">
								{pack.pack.summary}
							</p>

							<div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
								<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
									<div>
										<p className="text-sm font-semibold">Workflow Status</p>
										<p className="mt-1 text-xs text-muted-foreground">
											Move this content pack through your publishing workflow.
										</p>
									</div>

									<Badge variant="default">
										{statusLabels[getPackStatus(pack)]}
									</Badge>
								</div>

								<StatusButtons
									status={getPackStatus(pack)}
									onChange={onStatusChange}
								/>
								<div className="grid gap-2 pt-2">
									<label
										htmlFor={`scheduledFor-${pack.id}`}
										className="text-sm font-medium"
									>
										Scheduled date
									</label>

									<Input
										id={`scheduledFor-${pack.id}`}
										type="date"
										value={pack.scheduledFor ?? ''}
										onChange={event =>
											onScheduleChange(event.target.value || null)
										}
									/>

									<p className="text-xs leading-5 text-muted-foreground">
										Current schedule: {formatScheduledDate(pack.scheduledFor)}
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2 sm:flex-row">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onCopy(`${pack.id}-summary`, pack.pack.summary)}
							>
								{copiedKey === `${pack.id}-summary` ? (
									<ClipboardCheck className="mr-2 size-4" />
								) : (
									<Clipboard className="mr-2 size-4" />
								)}
								Copy
							</Button>

							<Button variant="outline" size="sm" asChild>
								<Link href={`/generate?packId=${pack.id}`}>
									<Wand2 className="mr-2 size-4" />
									Remix
								</Link>
							</Button>

							<Button variant="outline" size="sm" asChild>
								<Link href={`/repurpose?packId=${pack.id}`}>
									<RefreshCcw className="mr-2 size-4" />
									Repurpose
								</Link>
							</Button>

							<Button variant="outline" size="sm" onClick={onDelete}>
								<Trash2 className="mr-2 size-4" />
								Delete
							</Button>
						</div>
					</div>
				</CardHeader>
			</Card>

			<div className="grid gap-5">
				{pack.pack.assets.map(asset => (
					<SavedAssetCard
						key={asset.title}
						packId={pack.id}
						asset={asset}
						copiedKey={copiedKey}
						onCopy={onCopy}
					/>
				))}
			</div>

			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<CardTitle>Headline Options</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3">
					{pack.pack.headlines.map(headline => (
						<div
							key={headline}
							className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium"
						>
							{headline}
						</div>
					))}

					<Button
						variant="outline"
						onClick={() =>
							onCopy(`${pack.id}-headlines`, pack.pack.headlines.join('\n'))
						}
					>
						{copiedKey === `${pack.id}-headlines` ? (
							<ClipboardCheck className="mr-2 size-4" />
						) : (
							<Clipboard className="mr-2 size-4" />
						)}
						Copy Headlines
					</Button>
				</CardContent>
			</Card>

			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<CardTitle>Hashtags</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="flex flex-wrap gap-2">
						{pack.pack.hashtags.map(hashtag => (
							<Badge key={hashtag} variant="secondary">
								{hashtag}
							</Badge>
						))}
					</div>

					<Button
						className="mt-5"
						variant="outline"
						onClick={() =>
							onCopy(`${pack.id}-hashtags`, pack.pack.hashtags.join(' '))
						}
					>
						{copiedKey === `${pack.id}-hashtags` ? (
							<ClipboardCheck className="mr-2 size-4" />
						) : (
							<Clipboard className="mr-2 size-4" />
						)}
						Copy Hashtags
					</Button>
				</CardContent>
			</Card>

			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<CardTitle>5-Day Posting Plan</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{pack.pack.weeklyPlan.map(item => (
						<div
							key={item.day}
							className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[120px_180px_1fr]"
						>
							<p className="text-sm font-bold">{item.day}</p>
							<p className="text-sm text-muted-foreground">{item.focus}</p>
							<p className="text-sm leading-6">{item.post}</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

function StatusFilterButtons({
	statusFilter,
	statusCounts,
	onChange,
}: {
	statusFilter: StatusFilter;
	statusCounts: Record<StatusFilter, number>;
	onChange: (statusFilter: StatusFilter) => void;
}) {
	const filters: StatusFilter[] = ['all', ...statusOptions];

	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
			<div className="flex flex-wrap gap-2">
				{filters.map(filter => (
					<Button
						key={filter}
						type="button"
						size="sm"
						variant={statusFilter === filter ? 'default' : 'outline'}
						onClick={() => onChange(filter)}
					>
						{statusFilterLabels[filter]}
						<span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
							{statusCounts[filter]}
						</span>
					</Button>
				))}
			</div>
		</div>
	);
}

function StatusButtons({
	status,
	onChange,
}: {
	status: ContentPackStatus;
	onChange: (status: ContentPackStatus) => void;
}) {
	return (
		<div className="flex flex-wrap gap-2">
			{statusOptions.map(option => (
				<Button
					key={option}
					type="button"
					size="sm"
					variant={status === option ? 'default' : 'outline'}
					onClick={() => onChange(option)}
				>
					{statusLabels[option]}
				</Button>
			))}
		</div>
	);
}

function SavedAssetCard({
	packId,
	asset,
	copiedKey,
	onCopy,
}: {
	packId: string;
	asset: ContentAsset;
	copiedKey: string | null;
	onCopy: (key: string, text: string) => Promise<void>;
}) {
	const copyKey = `${packId}-${asset.title}`;

	return (
		<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
			<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
					<div>
						<div className="mb-2 flex flex-wrap items-center gap-2">
							<Badge variant="outline">{asset.platform}</Badge>
							<Badge variant="secondary">Saved</Badge>
						</div>

						<CardTitle>{asset.title}</CardTitle>

						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{asset.helperText}
						</p>
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => onCopy(copyKey, asset.body)}
					>
						{copiedKey === copyKey ? (
							<ClipboardCheck className="mr-2 size-4" />
						) : (
							<Clipboard className="mr-2 size-4" />
						)}
						Copy
					</Button>
				</div>
			</CardHeader>

			<CardContent className="p-5">
				<p className="whitespace-pre-line text-sm leading-7">{asset.body}</p>
			</CardContent>
		</Card>
	);
}
