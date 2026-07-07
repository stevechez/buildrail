import type { ContextItem } from '@/types';

export type ContextSkillPreset = {
	id: string;
	title: string;
	description: string;
	tag: string;
	type: ContextItem['type'];
	body: string;
};

export const contextSkillPresets: ContextSkillPreset[] = [
	{
		id: 'local-trust-builder',
		title: 'Local Trust Builder',
		description:
			'Adds neighborhood credibility, real-work proof, and local service language.',
		tag: 'Trust',
		type: 'brand' as ContextItem['type'],
		body: `When creating content, make it feel local and real. Mention the service area when useful. Emphasize that this is real work completed for a real customer. Avoid generic marketing claims. Focus on trust, reliability, workmanship, safety, and the fact that local customers want someone who shows up and solves the problem.`,
	},
	{
		id: 'before-after-storyteller',
		title: 'Before / After Storyteller',
		description:
			'Turns a completed job into a clear problem-solution-result story.',
		tag: 'Story',
		type: 'brand' as ContextItem['type'],
		body: `Frame each job as a simple story: what was wrong before, what work was done, and what changed after. Keep the writing clear and human. Do not exaggerate. Make the customer problem easy to understand. End with the practical result the customer received.`,
	},
	{
		id: 'no-hype-professional-voice',
		title: 'No-Hype Professional Voice',
		description: 'Keeps content calm, credible, useful, and not overly salesy.',
		tag: 'Voice',
		type: 'brand' as ContextItem['type'],
		body: `Write in a calm, professional, helpful voice. Avoid hype, clickbait, fake urgency, and overused marketing phrases. Use short sentences. Sound like a real local business owner explaining the work honestly. Build confidence through details, not exaggeration.`,
	},
	{
		id: 'facebook-neighborhood-post',
		title: 'Facebook Neighborhood Post',
		description:
			'Creates friendly posts that feel natural in local community feeds.',
		tag: 'Facebook',
		type: 'platform' as ContextItem['type'],
		body: `For Facebook posts, write like a friendly local business sharing useful work with the community. Keep it conversational. Mention the local area when relevant. Make the post easy to skim. Include a soft call to action at the end, such as asking readers to message the business if they need help with something similar.`,
	},
	{
		id: 'google-business-profile-optimizer',
		title: 'Google Business Profile Optimizer',
		description:
			'Improves posts for Google visibility, services, location, and trust.',
		tag: 'Google',
		type: 'platform' as ContextItem['type'],
		body: `For Google Business Profile content, include the service performed, location or service area when available, the customer problem, and the result. Keep it clear and search-friendly without keyword stuffing. Make the business sound reliable, local, and easy to contact.`,
	},
	{
		id: 'instagram-carousel-builder',
		title: 'Instagram Carousel Builder',
		description: 'Helps turn one job into a simple swipeable carousel idea.',
		tag: 'Instagram',
		type: 'platform' as ContextItem['type'],
		body: `When creating Instagram content, include a carousel angle when useful. Structure it as: hook, problem, what we found, what we fixed, final result, lesson, call to action. Keep each slide short and visual. Make the content educational enough that someone would save or share it.`,
	},
	{
		id: 'review-harvester',
		title: 'Review Harvester',
		description: 'Adds natural review-request language after successful jobs.',
		tag: 'Reviews',
		type: 'offer' as ContextItem['type'],
		body: `When the job result is positive, include a soft review request idea. Do not sound pushy. Make it easy for the customer to understand that reviews help local businesses. Use simple language like: If the work helped, a quick review means a lot to a local business like ours.`,
	},
	{
		id: 'offer-cta-writer',
		title: 'Offer CTA Writer',
		description:
			'Strengthens calls to action without sounding desperate or spammy.',
		tag: 'CTA',
		type: 'offer' as ContextItem['type'],
		body: `Every piece of content should end with a clear but natural next step. Avoid hard-selling. Use practical calls to action like: Message us if you are dealing with this, ask for an estimate, schedule service, or send a photo of the issue and we can point you in the right direction.`,
	},
];
