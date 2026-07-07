'use client';

import { motion } from 'framer-motion';
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	DollarSign,
	Mail,
	MessageSquareText,
	PhoneCall,
	ShieldCheck,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/Footer';

const dashboardFeatures = [
	'New missed-call leads',
	'Caller name and phone number',
	'Service requested',
	'Job or appointment location',
	'Urgency level',
	'Call summary',
	'Suggested follow-up script',
	'Estimated opportunity value',
	'Booked revenue tracking',
	'Lead status: new, contacted, booked, lost, or spam',
];

const howItWorks = [
	{
		icon: PhoneCall,
		title: 'A customer calls while you are busy',
		text: 'You might be on a job, with a client, driving, or finally taking lunch. The customer just knows nobody picked up.',
	},
	{
		icon: MessageSquareText,
		title: 'The missed call becomes a lead',
		text: 'Lunch Break AI captures the caller, service need, urgency, and estimated value so the opportunity does not disappear.',
	},
	{
		icon: Zap,
		title: 'You get a clear follow-up workflow',
		text: 'Open the lead, see what they need, use the suggested call or text script, and mark the lead as contacted or booked.',
	},
	{
		icon: DollarSign,
		title: 'You track recovered revenue',
		text: 'When a missed call becomes a real job, mark it booked and track the value so you can see what was recovered.',
	},
];

const faqs = [
	{
		question: 'Is this another complicated CRM?',
		answer:
			"No. Lunch Break AI is focused on one job: helping service businesses recover missed calls before those callers become someone else's customer.",
	},
	{
		question: 'Do I need to replace my phone number?',
		answer:
			'No. The goal is to work with your existing business phone flow. The beta starts with a simple missed-call recovery dashboard and follow-up workflow.',
	},
	{
		question: 'What happens after a missed call?',
		answer:
			'The missed call becomes a lead record with caller details, service needed, urgency, suggested follow-up language, and revenue tracking.',
	},
	{
		question: 'Who is this built for?',
		answer:
			'Lunch Break AI is built for local service businesses that lose money when calls go unanswered, including contractors, home services, appointment-based businesses, and professional services.',
	},
];

