'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
	ArrowLeft,
	CheckCircle2,
	Clipboard,
	ClipboardCheck,
	RefreshCcw,
	Save,
	Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import {
	buildRepurposeInput,
	repurposeContentPack,
	repurposeModes,
	type RepurposeMode,
} from '@/lib/repurpose-content-pack';
import {
	getSavedContentPacks,
	saveContentPack,
} from '@/lib/saved-content-packs';
import {
	CONTEXT_VAULT_STORAGE_KEY,
	contextTypeLabels,
} from '@/lib/context-vault-storage';
import type { ContextItem, JobContentPack, SavedContentPack } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SAVED_CONTENT_PACKS_STORAGE_KEY = 'localproof-saved-content-packs';

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

		return getSavedContentPacks();
	} catch {
		return [];
	}
}

function subscribeToContextVault(callback: () => void) {
	if (typeof window === 'undefined') {
		return () => {};
	}

	window.addEventListener('storage', callback);
	window.addEventListener('localproof-context-vault-updated', callback);

	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener('localproof-context-vault-updated', callback);
	};
}

function getContextVaultSnapshot() {
	if (typeof window === 'undefined') {
		return null;
	}

	return window.localStorage.getItem(CONTEXT_VAULT_STORAGE_KEY);
}

function getContextVaultServerSnapshot() {
	return null;
}

function parseEnabledContextItems(snapshot: string | null): ContextItem[] {
	if (!snapshot) {
		return [];
	}

	try {
		const parsedItems = JSON.parse(snapshot);

		if (!Array.isArray(parsedItems)) {
			return [];
		}

		return (parsedItems as ContextItem[]).filter(item => item.enabled);
	} catch {
		return [];
	}
}

function getInitialPackId() {
	if (typeof window === 'undefined') {
		return null;
	}

	const params = new URLSearchParams(window.location.search);

	return params.get('packId');
}

function getScoreLabel(pack: JobContentPack | SavedContentPack['pack']) {
	if (!pack.score) {
		return 'No score';
	}

	return `${pack.score.total}/100 · ${pack.score.grade}`;
}

