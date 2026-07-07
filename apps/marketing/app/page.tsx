import Link from 'next/link';
import NavBar from './components/NavBar';

const BoltIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
	<svg className={className} fill="currentColor" viewBox="0 0 24 24">
		<path d="M13 2L4.09 12.97A1 1 0 005 14.5h6.5L10 22l9.91-10.97A1 1 0 0019 10h-6.5L13 2z" />
	</svg>
);
const CheckIcon = () => (
	<svg
		className="w-3.5 h-3.5 flex-shrink-0"
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
);

const lifecycle = [
	{
		stage: '01',
		phase: 'Get found',
		color: 'text-orange',
		bg: 'bg-orange',
		border: 'border-orange',
		title: 'Fill the pipeline.',
		sub: 'Before a contractor can win a job, someone has to call. Missed calls, weak websites, and zero follow-up are the silent revenue killers.',
		products: [
			{
				name: 'BuildRail Growth System',
				tag: '$99–$699/mo',
				url: 'https://growth.buildrailhq.com',
				desc: 'Missed call recovery, AI lead capture, contractor websites, and a lead tracking dashboard.',
			},
			{
				name: 'BuildRail Sites',
				tag: '$2,499 one-time',
				url: 'https://sites.buildrailhq.com',
				desc: 'A premium, conversion-optimized contractor website built and delivered in 48 hours.',
			},
		],
	},
	{
		stage: '02',
		phase: 'Win the estimate',
		color: 'text-purple',
		bg: 'bg-purple',
		border: 'border-purple',
		title: 'Turn the walkthrough into the proposal.',
		sub: 'Every contractor rewrites proposals from memory at night. Field Intelligence captures the walkthrough and turns it into documents automatically.',
		products: [
			{
				name: 'Field Intelligence',
				tag: 'Private beta',
				url: 'https://fieldintel.buildrailhq.com',
				desc: 'Voice notes, photos, and emails from the job site become project memory, proposal drafts, and reusable scope language.',
			},
		],
	},
	{
		stage: '03',
		phase: 'Run the job',
		color: 'text-amber',
		bg: 'bg-amber',
		border: 'border-amber',
		title: 'Operate like a high-performance firm.',
		sub: 'Missed change orders, slow payments, and constant client check-ins erode margin. Vault centralizes everything — proposals, approvals, payments, field docs.',
		products: [
			{
				name: 'BuildRail Vault',
				tag: '$299–$699/mo',
				url: 'https://vault.buildrailhq.com',
				desc: 'Premium proposals, client portal, change orders, milestone payments via SMS, and field documentation.',
			},
		],
	},
	{
		stage: '04',
		phase: 'Hire right',
		color: 'text-blue',
		bg: 'bg-blue',
		border: 'border-blue',
		title: 'Know who can actually do the work.',
		sub: "A 2-minute video assessment tells you more about a sub's field judgment than any interview. See how they think before they show up.",
		products: [
			{
				name: 'SiteVerdict',
				tag: 'Pilot',
				url: 'https://siteverdict.com',
				desc: 'Video-based trade assessments, AI transcripts, and review-ready verdicts for subcontractor vetting.',
			},
		],
	},
	{
		stage: '05',
		phase: 'Stay visible',
		color: 'text-teal',
		bg: 'bg-teal',
		border: 'border-teal',
		title: "Every job is next week's content.",
		sub: 'The best content is already inside your business — inside every job completed, problem solved, and customer helped. It just never makes it online.',
		products: [
			{
				name: 'LocalProof',
				tag: 'Free–$79/mo',
				url: 'https://localproof.buildrail.com',
				desc: 'One job note becomes a Google post, Facebook update, Instagram caption, video script, and more in 90 seconds.',
			},
		],
	},
];

