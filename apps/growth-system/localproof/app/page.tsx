import Link from 'next/link';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const personas = [
	{
		label: 'THE CONTRACTOR',
		quote: 'We do great work. Nobody knows about it.',
		detail:
			'Every finished job is proof that disappears. No time to write posts after a 10-hour day on the tools.',
	},
	{
		label: 'THE PLUMBER',
		quote: 'I tried posting but it sounds fake when I write it.',
		detail:
			"Generic AI content doesn't mention your town, your customer, or the actual problem you solved. It sounds like nobody.",
	},
	{
		label: 'THE ROOFER',
		quote: 'I started posting, then just… stopped.',
		detail:
			'Consistency breaks under daily pressure. Calls, crews, invoices, estimates. Content always loses.',
	},
	{
		label: 'THE HVAC TECH',
		quote: "I know I should be doing this. I just don't know how.",
		detail:
			"Nobody teaches local trades how to turn a service call into a Google post. There's no system.",
	},
];

const platforms = [
	{ label: 'Google Business', color: 'text-sky' },
	{ label: 'Facebook', color: 'text-blue-400' },
	{ label: 'Instagram', color: 'text-pink-400' },
	{ label: 'Short video script', color: 'text-green-400' },
	{ label: 'Email blurb', color: 'text-amber' },
];

const outputContent = [
	{
		platform: 'Google Business',
		tag: 'GOOGLE BUSINESS',
		color: 'text-sky',
		border: 'border-sky',
		bg: 'bg-sky',
		text: `Got a call from a homeowner in Aptos whose garage door was stuck halfway open. Broken spring. We went out, replaced it, balanced the door, and tested the opener. Had everything working before dinner. She said she didn't realize how long she'd been leaving for work with it like that.\n\nIf your door isn't moving right, don't leave it. We're local to Aptos and Santa Cruz County — one call and we come to you.`,
	},
	{
		platform: 'Facebook',
		tag: 'FACEBOOK',
		color: 'text-blue-400',
		border: 'border-blue-400',
		bg: 'bg-blue-400',
		text: `Same-day spring replacement in Aptos today 🔧\n\nHomeowner called this morning — garage door stuck halfway, couldn't get her car out. Broken torsion spring. We were there within 2 hours, replaced the spring, balanced the door, tested everything.\n\nDon't let a broken spring strand you in your own garage. We serve Aptos, Capitola, and all of Santa Cruz County. Call or message us anytime.`,
	},
	{
		platform: 'Instagram',
		tag: 'INSTAGRAM',
		color: 'text-pink-400',
		border: 'border-pink-400',
		bg: 'bg-pink-400',
		text: `Broken spring → working door, same day ✅\n\nAptos homeowner called us this morning with a garage door stuck halfway open. Broken torsion spring. We were there in under 2 hours.\n\nLocal. Fast. Done right.\n\n#GarageDoorRepair #Aptos #SantaCruz #SameDayService #LocalBusiness`,
	},
	{
		platform: 'Short video script',
		tag: 'VIDEO SCRIPT',
		color: 'text-green-400',
		border: 'border-green-400',
		bg: 'bg-green-400',
		text: `[HOOK] Your garage door is stuck and you can't get your car out. Here's what happened to a homeowner in Aptos this morning.\n\n[BODY] She called us at 8am. Broken torsion spring. We were there by 10, replaced the spring, balanced the door, tested the opener.\n\n[CTA] If this sounds familiar — we're local to Aptos and Santa Cruz County. One call and we'll come to you. Link in bio.`,
	},
];

const comparisonRows = [
	{
		label: 'Starting point',
		chatgpt: 'Blank prompt every time',
		lp: 'Describe a real job — done',
	},
	{
		label: 'Knows your business',
		chatgpt: 'You re-explain it every session',
		lp: 'Remembers your name, area, services, voice',
	},
	{
		label: 'Output',
		chatgpt: 'One block of generic text',
		lp: '10 platform-specific assets from one note',
	},
	{
		label: 'Local SEO',
		chatgpt: 'No idea where you work',
		lp: 'Every post names your city and neighborhood',
	},
	{
		label: 'Brand voice',
		chatgpt: 'Sounds like AI every time',
		lp: 'Matches your tone, CTA, and words to avoid',
	},
	{
		label: 'Consistency',
		chatgpt: 'Only if you remember to open it',
		lp: '5-day posting plan built into every pack',
	},
];

