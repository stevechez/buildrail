export const brand = {
	name: 'LocalProof',
	tagline: 'The AI content engine for businesses that do real work.',
	description:
		'Turn job photos, reviews, FAQs, and service notes into local content that builds trust and brings in more calls.',
	bg: '#050816',
	panel: '#0A1022',
	panelSoft: '#0F1730',
	border: 'rgba(120, 160, 255, 0.16)',

	lightBlue: '#5FB6FF',
	sapphire: '#5B74FF',
	cobalt: '#2954B8',
	deepBlue: '#1F0FAF',

	text: '#F5F7FB',
	textSoft: '#A9B4D0',
};

export const visualTheme = {
	gradientText:
		'bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300 bg-clip-text text-transparent',
	glowCard:
		'border-white/10 bg-white/[0.04] shadow-[0_0_80px_rgba(236,72,153,0.08)] backdrop-blur',
	softPanel: 'border-white/10 bg-white/[0.03] backdrop-blur',
};

export const navItems = [
	{
		label: 'Dashboard',
		href: '/dashboard',
	},
	{
		label: 'Generate',
		href: '/generate',
	},
	{
		label: 'Posts',
		href: '/posts',
	},
	{
		label: 'Calendar',
		href: '/calendar',
	},
	{
		label: 'Context',
		href: '/context',
	},
	{
		label: 'Examples',
		href: '/examples',
	},
	{
		label: 'Pricing',
		href: '/#pricing',
	},
	{
		label: 'Queue',
		href: '/queue',
	},
];

export const contentTypes = [
	'Google Business Profile posts',
	'Facebook posts',
	'Instagram captions',
	'LinkedIn posts',
	'Short video scripts',
	'Review-based posts',
	'FAQ content',
	'Email blurbs',
];

export const proofStats = [
	{
		value: '10+',
		label: 'content assets from one job',
	},
	{
		value: '5 min',
		label: 'from job note to content pack',
	},
	{
		value: '0',
		label: 'generic AI fluff required',
	},
];

export const pricingPlans = [
	{
		name: 'Starter',
		price: '$29',
		description: 'For one local business getting consistent.',
		features: [
			'100 generated posts/month',
			'Brand voice profile',
			'Job-to-content generator',
			'Saved posts',
			'Copy/export content',
		],
	},
	{
		name: 'Pro',
		price: '$79',
		description:
			'For serious local businesses building a weekly content habit.',
		features: [
			'500 generated posts/month',
			'30-day content calendar',
			'Review-to-post generator',
			'FAQ-to-content generator',
			'Photo content prompts',
			'Priority templates',
		],
		featured: true,
	},
	{
		name: 'Agency',
		price: '$199',
		description: 'For managing content across multiple local clients.',
		features: [
			'Multiple business profiles',
			'Client workspaces',
			'Reusable templates',
			'White-label export',
			'Higher usage limits',
		],
	},
];
