import type {
	BusinessProfile,
	ContentAsset,
	ContextItem,
	JobContentInput,
	JobContentPack,
	WeeklyPlanItem,
} from '@/types';

export type ContentRemixAction =
	| 'more-local'
	| 'shorter'
	| 'more-professional'
	| 'stronger-cta'
	| 'carousel';

export const contentRemixActions: {
	id: ContentRemixAction;
	label: string;
	description: string;
}[] = [
	{
		id: 'more-local',
		label: 'Make More Local',
		description: 'Add stronger city, neighborhood, and local proof language.',
	},
	{
		id: 'shorter',
		label: 'Shorten',
		description: 'Tighten the copy for faster posting.',
	},
	{
		id: 'more-professional',
		label: 'More Professional',
		description: 'Make the tone more polished and trust-building.',
	},
	{
		id: 'stronger-cta',
		label: 'Strengthen CTA',
		description: 'Make the next step clearer.',
	},
	{
		id: 'carousel',
		label: 'Turn Into Carousel',
		description: 'Add a slide-by-slide carousel outline.',
	},
];

function getBusinessName(profile: BusinessProfile) {
	return profile.businessName || 'this local business';
}

function getLocation(profile: BusinessProfile, input: JobContentInput) {
	return input.jobLocation || profile.serviceArea || 'the local area';
}

function getJobTitle(input: JobContentInput) {
	return input.jobTitle || 'recent local service job';
}

function getCta(profile: BusinessProfile) {
	return profile.preferredCta || 'Call today for local service.';
}

function getOffer(contextItems: ContextItem[]) {
	return (
		contextItems.find(item => item.enabled && item.type === 'offer')?.body ?? ''
	);
}

function getReview(contextItems: ContextItem[]) {
	return (
		contextItems.find(item => item.enabled && item.type === 'review')?.body ??
		''
	);
}

function addLine(body: string, line: string) {
	if (!line.trim()) {
		return body;
	}

	if (body.toLowerCase().includes(line.toLowerCase())) {
		return body;
	}

	return `${body.trim()}\n\n${line.trim()}`;
}

function prependLine(body: string, line: string) {
	if (!line.trim()) {
		return body;
	}

	if (body.toLowerCase().includes(line.toLowerCase())) {
		return body;
	}

	return `${line.trim()}\n\n${body.trim()}`;
}

function shortenBody(body: string) {
	const paragraphs = body
		.split('\n\n')
		.map(paragraph => paragraph.trim())
		.filter(Boolean);

	return paragraphs.slice(0, 3).join('\n\n');
}

function polishBody(body: string) {
	return body
		.replace(/Real job, real result/gi, 'Recent local project update')
		.replace(/Another local job completed/gi, 'Another completed local project')
		.replace(
			/This is exactly the kind of situation/gi,
			'This is the type of situation',
		)
		.replace(/Call today/gi, 'Contact us today');
}

function remixAssets({
	assets,
	profile,
	input,
	contextItems,
	action,
}: {
	assets: ContentAsset[];
	profile: BusinessProfile;
	input: JobContentInput;
	contextItems: ContextItem[];
	action: ContentRemixAction;
}): ContentAsset[] {
	const location = getLocation(profile, input);
	const jobTitle = getJobTitle(input);
	const cta = getCta(profile);
	const offer = getOffer(contextItems);
	const review = getReview(contextItems);

	if (action === 'more-local') {
		return assets.map(asset => ({
			...asset,
			helperText: `${asset.helperText} Local proof angle strengthened.`,
			body: prependLine(
				asset.body,
				`Local proof angle: this was real work completed in ${location}.`,
			),
		}));
	}

	if (action === 'shorter') {
		return assets.map(asset => ({
			...asset,
			helperText: `${asset.helperText} Shortened for faster posting.`,
			body: shortenBody(asset.body),
		}));
	}

	if (action === 'more-professional') {
		return assets.map(asset => ({
			...asset,
			helperText: `${asset.helperText} Polished for a more professional tone.`,
			body: polishBody(asset.body),
		}));
	}

	if (action === 'stronger-cta') {
		return assets.map(asset => ({
			...asset,
			helperText: `${asset.helperText} CTA strengthened.`,
			body: addLine(asset.body, `Next step: ${cta}`),
		}));
	}

	if (action === 'carousel') {
		const carouselAsset: ContentAsset = {
			title: 'Instagram Carousel Outline',
			platform: 'Instagram Carousel',
			helperText:
				'Slide-by-slide carousel structure created from this content pack.',
			body: [
				`Slide 1: ${jobTitle} in ${location}`,
				`Slide 2: The customer problem`,
				input.customerProblem || 'Show the issue the customer needed solved.',
				`Slide 3: What was done`,
				input.workCompleted || 'Show the completed work and process.',
				`Slide 4: The result`,
				input.finalResult || 'Show the improved result after the job.',
				offer ? `Slide 5: Service note — ${offer}` : '',
				review ? `Slide 6: Trust proof — ${review}` : '',
				`Final slide: ${cta}`,
			]
				.filter(Boolean)
				.join('\n\n'),
		};

		const alreadyHasCarousel = assets.some(
			asset => asset.title === carouselAsset.title,
		);

		if (alreadyHasCarousel) {
			return assets;
		}

		return [carouselAsset, ...assets];
	}

	return assets;
}