const faqs = [
	{
		q: 'What kinds of businesses can use LocalProof?',
		a: 'Any local service business that completes jobs — contractors, plumbers, HVAC techs, roofers, electricians, painters, landscapers, garage door companies, pressure washers, pest control, and more.',
	},
	{
		q: 'Does it sound like AI?',
		a: "No — that's the whole point. LocalProof uses your business name, your service area, your tone settings, and the specific job details you describe. The output sounds like you wrote it because it starts with what you actually did.",
	},
	{
		q: 'What platforms does it write for?',
		a: 'Google Business Profile, Facebook, Instagram, LinkedIn, short-form video scripts (Reels/TikTok), review response templates, and email blurbs. Every job note produces a full content pack.',
	},
	{
		q: 'How is this different from ChatGPT?',
		a: 'ChatGPT gives you a blank prompt every time and forgets your business the moment you close the tab. LocalProof knows your business, your voice, and your service area — and starts with a real job, not an empty box.',
	},
	{
		q: 'How long does it take?',
		a: 'Under 90 seconds from job note to full content pack. Most users describe a job in 3–5 sentences. The pack is ready before they finish their coffee.',
	},
];

export default function Home() {
	return (
		<div className="min-h-screen bg-ink">
			<NavBar />

			{/* ── HERO ── */}
			<section className="relative pt-32 pb-24 dot-grid overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-ink pointer-events-none" />
				<div className="relative max-w-6xl mx-auto px-5 sm:px-8">
					{/* Eyebrow */}
					<div className="flex justify-center mb-6">
						<div className="flex items-center gap-2 border border-wire bg-panel rounded-full px-4 py-1.5">
							<span className="w-1.5 h-1.5 bg-sky rounded-full"></span>
							<span className="text-xs text-mist">
								AI content engine for local service businesses
							</span>
						</div>
					</div>

					{/* Headline */}
					<h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold text-chalk leading-tight tracking-tight mb-3">
						One job note.
					</h1>
					<h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold text-sky leading-tight tracking-tight mb-7">
						A week of content.
					</h1>
					<p className="text-center text-lg text-mist leading-relaxed max-w-2xl mx-auto mb-9">
						Describe what you fixed today. LocalProof writes your Google post,
						Facebook update, Instagram caption, video script, and more — in your
						voice, for your area, ready to copy.
					</p>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
						<Link
							href="/examples"
							className="inline-flex items-center justify-center gap-2 bg-sky hover:bg-skylit text-ink font-semibold px-7 py-3.5 rounded-xl text-base"
						>
							See real examples
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</Link>
						<Link
							href="/start"
							className="inline-flex items-center justify-center gap-2 border border-wire hover:border-mist text-chalk font-semibold px-7 py-3.5 rounded-xl text-base"
						>
							Create free pack
						</Link>
					</div>

					{/* Micro-trust */}
					<div className="flex flex-wrap justify-center gap-6 text-sm text-mist mb-14">
						{[
							'No blank page',
							'No agency voice',
							'Specific to your job + location',
						].map(t => (
							<span key={t} className="flex items-center gap-1.5">
								<svg
									className="w-4 h-4 text-sky"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								{t}
							</span>
						))}
					</div>

					{/* Live demo mockup */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
						{/* Job note input */}
						<div className="bg-panel border border-rim rounded-2xl overflow-hidden">
							<div className="flex items-center gap-2 px-5 py-3 border-b border-rim">
								<svg
									className="w-4 h-4 text-sky"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
								<span className="text-xs font-mono text-mist uppercase tracking-wider">
									Job note
								</span>
							</div>
							<div className="p-5">
								<p className="text-sm text-chalk leading-relaxed mb-4">
									Got a call this morning from a homeowner in Aptos — garage
									door stuck halfway open. Broken spring. Went out, replaced it,
									balanced the door, tested the opener. Had it working before
									lunch. Customer was relieved, said she&apos;d been leaving for
									work with it open all week.
								</p>
								<div className="flex flex-wrap gap-2">
									{[
										'Garage Doors',
										'Aptos, CA',
										'Same-day',
										'Security issue',
									].map(tag => (
										<span
											key={tag}
											className="text-xs border border-wire text-mist px-2.5 py-1 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
							<div className="flex items-center justify-center gap-2 border-t border-rim px-5 py-3 bg-ink bg-opacity-40">
								<svg
									className="w-4 h-4 text-sky"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								<span className="text-xs text-mist">LocalProof generates</span>
							</div>
						</div>

						{/* Generated output */}
						<div className="bg-panel border border-rim rounded-2xl overflow-hidden">
							{/* Platform tabs */}
							<div className="flex overflow-x-auto border-b border-rim">
								{platforms.map((p, i) => (
									<div
										key={p.label}
										className={`flex-shrink-0 px-4 py-3 text-xs font-medium border-b-2 ${i === 0 ? `border-sky ${p.color}` : 'border-transparent text-mist'}`}
									>
										{p.label}
									</div>
								))}
							</div>
							{/* Output */}
							<div className="p-5">
								<div className="flex items-center justify-between mb-3">
									<span className="text-xs font-mono text-sky uppercase tracking-wider">
										Google Business
									</span>
									<button className="flex items-center gap-1.5 text-xs text-mist border border-wire px-2.5 py-1 rounded hover:border-mist hover:text-chalk">
										<svg
											className="w-3 h-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
										Copy
									</button>
								</div>
								<p className="text-sm text-chalk leading-relaxed">
									Got a call from a homeowner in Aptos whose garage door was
									stuck halfway open. Broken spring. She&apos;d been leaving for
									work with it open all week — not great for security. We went
									out, replaced the spring, balanced the door, tested the
									opener, and had everything working before lunch.
								</p>
								<p className="text-sm text-chalk leading-relaxed mt-3">
									If your door isn&apos;t moving right, don&apos;t leave it.
									We&apos;re local and we come to you. — Coastline Garage Doors
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── PROBLEM ── */}
			<section className="py-20 border-t border-rim">
				<div className="max-w-6xl mx-auto px-5 sm:px-8">
					<div className="text-center mb-12">
						<p className="text-xs text-mist uppercase tracking-widest mb-4">
							Sound familiar?
						</p>
						<h2 className="text-4xl sm:text-5xl font-bold text-chalk leading-tight mb-3">
							Local businesses do great work.
						</h2>
						<h2 className="text-4xl sm:text-5xl font-bold text-mist leading-tight mb-6">
							Nobody sees it.
						</h2>
						<p className="text-mist leading-relaxed max-w-xl mx-auto">
							The best content is already inside your business — inside every
							job completed, problem solved, and customer helped. It just never
							makes it online.
						</p>
					</div>

					{/* Persona cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
						{personas.map(p => (
							<div
								key={p.label}
								className="bg-panel border border-rim rounded-2xl p-5"
							>
								<p className="text-xs text-sky uppercase tracking-wider mb-3 font-mono">
									{p.label}
								</p>
								<div className="border-l-2 border-wire pl-3 mb-3">
									<p className="text-sm font-bold text-chalk leading-snug">
										{p.quote}
									</p>
								</div>
								<p className="text-xs text-mist leading-relaxed">{p.detail}</p>
							</div>
						))}
					</div>

					{/* The fix */}
					<div className="bg-panel border border-rim rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto">
						<p className="text-xs text-mist uppercase tracking-widest mb-4">
							The fix
						</p>
						<h3 className="text-2xl sm:text-3xl font-bold text-chalk mb-3">
							You don&apos;t need a marketing strategy.
						</h3>
						<h3 className="text-2xl sm:text-3xl font-bold text-chalk mb-5">
							You need a system that starts with the job.
						</h3>
						<p className="text-mist leading-relaxed max-w-xl mx-auto">
							Type what happened on a job today. LocalProof turns it into a
							Google post, Facebook update, Instagram caption, video script, and
							more — specific to your business, your location, and your voice.
						</p>
					</div>
				</div>
			</section>

			{/* ── CONTENT PACK DEMO ── */}
			<section className="py-20 border-t border-rim bg-panel">
				<div className="max-w-6xl mx-auto px-5 sm:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
						<div>
							<p className="text-xs text-mist uppercase tracking-widest mb-4 font-mono">
								Example content pack
							</p>
							<h2 className="text-4xl font-bold text-chalk leading-tight mb-4">
								One real job becomes a full week of local content.
							</h2>
							<p className="text-mist leading-relaxed mb-7">
								The user does not start with a blank prompt. They describe what
								happened on a real job. LocalProof turns that into
								platform-specific content that sounds local, useful, and
								believable.
							</p>
							<ul className="space-y-2">
								{[
									'Google Business Profile posts',
									'Facebook posts',
									'Instagram captions',
									'LinkedIn posts',
									'Short video scripts',
									'Review-based posts',
									'FAQ content',
									'Email blurbs',
								].map(item => (
									<li
										key={item}
										className="flex items-center gap-3 text-sm text-mist"
									>
										<svg
											className="w-4 h-4 text-sky flex-shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										{item}
									</li>
								))}
							</ul>
						</div>

						{/* Output cards */}
						<div className="space-y-3">
							{/* Input card */}
							<div className="bg-ink border border-rim rounded-xl overflow-hidden">
								<div className="flex items-center gap-2 px-4 py-2.5 border-b border-rim">
									<span className="text-xs font-mono text-mist uppercase tracking-wider">
										Input
									</span>
								</div>
								<div className="p-4 space-y-3">
									{[
										{ label: 'Business', val: 'Garage door repair company' },
										{
											label: 'Service area',
											val: 'Aptos, Santa Cruz, Capitola',
										},
										{
											label: 'Job note',
											val: 'Got a call from a homeowner in Aptos — garage door stuck halfway open. Broken spring. Went out, replaced it, balanced the door, tested the opener. Had it working before dinner.',
										},
									].map(row => (
										<div
											key={row.label}
											className="bg-panel border border-rim rounded-lg px-3 py-2.5"
										>
											<p className="text-xs font-semibold text-chalk mb-0.5">
												{row.label}
											</p>
											<p className="text-xs text-mist leading-relaxed">
												{row.val}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Generated output */}
							<div className="bg-chalk rounded-xl overflow-hidden">
								<div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200">
									<svg
										className="w-4 h-4 text-sky"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
									<span className="text-xs font-semibold text-navy">
										Generated Google Business Profile Post
									</span>
								</div>
								<div className="p-4">
									<p className="text-sm text-navy leading-relaxed">
										Got a call today from a homeowner in Aptos whose garage door
										was stuck halfway open. Broken spring. We went out, replaced
										it, balanced the door, and tested the opener. Had everything
										working before dinner. She said she didn&apos;t realize how
										long she&apos;d been leaving for work with it like that.
									</p>
									<p className="text-sm text-navy leading-relaxed mt-3">
										If your door isn&apos;t moving right, don&apos;t leave it.
										We&apos;re local to Aptos and Santa Cruz County — one call
										and we come to you.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── VS CHATGPT ── */}
			<section className="py-20 border-t border-rim">
				<div className="max-w-5xl mx-auto px-5 sm:px-8">
					<div className="text-center mb-10">
						<p className="text-xs text-mist uppercase tracking-widest mb-5 font-mono">
							Why not just use ChatGPT?
						</p>
						<h2 className="text-4xl sm:text-5xl font-bold text-chalk leading-tight mb-2">
							ChatGPT gives you content.
						</h2>
						<h2 className="text-4xl sm:text-5xl font-bold text-sky leading-tight mb-6">
							LocalProof gives you a system.
						</h2>
						<p className="text-mist leading-relaxed max-w-2xl mx-auto">
							You can paste a job note into ChatGPT. But you&apos;ll do it
							differently every time, get different results, and lose everything
							when the chat closes. LocalProof is built around how local
							businesses actually work.
						</p>
					</div>

					{/* Comparison table */}
					<div className="bg-panel border border-rim rounded-2xl overflow-hidden">
						<div className="grid grid-cols-3 border-b border-rim">
							<div className="px-5 py-3.5 text-xs text-mist uppercase tracking-widest font-mono">
								What you need
							</div>
							<div className="px-5 py-3.5 text-sm font-semibold text-mist border-l border-rim">
								ChatGPT
							</div>
							<div className="px-5 py-3.5 text-sm font-semibold text-sky border-l border-rim">
								LocalProof
							</div>
						</div>
						{comparisonRows.map(row => (
							<div
								key={row.label}
								className="grid grid-cols-3 border-b border-rim last:border-0"
							>
								<div className="px-5 py-4 text-sm font-medium text-chalk">
									{row.label}
								</div>
								<div className="px-5 py-4 border-l border-rim">
									<span className="flex items-start gap-2 text-sm text-mist">
										<svg
											className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
										{row.chatgpt}
									</span>
								</div>
								<div className="px-5 py-4 border-l border-rim">
									<span className="flex items-start gap-2 text-sm text-chalk">
										<svg
											className="w-4 h-4 text-sky flex-shrink-0 mt-0.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										{row.lp}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className="py-20 border-t border-rim bg-panel">
				<div className="max-w-3xl mx-auto px-5 sm:px-8">
					<div className="text-center mb-10">
						<p className="text-xs text-mist uppercase tracking-widest mb-4 font-mono">
							Questions
						</p>
						<h2 className="text-3xl font-bold text-chalk">Frequently asked.</h2>
					</div>
					<div className="space-y-3">
						{faqs.map(faq => (
							<div
								key={faq.q}
								className="bg-ink border border-rim rounded-xl p-5"
							>
								<p className="font-semibold text-chalk mb-2 text-sm">{faq.q}</p>
								<p className="text-sm text-mist leading-relaxed">{faq.a}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── FINAL CTA ── */}
			<section className="py-20 border-t border-rim">
				<div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
					<h2 className="text-4xl font-bold text-chalk mb-4 leading-tight">
						Your last job is your next post.
					</h2>
					<p className="text-mist mb-8 leading-relaxed">
						Describe one job — right now. LocalProof generates your Google post,
						Facebook update, Instagram caption, and more in under 90 seconds.
					</p>
					<Link
						href="/start"
						className="inline-flex items-center gap-2 bg-sky hover:bg-skylit text-ink font-bold px-8 py-4 rounded-xl text-base"
					>
						Create your first free pack
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
					<div className="flex justify-center flex-wrap gap-6 mt-5 text-sm text-mist">
						{['Free to start', 'No credit card', 'Ready in 90 seconds'].map(
							t => (
								<span key={t} className="flex items-center gap-1.5">
									<svg
										className="w-3.5 h-3.5 text-sky"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2.5}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									{t}
								</span>
							),
						)}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
