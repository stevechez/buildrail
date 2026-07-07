import type {
	BusinessProfile,
	ContentPackScore,
	JobContentInput,
	JobContentPack,
} from '@/types';

function clampScore(score: number) {
	return Math.max(0, Math.min(score, 100));
}

function hasText(value: string | undefined) {
	return Boolean(value && value.trim().length > 0);
}

function includesLocalDetail(input: JobContentInput, profile: BusinessProfile) {
	const text = [
		input.jobLocation,
		input.extraDetails,
		profile.serviceArea,
	].join(' ');

	return text.trim().length > 8;
}

function includesProof(input: JobContentInput, pack: JobContentPack) {
	const text = [
		input.customerProblem,
		input.workCompleted,
		input.finalResult,
		input.extraDetails,
		pack.summary,
		...pack.assets.map(asset => asset.body),
	].join(' ');

	const proofWords = [
		'before',
		'after',
		'same-day',
		'same day',
		'replaced',
		'repaired',
		'installed',
		'checked',
		'tested',
		'customer',
		'homeowner',
		'result',
	];

	return proofWords.some(word => text.toLowerCase().includes(word));
}

function includesCta(profile: BusinessProfile, pack: JobContentPack) {
	const text = [
		profile.preferredCta,
		pack.summary,
		...pack.assets.map(asset => asset.body),
	].join(' ');

	const ctaWords = [
		'call',
		'book',
		'schedule',
		'message',
		'contact',
		'quote',
		'estimate',
		'visit',
	];

	return ctaWords.some(word => text.toLowerCase().includes(word));
}

function getGrade(total: number): ContentPackScore['grade'] {
	if (total >= 90) {
		return 'Excellent';
	}

	if (total >= 78) {
		return 'Strong';
	}

	if (total >= 62) {
		return 'Good';
	}

	return 'Needs Work';
}

export function scoreContentPack({
	profile,
	input,
	pack,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	pack: JobContentPack;
}): ContentPackScore {
	const specificityScore =
		hasText(input.customerProblem) &&
		hasText(input.workCompleted) &&
		hasText(input.finalResult)
			? 18
			: 10;

	const localTrustScore = includesLocalDetail(input, profile) ? 16 : 8;
	const proofScore = includesProof(input, pack) ? 18 : 9;
	const ctaScore = includesCta(profile, pack) ? 14 : 7;
	const platformFitScore = pack.assets.length >= 5 ? 14 : 8;
	const humanToneScore = pack.summary.length > 80 ? 12 : 7;
	const reuseScore = pack.weeklyPlan.length >= 5 ? 8 : 4;

	const total = clampScore(
		specificityScore +
			localTrustScore +
			proofScore +
			ctaScore +
			platformFitScore +
			humanToneScore +
			reuseScore,
	);

	const strengths: string[] = [];
	const improvements: string[] = [];

	if (specificityScore >= 18) {
		strengths.push(
			'The job details are specific enough to create believable local content.',
		);
	} else {
		improvements.push(
			'Add more detail about the customer problem, work completed, and final result.',
		);
	}

	if (localTrustScore >= 16) {
		strengths.push(
			'The pack includes local context, which helps it feel more trustworthy.',
		);
	} else {
		improvements.push(
			'Add a stronger local detail such as neighborhood, city, service area, or job context.',
		);
	}

	if (proofScore >= 18) {
		strengths.push('The content includes proof of real work completed.');
	} else {
		improvements.push(
			'Add a before/after detail, specific repair step, customer concern, or measurable result.',
		);
	}

	if (ctaScore >= 14) {
		strengths.push(
			'The call to action is clear enough for a local customer to respond.',
		);
	} else {
		improvements.push('Strengthen the call to action with a direct next step.');
	}

	if (platformFitScore >= 14) {
		strengths.push('The pack is reusable across multiple platforms.');
	} else {
		improvements.push(
			'Generate more platform-specific variations before saving.',
		);
	}

	return {
		total,
		grade: getGrade(total),
		strengths,
		improvements,
		factors: [
			{
				label: 'Specificity',
				score: specificityScore,
				maxScore: 18,
				feedback: 'Does the post sound like it came from one real job?',
			},
			{
				label: 'Local Trust',
				score: localTrustScore,
				maxScore: 16,
				feedback: 'Does it feel connected to a real local service area?',
			},
			{
				label: 'Proof',
				score: proofScore,
				maxScore: 18,
				feedback: 'Does it show evidence of real work completed?',
			},
			{
				label: 'CTA Strength',
				score: ctaScore,
				maxScore: 14,
				feedback: 'Is there a clear next step for the reader?',
			},
			{
				label: 'Platform Fit',
				score: platformFitScore,
				maxScore: 14,
				feedback: 'Can this content work across multiple platforms?',
			},
			{
				label: 'Human Tone',
				score: humanToneScore,
				maxScore: 12,
				feedback: 'Does it sound useful and human instead of generic?',
			},
			{
				label: 'Reuse Value',
				score: reuseScore,
				maxScore: 8,
				feedback: 'Can this job become multiple content pieces?',
			},
		],
	};
}