const products = [
	{
		name: 'BuildRail Growth System',
		domain: 'buildrail.com',
		tag: 'Lead generation',
		tagColor: 'text-orange border-orange',
		price: '$99–$699/mo',
		stage: 'Stage 01',
		desc: 'The entry point. Missed call recovery, contractor websites, and AI lead capture for trades doing $250K+.',
		features: [
			'Missed call text-back in 60 seconds',
			'High-converting contractor website',
			'AI lead capture & 24/7 receptionist',
			'Lead tracking dashboard',
			'Google reviews automation',
		],
		url: 'https://growth.buildrailhq.com',
		accent: 'orange',
	},
	{
		name: 'Field Intelligence',
		domain: 'fieldintel.buildrail.com',
		tag: 'Field operations',
		tagColor: 'text-purple border-purple',
		price: 'Private beta',
		stage: 'Stage 02',
		desc: 'The project brain. Voice notes and photos from the job site become proposals, scope blocks, and crew briefings automatically.',
		features: [
			'Voice + photo capture on-site',
			'Project memory — risks, decisions, conditions',
			'Proposal drafts from walkthrough',
			'Crew briefings and homeowner updates',
			'ScopeLock scope language library',
		],
		url: 'https://fieldintel.buildrailhq.com',
		accent: 'purple',
	},
	{
		name: 'BuildRail Vault',
		domain: 'vault.buildrail.com',
		tag: 'Project operations',
		tagColor: 'text-amber border-amber',
		price: '$299–$699/mo',
		stage: 'Stage 03',
		desc: 'The operating system for premium firms. Proposals, approvals, payments, and field docs — all in one place.',
		features: [
			'BidForge: multi-tier proposals',
			'Comm Vault: homeowner client portal',
			'ScopeLock: change orders with sign-off',
			'PayRail: milestone payments via SMS',
			'CrewLens: field photo documentation',
		],
		url: 'https://vault.buildrail.com',
		accent: 'amber',
	},
	{
		name: 'SiteVerdict',
		domain: 'siteverdict.com',
		tag: 'Subcontractor vetting',
		tagColor: 'text-blue border-blue',
		price: 'Pilot',
		stage: 'Stage 04',
		desc: 'Know who can do the work before they show up. Video-based trade assessments with AI transcripts and verdicts.',
		features: [
			'Trade-specific assessment prompts',
			'Candidate video walkthrough',
			'AI transcript of every response',
			'Verdict summary — strengths and gaps',
			'Review-ready report in dashboard',
		],
		url: 'https://siteverdict.online',
		accent: 'blue',
	},
	{
		name: 'LocalProof',
		domain: 'localproof.buildrailhq.com',
		tag: 'Content engine',
		tagColor: 'text-teal border-teal',
		price: 'Free–$79/mo',
		stage: 'Stage 05',
		desc: 'One job note → a full week of local content. Google posts, Instagram captions, video scripts, and more in 90 seconds.',
		features: [
			'Google Business Profile posts',
			'Facebook and Instagram captions',
			'Short-form video scripts',
			'Review request templates',
			'5-day posting schedule per pack',
		],
		url: 'https://localproof.buildrailhq.com',
		accent: 'teal',
	},
	{
		name: 'BuildRail Sites',
		domain: 'sites.buildrail.com',
		tag: 'Done-for-you websites',
		tagColor: 'text-orange border-orange',
		price: '$2,499 one-time',
		stage: 'Stage 01',
		desc: 'You send photos. We build everything. A premium contractor website live in 48 hours — mobile-first, SEO-ready, conversion-focused.',
		features: [
			'5-page custom contractor website',
			'Mobile-first, under 2s load time',
			'Local SEO from day one',
			'Click-to-call and estimate forms',
			'1 year hosting — you own the site',
		],
		url: 'https://sites.buildrailhq.com',
		accent: 'orange',
	},
];

const accentClasses: Record<
	string,
	{ border: string; bg: string; text: string; dot: string }
> = {
	orange: {
		border: 'border-orange',
		bg: 'bg-orange',
		text: 'text-orange',
		dot: 'bg-orange',
	},
	purple: {
		border: 'border-purple',
		bg: 'bg-purple',
		text: 'text-purple',
		dot: 'bg-purple',
	},
	amber: {
		border: 'border-amber',
		bg: 'bg-amber',
		text: 'text-amber',
		dot: 'bg-amber',
	},
	blue: {
		border: 'border-blue',
		bg: 'bg-blue',
		text: 'text-blue',
		dot: 'bg-blue',
	},
	teal: {
		border: 'border-teal',
		bg: 'bg-teal',
		text: 'text-teal',
		dot: 'bg-teal',
	},
};

