'use client';

import Link from 'next/link';
import { useMemo, useState, useRef, useSyncExternalStore } from 'react';
import {
	ArrowRight,
	CheckCircle2,
	Clipboard,
	ClipboardCheck,
	Loader2,
	MapPin,
	Plus,
	Save,
	Sparkles,
	Wand2,
	X,
} from 'lucide-react';
import { improveContentPackScore } from '@/lib/improve-content-pack-score';
import {
	getActiveContentSkills,
	scoreContentPackWithSkills,
} from '@/lib/skill-aware-score';
import {
	contentRemixActions,
	remixContentPack,
	type ContentRemixAction,
} from '@/lib/remix-content-pack';
import { toast } from 'sonner';
import { saveContentPack } from '@/lib/saved-content-packs';
import {
	CONTEXT_VAULT_STORAGE_KEY,
	contextTypeLabels,
} from '@/lib/context-vault-storage';
import type {
	BusinessProfile,
	ContentAsset,
	ContentPackScore,
	ContextItem,
	JobContentInput,
	JobContentPack,
	SavedContentPack,
} from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

// ─── Constants ────────────────────────────────────────────────────────────────

const SAVED_CONTENT_PACKS_STORAGE_KEY = 'localproof-saved-content-packs';
const BUSINESS_PROFILE_STORAGE_KEY = 'localproof-business-profile';

const SAMPLE_NOTE =
	'Replaced a broken garage door spring in Aptos, CA. The door was stuck halfway open — homeowner was worried about security before leaving for work. Same-day repair, door moving safely again before evening.';

const SAMPLE_LOCATION = 'Aptos, CA';

const PLACEHOLDER =
	'Example: Replaced a water heater in Capitola today. Old unit was leaking and the homeowners had no hot water. Installed a new 50-gallon unit, cleaned up the area, tested everything. Done in 3 hours.';

// ─── Storage subscriptions ────────────────────────────────────────────────────

function subscribeToSavedPackLoader(callback: () => void) {
	if (typeof window === 'undefined') return () => {};
	window.addEventListener('storage', callback);
	window.addEventListener('localproof-saved-content-packs-updated', callback);
	window.addEventListener('popstate', callback);
	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener(
			'localproof-saved-content-packs-updated',
			callback,
		);
		window.removeEventListener('popstate', callback);
	};
}

function getSavedPackLoadSnapshot() {
	if (typeof window === 'undefined') return null;
	const params = new URLSearchParams(window.location.search);
	return JSON.stringify({
		packId: params.get('packId'),
		packs: window.localStorage.getItem(SAVED_CONTENT_PACKS_STORAGE_KEY),
	});
}

function getSavedPackLoadServerSnapshot() {
	return null;
}

function parseSavedPackToLoad(
	snapshot: string | null,
): SavedContentPack | null {
	if (!snapshot) return null;
	try {
		const parsed = JSON.parse(snapshot) as {
			packId: string | null;
			packs: string | null;
		};
		if (!parsed.packId || !parsed.packs) return null;
		const packs = JSON.parse(parsed.packs);
		if (!Array.isArray(packs)) return null;
		return (
			(packs as SavedContentPack[]).find(p => p.id === parsed.packId) ?? null
		);
	} catch {
		return null;
	}
}

function subscribeToBusinessProfile(callback: () => void) {
	if (typeof window === 'undefined') return () => {};
	window.addEventListener('storage', callback);
	window.addEventListener('localproof-business-profile-updated', callback);
	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener('localproof-business-profile-updated', callback);
	};
}

function getBusinessProfileSnapshot() {
	if (typeof window === 'undefined') return null;
	return window.localStorage.getItem(BUSINESS_PROFILE_STORAGE_KEY);
}

function getBusinessProfileServerSnapshot() {
	return null;
}

function subscribeToContextVault(callback: () => void) {
	if (typeof window === 'undefined') return () => {};
	window.addEventListener('storage', callback);
	window.addEventListener('localproof-context-vault-updated', callback);
	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener('localproof-context-vault-updated', callback);
	};
}

function getContextVaultSnapshot() {
	if (typeof window === 'undefined') return null;
	return window.localStorage.getItem(CONTEXT_VAULT_STORAGE_KEY);
}