export default function LunchBreakLandingPage() {
	return (
		<main className="min-h-screen bg-slate-950 text-white">
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_35%)]" />
				<div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
					<nav className="flex items-center justify-between">
						<Link href="/" className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/30">
								<PhoneCall className="h-5 w-5" />
							</div>
							<span className="text-lg font-semibold tracking-tight">
								Lunch Break AI
							</span>
						</Link>

						<div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
							<a href="#how" className="hover:text-white">
								How it works
							</a>
							<a href="#beta" className="hover:text-white">
								Beta
							</a>
							<a href="#faq" className="hover:text-white">
								FAQ
							</a>
						</div>

						<div className="flex items-center gap-3">
							<Link
								href="/login"
								className="hidden rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex"
							>
								Log in
							</Link>

							<Link
								href="/signup"
								className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
							>
								Start free demo
							</Link>
						</div>
					</nav>
				</div>
				<section className="relative overflow-hidden bg-[#020617] text-white">
					{/* Ambient Background Glows */}
					<div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
					<div className="absolute top-1/3 right-10 h-[400px] w-[400px] rounded-full bg-slate-800/10 blur-[120px] pointer-events-none" />

					<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-32">
							{/* LEFT */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="flex flex-col justify-center lg:col-span-5 xl:col-span-4"
							>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-300">
									<Clock className="h-3.5 w-3.5 text-blue-400" />
									<span>Recover revenue from missed calls</span>
								</div>

								<h1 className="text-5xl font-bold tracking-[-0.04em] sm:text-6xl md:text-7xl leading-[1.05]">
									Stop Losing Jobs.
								</h1>

								<p className="mt-5 max-w-md text-xl text-slate-400">
									Capture missed callers before they hire someone else.
								</p>

								<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
									<Button
										asChild
										size="lg"
										className="h-11 rounded-full bg-blue-600 px-6 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
									>
										<Link href="/signup">
											Start free demo
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>

									<Button
										asChild
										size="lg"
										variant="outline"
										className="h-11 rounded-full border-slate-800 bg-slate-900/40 px-6 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
									>
										<a href="#how">See how it works</a>
									</Button>
								</div>
							</motion.div>

							{/* RIGHT */}
							<motion.div
								initial={{ opacity: 0, scale: 0.98, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="w-full lg:col-span-7 xl:col-span-8 flex justify-center lg:justify-end"
							>
								<div className="relative w-full max-w-[620px] rounded-[2.5rem] border border-white/[0.04] bg-[#0b0f19] p-6 sm:p-10 shadow-2xl shadow-black/50">
									<div className="space-y-6">
										<div>
											<p className="text-xs uppercase tracking-widest text-slate-500">
												Recovered Revenue
											</p>

											<h3 className="mt-3 text-6xl font-bold text-white">
												$850
											</h3>

											<p className="mt-2 text-slate-400">From 1 missed call</p>
										</div>

										<div className="h-px bg-white/5" />

										<div className="grid grid-cols-2 gap-4">
											<div>
												<p className="text-xs uppercase tracking-widest text-slate-500">
													Lead
												</p>
												<p className="mt-2 font-medium text-white">Maria R.</p>
											</div>

											<div>
												<p className="text-xs uppercase tracking-widest text-slate-500">
													Status
												</p>
												<p className="mt-2 font-medium text-emerald-400">
													Recovered
												</p>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
			</section>

			{/* Stats bar */}
			<section className="border-y border-white/10 bg-slate-900/70 px-6 py-10">
				<div className="mx-auto grid max-w-7xl gap-6 text-center sm:grid-cols-3">
					<div>
						<p className="text-4xl font-bold">1 missed call</p>
						<p className="mt-2 text-slate-300">can become a lost customer</p>
					</div>

					<div>
						<p className="text-4xl font-bold">5 minutes</p>
						<p className="mt-2 text-slate-300">
							can be the difference between booked and gone
						</p>
					</div>

					<div>
						<p className="text-4xl font-bold">$147</p>
						<p className="mt-2 text-slate-300">
							is all it takes to recover one missed customer
						</p>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section id="how" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						How it works
					</p>
					<h2 className="mt-3 text-4xl font-bold tracking-tight">
						A simple missed-call recovery workflow.
					</h2>
					<p className="mt-4 text-lg leading-8 text-slate-300">
						One focused job: help you recover missed calls before they become
						someone else&apos;s customer.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{howItWorks.map(step => (
						<Card
							key={step.title}
							className="rounded-3xl border-white/10 bg-white/5"
						>
							<CardContent className="p-7">
								<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
									<step.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold text-white">
									{step.title}
								</h3>
								<p className="mt-3 leading-7 text-slate-300">{step.text}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Dashboard features */}
			<section id="dashboard" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
							What you see
						</p>
						<h2 className="mt-3 text-4xl font-bold tracking-tight">
							A dashboard built around action, not clutter.
						</h2>
						<p className="mt-4 text-lg leading-8 text-slate-300">
							Every lead answers three questions: who called, what do they need,
							and what should you do next?
						</p>
					</div>

					<Card className="rounded-[2rem] border-white/10 bg-white/5">
						<CardContent className="p-7">
							<div className="grid gap-4 sm:grid-cols-2">
								{dashboardFeatures.map(feature => (
									<div key={feature} className="flex gap-3">
										<CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
										<span className="text-sm leading-6 text-slate-300">
											{feature}
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Beta offer */}
			<section id="beta" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
					<Card className="rounded-[2rem] border-blue-400/30 bg-blue-500/15">
						<CardContent className="p-8 sm:p-10">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
								Beta offer
							</p>

							<h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
								Looking for a small number of local service businesses to test
								Lunch Break AI.
							</h2>

							<p className="mt-5 text-lg leading-8 text-slate-300">
								You get a missed-call recovery dashboard, lead tracking, and a
								follow-up workflow designed around your business.
							</p>

							<div className="mt-8 grid gap-4 sm:grid-cols-3">
								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<p className="text-sm text-slate-400">Setup</p>
									<p className="mt-2 text-3xl font-bold text-white">$147</p>
									<p className="mt-2 text-sm text-slate-300">one-time beta</p>
								</div>

								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<p className="text-sm text-slate-400">Contract</p>
									<p className="mt-2 text-3xl font-bold text-white">No</p>
									<p className="mt-2 text-sm text-slate-300">
										long-term commitment
									</p>
								</div>

								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<p className="text-sm text-slate-400">Goal</p>
									<p className="mt-2 text-3xl font-bold text-white">1 win</p>
									<p className="mt-2 text-sm text-slate-300">
										one recovered customer pays for it
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-[2rem] border-white/10 bg-white/5">
						<CardContent className="flex h-full flex-col justify-between p-8">
							<div>
								<ShieldCheck className="mb-5 h-10 w-10 text-blue-300" />
								<h3 className="text-2xl font-semibold text-white">
									No bloated CRM. No complicated software.
								</h3>
								<p className="mt-4 leading-7 text-slate-300">
									Just a simple system to recover missed calls, follow up
									faster, and see whether those calls became revenue.
								</p>
							</div>

							<div className="mt-8 space-y-3">
								<Button
									asChild
									size="lg"
									className="w-full rounded-2xl bg-white text-base text-slate-950 hover:bg-slate-100"
								>
									<Link href="/beta">
										Request beta access
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>

								<Button
									asChild
									size="lg"
									variant="outline"
									className="w-full rounded-2xl border-white/20 bg-white/5 text-base text-white hover:bg-white/10"
								>
									<Link href="/signup">Try the free demo</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* FAQ */}
			<section id="faq" className="bg-slate-900 px-6 py-20 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<h2 className="text-4xl font-bold tracking-tight">FAQ</h2>

					<div className="mt-10 space-y-5">
						{faqs.map(item => (
							<div
								key={item.question}
								className="rounded-3xl border border-white/10 bg-white/5 p-6"
							>
								<h3 className="text-lg font-semibold text-white">
									{item.question}
								</h3>
								<p className="mt-2 leading-7 text-slate-300">{item.answer}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="px-6 py-20 lg:px-8">
				<div className="mx-auto max-w-5xl rounded-[2rem] bg-blue-500 p-8 text-center text-white shadow-2xl shadow-blue-950/40 sm:p-12">
					<Mail className="mx-auto mb-5 h-10 w-10" />
					<h2 className="text-4xl font-bold tracking-tight">
						Want to see if Lunch Break AI could help your business?
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">
						Start the free demo and simulate a missed call. See the lead,
						follow-up workflow, and revenue tracking in action.
					</p>

					<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							asChild
							size="lg"
							className="rounded-2xl bg-white px-7 text-base text-slate-950 hover:bg-blue-50"
						>
							<Link href="/signup">
								Start free demo
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>

						<Button
							asChild
							size="lg"
							variant="outline"
							className="rounded-2xl border-white/40 bg-white/10 px-7 text-base text-white hover:bg-white/20"
						>
							<Link href="/beta">Request beta access</Link>
						</Button>
					</div>
				</div>
			</section>

			<SiteFooter />
		</main>
	);
}
