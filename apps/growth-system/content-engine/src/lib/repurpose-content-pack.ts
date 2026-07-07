import type {
	ContextItem,
	JobContentInput,
	JobContentPack,
	SavedContentPack,
} from '@/types';
import { scoreContentPackWithSkills } from '@/lib/skill-aware-score';

export type RepurposeMode =
	| 'facebook-set'
	| 'google-updates'
	| 'instagram-carousel'
	| 'homeowner-tip'
	| 'short-video'
	| 'email-follow-up';

export type RepurposeModeConfig = {
	id: RepurposeMode;
	title: string;
	description: string;
	tag: string;
};

export const repurposeModes: RepurposeModeConfig[] = [
	{
		id: 'facebook-set',
		title: '3 Facebook Posts',
		description: 'Turn one job into three friendly neighborhood-style posts.',
		tag: 'Facebook',
	},
	{
		id: 'google-updates',
		title: '5 Google Updates',
		description: 'Create search-friendly Google Business Profile updates.',
		tag: 'Google',
	},
	{
		id: 'instagram-carousel',
		title: 'Instagram Carousel',
		description: 'Create a swipeable carousel script from the original job.',
		tag: 'Instagram',
	},
	{
		id: 'homeowner-tip',
		title: 'Homeowner Tip',
		description: 'Turn the job into an educational “what to watch for” post.',
		tag: 'Education',
	},
	{
		id: 'short-video',
		title: 'Short Video Script',
		description: 'Create a short vertical video script from the original job.',
		tag: 'Video',
	},
	{
		id: 'email-follow-up',
		title: 'Follow-Up Email',
		description: 'Create a useful email version that can be sent to customers.',
		tag: 'Email',
	},
];

function clean(value: string | undefined, fallback: string) {
	const cleanedValue = value?.trim();

	return cleanedValue && cleanedValue.length > 0 ? cleanedValue : fallback;
}

function getPrimaryBody(savedPack: SavedContentPack) {
	return (
		savedPack.pack.assets[0]?.body ??
		savedPack.pack.summary ??
		'This was a real local service job with a practical customer result.'
	);
}

function getBaseDetails(savedPack: SavedContentPack) {
	const input = savedPack.input;
	const profile = savedPack.profile;

	const service = clean(
		input.jobTitle || savedPack.jobTitle,
		'local service job',
	);
	const location = clean(
		input.jobLocation || savedPack.jobLocation || profile.serviceArea,
		'your local area',
	);
	const problem = clean(
		input.customerProblem,
		'a customer had a service issue that needed attention',
	);
	const work = clean(
		input.workCompleted,
		'the work was completed carefully and checked before wrapping up',
	);
	const result = clean(
		input.finalResult,
		'the customer had a safer, cleaner, better result',
	);
	const cta = clean(
		profile.preferredCta,
		'message us if you need help with something similar',
	);

	return {
		service,
		location,
		problem,
		work,
		result,
		cta,
		businessName: clean(profile.businessName, 'our local business'),
		industry: clean(profile.industry || savedPack.industry, 'local service'),
		serviceArea: clean(profile.serviceArea || savedPack.serviceArea, location),
		primaryBody: getPrimaryBody(savedPack),
	};
}

function buildFacebookSet(savedPack: SavedContentPack) {
	const details = getBaseDetails(savedPack);

	return [
		{
			platform: 'Facebook',
			title: 'Facebook Post 1 — Problem / Solution',
			helperText: 'A friendly local post that explains the problem and fix.',
			body: `A local customer in ${details.location} was dealing with ${details.problem}.

We handled it by ${details.work}.

The final result: ${details.result}.

If you are dealing with something similar, ${details.cta}.`,
		},
		{
			platform: 'Facebook',
			title: 'Facebook Post 2 — Behind the Work',
			helperText: 'A trust-building post that shows care and process.',
			body: `One thing we always pay attention to on a ${details.service}: the details that affect safety, reliability, and long-term results.

For this job in ${details.location}, the main issue was ${details.problem}.

After the work was completed, ${details.result}.

Good work is not always flashy. Sometimes it just means the problem is solved the right way.`,
		},
		{
			platform: 'Facebook',
			title: 'Facebook Post 3 — Local Reminder',
			helperText: 'A practical reminder post for neighborhood feeds.',
			body: `Quick reminder for homeowners around ${details.serviceArea}: small service issues can become bigger problems when they are ignored.

This customer called because ${details.problem}.

We completed the work, checked the result, and made sure ${details.result}.

Need help checking something similar? ${details.cta}.`,
		},
	];
}

