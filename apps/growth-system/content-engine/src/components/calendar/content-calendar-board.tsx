'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { CalendarDays, Clipboard, ClipboardCheck, Plus } from 'lucide-react';

import type { SavedContentPack } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STORAGE_KEY = 'localproof-saved-content-packs';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

type CalendarItem = {
	id: string;
	day: string;
	focus: string;
	post: string;
	packTitle: string;
	jobLocation: string;
	industry: string;
};

function subscribeToSavedPacks(callback: () => void) {
	if (typeof window === 'undefined') {
		return () => {};
	}

	window.addEventListener('storage', callback);

	return () => {
		window.removeEventListener('storage', callback);
	};
}

function getSavedPacksSnapshot() {
	if (typeof window === 'undefined') {
		return null;
	}

	return window.localStorage.getItem(STORAGE_KEY);
}

function getSavedPacksServerSnapshot() {
	return null;
}

function parseSavedPacks(snapshot: string | null): SavedContentPack[] {
	if (!snapshot) {
		return [];
	}

	try {
		const parsed = JSON.parse(snapshot);

		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed as SavedContentPack[];
	} catch {
		return [];
	}
}

export function ContentCalendarBoard() {
	const savedPacksSnapshot = useSyncExternalStore(
		subscribeToSavedPacks,
		getSavedPacksSnapshot,
		getSavedPacksServerSnapshot,
	);

	const savedPacks = useMemo(() => {
		return parseSavedPacks(savedPacksSnapshot);
	}, [savedPacksSnapshot]);

	const [copiedKey, setCopiedKey] = useState<string | null>(null);

	const calendarItems = useMemo(() => {
		return savedPacks.flatMap(pack =>
			pack.pack.weeklyPlan.map(item => ({
				id: `${pack.id}-${item.day}`,
				day: item.day,
				focus: item.focus,
				post: item.post,
				packTitle: pack.title,
				jobLocation: pack.jobLocation,
				industry: pack.industry,
			})),
		);
	}, [savedPacks]);

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
		return (
			<div className="mx-auto max-w-4xl">
				<Card className="border-dashed shadow-sm">
					<CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
						<div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
							<CalendarDays className="size-6" />
						</div>

						<h2 className="text-3xl font-bold tracking-tight">
							No content calendar yet.
						</h2>

						<p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
							Generate and save a content pack first. Its 5-day posting plan
							will automatically appear here.
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

	return (
		<div className="mx-auto max-w-7xl">
			<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">
						This week’s content plan
					</h2>

					<p className="mt-2 text-sm text-muted-foreground">
						{savedPacks.length} saved pack
						{savedPacks.length === 1 ? '' : 's'} generating{' '}
						{calendarItems.length} calendar item
						{calendarItems.length === 1 ? '' : 's'}.
					</p>
				</div>

				<Button asChild>
					<Link href="/generate">
						<Plus className="mr-2 size-4" />
						New Content Pack
					</Link>
				</Button>
			</div>

			<div className="grid gap-5 lg:grid-cols-5">
				{days.map(day => {
					const itemsForDay = calendarItems.filter(item => item.day === day);

					return (
						<Card key={day} className="min-h-[520px] shadow-sm">
							<CardHeader className="border-b bg-muted/30">
								<CardTitle className="text-lg">{day}</CardTitle>
								<p className="text-sm text-muted-foreground">
									{itemsForDay.length} post
									{itemsForDay.length === 1 ? '' : 's'}
								</p>
							</CardHeader>

							<CardContent className="space-y-4 p-4">
								{itemsForDay.length === 0 ? (
									<p className="text-sm leading-6 text-muted-foreground">
										No posts planned for this day yet.
									</p>
								) : (
									itemsForDay.map(item => (
										<CalendarPostCard
											key={item.id}
											item={item}
											copied={copiedKey === item.id}
											onCopy={() => copyText(item.id, item.post)}
										/>
									))
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

function CalendarPostCard({
	item,
	copied,
	onCopy,
}: {
	item: CalendarItem;
	copied: boolean;
	onCopy: () => void;
}) {
	return (
		<div className="rounded-2xl border bg-background p-4">
			<div className="mb-3 flex flex-wrap gap-2">
				<Badge variant="secondary">{item.focus}</Badge>
				<Badge variant="outline">{item.jobLocation}</Badge>
			</div>

			<p className="text-sm font-semibold leading-6">{item.packTitle}</p>

			<p className="mt-3 text-sm leading-7 text-muted-foreground">
				{item.post}
			</p>

			<Button
				className="mt-4 w-full"
				variant="outline"
				size="sm"
				onClick={onCopy}
			>
				{copied ? (
					<>
						<ClipboardCheck className="mr-2 size-4" />
						Copied
					</>
				) : (
					<>
						<Clipboard className="mr-2 size-4" />
						Copy Post
					</>
				)}
			</Button>
		</div>
	);
}