export function RepurposePackTool() {
	const savedPacksSnapshot = useSyncExternalStore(
		subscribeToSavedPacks,
		getSavedPacksSnapshot,
		getSavedPacksServerSnapshot,
	);

	const contextVaultSnapshot = useSyncExternalStore(
		subscribeToContextVault,
		getContextVaultSnapshot,
		getContextVaultServerSnapshot,
	);

	const savedPacks = useMemo(() => {
		return parseSavedPacksSnapshot(savedPacksSnapshot);
	}, [savedPacksSnapshot]);

	const enabledContextItems = useMemo(() => {
		return parseEnabledContextItems(contextVaultSnapshot);
	}, [contextVaultSnapshot]);

	const initialPackId = useMemo(() => getInitialPackId(), []);
	const [selectedPackId, setSelectedPackId] = useState<string | null>(
		initialPackId,
	);
	const [selectedMode, setSelectedMode] =
		useState<RepurposeMode>('facebook-set');
	const [repurposedPack, setRepurposedPack] = useState<JobContentPack | null>(
		null,
	);
	const [savedPackId, setSavedPackId] = useState<string | null>(null);
	const [copiedKey, setCopiedKey] = useState<string | null>(null);

	const selectedPack = useMemo(() => {
		return (
			savedPacks.find(pack => pack.id === selectedPackId) ??
			savedPacks[0] ??
			null
		);
	}, [savedPacks, selectedPackId]);

	function selectPack(packId: string) {
		setSelectedPackId(packId);
		setRepurposedPack(null);
		setSavedPackId(null);
	}

	function selectMode(mode: RepurposeMode) {
		setSelectedMode(mode);
		setRepurposedPack(null);
		setSavedPackId(null);
	}

	function handleRepurpose() {
		if (!selectedPack) {
			return;
		}

		const nextPack = repurposeContentPack({
			savedPack: selectedPack,
			mode: selectedMode,
			contextItems: enabledContextItems,
		});

		setRepurposedPack(nextPack);
		setSavedPackId(null);

		toast.success('Pack repurposed', {
			description: 'A fresh content angle was created from the saved pack.',
		});
	}

	function handleSaveRepurposedPack() {
		if (!selectedPack || !repurposedPack) {
			return;
		}

		const repurposeInput = buildRepurposeInput(selectedPack, selectedMode);

		const savedPack = saveContentPack({
			profile: selectedPack.profile,
			input: repurposeInput,
			pack: repurposedPack,
		});

		setSavedPackId(savedPack.id);

		toast.success('Repurposed pack saved', {
			description: 'You can now schedule it from Saved Packs or the Queue.',
		});
	}

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

	return (
		<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
			<div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
				<Card className="overflow-hidden border-[#5B74FF]/30 bg-[linear-gradient(180deg,rgba(95,182,255,0.08)_0%,rgba(10,16,34,0.98)_42%,rgba(10,16,34,1)_100%)] shadow-[0_0_35px_rgba(91,116,255,0.14)]">
					<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
						<Badge variant="secondary" className="mb-3 w-fit">
							Repurpose
						</Badge>

						<CardTitle className="text-3xl">
							Turn one saved pack into fresh content.
						</CardTitle>

						<p className="mt-3 text-sm leading-7 text-muted-foreground">
							Pick an existing saved pack, choose a repurpose angle, and create
							a new scored pack you can save and schedule.
						</p>
					</CardHeader>

					<CardContent className="space-y-5 p-5">
						<div className="flex flex-wrap gap-2">
							<Button variant="outline" asChild>
								<Link href="/posts">
									<ArrowLeft className="mr-2 size-4" />
									Saved Packs
								</Link>
							</Button>

							<Button variant="outline" asChild>
								<Link href="/queue">Publishing Queue</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
					<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
						<CardTitle>Choose Saved Pack</CardTitle>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							Select the original job/content pack to repurpose.
						</p>
					</CardHeader>

					<CardContent className="space-y-3 p-5">
						{savedPacks.length === 0 ? (
							<div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5">
								<p className="text-sm leading-6 text-muted-foreground">
									No saved packs yet. Generate and save a pack first.
								</p>

								<Button className="mt-4" asChild>
									<Link href="/generate">
										<Sparkles className="mr-2 size-4" />
										Generate Pack
									</Link>
								</Button>
							</div>
						) : (
							savedPacks.map(pack => {
								const selected = selectedPack?.id === pack.id;

								return (
									<button
										key={pack.id}
										type="button"
										className={`w-full rounded-2xl border p-4 text-left transition ${
											selected
												? 'border-[#5B74FF]/60 bg-[#5B74FF]/10'
												: 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
										}`}
										onClick={() => selectPack(pack.id)}
									>
										<div className="mb-2 flex flex-wrap gap-2">
											<Badge variant="secondary">{pack.status}</Badge>
											<Badge variant="outline">
												{getScoreLabel(pack.pack)}
											</Badge>
										</div>

										<p className="font-semibold">{pack.title}</p>
										<p className="mt-1 text-sm leading-6 text-muted-foreground">
											{pack.jobLocation} · {pack.industry}
										</p>
									</button>
								);
							})
						)}
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
					<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
						<CardTitle>Choose Repurpose Mode</CardTitle>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							Pick the new angle you want to create.
						</p>
					</CardHeader>

					<CardContent className="grid gap-3 p-5">
						{repurposeModes.map(mode => {
							const selected = selectedMode === mode.id;

							return (
								<button
									key={mode.id}
									type="button"
									className={`rounded-2xl border p-4 text-left transition ${
										selected
											? 'border-[#5B74FF]/60 bg-[#5B74FF]/10'
											: 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
									}`}
									onClick={() => selectMode(mode.id)}
								>
									<div className="mb-2 flex flex-wrap gap-2">
										<Badge variant="outline">{mode.tag}</Badge>
										{selected ? (
											<Badge variant="secondary">Selected</Badge>
										) : null}
									</div>

									<p className="font-semibold">{mode.title}</p>
									<p className="mt-1 text-sm leading-6 text-muted-foreground">
										{mode.description}
									</p>
								</button>
							);
						})}
					</CardContent>
				</Card>

				{enabledContextItems.length > 0 ? (
					<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
						<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
							<CardTitle>Active Context</CardTitle>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								These Context Vault items will guide the repurposed pack.
							</p>
						</CardHeader>

						<CardContent className="flex flex-wrap gap-2 p-5">
							{enabledContextItems.slice(0, 8).map(item => (
								<Badge key={item.id} variant="outline">
									{contextTypeLabels[item.type]} · {item.title}
								</Badge>
							))}
						</CardContent>
					</Card>
				) : null}

				<Button
					size="lg"
					className="w-full"
					onClick={handleRepurpose}
					disabled={!selectedPack}
				>
					<RefreshCcw className="mr-2 size-4" />
					Repurpose Pack
				</Button>
			</div>

			<div>
				{repurposedPack ? (
					<RepurposedOutput
						pack={repurposedPack}
						savedPackId={savedPackId}
						copiedKey={copiedKey}
						onCopy={copyText}
						onSave={handleSaveRepurposedPack}
					/>
				) : (
					<EmptyRepurposeOutput />
				)}
			</div>
		</div>
	);
}