function buildGoogleUpdates(savedPack: SavedContentPack) {
	const details = getBaseDetails(savedPack);

	return Array.from({ length: 5 }, (_, index) => {
		const angles = [
			{
				title: 'Google Update 1 — Service Completed',
				body: `${details.businessName} completed a ${details.service} in ${details.location}. The customer was dealing with ${details.problem}. The work included ${details.work}. The result was simple: ${details.result}.`,
			},
			{
				title: 'Google Update 2 — Local Service Proof',
				body: `Recent ${details.industry} work in ${details.location}: a customer needed help because ${details.problem}. We completed the necessary work, checked the result, and made sure ${details.result}.`,
			},
			{
				title: 'Google Update 3 — Problem Solved',
				body: `This ${details.service} started with a clear customer problem: ${details.problem}. After completing the work, ${details.result}. If you need help in ${details.serviceArea}, ${details.cta}.`,
			},
			{
				title: 'Google Update 4 — What We Fixed',
				body: `For this job, we handled: ${details.work}. The customer needed the issue resolved because ${details.problem}. Final result: ${details.result}.`,
			},
			{
				title: 'Google Update 5 — Call to Action',
				body: `Need ${details.industry} help near ${details.serviceArea}? This recent job is a good example of how we approach the work: understand the problem, complete the fix carefully, and confirm the final result. ${details.cta}.`,
			},
		];

		const angle = angles[index];

		return {
			platform: 'Google Business Profile',
			title: angle.title,
			helperText: 'A search-friendly local business update.',
			body: angle.body,
		};
	});
}

function buildInstagramCarousel(savedPack: SavedContentPack) {
	const details = getBaseDetails(savedPack);

	return [
		{
			platform: 'Instagram',
			title: 'Instagram Carousel Script',
			helperText: 'Use this as slide copy for a simple carousel.',
			body: `Slide 1: Before you ignore this problem...

Slide 2: This customer in ${details.location} was dealing with ${details.problem}.

Slide 3: What we checked:
${details.work}.

Slide 4: Why it mattered:
Small problems can affect safety, reliability, and daily use.

Slide 5: The result:
${details.result}.

Slide 6: Homeowner tip:
If something feels off, do not wait until it becomes a bigger issue.

Slide 7: Need help with this?
${details.cta}.`,
		},
	];
}

function buildHomeownerTip(savedPack: SavedContentPack) {
	const details = getBaseDetails(savedPack);

	return [
		{
			platform: 'Educational Post',
			title: 'Homeowner Tip Post',
			helperText: 'An educational post based on the original job.',
			body: `Homeowner tip: Pay attention when something stops working the way it normally does.

On a recent ${details.service} in ${details.location}, the customer noticed ${details.problem}.

That kind of issue is worth checking because it can affect safety, convenience, and long-term reliability.

What we did:
${details.work}.

The final result:
${details.result}.

Practical takeaway: small warning signs are easier to handle before they become urgent.

If you are seeing something similar, ${details.cta}.`,
		},
	];
}

function buildShortVideo(savedPack: SavedContentPack) {
	const details = getBaseDetails(savedPack);

	return [
		{
			platform: 'Short Video',
			title: '30-Second Short Video Script',
			helperText:
				'Use this for a Reel, Short, TikTok, or quick talking-head video.',
			body: `HOOK:
Here is a quick example of a small problem that needed to be fixed before it became a bigger one.

SCENE 1:
A customer in ${details.location} was dealing with ${details.problem}.

SCENE 2:
Here is what we did:
${details.work}.

SCENE 3:
The result:
${details.result}.

CLOSING:
If something like this is happening at your home or business, ${details.cta}.`,
		},
	];
}

function buildEmailFollowUp(savedPack: SavedContentPack) {
	const details = getBaseDetails(savedPack);

	return [
		{
			platform: 'Email',
			title: 'Customer Follow-Up Email',
			helperText: 'A useful email version of the original job story.',
			body: `Subject: A quick local service reminder

Hi,

We recently helped a customer in ${details.location} who was dealing with ${details.problem}.

The work included:
${details.work}.

The result:
${details.result}.

The reminder is simple: when something starts acting up, it is usually easier to deal with it early.

If you are dealing with something similar, ${details.cta}.

Thanks,
${details.businessName}`,
		},
	];
}

function buildAssets(savedPack: SavedContentPack, mode: RepurposeMode) {
	if (mode === 'facebook-set') {
		return buildFacebookSet(savedPack);
	}

	if (mode === 'google-updates') {
		return buildGoogleUpdates(savedPack);
	}

	if (mode === 'instagram-carousel') {
		return buildInstagramCarousel(savedPack);
	}

	if (mode === 'homeowner-tip') {
		return buildHomeownerTip(savedPack);
	}

	if (mode === 'short-video') {
		return buildShortVideo(savedPack);
	}

	return buildEmailFollowUp(savedPack);
}

