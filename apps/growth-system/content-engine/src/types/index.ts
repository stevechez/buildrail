export type BusinessProfile = {
	businessName: string;
	industry: string;
	serviceArea: string;
	mainServices: string;
	targetCustomer: string;
	brandTone: string;
	preferredCta: string;
	website: string;
	wordsToAvoid: string;
};

export type JobContentInput = {
	jobTitle: string;
	jobLocation: string;
	customerProblem: string;
	workCompleted: string;
	finalResult: string;
	extraDetails: string;
};

export type ContentAsset = {
	title: string;
	platform: string;
	helperText: string;
	body: string;
};

export type WeeklyPlanItem = {
	day: string;
	focus: string;
	post: string;
};

export type JobContentPack = {
	summary: string;
	assets: ContentAsset[];
	headlines: string[];
	hashtags: string[];
	weeklyPlan: WeeklyPlanItem[];
	score?: ContentPackScore;
};

export type SavedContentPack = {
	id: string;
	createdAt: string;
	title: string;
	businessName: string;
	industry: string;
	serviceArea: string;
	jobTitle: string;
	jobLocation: string;
	status: ContentPackStatus;
	scheduledFor: string | null;
	profile: BusinessProfile;
	input: JobContentInput;
	pack: JobContentPack;
	updatedAt: string;
	notes: string;
	checklist: ContentPackChecklist;
};

export type ContentScoreFactor = {
	label: string;
	score: number;
	maxScore: number;
	feedback: string;
};

export type ContentPackScore = {
	total: number;
	grade: 'Needs Work' | 'Good' | 'Strong' | 'Excellent';
	strengths: string[];
	improvements: string[];
	factors: ContentScoreFactor[];
};

export type ContentPackChecklist = {
	photoSelected: boolean;
	copyReviewed: boolean;
	ctaChecked: boolean;
	customerApproved: boolean;
	readyToPublish: boolean;
};

export type ContextItemType =
	| 'brand'
	| 'offer'
	| 'service'
	| 'customer'
	| 'review'
	| 'faq'
	| 'rule'
	| 'platform'
	| 'local';

export type ContextItem = {
	id: string;
	title: string;
	type: ContextItemType;
	body: string;
	enabled: boolean;
	createdAt: string;
	updatedAt: string;
};

export type ContentPackStatus =
	| 'draft'
	| 'ready'
	| 'scheduled'
	| 'published'
	| 'archived';