export default function Home() {
	return (
		<div className="min-h-screen bg-void">
			<NavBar />

			{/* ── HERO ── */}
			<section className="relative min-h-screen flex items-center pt-14 overflow-hidden noise">
				{/* Radial glow behind headline */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(249,115,22,0.10) 0%, transparent 70%)',
					}}
				/>
				{/* Grid */}
				<div
					className="absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage:
							'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
						backgroundSize: '80px 80px',
					}}
				/>

				<div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24">
					<div className="max-w-4xl mx-auto text-center">
						{/* Eyebrow */}
						<div className="inline-flex items-center gap-2 border border-rim bg-panel rounded-full px-4 py-2 mb-8">
							<span className="live-dot w-2 h-2 bg-green rounded-full"></span>
							<span className="text-xs font-mono text-fog tracking-widest uppercase">
								6 Products · 1 Ecosystem · Built for contractors
							</span>
						</div>

						{/* Headline */}
						<h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-chalk leading-[0.95] tracking-tight mb-6">
							The operating
							<br />
							system for
							<br />
							<span className="text-gradient">contractor businesses.</span>
						</h1>

						<p className="text-lg sm:text-xl text-fog leading-relaxed max-w-2xl mx-auto mb-10">
							Six products built to serve contractors from the first missed call
							to the last coat of paint — and every critical stage in between.
							One ecosystem. One audience. Built to compound.
						</p>

						{/* Stat row */}
						<div className="flex flex-wrap justify-center gap-8 mb-10 text-sm">
							{[
								{ n: '6', l: 'Products built' },
								{ n: '$250K–$5M', l: 'Target revenue range' },
								{ n: '7+', l: 'Contractor trades' },
								{ n: '$800–$1,200', l: 'Full ecosystem MRR' },
							].map(s => (
								<div key={s.n} className="text-center">
									<div className="text-2xl font-black text-orange mb-0.5">
										{s.n}
									</div>
									<div className="text-xs text-fog uppercase tracking-wider font-mono">
										{s.l}
									</div>
								</div>
							))}
						</div>

						{/* CTA row */}
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<a
								href="#lifecycle"
								className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-oranglit text-void font-black px-7 py-4 rounded-xl text-base"
							>
								See the full ecosystem ↓
							</a>
							<a
								href="#products"
								className="inline-flex items-center justify-center gap-2 border border-rim hover:border-wire text-fog hover:text-chalk px-7 py-4 rounded-xl text-base font-semibold"
							>
								Jump to all products →
							</a>
						</div>
					</div>

					{/* Product logos strip */}
					<div className="mt-16 flex flex-wrap justify-center gap-3">
						{[
							{
								name: 'Growth System',
								color: 'text-orange',
								bg: 'border-orange',
							},
							{
								name: 'Field Intelligence',
								color: 'text-purple',
								bg: 'border-purple',
							},
							{ name: 'Vault', color: 'text-amber', bg: 'border-amber' },
							{ name: 'SiteVerdict', color: 'text-blue', bg: 'border-blue' },
							{ name: 'LocalProof', color: 'text-teal', bg: 'border-teal' },
							{ name: 'Sites', color: 'text-orange', bg: 'border-orange' },
						].map(p => (
							<div
								key={p.name}
								className={`border ${p.bg} border-opacity-30 rounded-full px-4 py-1.5`}
							>
								<span className={`text-xs font-mono font-bold ${p.color}`}>
									BuildRail {p.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── THE CONTRACTOR LIFECYCLE ── */}
			<section id="lifecycle" className="py-24 border-t border-rim">
				<div className="max-w-7xl mx-auto px-5 sm:px-8">
					<div className="max-w-2xl mb-16">
						<p className="text-xs font-mono text-orange uppercase tracking-widest mb-4">
							The lifecycle
						</p>
						<h2 className="text-4xl sm:text-5xl font-black text-chalk mb-4 leading-tight">
							A contractor&apos;s business
							<br />
							has five critical stages.
						</h2>
						<p className="text-fog leading-relaxed text-lg">
							BuildRail has a product for every one. Each product solves a
							specific stage — and makes the next stage more valuable.
						</p>
					</div>

					<div className="relative">
						{/* Vertical gradient line */}
						<div className="absolute left-[19px] top-6 bottom-6 w-0.5 stage-line opacity-30 hidden sm:block" />

						<div className="space-y-6">
							{lifecycle.map((s, idx) => (
								<div key={s.stage} className="sm:pl-12 relative">
									{/* Stage dot */}
									<div
										className={`hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full ${s.bg} bg-opacity-20 border ${s.border} border-opacity-40 items-center justify-center flex-shrink-0`}
									>
										<span className={`text-xs font-mono font-bold ${s.color}`}>
											{s.stage}
										</span>
									</div>

									<div
										className={`border border-rim hover:${s.border} hover:border-opacity-40 rounded-2xl p-6 sm:p-8 bg-panel transition-colors group`}
									>
										<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
											<div>
												<div className="flex items-center gap-3 mb-4">
													<span
														className={`sm:hidden text-xs font-mono font-bold ${s.color} border ${s.border} border-opacity-30 px-2 py-0.5 rounded-full`}
													>
														{s.stage}
													</span>
													<span
														className={`text-xs font-mono text-fog uppercase tracking-widest`}
													>
														{s.phase}
													</span>
												</div>
												<h3 className="text-2xl font-black text-chalk mb-3 leading-tight">
													{s.title}
												</h3>
												<p className="text-fog leading-relaxed">{s.sub}</p>
											</div>
											<div className="space-y-3">
												{s.products.map(p => (
													<a
														key={p.name}
														href={p.url}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-start gap-4 bg-card border border-rim hover:border-wire rounded-xl p-4 group/card transition-colors block"
													>
														<div
															className={`w-8 h-8 rounded-lg ${s.bg} bg-opacity-15 border ${s.border} border-opacity-30 flex items-center justify-center flex-shrink-0`}
														>
															<BoltIcon className={`w-4 h-4 ${s.color}`} />
														</div>
														<div className="flex-1 min-w-0">
															<div className="flex items-center gap-2 mb-1 flex-wrap">
																<span className="text-sm font-bold text-chalk">
																	{p.name}
																</span>
																<span
																	className={`text-xs font-mono ${s.color} border ${s.border} border-opacity-30 px-1.5 py-0.5 rounded`}
																>
																	{p.tag}
																</span>
															</div>
															<p className="text-xs text-fog leading-relaxed">
																{p.desc}
															</p>
														</div>
														<svg
															className="w-4 h-4 text-wire group-hover/card:text-fog flex-shrink-0 mt-0.5 transition-colors"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
															/>
														</svg>
													</a>
												))}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── ALL PRODUCTS ── */}
			<section id="products" className="py-24 border-t border-rim bg-surface">
				<div className="max-w-7xl mx-auto px-5 sm:px-8">
					<div className="max-w-2xl mb-16">
						<p className="text-xs font-mono text-orange uppercase tracking-widest mb-4">
							All products
						</p>
						<h2 className="text-4xl sm:text-5xl font-black text-chalk mb-4 leading-tight">
							Six products.
							<br />
							One ecosystem.
						</h2>
						<p className="text-fog leading-relaxed text-lg">
							Each product stands alone — and compounds when combined.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
						{products.map(p => {
							const acc = accentClasses[p.accent];
							return (
								<div
									key={p.name}
									className={`bg-panel border border-rim rounded-2xl overflow-hidden group hover:border-opacity-40 transition-all product-card-glow hover:${acc.border}`}
								>
									{/* Card header */}
									<div className={`px-5 py-4 border-b border-rim bg-card`}>
										<div className="flex items-start justify-between gap-3 mb-2">
											<div
												className={`w-8 h-8 rounded-lg ${acc.bg} bg-opacity-15 border ${acc.border} border-opacity-30 flex items-center justify-center flex-shrink-0`}
											>
												<BoltIcon className={`w-4 h-4 ${acc.text}`} />
											</div>
											<span
												className={`text-xs font-mono ${p.tagColor} border border-opacity-30 px-2 py-0.5 rounded-full`}
											>
												{p.tag}
											</span>
										</div>
										<h3 className="text-base font-bold text-chalk mb-0.5">
											{p.name}
										</h3>
										<p className="text-xs font-mono text-fog">{p.domain}</p>
									</div>

									{/* Card body */}
									<div className="px-5 py-4 flex-1">
										<p className="text-sm text-fog leading-relaxed mb-4">
											{p.desc}
										</p>
										<ul className="space-y-1.5 mb-4">
											{p.features.map(f => (
												<li
													key={f}
													className="flex items-start gap-2 text-xs text-fog"
												>
													<CheckIcon />
													{f}
												</li>
											))}
										</ul>
									</div>

									{/* Card footer */}
									<div className="px-5 py-3 border-t border-rim flex items-center justify-between">
										<span className={`text-xs font-mono font-bold ${acc.text}`}>
											{p.price}
										</span>
										<a
											href={p.url}
											target="_blank"
											rel="noopener noreferrer"
											className={`inline-flex items-center gap-1.5 text-xs font-bold ${acc.text} hover:text-chalk transition-colors`}
										>
											Open site
											<svg
												className="w-3.5 h-3.5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
												/>
											</svg>
										</a>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── AUDIENCE ── */}
			<section id="audience" className="py-24 border-t border-rim">
				<div className="max-w-7xl mx-auto px-5 sm:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
						<div>
							<p className="text-xs font-mono text-orange uppercase tracking-widest mb-4">
								Who this serves
							</p>
							<h2 className="text-4xl sm:text-5xl font-black text-chalk mb-5 leading-tight">
								One audience.
								<br />
								Every stage.
							</h2>
							<p className="text-fog leading-relaxed text-lg mb-8">
								Every BuildRail product serves the same core buyer — the
								residential contractor — at a different stage of their business.
								One ICP. Zero wasted acquisition. Compounding LTV.
							</p>
							<div className="space-y-4">
								{[
									{
										label: 'Entry point',
										title: 'Trades doing $250K–$5M/year',
										sub: 'Roofers, remodelers, plumbers, HVAC, electricians, painters, landscapers, concrete.',
										color: 'border-orange',
									},
									{
										label: 'Premium segment',
										title: 'GCs and design-build firms ($1M–$10M+)',
										sub: 'Residential construction firms running multiple active projects, managing subcontractors, needing professional client experiences.',
										color: 'border-amber',
									},
									{
										label: 'Adjacent',
										title: 'Any local service business',
										sub: 'LocalProof and SiteVerdict expand the addressable market beyond contractors to any local business.',
										color: 'border-teal',
									},
								].map(a => (
									<div key={a.label} className={`border-l-2 ${a.color} pl-4`}>
										<p className="text-xs font-mono text-fog uppercase tracking-wider mb-1">
											{a.label}
										</p>
										<p className="text-sm font-bold text-chalk mb-1">
											{a.title}
										</p>
										<p className="text-xs text-fog leading-relaxed">{a.sub}</p>
									</div>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<div className="bg-panel border border-rim rounded-2xl p-6">
								<p className="text-xs font-mono text-fog uppercase tracking-widest mb-4">
									The upgrade path
								</p>
								{[
									{
										step: '→',
										product: 'Growth System',
										price: '$99/mo',
										desc: 'First touchpoint — stop losing calls',
									},
									{
										step: '→',
										product: 'BuildRail Sites',
										price: '$2,499',
										desc: 'One-time — look premium, rank on Google',
									},
									{
										step: '→',
										product: 'Field Intelligence',
										price: 'TBD',
										desc: 'Win more estimates, protect scope',
									},
									{
										step: '→',
										product: 'BuildRail Vault',
										price: '$299–$699/mo',
										desc: 'Run jobs like a high-performance firm',
									},
									{
										step: '→',
										product: 'LocalProof',
										price: '$29–$79/mo',
										desc: 'Turn every job into visibility',
									},
									{
										step: '→',
										product: 'SiteVerdict',
										price: 'TBD',
										desc: 'Hire subs you can trust',
									},
								].map(u => (
									<div
										key={u.product}
										className="flex items-center gap-4 py-2.5 border-b border-rim last:border-0"
									>
										<span className="text-orange font-mono text-sm flex-shrink-0">
											{u.step}
										</span>
										<div className="flex-1 min-w-0">
											<span className="text-sm font-semibold text-chalk">
												{u.product}
											</span>
											<span className="text-xs text-fog ml-2">{u.desc}</span>
										</div>
										<span className="text-xs font-mono text-orange flex-shrink-0">
											{u.price}
										</span>
									</div>
								))}
							</div>
							<div className="bg-orange bg-opacity-10 border border-orange border-opacity-30 rounded-2xl p-5 text-center">
								<p className="text-xs font-mono text-orange uppercase tracking-wider mb-2">
									Full ecosystem customer
								</p>
								<p className="text-3xl font-black text-chalk mb-1">
									$800–$1,200
								</p>
								<p className="text-xs text-fog">
									estimated monthly recurring revenue per customer
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── REVENUE MODEL ── */}
			<section id="revenue" className="py-24 border-t border-rim bg-surface">
				<div className="max-w-7xl mx-auto px-5 sm:px-8">
					<div className="max-w-2xl mb-14">
						<p className="text-xs font-mono text-orange uppercase tracking-widest mb-4">
							Revenue model
						</p>
						<h2 className="text-4xl sm:text-5xl font-black text-chalk mb-4 leading-tight">
							Three pricing models.
							<br />
							One coherent system.
						</h2>
						<p className="text-fog leading-relaxed">
							Recurring subscriptions, one-time project builds, and freemium
							expansion — structured so every product has a natural path to the
							next.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
						{[
							{
								model: 'Subscription',
								icon: '↻',
								products: [
									'Growth System ($99–$699/mo)',
									'Field Intelligence (TBD)',
									'BuildRail Vault ($299–$699/mo)',
									'LocalProof ($0–$79/mo)',
									'SiteVerdict (TBD)',
								],
								desc: 'Recurring MRR. Lower churn due to workflow integration and named features that create stickiness.',
								color: 'text-orange border-orange bg-orange',
							},
							{
								model: 'One-time project',
								icon: '◉',
								products: ['BuildRail Sites ($2,499)'],
								desc: 'High-ticket, zero recurring overhead. Positions BuildRail as the premium contractor web build service in the market.',
								color: 'text-blue border-blue bg-blue',
							},
							{
								model: 'Freemium',
								icon: '⟳',
								products: [
									'LocalProof (3 free packs/mo → $29 Pro → $79 Agency)',
								],
								desc: 'Volume-driven conversion. Local service businesses try the product on one job and convert when they want unlimited packs.',
								color: 'text-teal border-teal bg-teal',
							},
						].map(m => (
							<div
								key={m.model}
								className="bg-panel border border-rim rounded-2xl p-6"
							>
								<div className={`text-xl ${m.color.split(' ')[0]} mb-4`}>
									{m.icon}
								</div>
								<h3 className="text-base font-bold text-chalk mb-2">
									{m.model}
								</h3>
								<p className="text-xs text-fog leading-relaxed mb-4">
									{m.desc}
								</p>
								<ul className="space-y-1">
									{m.products.map(p => (
										<li
											key={p}
											className="text-xs font-mono text-fog flex items-center gap-2"
										>
											<span
												className={`w-1 h-1 rounded-full flex-shrink-0 ${m.color.split(' ')[2]} bg-opacity-60`}
											></span>
											{p}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Why it works */}
					<div className="bg-panel border border-rim rounded-2xl p-7">
						<p className="text-xs font-mono text-orange uppercase tracking-widest mb-5">
							Why this ecosystem compounds
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
							{[
								{
									title: 'Same buyer, every product',
									sub: 'One audience, one distribution channel, zero wasted acquisition spend. Every contractor served is a potential full-ecosystem customer.',
								},
								{
									title: 'Products make each other more valuable',
									sub: 'Growth System fills the pipeline. Field Intelligence wins the estimate. Vault runs the job. LocalProof turns the job into reputation. They compound.',
								},
								{
									title: 'Named features create stickiness',
									sub: "BidForge, ScopeLock, PayRail, CrewLens, SiteVerdict — named products contractors don't switch away from.",
								},
								{
									title: 'Clear upgrade path at every stage',
									sub: 'Every product has a logical next step. No dead ends. Contractors grow into the ecosystem naturally as their business grows.',
								},
								{
									title: 'Covers the entire lifecycle',
									sub: 'No other platform covers get-found → win-estimate → run-job → hire-right → stay-visible. This is the only complete system for contractors.',
								},
								{
									title: 'Distinct identities, one brand',
									sub: 'Each product has its own positioning and design. The parent brand provides trust; each product provides precision focus.',
								},
							].map(w => (
								<div
									key={w.title}
									className="border-l-2 border-orange border-opacity-30 pl-4"
								>
									<p className="text-sm font-bold text-chalk mb-1">{w.title}</p>
									<p className="text-xs text-fog leading-relaxed">{w.sub}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── FINAL LINKS ── */}
			<section className="py-24 border-t border-rim">
				<div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
					<p className="text-xs font-mono text-orange uppercase tracking-widest mb-4">
						Explore the ecosystem
					</p>
					<h2 className="text-4xl sm:text-5xl font-black text-chalk mb-4 leading-tight">
						Every product. One click away.
					</h2>
					<p className="text-fog mb-12 leading-relaxed max-w-xl mx-auto text-lg">
						Each site is fully built, fully deployed, and ready to present,
						share, or demo.
					</p>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
						{[
							{
								name: 'BuildRail Growth System',
								domain: 'buildrail.com',
								url: 'https://buildrail.com',
								color: 'text-orange',
								border: 'border-orange',
							},
							{
								name: 'Field Intelligence',
								domain: 'fieldintel.buildrail.com',
								url: 'https://fieldintel.buildrail.com',
								color: 'text-purple',
								border: 'border-purple',
							},
							{
								name: 'BuildRail Vault',
								domain: 'vault.buildrail.com',
								url: 'https://vault.buildrail.com',
								color: 'text-amber',
								border: 'border-amber',
							},
							{
								name: 'SiteVerdict',
								domain: 'siteverdict.com',
								url: 'https://siteverdict.com',
								color: 'text-blue',
								border: 'border-blue',
							},
							{
								name: 'LocalProof',
								domain: 'localproof.buildrail.com',
								url: 'https://localproof.buildrail.com',
								color: 'text-teal',
								border: 'border-teal',
							},
							{
								name: 'BuildRail Sites',
								domain: 'sites.buildrail.com',
								url: 'https://sites.buildrail.com',
								color: 'text-orange',
								border: 'border-orange',
							},
						].map(p => (
							<a
								key={p.name}
								href={p.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`border border-rim hover:${p.border} hover:border-opacity-50 rounded-2xl p-5 bg-panel transition-all group product-card-glow text-left block`}
							>
								<p className={`text-xs font-mono font-bold ${p.color} mb-1`}>
									{p.name}
								</p>
								<p className="text-xs text-fog font-mono mb-3 truncate">
									{p.domain}
								</p>
								<div
									className={`flex items-center gap-1 text-xs ${p.color} font-semibold group-hover:translate-x-0.5 transition-transform`}
								>
									Open{' '}
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
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</div>
							</a>
						))}
					</div>

					{/* Tech stack badge */}
					<div className="inline-flex flex-wrap justify-center gap-3 border border-rim rounded-xl px-5 py-3 bg-panel">
						{[
							'Next.js 16',
							'TypeScript',
							'Tailwind v3',
							'Zero oklch',
							'Static export',
							'Vercel-ready',
						].map(t => (
							<span key={t} className="text-xs font-mono text-fog">
								{t}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-rim bg-surface py-8">
				<div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
					<div className="flex items-center gap-2">
						<div className="w-5 h-5 rounded bg-orange flex items-center justify-center">
							<BoltIcon className="w-3 h-3 text-void" />
						</div>
						<span className="text-sm font-bold text-chalk">
							Build<span className="text-orange">Rail</span>
						</span>
						<span className="text-xs text-fog">· Ecosystem Overview</span>
					</div>
					<p className="text-xs text-fog">
						6 products · 1 ecosystem · Built for contractor businesses
					</p>
				</div>
			</footer>
		</div>
	);
}