function getContextVaultServerSnapshot() {
	return null;
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

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

function parseEnabledContextItems(raw: string | null): ContextItem[] {
	if (!raw) return [];
	try {
		const items = JSON.parse(raw);
		if (!Array.isArray(items)) return [];
		return (items as ContextItem[]).filter(item => item.enabled);
	} catch {
		return [];
	}
}

// ─── Note → JobContentInput ───────────────────────────────────────────────────

function noteToInput(
	note: string,
	location: string,
	extraDetail: string,
): JobContentInput {
	return {
		jobTitle: '',
		jobLocation: location.trim(),
		customerProblem: '',
		workCompleted: note.trim(),
		finalResult: '',
		extraDetails: extraDetail.trim(),
	};
}

function savedPackToNote(pack: SavedContentPack): {
	note: string;
	location: string;
} {
	const parts = [
		pack.input?.jobTitle,
		pack.input?.workCompleted,
		pack.input?.customerProblem,
		pack.input?.finalResult,
		pack.input?.extraDetails,
	].filter(Boolean);
	return {
		note: parts.join(' '),
		location: pack.input?.jobLocation ?? pack.jobLocation ?? '',
	};
}

// ─── Streaming ────────────────────────────────────────────────────────────────

type GenerateState =
	| { status: 'idle' }
	| { status: 'streaming'; partial: string }
	| { status: 'done' }
	| { status: 'error'; message: string };

async function streamGenerate({
	profile,
	input,
	contextItems,
	onChunk,
	onDone,
	onError,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	contextItems: ContextItem[];
	onChunk: (text: string) => void;
	onDone: (fullText: string) => void;
	onError: (message: string) => void;
}) {
	let accumulated = '';
	try {
		const response = await fetch('/api/generate-pack', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ profile, input, contextItems }),
		});
		if (!response.ok) {
			const data = await response.json().catch(() => ({}));
			onError(
				(data as { error?: string }).error ??
					'Generation failed. Please try again.',
			);
			return;
		}
		const reader = response.body?.getReader();
		if (!reader) {
			onError('Stream unavailable.');
			return;
		}
		const decoder = new TextDecoder();
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			const chunk = decoder.decode(value, { stream: true });
			for (const line of chunk.split('\n')) {
				if (!line.startsWith('data: ')) continue;
				const data = line.slice(6).trim();
				if (data === '[DONE]') {
					onDone(accumulated);
					return;
				}
				try {
					const parsed = JSON.parse(data) as { text?: string; error?: string };
					if (parsed.error) {
						onError(parsed.error);
						return;
					}
					if (parsed.text) {
						accumulated += parsed.text;
						onChunk(accumulated);
					}
				} catch {
					/* skip */
				}
			}
		}
		onDone(accumulated);
	} catch (err) {
		onError(
			err instanceof Error
				? err.message
				: 'Generation failed. Please try again.',
		);
	}
}

function parsePackFromText(text: string): JobContentPack | null {
	try {
		const start = text.indexOf('{');
		const end = text.lastIndexOf('}');
		if (start === -1 || end === -1) return null;
		return JSON.parse(text.slice(start, end + 1)) as JobContentPack;
	} catch {
		return null;
	}
}

// ─── Main component ───────────────────────────────────────────────────────────

