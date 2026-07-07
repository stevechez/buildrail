import type {
	BusinessProfile,
	ContextItem,
	JobContentInput,
	JobContentPack,
} from '@/types';
import { scoreContentPackWithSkills } from '@/lib/skill-aware-score';
function cleanLine(value: string | undefined, fallback: string) {
	const cleaned = value?.trim();

	return cleaned && cleaned.length > 0 ? cleaned : fallback;
}

function buildLocalProofLine(profile: BusinessProfile, input: JobContentInput) {
	const location = cleanLine(
		input.jobLocation || profile.serviceArea,
		'your local area',
	);

	return `Local proof: This was real work completed for a customer in ${location}.`;
}

function buildProblemProofLine(input: JobContentInput) {
	const problem = cleanLine(
		input.customerProblem,
		'a customer needed help with a real service issue',
	);

	const workCompleted = cleanLine(
		input.workCompleted,
		'the work was completed carefully and checked before wrapping up',
	);

	const result = cleanLine(
		input.finalResult,
		'the customer had a safer, cleaner, better result',
	);

	return `The customer was dealing with ${problem}. We handled it by ${workCompleted}. The result: ${result}.`;
}

function buildCtaLine(profile: BusinessProfile) {
	const cta = cleanLine(
		profile.preferredCta,
		'message us to schedule service or ask for an estimate',
	);

	return `Need help with something similar? ${cta}.`;
}

function buildHumanToneLine(profile: BusinessProfile) {
	const tone = cleanLine(profile.brandTone, 'professional and helpful');

	return `Written in a ${tone} voice, with less hype and more useful detail.`;
}

function buildContextLine(contextItems: ContextItem[]) {
	const enabledContext = contextItems
		.map(item => item.body.trim())
		.filter(Boolean)
		.slice(0, 2);

	if (enabledContext.length === 0) {
		return null;
	}

	return `Brand context applied: ${enabledContext.join(' ')}`;
}

function improveAssetBody({
	body,
	profile,
	input,
	contextItems,
}: {
	body: string;
	profile: BusinessProfile;
	input: JobContentInput;
	contextItems: ContextItem[];
}) {
	const improvementLines = [
		buildLocalProofLine(profile, input),
		buildProblemProofLine(input),
		buildCtaLine(profile),
		buildContextLine(contextItems),
	].filter(Boolean);

	const existingBody = body.trim();

	return [existingBody, ...improvementLines].join('\n\n');
}

export function improveContentPackScore({
	pack,
	profile,
	input,
	contextItems,
}: {
	pack: JobContentPack;
	profile: BusinessProfile;
	input: JobContentInput;
	contextItems: ContextItem[];
}): JobContentPack {
	const improvedAssets = pack.assets.map(asset => ({
		...asset,
		body: improveAssetBody({
			body: asset.body,
			profile,
			input,
			contextItems,
		}),
	}));

	const improvedSummary = [
		pack.summary,
		buildLocalProofLine(profile, input),
		buildProblemProofLine(input),
		buildCtaLine(profile),
		buildHumanToneLine(profile),
	]
		.filter(Boolean)
		.join(' ');

	const improvedHeadlines = [
		...pack.headlines,
		`${cleanLine(input.jobLocation || profile.serviceArea, 'Local')} service proof from a real job`,
		`What this ${cleanLine(profile.industry, 'local business')} job shows about doing the work right`,
	].filter(
		(headline, index, headlines) => headlines.indexOf(headline) === index,
	);

	const improvedHashtags = [
		...pack.hashtags,
		'#LocalProof',
		'#RealWork',
		'#LocalBusiness',
	].filter((hashtag, index, hashtags) => hashtags.indexOf(hashtag) === index);

	const improvedPack: JobContentPack = {
		...pack,
		summary: improvedSummary,
		assets: improvedAssets,
		headlines: improvedHeadlines,
		hashtags: improvedHashtags,
	};

	return {
		...improvedPack,
		score: scoreContentPackWithSkills({
			profile,
			input,
			pack: improvedPack,
			contextItems,
		}),
	};
}
