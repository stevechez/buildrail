'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore, type ReactNode } from 'react';
import {
	CalendarDays,
	CheckCircle2,
	Clock3,
	FileText,
	Plus,
} from 'lucide-react';

import type { ContentPackStatus, SavedContentPack } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SAVED_CONTENT_PACKS_STORAGE_KEY = 'localproof-saved-content-packs';

const statusLabels: Record<ContentPackStatus, string> = {
	draft: 'Draft',
	ready: 'Ready',
	scheduled: 'Scheduled',
	published: 'Published',
	archived: 'Archived',
};

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

function parseSavedPacks(snapshot: string | null): SavedContentPack[] {
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
			scheduledFor: pack.scheduledFor ?? null,
		}));
	} catch {
		return [];
	}
}

function getPackStatus(pack: SavedContentPack): ContentPackStatus {
	return pack.status ?? 'draft';
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

function getPackSummary(pack: SavedContentPack) {
	return pack.pack?.summary || 'No summary saved for this pack yet.';
}

function formatScheduledDate(scheduledFor: string | null) {
	if (!scheduledFor) {
		return 'Not scheduled';
	}

	return new Date(`${scheduledFor}T12:00:00`).toLocaleDateString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

function isPastDate(dateValue: string) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const scheduledDate = new Date(`${dateValue}T12:00:00`);
	scheduledDate.setHours(0, 0, 0, 0);

	return scheduledDate < today;
}

function groupPacksByDate(packs: SavedContentPack[]) {
	const scheduledPacks = packs
		.filter(pack => pack.scheduledFor)
		.sort((firstPack, secondPack) =>
			String(firstPack.scheduledFor).localeCompare(
				String(secondPack.scheduledFor),
			),
		);

	return scheduledPacks.reduce<Record<string, SavedContentPack[]>>(
		(groups, pack) => {
			const dateKey = pack.scheduledFor ?? 'unscheduled';

			return {
				...groups,
				[dateKey]: [...(groups[dateKey] ?? []), pack],
			};
		},
		{},
	);
}

export function ScheduledContentCalendar() {
	const savedPacksSnapshot = useSyncExternalStore(
		subscribeToSavedContentPacks,
		getSavedContentPacksSnapshot,
		getSavedContentPacksServerSnapshot,
	);

	const savedPacks = useMemo(() => {
		return parseSavedPacks(savedPacksSnapshot);
	}, [savedPacksSnapshot]);

	const scheduledGroups = useMemo(() => {
		return groupPacksByDate(savedPacks);
	}, [savedPacks]);

	const dateKeys = Object.keys(scheduledGroups);
	const scheduledCount = savedPacks.filter(pack => pack.scheduledFor).length;
	const readyCount = savedPacks.filter(pack => getPackStatus(pack) === 'ready').length;
	const publishedCount = savedPacks.filter(
		pack => getPackStatus(pack) === 'published',
	).length;

	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<div className="grid gap-5 md:grid-cols-3">
				<CalendarStatCard
					title="Scheduled"
					value={String(scheduledCount)}
					description="Packs with a planned date."
					icon={<CalendarDays className="size-5" />}
				/>

				<CalendarStatCard
					title="Ready"
					value={String(readyCount)}
					description="Packs ready to place on the calendar."
					icon={<Clock3 className="size-5" />}
				/>

				<CalendarStatCard
					title="Published"
					value={String(publishedCount)}
					description="Packs already marked as published."
					icon={<CheckCircle2 className="size-5" />}
				/>
			</div>

			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
						<div>
							<CardTitle>Publishing Calendar</CardTitle>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								Scheduled content packs from your Draft Manager.
							</p>
						</div>

						<Button asChild>
							<Link href="/posts">
								<Plus className="mr-2 size-4" />
								Schedule Packs
							</Link>
						</Button>
					</div>
				</CardHeader>

				<CardContent className="space-y-5 p-5">
					{dateKeys.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
							<FileText className="mx-auto mb-4 size-9 text-muted-foreground" />

							<h2 className="text-2xl font-bold tracking-tight">
								No scheduled packs yet.
							</h2>

							<p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
								Open a saved content pack, choose a scheduled date, and it will
								appear here automatically.
							</p>

							<Button className="mt-6" asChild>
								<Link href="/posts">Open Draft Manager</Link>
							</Button>
						</div>
					) : (
						dateKeys.map(dateKey => (
							<div
								key={dateKey}
								className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
							>
								<div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
									<div>
										<p className="text-lg font-bold">
											{formatScheduledDate(dateKey)}
										</p>
										<p className="mt-1 text-sm text-muted-foreground">
											{scheduledGroups[dateKey].length} pack
											{scheduledGroups[dateKey].length === 1 ? '' : 's'} planned
										</p>
									</div>

									{isPastDate(dateKey) ? (
										<Badge variant="secondary">Past date</Badge>
									) : (
										<Badge variant="default">Upcoming</Badge>
									)}
								</div>

								<div className="grid gap-4">
									{scheduledGroups[dateKey].map(pack => (
										<Link
											key={pack.id}
											href="/posts"
											className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
										>
											<div className="mb-3 flex flex-wrap gap-2">
												<Badge variant="default">
													{statusLabels[getPackStatus(pack)]}
												</Badge>
												<Badge variant="outline">{getPackLocation(pack)}</Badge>
											</div>

											<p className="font-semibold">{getPackTitle(pack)}</p>
											<p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
												{getPackSummary(pack)}
											</p>
										</Link>
									))}
								</div>
							</div>
						))
					)}
				</CardContent>
			</Card>
		</div>
	);
}

function CalendarStatCard({
	title,
	value,
	description,
	icon,
}: {
	title: string;
	value: string;
	description: string;
	icon: ReactNode;
}) {
	return (
		<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
			<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
				<div className="flex size-11 items-center justify-center rounded-2xl bg-white/[0.04]">
					{icon}
				</div>
			</CardHeader>

			<CardContent className="p-5">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="mt-2 text-3xl font-bold">{value}</p>
				<p className="mt-2 text-sm leading-6 text-muted-foreground">
					{description}
				</p>
			</CardContent>
		</Card>
	);
}