function remixHeadlines({
	headlines,
	profile,
	input,
	action,
}: {
	headlines: string[];
	profile: BusinessProfile;
	input: JobContentInput;
	action: ContentRemixAction;
}) {
	const location = getLocation(profile, input);
	const jobTitle = getJobTitle(input);

	if (action === 'more-local') {
		return [`Local proof from a ${jobTitle} in ${location}`, ...headlines];
	}

	if (action === 'shorter') {
		return headlines.map(headline =>
			headline.length > 72 ? `${headline.slice(0, 69).trim()}...` : headline,
		);
	}

	if (action === 'more-professional') {
		return headlines.map(headline =>
			headline
				.replace(/worth sharing/gi, 'that builds customer trust')
				.replace(/problem/gi, 'service issue'),
		);
	}

	if (action === 'stronger-cta') {
		return [`Need help with ${jobTitle} in ${location}?`, ...headlines];
	}

	if (action === 'carousel') {
		return [`Carousel idea: ${jobTitle} in ${location}`, ...headlines];
	}

	return headlines;
}

function remixWeeklyPlan({
	weeklyPlan,
	profile,
	input,
	action,
}: {
	weeklyPlan: WeeklyPlanItem[];
	profile: BusinessProfile;
	input: JobContentInput;
	action: ContentRemixAction;
}) {
	const location = getLocation(profile, input);
	const cta = getCta(profile);

	if (action === 'more-local') {
		return weeklyPlan.map(item => ({
			...item,
			post: `${item.post} Mention ${location} clearly.`,
		}));
	}

	if (action === 'shorter') {
		return weeklyPlan.map(item => ({
			...item,
			post:
				item.post.length > 120
					? `${item.post.slice(0, 117).trim()}...`
					: item.post,
		}));
	}

	if (action === 'more-professional') {
		return weeklyPlan.map(item => ({
			...item,
			post: polishBody(item.post),
		}));
	}

	if (action === 'stronger-cta') {
		return weeklyPlan.map(item => ({
			...item,
			post: `${item.post} CTA: ${cta}`,
		}));
	}

	if (action === 'carousel') {
		return [
			{
				day: 'Carousel',
				focus: 'Slide Outline',
				post: 'Turn this job into a before/process/result/trust/CTA carousel.',
			},
			...weeklyPlan,
		];
	}

	return weeklyPlan;
}

export function remixContentPack({
	pack,
	profile,
	input,
	contextItems,
	action,
}: {
	pack: JobContentPack;
	profile: BusinessProfile;
	input: JobContentInput;
	contextItems: ContextItem[];
	action: ContentRemixAction;
}): JobContentPack {
	const businessName = getBusinessName(profile);
	const location = getLocation(profile, input);
	const cta = getCta(profile);

	const summaryAdditions: Record<ContentRemixAction, string> = {
		'more-local': `The local angle was strengthened around ${location}.`,
		shorter: 'This version was tightened for faster posting.',
		'more-professional': `This version uses a more polished trust-building tone for ${businessName}.`,
		'stronger-cta': `The call to action was strengthened: ${cta}`,
		carousel: 'A carousel outline was added for visual repurposing.',
	};

	return {
		...pack,
		summary: addLine(pack.summary, summaryAdditions[action]),
		assets: remixAssets({
			assets: pack.assets,
			profile,
			input,
			contextItems,
			action,
		}),
		headlines: remixHeadlines({
			headlines: pack.headlines,
			profile,
			input,
			action,
		}),
		weeklyPlan: remixWeeklyPlan({
			weeklyPlan: pack.weeklyPlan,
			profile,
			input,
			action,
		}),
	};
}
