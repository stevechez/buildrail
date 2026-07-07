import type {
	BusinessProfile,
	ContentAsset,
	ContextItem,
	ContextItemType,
	JobContentInput,
	JobContentPack,
	WeeklyPlanItem,
} from '@/types';

type ContextBuckets = Record<ContextItemType, ContextItem[]>;

const contextTypes: ContextItemType[] = [
	'brand',
	'offer',
	'service',
	'customer',
	'review',
	'faq',
	'rule',
	'platform',
	'local',
];

function bucketContextItems(contextItems: ContextItem[]): ContextBuckets {
	return contextTypes.reduce((buckets, type) => {
		buckets[type] = contextItems.filter(
			item => item.enabled && item.type === type,
		);
		return buckets;
	}, {} as ContextBuckets);
}

function firstBody(items: ContextItem[]) {
	return items[0]?.body.trim() ?? '';
}

function firstTitle(items: ContextItem[]) {
	return items[0]?.title.trim() ?? '';
}

function getBusinessName(profile: BusinessProfile) {
	return profile.businessName || 'this local business';
}

function getIndustry(profile: BusinessProfile) {
	return profile.industry || 'local service';
}

function getServiceArea(profile: BusinessProfile) {
	return profile.serviceArea || 'the local area';
}

function getPreferredCta(profile: BusinessProfile) {
	return profile.preferredCta || 'Call today for local service.';
}

function getJobTitle(input: JobContentInput) {
	return input.jobTitle || 'recent local service call';
}

function getJobLocation(input: JobContentInput, profile: BusinessProfile) {
	return input.jobLocation || getServiceArea(profile);
}

function getCustomerProblem(input: JobContentInput) {
	return (
		input.customerProblem ||
		'the customer needed the issue handled quickly and professionally'
	);
}

function getWorkCompleted(input: JobContentInput) {
	return (
		input.workCompleted ||
		'the team inspected the issue, completed the needed work, and checked the result'
	);
}

function getFinalResult(input: JobContentInput) {
	return (
		input.finalResult ||
		'the customer had a safer, smoother, more reliable result before the team left'
	);
}

function buildOfferLine(buckets: ContextBuckets) {
	const offer = firstBody(buckets.offer);

	if (!offer) {
		return '';
	}

	return `Offer to mention when relevant: ${offer}`;
}

function buildReviewLine(buckets: ContextBuckets) {
	const review = firstBody(buckets.review);

	if (!review) {
		return '';
	}

	return `Trust proof to weave in: ${review}`;
}

function buildLocalLine(buckets: ContextBuckets) {
	const local = firstBody(buckets.local);

	if (!local) {
		return '';
	}

	return `Local context to include: ${local}`;
}

function buildServiceLine(buckets: ContextBuckets) {
	const service = firstBody(buckets.service);

	if (!service) {
		return '';
	}

	return `Service detail to reinforce: ${service}`;
}

function buildCustomerLine(buckets: ContextBuckets) {
	const customer = firstBody(buckets.customer);

	if (!customer) {
		return '';
	}

	return `Customer angle to keep in mind: ${customer}`;
}

function buildBrandLine(profile: BusinessProfile, buckets: ContextBuckets) {
	const brand = firstBody(buckets.brand);
	const tone = profile.brandTone;

	if (brand && tone) {
		return `Brand voice: ${brand} Keep the tone ${tone.toLowerCase()}.`;
	}

	if (brand) {
		return `Brand voice: ${brand}`;
	}

	if (tone) {
		return `Tone: ${tone}.`;
	}

	return '';
}

function getPlatformInstruction(platform: string, buckets: ContextBuckets) {
	const normalizedPlatform = platform.toLowerCase();

	const matchingItem = buckets.platform.find(item => {
		const title = item.title.toLowerCase();
		const body = item.body.toLowerCase();

		return (
			title.includes(normalizedPlatform) || body.includes(normalizedPlatform)
		);
	});

	return matchingItem?.body.trim() ?? firstBody(buckets.platform);
}

function getFaqContext(buckets: ContextBuckets) {
	const faqTitle = firstTitle(buckets.faq);
	const faqBody = firstBody(buckets.faq);

	if (!faqBody) {
		return '';
	}

	if (faqTitle) {
		return `${faqTitle}: ${faqBody}`;
	}

	return faqBody;
}