export function JobContentGenerator() {
	const savedProfileSnapshot = useSyncExternalStore(
		subscribeToBusinessProfile,
		getBusinessProfileSnapshot,
		getBusinessProfileServerSnapshot,
	);
	const contextVaultSnapshot = useSyncExternalStore(
		subscribeToContextVault,
		getContextVaultSnapshot,
		getContextVaultServerSnapshot,
	);
	const savedPackLoadSnapshot = useSyncExternalStore(
		subscribeToSavedPackLoader,
		getSavedPackLoadSnapshot,
		getSavedPackLoadServerSnapshot,
	);

	const profile = useMemo(
		() => parseBusinessProfile(savedProfileSnapshot),
		[savedProfileSnapshot],
	);
	const enabledContextItems = useMemo(
		() => parseEnabledContextItems(contextVaultSnapshot),
		[contextVaultSnapshot],
	);
	const savedPackToLoadData = useMemo(
		() => parseSavedPackToLoad(savedPackLoadSnapshot),
		[savedPackLoadSnapshot],
	);

	// ── Single-textarea state ──
	const [jobNote, setJobNote] = useState('');
	const [location, setLocation] = useState('');
	const [extraDetail, setExtraDetail] = useState('');
	const [showLocation, setShowLocation] = useState(false);
	const [showExtraDetail, setShowExtraDetail] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// ── Output state ──
	const [contentPack, setContentPack] = useState<JobContentPack | null>(null);
	const [generateState, setGenerateState] = useState<GenerateState>({
		status: 'idle',
	});
	const [generatedContextItems, setGeneratedContextItems] = useState<
		ContextItem[]
	>([]);
	const [remixHistory, setRemixHistory] = useState<ContentRemixAction[]>([]);
	const [copiedKey, setCopiedKey] = useState<string | null>(null);
	const [savedPackId, setSavedPackId] = useState<string | null>(null);
	const [loadedSourcePackId, setLoadedSourcePackId] = useState<string | null>(
		null,
	);

	const hasBusinessProfile = useMemo(
		() =>
			Boolean(
				profile.businessName ||
				profile.industry ||
				profile.serviceArea ||
				profile.mainServices,
			),
		[profile],
	);
	const isGenerating = generateState.status === 'streaming';
	const hasNote = jobNote.trim().length > 10;

	function attachScore(
		pack: JobContentPack,
		input: JobContentInput,
	): JobContentPack {
		return {
			...pack,
			score: scoreContentPackWithSkills({
				profile,
				input,
				pack,
				contextItems: enabledContextItems,
			}),
		};
	}

	function buildInput() {
		return noteToInput(jobNote, location, extraDetail);
	}

	function handleLoadSavedPack(pack: SavedContentPack) {
		const { note, location: loc } = savedPackToNote(pack);
		setJobNote(note);
		setLocation(loc);
		if (loc) setShowLocation(true);
		setExtraDetail('');
		setShowExtraDetail(false);
		setContentPack(
			pack.pack.score ? pack.pack : attachScore(pack.pack, pack.input),
		);
		setGeneratedContextItems(enabledContextItems);
		setSavedPackId(null);
		setRemixHistory([]);
		setLoadedSourcePackId(pack.id);
		setGenerateState({ status: 'idle' });
		toast.success('Pack loaded', {
			description: 'Edit the note or generate a new version.',
		});
	}

	async function runGenerate(input: JobContentInput) {
		setGenerateState({ status: 'streaming', partial: '' });
		setContentPack(null);
		setSavedPackId(null);
		setRemixHistory([]);
		await streamGenerate({
			profile,
			input,
			contextItems: enabledContextItems,
			onChunk: partial => setGenerateState({ status: 'streaming', partial }),
			onDone: fullText => {
				const parsed = parsePackFromText(fullText);
				if (parsed) {
					setContentPack(attachScore(parsed, input));
					setGeneratedContextItems(enabledContextItems);
					setGenerateState({ status: 'done' });
				} else {
					setGenerateState({
						status: 'error',
						message: 'Could not parse the generated content. Please try again.',
					});
				}
			},
			onError: message => setGenerateState({ status: 'error', message }),
		});
	}

	function handleGenerate() {
		runGenerate(buildInput());
	}

	function handleLoadSample() {
		setJobNote(SAMPLE_NOTE);
		setLocation(SAMPLE_LOCATION);
		setShowLocation(true);
		setExtraDetail('');
		setShowExtraDetail(false);
		runGenerate(noteToInput(SAMPLE_NOTE, SAMPLE_LOCATION, ''));
	}

	function handleImproveScore() {
		if (!contentPack) return;
		const improved = improveContentPackScore({
			pack: contentPack,
			profile,
			input: buildInput(),
			contextItems: generatedContextItems,
		});
		setContentPack(improved);
		setSavedPackId(null);
		setRemixHistory(cur =>
			['stronger-cta' as ContentRemixAction, ...cur].slice(0, 5),
		);
		toast.success('Score improved', {
			description: 'Proof, CTA, and local trust signals strengthened.',
		});
	}

	function handleRemix(action: ContentRemixAction) {
		if (!contentPack) return;
		const remixed = remixContentPack({
			pack: contentPack,
			profile,
			input: buildInput(),
			contextItems: generatedContextItems,
			action,
		});
		setContentPack(remixed);
		setSavedPackId(null);
		setRemixHistory(cur => [action, ...cur].slice(0, 5));
		toast.success(
			contentRemixActions.find(a => a.id === action)?.label ??
				'Content remixed',
			{ description: 'Your content pack was updated.' },
		);
	}

	function handleSavePack() {
		if (!contentPack) return;
		const saved = saveContentPack({
			profile,
			input: buildInput(),
			pack: contentPack,
		});
		setSavedPackId(saved.id);
		toast.success('Pack saved', { description: 'Find it in My Library.' });
	}

	async function copyText(key: string, text: string) {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedKey(key);
			window.setTimeout(() => setCopiedKey(null), 1600);
		} catch {
			setCopiedKey(null);
		}
	}

	const showStreamingOutput = generateState.status === 'streaming';
	const showContentPack =
		contentPack &&
		(generateState.status === 'done' || generateState.status === 'idle');

	return (
		<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
			{/* ── Left panel ── */}
			<div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
				{/* Saved pack loader banner */}
				{savedPackToLoadData &&
				loadedSourcePackId !== savedPackToLoadData.id ? (
					<SavedPackLoaderCard
						savedPack={savedPackToLoadData}
						onLoad={() => handleLoadSavedPack(savedPackToLoadData)}
					/>
				) : null}

				{/* Business chip */}
				<BusinessChip
					profile={profile}
					hasBusinessProfile={hasBusinessProfile}
				/>

				{/* ── The main input card ── */}
				<div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
					{/* Header */}
					<div className="border-b border-white/10 bg-white/[0.02] px-5 py-4">
						<p className="text-sm font-medium text-muted-foreground">
							Describe the job in plain english
						</p>
					</div>

					{/* Textarea */}
					<div className="p-4">
						<Textarea
							ref={textareaRef}
							placeholder={PLACEHOLDER}
							value={jobNote}
							onChange={e => setJobNote(e.target.value)}
							disabled={isGenerating}
							className="min-h-[160px] resize-none border-0 bg-transparent p-0 text-sm leading-7 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
						/>
					</div>

					{/* Expandable fields */}
					{(showLocation || showExtraDetail) && (
						<div className="border-t border-white/10 divide-y divide-white/10">
							{showLocation && (
								<div className="flex items-center gap-3 px-4 py-3">
									<MapPin className="size-3.5 shrink-0 text-muted-foreground" />
									<input
										type="text"
										placeholder="City, State (e.g. Aptos, CA)"
										value={location}
										onChange={e => setLocation(e.target.value)}
										disabled={isGenerating}
										className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
									/>
									<button
										onClick={() => {
											setShowLocation(false);
											setLocation('');
										}}
										className="text-muted-foreground hover:text-foreground"
									>
										<X className="size-3.5" />
									</button>
								</div>
							)}
							{showExtraDetail && (
								<div className="px-4 py-3">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs font-medium text-muted-foreground">
											Extra detail
										</span>
										<button
											onClick={() => {
												setShowExtraDetail(false);
												setExtraDetail('');
											}}
											className="text-muted-foreground hover:text-foreground"
										>
											<X className="size-3.5" />
										</button>
									</div>
									<textarea
										placeholder="Anything else worth mentioning — before/after photos, unusual challenge, customer quote..."
										value={extraDetail}
										onChange={e => setExtraDetail(e.target.value)}
										disabled={isGenerating}
										rows={3}
										className="w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-muted-foreground/50"
									/>
								</div>
							)}
						</div>
					)}

					{/* Add detail chips */}
					<div className="border-t border-white/10 px-4 py-3 flex flex-wrap gap-2">
						{!showLocation && (
							<button
								onClick={() => {
									setShowLocation(true);
								}}
								disabled={isGenerating}
								className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:opacity-40"
							>
								<Plus className="size-3" />
								Location
							</button>
						)}
						{!showExtraDetail && (
							<button
								onClick={() => setShowExtraDetail(true)}
								disabled={isGenerating}
								className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:opacity-40"
							>
								<Plus className="size-3" />
								Extra detail
							</button>
						)}
						<button
							onClick={handleLoadSample}
							disabled={isGenerating}
							className="ml-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:opacity-40"
						>
							<Sparkles className="size-3" />
							Try a sample
						</button>
					</div>

					{/* Generate button */}
					<div className="border-t border-white/10 p-4">
						<Button
							size="lg"
							className="w-full"
							onClick={handleGenerate}
							disabled={isGenerating || !hasNote}
						>
							{isGenerating ? (
								<>
									<Loader2 className="mr-2 size-4 animate-spin" />
									Generating...
								</>
							) : (
								<>
									<Sparkles className="mr-2 size-4" />
									Generate Content Pack
								</>
							)}
						</Button>

						{!hasNote && !isGenerating && (
							<p className="mt-2 text-center text-xs text-muted-foreground">
								Describe a real job above to get started
							</p>
						)}

						{generateState.status === 'error' && (
							<p className="mt-3 text-center text-sm font-medium text-destructive">
								{generateState.message}
							</p>
						)}
					</div>
				</div>

				{/* Active context preview */}
				{enabledContextItems.length > 0 && (
					<ActiveContextChips contextItems={enabledContextItems} />
				)}
			</div>

			{/* ── Right panel ── */}
			<div>
				{showStreamingOutput ? (
					<StreamingOutputPanel
						partial={
							generateState.status === 'streaming' ? generateState.partial : ''
						}
					/>
				) : showContentPack ? (
					<GeneratedContentPack
						pack={contentPack}
						copiedKey={copiedKey}
						savedPackId={savedPackId}
						enabledContextItems={generatedContextItems}
						remixHistory={remixHistory}
						onCopy={copyText}
						onSave={handleSavePack}
						onRemix={handleRemix}
						onImproveScore={handleImproveScore}
					/>
				) : (
					<EmptyOutputState onLoadSample={handleLoadSample} />
				)}
			</div>
		</div>
	);
}