function EmptyRepurposeOutput() {
	return (
		<Card className="min-h-[620px] border-dashed border-white/10 bg-white/[0.03] shadow-sm backdrop-blur">
			<CardContent className="flex min-h-[620px] flex-col items-center justify-center p-8 text-center">
				<div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
					<RefreshCcw className="size-6" />
				</div>

				<h2 className="text-3xl font-bold tracking-tight">
					Your repurposed pack will appear here.
				</h2>

				<p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
					Choose a saved pack and a new angle. LocalProof will turn the original
					job into fresh content without inventing a new customer story.
				</p>
			</CardContent>
		</Card>
	);
}

function RepurposedOutput({
	pack,
	savedPackId,
	copiedKey,
	onCopy,
	onSave,
}: {
	pack: JobContentPack;
	savedPackId: string | null;
	copiedKey: string | null;
	onCopy: (key: string, text: string) => Promise<void>;
	onSave: () => void;
}) {
	return (
		<div className="space-y-6">
			<Card className="overflow-hidden border-[#5B74FF]/30 bg-[linear-gradient(180deg,rgba(95,182,255,0.08)_0%,rgba(10,16,34,0.98)_42%,rgba(10,16,34,1)_100%)] shadow-[0_0_35px_rgba(91,116,255,0.14)]">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
						<div>
							<Badge variant="secondary" className="mb-3">
								Repurposed Pack
							</Badge>

							<CardTitle className="text-3xl">
								Fresh content from existing proof.
							</CardTitle>

							<p className="mt-3 text-sm leading-7 text-muted-foreground">
								{pack.summary}
							</p>
						</div>

						<div className="flex flex-col gap-2 sm:flex-row">
							<Button
								variant="outline"
								size="sm"
								onClick={onSave}
								disabled={Boolean(savedPackId)}
							>
								{savedPackId ? (
									<>
										<CheckCircle2 className="mr-2 size-4" />
										Saved
									</>
								) : (
									<>
										<Save className="mr-2 size-4" />
										Save New Pack
									</>
								)}
							</Button>

							<CopyButton
								copied={copiedKey === 'summary'}
								onClick={() => onCopy('summary', pack.summary)}
							/>
						</div>
					</div>
				</CardHeader>

				{pack.score ? (
					<CardContent className="grid gap-3 p-5 md:grid-cols-2">
						<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
							<p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								LocalProof Score
							</p>
							<p className="mt-2 text-3xl font-bold">{pack.score.total}/100</p>
							<p className="mt-1 text-sm text-muted-foreground">
								{pack.score.grade}
							</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
							<p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								Assets Created
							</p>
							<p className="mt-2 text-3xl font-bold">{pack.assets.length}</p>
							<p className="mt-1 text-sm text-muted-foreground">
								Ready to copy, save, and schedule.
							</p>
						</div>
					</CardContent>
				) : null}
			</Card>

			<div className="grid gap-5">
				{pack.assets.map(asset => (
					<Card
						key={asset.title}
						className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur"
					>
						<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
							<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
								<div>
									<div className="mb-2 flex flex-wrap items-center gap-2">
										<Badge variant="outline">{asset.platform}</Badge>
										<Badge variant="secondary">Repurposed</Badge>
									</div>

									<CardTitle>{asset.title}</CardTitle>

									<p className="mt-2 text-sm leading-6 text-muted-foreground">
										{asset.helperText}
									</p>
								</div>

								<CopyButton
									copied={copiedKey === asset.title}
									onClick={() => onCopy(asset.title, asset.body)}
								/>
							</div>
						</CardHeader>

						<CardContent className="p-5">
							<p className="whitespace-pre-line text-sm leading-7">
								{asset.body}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<CardTitle>Headline Options</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3 p-5">
					{pack.headlines.map(headline => (
						<div
							key={headline}
							className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium"
						>
							{headline}
						</div>
					))}

					<CopyButton
						copied={copiedKey === 'headlines'}
						onClick={() => onCopy('headlines', pack.headlines.join('\n'))}
					/>
				</CardContent>
			</Card>

			<Card className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
				<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
					<CardTitle>Hashtags</CardTitle>
				</CardHeader>

				<CardContent className="p-5">
					<div className="flex flex-wrap gap-2">
						{pack.hashtags.map(hashtag => (
							<Badge key={hashtag} variant="secondary">
								{hashtag}
							</Badge>
						))}
					</div>

					<div className="mt-5">
						<CopyButton
							copied={copiedKey === 'hashtags'}
							onClick={() => onCopy('hashtags', pack.hashtags.join(' '))}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function CopyButton({
	copied,
	onClick,
}: {
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
					Copy
				</>
			)}
		</Button>
	);
}