function buildContextNote(profile: BusinessProfile, buckets: ContextBuckets) {
	const notes = [
		buildBrandLine(profile, buckets),
		buildOfferLine(buckets),
		buildServiceLine(buckets),
		buildCustomerLine(buckets),
		buildReviewLine(buckets),
		buildLocalLine(buckets),
	].filter(Boolean);

	return notes.join('\n');
}

function extractForbiddenTerms(
	profile: BusinessProfile,
	buckets: ContextBuckets,
) {
	const sourceTexts = [
		profile.wordsToAvoid,
		...buckets.rule.map(item => item.body),
	].filter(Boolean);

	return sourceTexts
		.flatMap(text => {
			return text
				.replace(/words to avoid/gi, '')
				.replace(/avoid saying/gi, '')
				.replace(/avoid/gi, '')
				.replace(/do not say/gi, '')
				.replace(/do not use/gi, '')
				.split(/[,;\n]/g)
				.map(term =>
					term
						.trim()
						.replace(/^["'“”‘’]+|["'“”‘’.,]+$/g, '')
						.trim(),
				)
				.filter(term => term.length >= 3 && term.length <= 40);
		})
		.filter((term, index, terms) => {
			return (
				terms.findIndex(
					candidate => candidate.toLowerCase() === term.toLowerCase(),
				) === index
			);
		});
}

function escapeRegExp(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanText(text: string, forbiddenTerms: string[]) {
	return forbiddenTerms.reduce((currentText, term) => {
		const escapedTerm = escapeRegExp(term);
		const pattern = term.includes(' ')
			? new RegExp(escapedTerm, 'gi')
			: new RegExp(`\\b${escapedTerm}\\b`, 'gi');

		return currentText.replace(pattern, 'clear');
	}, text);
}

function cleanAsset(
	asset: ContentAsset,
	forbiddenTerms: string[],
): ContentAsset {
	return {
		...asset,
		body: cleanText(asset.body, forbiddenTerms),
		helperText: cleanText(asset.helperText, forbiddenTerms),
	};
}

function buildGoogleAsset({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): ContentAsset {
	const businessName = getBusinessName(profile);
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const problem = getCustomerProblem(input);
	const work = getWorkCompleted(input);
	const result = getFinalResult(input);
	const cta = getPreferredCta(profile);
	const platformInstruction = getPlatformInstruction('google', buckets);

	const body = [
		`${businessName} recently helped with a ${jobTitle} in ${location}.`,
		`The customer was dealing with ${problem}.`,
		`The work completed: ${work}.`,
		`The result: ${result}.`,
		firstBody(buckets.offer) ? `Helpful note: ${firstBody(buckets.offer)}` : '',
		firstBody(buckets.review)
			? `Customer trust note: ${firstBody(buckets.review)}`
			: '',
		cta,
	].filter(Boolean);

	return {
		title: 'Google Business Post',
		platform: 'Google',
		helperText:
			platformInstruction ||
			'Clear, local, service-specific post for Google Business Profile.',
		body: body.join('\n\n'),
	};
}

function buildFacebookAsset({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): ContentAsset {
	const businessName = getBusinessName(profile);
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const problem = getCustomerProblem(input);
	const result = getFinalResult(input);
	const cta = getPreferredCta(profile);

	const body = [
		`Real job, real result from ${businessName}.`,
		`A homeowner in ${location} needed help with a ${jobTitle}. The main issue was ${problem}.`,
		`After the work was completed, ${result}.`,
		firstBody(buckets.customer)
			? `This is exactly the kind of situation our customers care about: ${firstBody(buckets.customer)}`
			: '',
		firstBody(buckets.offer)
			? `Current service note: ${firstBody(buckets.offer)}`
			: '',
		cta,
	].filter(Boolean);

	return {
		title: 'Facebook Post',
		platform: 'Facebook',
		helperText:
			getPlatformInstruction('facebook', buckets) ||
			'Friendly local proof post for Facebook.',
		body: body.join('\n\n'),
	};
}

function buildInstagramAsset({
	profile,
	input,
	buckets,
	hashtags,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
	hashtags: string[];
}): ContentAsset {
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const result = getFinalResult(input);

	const body = [
		`Another local job completed in ${location}.`,
		`Service: ${jobTitle}.`,
		`Result: ${result}.`,
		firstBody(buckets.local) ? `Local note: ${firstBody(buckets.local)}` : '',
		firstBody(buckets.review)
			? `Proof point: ${firstBody(buckets.review)}`
			: '',
		getPreferredCta(profile),
		hashtags.join(' '),
	].filter(Boolean);

	return {
		title: 'Instagram Caption',
		platform: 'Instagram',
		helperText:
			getPlatformInstruction('instagram', buckets) ||
			'Short visual caption built around local proof.',
		body: body.join('\n\n'),
	};
}

function buildLinkedInAsset({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): ContentAsset {
	const businessName = getBusinessName(profile);
	const industry = getIndustry(profile);
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const work = getWorkCompleted(input);
	const result = getFinalResult(input);

	const body = [
		`A simple reminder for local ${industry} businesses: the work itself is often the best content.`,
		`${businessName} completed a ${jobTitle} in ${location}.`,
		`The job involved: ${work}.`,
		`The outcome was clear: ${result}.`,
		firstBody(buckets.service)
			? `Service insight: ${firstBody(buckets.service)}`
			: '',
		firstBody(buckets.brand) ? `Brand note: ${firstBody(buckets.brand)}` : '',
		`Local proof builds trust because it shows real problems being solved for real people.`,
	].filter(Boolean);

	return {
		title: 'LinkedIn Post',
		platform: 'LinkedIn',
		helperText:
			getPlatformInstruction('linkedin', buckets) ||
			'Professional trust-building post for LinkedIn.',
		body: body.join('\n\n'),
	};
}

function buildReelAsset({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): ContentAsset {
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const problem = getCustomerProblem(input);
	const work = getWorkCompleted(input);
	const result = getFinalResult(input);

	const body = [
		`Hook: "This ${jobTitle} could have turned into a much bigger problem."`,
		`Scene 1: Show the issue in ${location}.`,
		`Voiceover: "The customer was dealing with ${problem}."`,
		`Scene 2: Show the repair or work process.`,
		`Voiceover: "We handled the work: ${work}."`,
		`Scene 3: Show the finished result.`,
		`Voiceover: "By the end, ${result}."`,
		firstBody(buckets.offer)
			? `Optional overlay: "${firstBody(buckets.offer)}"`
			: '',
		`CTA: "${getPreferredCta(profile)}"`,
	].filter(Boolean);

	return {
		title: 'Short Reel Script',
		platform: 'Short Video',
		helperText:
			getPlatformInstruction('reel', buckets) ||
			'Simple short-form video script with hook, scenes, and CTA.',
		body: body.join('\n\n'),
	};
}

function buildFaqAsset({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): ContentAsset {
	const faqContext = getFaqContext(buckets);
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const work = getWorkCompleted(input);
	const result = getFinalResult(input);

	const body = faqContext
		? [
				`Question: ${firstTitle(buckets.faq) || `What should homeowners know about ${jobTitle}?`}`,
				`Answer: ${firstBody(buckets.faq)}`,
				`Local example: We recently handled a ${jobTitle} in ${location}. The work included ${work}, and the result was that ${result}.`,
			].join('\n\n')
		: [
				`Question: What should homeowners know about ${jobTitle}?`,
				`Answer: If you notice this issue, it is usually best to have it inspected before it becomes a bigger problem. On a recent job in ${location}, the work included ${work}. The result was that ${result}.`,
			].join('\n\n');

	return {
		title: 'FAQ Answer',
		platform: 'Website / Google',
		helperText: 'FAQ-style content that can support SEO and customer trust.',
		body,
	};
}

function buildEmailAsset({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): ContentAsset {
	const businessName = getBusinessName(profile);
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const result = getFinalResult(input);

	const body = [
		`Subject: A recent ${jobTitle} in ${location}`,
		`Hi there,`,
		`${businessName} recently completed a ${jobTitle} for a local customer in ${location}.`,
		`The result: ${result}.`,
		firstBody(buckets.customer)
			? `This matters because ${firstBody(buckets.customer)}`
			: '',
		firstBody(buckets.offer) ? `Service note: ${firstBody(buckets.offer)}` : '',
		getPreferredCta(profile),
	].filter(Boolean);

	return {
		title: 'Email Newsletter Blurb',
		platform: 'Email',
		helperText: 'Short newsletter-ready update based on one completed job.',
		body: body.join('\n\n'),
	};
}

function slugToHashtag(value: string) {
	const cleaned = value
		.replace(/[^a-zA-Z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter(Boolean)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');

	return cleaned ? `#${cleaned}` : '';
}

function buildHashtags(
	profile: BusinessProfile,
	input: JobContentInput,
): string[] {
	const city = getJobLocation(input, profile).split(',')[0] ?? '';
	const industry = getIndustry(profile);
	const service = getJobTitle(input);

	const hashtags = [
		slugToHashtag(city),
		slugToHashtag(industry),
		slugToHashtag(service),
		'#LocalBusiness',
		'#LocalService',
		'#HomeServices',
		'#CustomerTrust',
	].filter(Boolean);

	return [...new Set(hashtags)];
}

function buildHeadlines({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): string[] {
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const result = getFinalResult(input);
	const offerTitle = firstTitle(buckets.offer);

	return [
		`A ${jobTitle} in ${location} with a clear result`,
		`Real local proof from a completed ${jobTitle}`,
		`How one ${location} customer got the problem handled`,
		offerTitle
			? `${offerTitle}: shown through a real local job`
			: `From problem to finished result in ${location}`,
		`The kind of ${getIndustry(profile)} work that builds trust`,
		`Before, after, and the reason this job mattered`,
		`A local service story worth sharing`,
		`What this ${jobTitle} shows future customers`,
		`The result: ${result}`,
		`One real job. Multiple trust-building content angles.`,
	];
}

function buildWeeklyPlan({
	profile,
	input,
	buckets,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	buckets: ContextBuckets;
}): WeeklyPlanItem[] {
	const jobTitle = getJobTitle(input);
	const location = getJobLocation(input, profile);
	const offer = firstBody(buckets.offer);
	const review = firstBody(buckets.review);
	const faq = getFaqContext(buckets);

	return [
		{
			day: 'Monday',
			focus: 'Problem',
			post: `Explain the customer problem behind the ${jobTitle} in ${location}.`,
		},
		{
			day: 'Tuesday',
			focus: 'Process',
			post: `Show or describe the work completed and why it mattered.`,
		},
		{
			day: 'Wednesday',
			focus: 'Trust',
			post: review
				? `Use the review/trust note: ${review}`
				: `Share the final result and why customers can feel confident calling.`,
		},
		{
			day: 'Thursday',
			focus: 'Education',
			post: faq
				? `Turn this FAQ into a helpful educational post: ${faq}`
				: `Answer a common customer question connected to this service.`,
		},
		{
			day: 'Friday',
			focus: 'Offer',
			post: offer
				? `Connect the job to this offer: ${offer}`
				: `Close the week with a simple reminder to book local service.`,
		},
	];
}

export function generateContentPack(
	profile: BusinessProfile,
	input: JobContentInput,
	contextItems: ContextItem[] = [],
): JobContentPack {
	const buckets = bucketContextItems(contextItems);
	const forbiddenTerms = extractForbiddenTerms(profile, buckets);
	const hashtags = buildHashtags(profile, input);
	const contextNote = buildContextNote(profile, buckets);

	const summary = cleanText(
		[
			`${getBusinessName(profile)} completed a ${getJobTitle(input)} in ${getJobLocation(input, profile)}.`,
			`The customer problem was ${getCustomerProblem(input)}, and the final result was that ${getFinalResult(input)}.`,
			contextNote
				? `Enabled context was applied to shape the angle, offer, tone, and platform guidance.`
				: '',
		]
			.filter(Boolean)
			.join(' '),
		forbiddenTerms,
	);

	const assets: ContentAsset[] = [
		buildGoogleAsset({ profile, input, buckets }),
		buildFacebookAsset({ profile, input, buckets }),
		buildInstagramAsset({ profile, input, buckets, hashtags }),
		buildLinkedInAsset({ profile, input, buckets }),
		buildReelAsset({ profile, input, buckets }),
		buildFaqAsset({ profile, input, buckets }),
		buildEmailAsset({ profile, input, buckets }),
	].map(asset => cleanAsset(asset, forbiddenTerms));

	return {
		summary,
		assets,
		headlines: buildHeadlines({ profile, input, buckets }).map(headline =>
			cleanText(headline, forbiddenTerms),
		),
		hashtags,
		weeklyPlan: buildWeeklyPlan({ profile, input, buckets }).map(item => ({
			...item,
			post: cleanText(item.post, forbiddenTerms),
		})),
	};
}