// ─── Business chip ────────────────────────────────────────────────────────────

function BusinessChip({
	profile,
	hasBusinessProfile,
}: {
	profile: BusinessProfile;
	hasBusinessProfile: boolean;
}) {
	if (!hasBusinessProfile) {
		return (
			<div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
				<p className="text-sm text-muted-foreground">No business profile yet</p>
				<Button variant="outline" size="sm" asChild>
					<Link href="/onboarding">
						Set up <ArrowRight className="ml-1.5 size-3.5" />
					</Link>
				</Button>
			</div>
		);
	}
	return (
		<div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
			<div className="flex items-center gap-2">
				<CheckCircle2 className="size-4 text-[#5FB6FF]" />
				<span className="text-sm font-medium">
					{profile.businessName || profile.industry}
				</span>
				{profile.serviceArea && (
					<span className="text-sm text-muted-foreground">
						· {profile.serviceArea}
					</span>
				)}
			</div>
			<Link
				href="/onboarding"
				className="text-xs text-muted-foreground hover:text-foreground transition-colors"
			>
				Edit
			</Link>
		</div>
	);
}

// ─── Active context chips ─────────────────────────────────────────────────────

function ActiveContextChips({ contextItems }: { contextItems: ContextItem[] }) {
	return (
		<div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-xs font-medium text-muted-foreground">
					{contextItems.length} active rule
					{contextItems.length === 1 ? '' : 's'}
				</span>
				<Link
					href="/context"
					className="text-xs text-muted-foreground hover:text-foreground transition-colors"
				>
					Manage
				</Link>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{contextItems.slice(0, 5).map(item => (
					<span
						key={item.id}
						className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
					>
						{contextTypeLabels[item.type]}: {item.title}
					</span>
				))}
				{contextItems.length > 5 && (
					<span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground">
						+{contextItems.length - 5} more
					</span>
				)}
			</div>
		</div>
	);
}

