import type {
	BusinessProfile,
	ContentPackChecklist,
	ContentPackStatus,
	JobContentInput,
	JobContentPack,
	SavedContentPack,
} from '@/types';

const STORAGE_KEY = 'localproof-saved-content-packs';

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

const emptyInput: JobContentInput = {
	jobTitle: '',
	jobLocation: '',
	customerProblem: '',
	workCompleted: '',
	finalResult: '',
	extraDetails: '',
};

const emptyPack: JobContentPack = {
	summary: '',
	assets: [],
	headlines: [],
	hashtags: [],
	weeklyPlan: [],
};

const emptyChecklist: ContentPackChecklist = {
	photoSelected: false,
	copyReviewed: false,
	ctaChecked: false,
	customerApproved: false,
	readyToPublish: false,
};

function canUseStorage() {
	try {
		return typeof window !== 'undefined' && Boolean(window.localStorage);
	} catch {
		return false;
	}
}

function createId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return 'pack-' + Date.now() + '-' + Math.random().toString(36).slice(2);
}

function dispatchSavedPacksUpdated() {
	if (!canUseStorage()) {
		return;
	}

	window.dispatchEvent(new Event('localproof-saved-content-packs-updated'));
}

function writeSavedPacks(savedPacks: SavedContentPack[]) {
	if (!canUseStorage()) {
		return;
	}

	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPacks));
	dispatchSavedPacksUpdated();
}

function normalizeStatus(status: unknown): ContentPackStatus {
	if (
		status === 'draft' ||
		status === 'ready' ||
		status === 'scheduled' ||
		status === 'published' ||
		status === 'archived'
	) {
		return status;
	}

	return 'draft';
}

function normalizeChecklist(
	checklist: Partial<ContentPackChecklist> | undefined,
): ContentPackChecklist {
	return {
		...emptyChecklist,
		...(checklist ?? {}),
	};
}

function normalizeSavedPack(pack: Partial<SavedContentPack>): SavedContentPack {
	const profile = pack.profile ?? emptyProfile;
	const input = pack.input ?? emptyInput;
	const contentPack = pack.pack ?? emptyPack;
	const now = new Date().toISOString();

	return {
		id: pack.id ?? createId(),
		createdAt: pack.createdAt ?? now,
		updatedAt: pack.updatedAt ?? pack.createdAt ?? now,
		title:
			pack.title ??
			input.jobTitle ??
			contentPack.headlines[0] ??
			'Untitled Content Pack',
		businessName: pack.businessName ?? profile.businessName ?? 'Local business',
		industry: pack.industry ?? profile.industry ?? 'Local service business',
		serviceArea:
			pack.serviceArea ?? profile.serviceArea ?? 'Local service area',
		jobTitle: pack.jobTitle ?? input.jobTitle ?? 'Local service job',
		jobLocation: pack.jobLocation ?? input.jobLocation ?? 'Local area',
		status: normalizeStatus(pack.status),
		scheduledFor: pack.scheduledFor ?? null,
		notes: pack.notes ?? '',
		checklist: normalizeChecklist(pack.checklist),
		profile,
		input,
		pack: contentPack,
	};
}

export function getSavedContentPacks(): SavedContentPack[] {
	if (!canUseStorage()) {
		return [];
	}

	const rawPacks = window.localStorage.getItem(STORAGE_KEY);

	if (!rawPacks) {
		return [];
	}

	try {
		const parsedPacks = JSON.parse(rawPacks);

		if (!Array.isArray(parsedPacks)) {
			return [];
		}

		return parsedPacks.map(pack =>
			normalizeSavedPack(pack as Partial<SavedContentPack>),
		);
	} catch {
		return [];
	}
}

export function saveContentPack({
	profile,
	input,
	pack,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	pack: JobContentPack;
}) {
	const savedPacks = getSavedContentPacks();
	const now = new Date().toISOString();

	const savedPack: SavedContentPack = {
		id: createId(),
		createdAt: now,
		updatedAt: now,
		title:
			input.jobTitle.trim() || pack.headlines[0] || 'Untitled Content Pack',
		businessName: profile.businessName || 'Local business',
		industry: profile.industry || 'Local service business',
		serviceArea: profile.serviceArea || 'Local service area',
		jobTitle: input.jobTitle || 'Local service job',
		jobLocation: input.jobLocation || 'Local area',
		status: 'draft',
		scheduledFor: null,
		notes: '',
		checklist: { ...emptyChecklist },
		profile,
		input,
		pack,
	};

	writeSavedPacks([savedPack, ...savedPacks]);

	return savedPack;
}

export function deleteSavedContentPack(id: string) {
	const savedPacks = getSavedContentPacks();
	const nextPacks = savedPacks.filter(pack => pack.id !== id);

	writeSavedPacks(nextPacks);

	return nextPacks;
}

export function updateSavedContentPackStatus(
	id: string,
	status: ContentPackStatus,
) {
	const savedPacks = getSavedContentPacks();

	const nextPacks = savedPacks.map(pack => {
		if (pack.id !== id) {
			return pack;
		}

		return {
			...pack,
			status,
			updatedAt: new Date().toISOString(),
		};
	});

	writeSavedPacks(nextPacks);

	return nextPacks;
}

export function updateSavedContentPackSchedule(
	id: string,
	scheduledFor: string | null,
) {
	const savedPacks = getSavedContentPacks();

	const nextPacks = savedPacks.map(pack => {
		if (pack.id !== id) {
			return pack;
		}

		const nextStatus: ContentPackStatus = scheduledFor
			? 'scheduled'
			: pack.status === 'scheduled'
				? 'ready'
				: pack.status;

		return {
			...pack,
			scheduledFor,
			status: nextStatus,
			updatedAt: new Date().toISOString(),
		};
	});

	writeSavedPacks(nextPacks);

	return nextPacks;
}

export function updateSavedContentPackNotes(id: string, notes: string) {
	const savedPacks = getSavedContentPacks();

	const nextPacks = savedPacks.map(pack => {
		if (pack.id !== id) {
			return pack;
		}

		return {
			...pack,
			notes,
			updatedAt: new Date().toISOString(),
		};
	});

	writeSavedPacks(nextPacks);

	return nextPacks;
}

export function updateSavedContentPackChecklist(
	id: string,
	checklistUpdates: Partial<ContentPackChecklist>,
) {
	const savedPacks = getSavedContentPacks();

	const nextPacks = savedPacks.map(pack => {
		if (pack.id !== id) {
			return pack;
		}

		return {
			...pack,
			checklist: normalizeChecklist({
				...pack.checklist,
				...checklistUpdates,
			}),
			updatedAt: new Date().toISOString(),
		};
	});

	writeSavedPacks(nextPacks);

	return nextPacks;
}