function buildHeadlines(savedPack: SavedContentPack, mode: RepurposeMode) {
	const details = getBaseDetails(savedPack);
	const modeTitle =
		repurposeModes.find(repurposeMode => repurposeMode.id === mode)?.title ??
		'Repurposed Content';

	return [
		`${modeTitle}: ${details.service} in ${details.location}`,
		`What this ${details.service} can teach local customers`,
		`A real ${details.industry} job turned into useful content`,
		`Before, after, and what changed for this customer`,
		`Local proof from a completed job in ${details.location}`,
	];
}

function buildHashtags(savedPack: SavedContentPack, mode: RepurposeMode) {
	const details = getBaseDetails(savedPack);
	const locationTag = details.location.replace(/[^a-zA-Z0-9]/g, '').trim();

	const modeTags: Record<RepurposeMode, string[]> = {
		'facebook-set': ['#LocalBusiness', '#CommunityPost'],
		'google-updates': ['#GoogleBusinessProfile', '#LocalService'],
		'instagram-carousel': ['#CarouselPost', '#BeforeAndAfter'],
		'homeowner-tip': ['#HomeownerTips', '#MaintenanceTips'],
		'short-video': ['#ShortVideo', '#LocalBusinessMarketing'],
		'email-follow-up': ['#CustomerFollowUp', '#ServiceReminder'],
	};

	return [
		'#LocalProof',
		'#RealWork',
		'#SmallBusiness',
		locationTag ? `#${locationTag}` : '#LocalService',
		...modeTags[mode],
	].filter((tag, index, tags) => tags.indexOf(tag) === index);
}

function buildWeeklyPlan(savedPack: SavedContentPack, mode: RepurposeMode) {
	const details = getBaseDetails(savedPack);
	const modeTitle =
		repurposeModes.find(repurposeMode => repurposeMode.id === mode)?.title ??
		'Repurposed Content';

	return [
		{
			day: 'Day 1',
			focus: 'Original proof',
			post: `Share the original job story: ${details.service} in ${details.location}.`,
		},
		{
			day: 'Day 2',
			focus: 'Customer problem',
			post: `Explain the problem customers should watch for: ${details.problem}.`,
		},
		{
			day: 'Day 3',
			focus: 'Process',
			post: `Show what was done and why it mattered: ${details.work}.`,
		},
		{
			day: 'Day 4',
			focus: 'Result',
			post: `Highlight the final outcome: ${details.result}.`,
		},
		{
			day: 'Day 5',
			focus: modeTitle,
			post: `Publish the repurposed angle and invite people to reach out: ${details.cta}.`,
		},
	];
}

export function buildRepurposeInput(
	savedPack: SavedContentPack,
	mode: RepurposeMode,
): JobContentInput {
	const modeTitle =
		repurposeModes.find(repurposeMode => repurposeMode.id === mode)?.title ??
		'Repurposed Content';

	return {
		...savedPack.input,
		jobTitle: `${savedPack.input.jobTitle || savedPack.jobTitle} — ${modeTitle}`,
		extraDetails: [
			savedPack.input.extraDetails,
			`Repurposed from saved content pack: ${savedPack.title}.`,
		]
			.filter(Boolean)
			.join(' '),
	};
}

export function repurposeContentPack({
	savedPack,
	mode,
	contextItems,
}: {
	savedPack: SavedContentPack;
	mode: RepurposeMode;
	contextItems: ContextItem[];
}): JobContentPack {
	const details = getBaseDetails(savedPack);
	const modeTitle =
		repurposeModes.find(repurposeMode => repurposeMode.id === mode)?.title ??
		'Repurposed Content';

	const repurposeInput = buildRepurposeInput(savedPack, mode);

	const pack: JobContentPack = {
		summary: `${modeTitle} created from "${savedPack.title}". This repurposes the original ${details.service} job in ${details.location} into fresh content angles without inventing a new job.`,
		assets: buildAssets(savedPack, mode),
		headlines: buildHeadlines(savedPack, mode),
		hashtags: buildHashtags(savedPack, mode),
		weeklyPlan: buildWeeklyPlan(savedPack, mode),
	};

	return {
		...pack,
		score: scoreContentPackWithSkills({
			profile: savedPack.profile,
			input: repurposeInput,
			pack,
			contextItems,
		}),
	};
}