// ─── Saved pack loader card ───────────────────────────────────────────────────

function SavedPackLoaderCard({
	savedPack,
	onLoad,
}: {
	savedPack: SavedContentPack;
	onLoad: () => void;
}) {
	return (
		<div className="rounded-2xl border border-[#5B74FF]/30 bg-[#5B74FF]/[0.06] p-4">
			<div className="mb-3 flex items-center justify-between gap-3">
				<Badge variant="secondary">Saved pack found</Badge>
				<Badge variant="outline">{savedPack.jobLocation || 'Local area'}</Badge>
			</div>
			<p className="mb-1 text-sm font-semibold">
				{savedPack.title || savedPack.input?.jobTitle || 'Untitled Pack'}
			</p>
			<p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
				{savedPack.pack.summary}
			</p>
			<Button className="w-full" onClick={onLoad}>
				<Wand2 className="mr-2 size-4" />
				Load for remix
			</Button>
		</div>
	);
}

// ─── Streaming output panel ───────────────────────────────────────────────────

function StreamingOutputPanel({ partial }: { partial: string }) {
	const summaryMatch = partial.match(/"summary"\s*:\s*"([^"]*)/);
	const summary = summaryMatch ? summaryMatch[1] : '';
	const assetTitleMatches = [...partial.matchAll(/"title"\s*:\s*"([^"]+)"/g)];
	const completedAssets = assetTitleMatches
		.map(m => m[1])
		.filter(t => !['summary', 'weeklyPlan'].includes(t));
	const allAssets = [
		'Google Business Post',
		'Facebook Post',
		'Instagram Caption',
		'LinkedIn Post',
		'Short Reel Script',
		'FAQ Answer',
		'Email Newsletter Blurb',
	];
	const hasHeadlines = partial.includes('"headlines"');
	const hasHashtags = partial.includes('"hashtags"');
	const hasWeeklyPlan = partial.includes('"weeklyPlan"');

	return (
		<div className="space-y-4">
			<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
				<div className="flex items-center gap-3 mb-4">
					<Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />
					<p className="text-sm font-medium">Writing your content pack...</p>
				</div>
				{summary ? (
					<p className="text-sm leading-7 text-muted-foreground">
						{summary}
						<span className="animate-pulse">▋</span>
					</p>
				) : (
					<div className="space-y-2">
						<div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.06]" />
						<div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
					</div>
				)}
			</div>

			<div className="grid gap-2">
				{allAssets.map((assetTitle, i) => {
					const isDone = completedAssets.includes(assetTitle);
					const isActive = !isDone && completedAssets.length === i;
					return (
						<div
							key={assetTitle}
							className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${isDone ? 'border-[#5B74FF]/25 bg-[#5B74FF]/[0.06]' : isActive ? 'border-white/15 bg-white/[0.04]' : 'border-white/8 bg-white/[0.02] opacity-40'}`}
						>
							{isDone ? (
								<CheckCircle2 className="size-4 shrink-0 text-[#5B74FF]" />
							) : isActive ? (
								<Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
							) : (
								<div className="size-4 shrink-0 rounded-full border border-white/20" />
							)}
							<span
								className={`text-sm ${isDone ? 'font-medium' : 'text-muted-foreground'}`}
							>
								{assetTitle}
							</span>
						</div>
					);
				})}
				{[
					{ label: 'Headline options', done: hasHeadlines },
					{ label: 'Hashtags', done: hasHashtags },
					{ label: '5-day posting plan', done: hasWeeklyPlan },
				].map(({ label, done }) => (
					<div
						key={label}
						className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${done ? 'border-[#5B74FF]/25 bg-[#5B74FF]/[0.06]' : 'border-white/8 bg-white/[0.02] opacity-40'}`}
					>
						{done ? (
							<CheckCircle2 className="size-4 shrink-0 text-[#5B74FF]" />
						) : (
							<div className="size-4 shrink-0 rounded-full border border-white/20" />
						)}
						<span
							className={`text-sm ${done ? 'font-medium' : 'text-muted-foreground'}`}
						>
							{label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

// ─── Empty output state ───────────────────────────────────────────────────────

function EmptyOutputState({ onLoadSample }: { onLoadSample: () => void }) {
	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
			<div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/[0.05]">
				<Sparkles className="size-5 text-muted-foreground" />
			</div>
			<h2 className="text-xl font-bold tracking-tight">
				Your content pack appears here
			</h2>
			<p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
				Describe one real job on the left — LocalProof writes Google, Facebook,
				Instagram, video, and more.
			</p>
			<button
				onClick={onLoadSample}
				className="mt-6 text-sm text-[#8FB9FF] hover:text-[#5FB6FF] transition-colors underline-offset-4 hover:underline"
			>
				Or try a sample job →
			</button>
		</div>
	);
}

// ─── Generated content pack ───────────────────────────────────────────────────

function GeneratedContentPack({
	pack,
	copiedKey,
	savedPackId,
	enabledContextItems,
	remixHistory,
	onCopy,
	onSave,
	onRemix,
	onImproveScore,
}: {
	pack: JobContentPack;
	copiedKey: string | null;
	savedPackId: string | null;
	enabledContextItems: ContextItem[];
	remixHistory: ContentRemixAction[];
	onCopy: (key: string, text: string) => Promise<void>;
	onSave: () => void;
	onRemix: (action: ContentRemixAction) => void;
	onImproveScore: () => void;
}) {
	return (
		<div className="space-y-5">
			{/* Action bar */}
			<div className="flex items-center justify-between gap-4 rounded-2xl border border-[#5B74FF]/25 bg-[#5B74FF]/[0.06] px-5 py-4">
				<div>
					<p className="text-sm font-semibold">Content pack ready</p>
					<p className="text-xs text-muted-foreground mt-0.5">
						Save it to your library to reuse, schedule, or repurpose.
					</p>
				</div>
				<div className="flex gap-2 shrink-0">
					<Button size="sm" onClick={onSave} disabled={Boolean(savedPackId)}>
						{savedPackId ? (
							<>
								<CheckCircle2 className="mr-1.5 size-3.5" />
								Saved
							</>
						) : (
							<>
								<Save className="mr-1.5 size-3.5" />
								Save
							</>
						)}
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() => onCopy('summary', pack.summary)}
					>
						{copiedKey === 'summary' ? (
							<>
								<ClipboardCheck className="mr-1.5 size-3.5" />
								Copied
							</>
						) : (
							<>
								<Clipboard className="mr-1.5 size-3.5" />
								Copy
							</>
						)}
					</Button>
				</div>
			</div>

			{/* Saved pack next steps */}
			{savedPackId && (
				<div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
					<span className="text-xs text-muted-foreground self-center mr-1">
						What&apos;s next:
					</span>
					<Button variant="outline" size="sm" asChild>
						<Link href="/posts">View Library</Link>
					</Button>
					<Button variant="outline" size="sm" asChild>
						<Link href={`/repurpose?packId=${savedPackId}`}>Repurpose</Link>
					</Button>
				</div>
			)}

			{/* Score */}
			{pack.score ? (
				<LocalProofScoreCard
					score={pack.score}
					onImproveScore={onImproveScore}
				/>
			) : (
				<ScoreUnavailableCard onImproveScore={onImproveScore} />
			)}

			{/* Skills used */}
			<SkillBadgesCard enabledContextItems={enabledContextItems} />

			{/* Summary */}
			<div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
				<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Pack summary
				</p>
				<p className="text-sm leading-7">{pack.summary}</p>
			</div>

			{/* Assets */}
			<div className="space-y-4">
				{pack.assets.map(asset => (
					<ContentAssetCard
						key={asset.title}
						asset={asset}
						copied={copiedKey === asset.title}
						onCopy={() => onCopy(asset.title, asset.body)}
					/>
				))}
			</div>

			{/* Headlines */}
			<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
				<CardHeader className="border-b border-white/10 bg-white/[0.02] p-4">
					<div className="flex items-center justify-between">
						<CardTitle className="text-base">Headline options</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onCopy('headlines', pack.headlines.join('\n'))}
						>
							{copiedKey === 'headlines' ? (
								<>
									<ClipboardCheck className="mr-1.5 size-3.5" />
									Copied
								</>
							) : (
								<>
									<Clipboard className="mr-1.5 size-3.5" />
									Copy all
								</>
							)}
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-2 p-4">
					{pack.headlines.map(h => (
						<div
							key={h}
							className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm"
						>
							{h}
						</div>
					))}
				</CardContent>
			</Card>

			{/* Hashtags */}
			<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
				<CardHeader className="border-b border-white/10 bg-white/[0.02] p-4">
					<div className="flex items-center justify-between">
						<CardTitle className="text-base">Hashtags</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onCopy('hashtags', pack.hashtags.join(' '))}
						>
							{copiedKey === 'hashtags' ? (
								<>
									<ClipboardCheck className="mr-1.5 size-3.5" />
									Copied
								</>
							) : (
								<>
									<Clipboard className="mr-1.5 size-3.5" />
									Copy
								</>
							)}
						</Button>
					</div>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-2 p-4">
					{pack.hashtags.map(tag => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</CardContent>
			</Card>

			{/* Weekly plan */}
			<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
				<CardHeader className="border-b border-white/10 bg-white/[0.02] p-4">
					<CardTitle className="text-base">5-day posting plan</CardTitle>
					<p className="text-xs text-muted-foreground">One job, five angles.</p>
				</CardHeader>
				<CardContent className="space-y-3 p-4">
					{pack.weeklyPlan.map(item => (
						<div
							key={item.day}
							className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[100px_160px_1fr]"
						>
							<p className="text-sm font-bold">{item.day}</p>
							<p className="text-sm text-muted-foreground">{item.focus}</p>
							<p className="text-sm leading-6">{item.post}</p>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Remix */}
			<RemixControls remixHistory={remixHistory} onRemix={onRemix} />
		</div>
	);
}

// ─── Content asset card ───────────────────────────────────────────────────────

function ContentAssetCard({
	asset,
	copied,
	onCopy,
}: {
	asset: ContentAsset;
	copied: boolean;
	onCopy: () => void;
}) {
	return (
		<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
			<CardHeader className="border-b border-white/10 bg-white/[0.02] p-4">
				<div className="flex items-start justify-between gap-4">
					<div>
						<div className="mb-1.5 flex flex-wrap gap-2">
							<Badge variant="outline">{asset.platform}</Badge>
						</div>
						<CardTitle className="text-base">{asset.title}</CardTitle>
						<p className="mt-1 text-xs text-muted-foreground">
							{asset.helperText}
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={onCopy}
						className="shrink-0"
					>
						{copied ? (
							<>
								<ClipboardCheck className="mr-1.5 size-3.5" />
								Copied
							</>
						) : (
							<>
								<Clipboard className="mr-1.5 size-3.5" />
								Copy
							</>
						)}
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<p className="whitespace-pre-line text-sm leading-7">{asset.body}</p>
			</CardContent>
		</Card>
	);
}

// ─── Remix controls ───────────────────────────────────────────────────────────

function RemixControls({
	remixHistory,
	onRemix,
}: {
	remixHistory: ContentRemixAction[];
	onRemix: (a: ContentRemixAction) => void;
}) {
	return (
		<Card className="overflow-hidden border-white/10 bg-white/[0.03]">
			<CardHeader className="border-b border-white/10 bg-white/[0.02] p-4">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-base">Remix this pack</CardTitle>
						<p className="text-xs text-muted-foreground mt-0.5">
							Refine without starting over.
						</p>
					</div>
					{remixHistory.length > 0 && (
						<Badge variant="secondary">{remixHistory.length} applied</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<div className="grid gap-2 md:grid-cols-2">
					{contentRemixActions.map(action => (
						<button
							key={action.id}
							onClick={() => onRemix(action.id)}
							className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:bg-white/[0.06]"
						>
							<p className="text-sm font-medium">{action.label}</p>
							<p className="mt-1 text-xs leading-5 text-muted-foreground">
								{action.description}
							</p>
						</button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── Score cards ──────────────────────────────────────────────────────────────

function LocalProofScoreCard({
	score,
	onImproveScore,
}: {
	score: ContentPackScore;
	onImproveScore: () => void;
}) {
	return (
		<Card className="overflow-hidden border-[#5B74FF]/25 bg-[#5B74FF]/[0.05]">
			<CardHeader className="border-b border-white/10 bg-white/[0.02] p-4">
				<div className="flex items-center justify-between gap-4">
					<div>
						<Badge variant="secondary" className="mb-2">
							LocalProof Score
						</Badge>
						<CardTitle className="text-2xl">
							{score.total}/100 · {score.grade}
						</CardTitle>
						<p className="mt-1 text-xs text-muted-foreground">
							Local trust, proof, clarity, CTA strength, reuse value.
						</p>
					</div>
					<Button size="sm" onClick={onImproveScore}>
						<Wand2 className="mr-1.5 size-3.5" />
						Improve
					</Button>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 p-4">
				<div className="grid gap-3 md:grid-cols-2">
					{score.factors.map(f => (
						<div
							key={f.label}
							className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
						>
							<div className="mb-1.5 flex items-center justify-between">
								<p className="text-sm font-medium">{f.label}</p>
								<Badge variant="outline">
									{f.score}/{f.maxScore}
								</Badge>
							</div>
							<p className="text-xs leading-5 text-muted-foreground">
								{f.feedback}
							</p>
						</div>
					))}
				</div>
				<div className="grid gap-3 md:grid-cols-2">
					<div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Strengths
						</p>
						{score.strengths.length > 0 ? (
							score.strengths.map(s => (
								<p key={s} className="text-xs leading-5 text-muted-foreground">
									✓ {s}
								</p>
							))
						) : (
							<p className="text-xs text-muted-foreground">
								Generate or improve to identify strengths.
							</p>
						)}
					</div>
					<div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Improve next
						</p>
						{score.improvements.length > 0 ? (
							score.improvements.map(s => (
								<p key={s} className="text-xs leading-5 text-muted-foreground">
									→ {s}
								</p>
							))
						) : (
							<p className="text-xs text-muted-foreground">
								This pack is already in strong shape.
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function ScoreUnavailableCard({
	onImproveScore,
}: {
	onImproveScore: () => void;
}) {
	return (
		<div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
			<div>
				<p className="text-sm font-medium">Not scored yet</p>
				<p className="text-xs text-muted-foreground">
					Improve once to generate a score.
				</p>
			</div>
			<Button size="sm" onClick={onImproveScore}>
				<Wand2 className="mr-1.5 size-3.5" />
				Score it
			</Button>
		</div>
	);
}

function SkillBadgesCard({
	enabledContextItems,
}: {
	enabledContextItems: ContextItem[];
}) {
	const activeSkills = getActiveContentSkills(enabledContextItems);
	if (activeSkills.length === 0) return null;
	return (
		<div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
			<p className="mb-2 text-xs font-medium text-muted-foreground">
				Active brand rules applied
			</p>
			<div className="flex flex-wrap gap-1.5">
				{activeSkills.map(s => (
					<Badge key={s.id} variant="outline" className="text-xs">
						✓ {s.title}
					</Badge>
				))}
			</div>
		</div>
	);
}
