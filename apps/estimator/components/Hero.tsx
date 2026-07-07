/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TICKERS = [
	{ job: 'Kitchen Remodel – Portland, OR', value: '$18,400', time: 'just now' },
	{ job: 'Roofing Replacement – Austin, TX', value: '$12,200', time: '2m ago' },
	{ job: 'Bathroom Renovation – Denver, CO', value: '$9,800', time: '4m ago' },
	{ job: 'Deck Build – Nashville, TN', value: '$7,600', time: '6m ago' },
	{ job: 'HVAC Install – Phoenix, AZ', value: '$11,500', time: '8m ago' },
	{ job: 'Electrical Upgrade – Seattle, WA', value: '$4,300', time: '11m ago' },
	{ job: 'Basement Finish – Chicago, IL', value: '$22,900', time: '13m ago' },
];

function LiveTicker() {
	const [idx, setIdx] = useState(0);
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const t = setInterval(() => {
			setVisible(false);
			setTimeout(() => {
				setIdx(i => (i + 1) % TICKERS.length);
				setVisible(true);
			}, 380);
		}, 3000);
		return () => clearInterval(t);
	}, []);
	const item = TICKERS[idx];
	return (
		<div style={{ width: '100%' }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					marginBottom: 10,
				}}
			>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: '50%',
						background: 'var(--success)',
					}}
					className="dot-pulse"
				/>
				<span
					style={{
						color: 'var(--success)',
						fontSize: 11,
						fontWeight: 600,
						letterSpacing: '0.08em',
						textTransform: 'uppercase',
					}}
				>
					Live Estimates Coming In
				</span>
			</div>
			<motion.div
				key={idx}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
				transition={{ duration: 0.32 }}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 16,
					background: 'rgba(20,35,72,0.7)',
					border: '1px solid rgba(59,130,246,0.2)',
					borderRadius: 12,
					padding: '12px 16px',
					backdropFilter: 'blur(8px)',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						minWidth: 0,
					}}
				>
					<div
						style={{
							width: 8,
							height: 8,
							borderRadius: '50%',
							background: 'var(--success)',
							flexShrink: 0,
						}}
					/>
					<div style={{ minWidth: 0 }}>
						<p
							style={{
								color: 'var(--white)',
								fontSize: 13,
								fontWeight: 600,
								margin: 0,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.job}
						</p>
						<p
							style={{ color: 'var(--slate)', fontSize: 11, margin: '2px 0 0' }}
						>
							{item.time}
						</p>
					</div>
				</div>
				<span
					className="font-display"
					style={{
						color: 'var(--amber)',
						fontWeight: 700,
						fontSize: 17,
						flexShrink: 0,
					}}
				>
					{item.value}
				</span>
			</motion.div>
			<div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
				{TICKERS.map((_, i) => (
					<div
						key={i}
						style={{
							height: 2,
							flex: 1,
							borderRadius: 2,
							background: i === idx ? 'var(--amber)' : 'rgba(59,130,246,0.2)',
							transition: 'background 0.3s',
						}}
					/>
				))}
			</div>
		</div>
	);
}

function CountUp({
	end,
	suffix = '',
	duration = 2000,
}: {
	end: number;
	suffix?: string;
	duration?: number;
}) {
	const [count, setCount] = useState(0);
	const [mounted, setMounted] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true });

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!inView) return;
		const t0 = Date.now();
		const id = setInterval(() => {
			const p = Math.min((Date.now() - t0) / duration, 1);
			const e = 1 - Math.pow(1 - p, 3);
			setCount(Math.floor(e * end));
			if (p >= 1) clearInterval(id);
		}, 16);
		return () => clearInterval(id);
	}, [inView, end, duration]);
	return (
		<span ref={ref}>
			{mounted ? count : 0}
			{suffix}
		</span>
	);
}

export default function Hero() {
	return (
		<section
			style={{
				position: 'relative',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				overflow: 'hidden',
				paddingTop: 80,
				paddingBottom: 48,
				background:
					'linear-gradient(135deg, #0A1628 0%, #142348 50%, #0D2254 100%)',
			}}
			className="grid-bg"
		>
			{/* Glow blobs */}
			<div
				style={{
					position: 'absolute',
					top: '20%',
					left: '15%',
					width: 400,
					height: 400,
					background: 'rgba(245,158,11,0.06)',
					borderRadius: '50%',
					filter: 'blur(80px)',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: '25%',
					right: '15%',
					width: 320,
					height: 320,
					background: 'rgba(59,130,246,0.07)',
					borderRadius: '50%',
					filter: 'blur(80px)',
					pointerEvents: 'none',
				}}
			/>

			<div
				className="page-container"
				style={{ position: 'relative', zIndex: 1 }}
			>
				{/* Hero grid */}
				<div className="hero-grid">
					{/* Left column */}
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="badge badge-amber"
							style={{ marginBottom: 24 }}
						>
							<span>↗</span> Lead Engine for Contractors
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
							className="font-display"
							style={{
								fontSize: 'clamp(40px, 6vw, 68px)',
								fontWeight: 700,
								lineHeight: 1.05,
								letterSpacing: '-0.02em',
								margin: '0 0 20px',
								color: 'var(--white)',
							}}
						>
							Stop Losing Leads
							<br />
							<span className="shimmer-text">After Hours.</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.32 }}
							style={{
								color: 'var(--slate)',
								fontSize: 18,
								lineHeight: 1.65,
								margin: '0 0 36px',
								maxWidth: 480,
							}}
						>
							BuildRail captures, qualifies, and delivers estimate requests from
							your site visitors — even while you&apos;re on the job site.
						</motion.p>

						{/* CTA buttons */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.46 }}
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 14,
								marginBottom: 36,
							}}
						>
							<motion.a
								href="#get-started"
								whileHover={{ scale: 1.03, y: -2 } as any}
								whileTap={{ scale: 0.97 } as any}
								className="btn btn-primary pulse-amber"
							>
								Capture My First Lead <span>→</span>
							</motion.a>
							<motion.a
								href="#how-it-works"
								whileHover={{ scale: 1.02 } as any}
								whileTap={{ scale: 0.97 } as any}
								className="btn btn-ghost"
							>
								See How It Works
							</motion.a>
						</motion.div>

						{/* Trust row */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.65 }}
							style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
						>
							{[
								{ icon: '🛡', text: 'No credit card required' },
								{ icon: '⭐', text: '4.9/5 from 300+ contractors' },
								{ icon: '⚡', text: 'Setup in under 5 minutes' },
							].map(t => (
								<div
									key={t.text}
									style={{ display: 'flex', alignItems: 'center', gap: 7 }}
								>
									<span style={{ fontSize: 14 }}>{t.icon}</span>
									<span style={{ color: 'var(--slate)', fontSize: 13 }}>
										{t.text}
									</span>
								</div>
							))}
						</motion.div>
					</div>

					{/* Right column – dashboard card */}
					<motion.div
						initial={{ opacity: 0, x: 40, scale: 0.95 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
						className="float-anim"
						style={{ position: 'relative' }}
					>
						<div
							style={{
								background: 'var(--navy-light)',
								border: '1px solid rgba(59,130,246,0.22)',
								borderRadius: 20,
								padding: 24,
								boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
								position: 'relative',
							}}
						>
							{/* Card header */}
							<div
								style={{
									display: 'flex',
									alignItems: 'flex-start',
									justifyContent: 'space-between',
									marginBottom: 24,
								}}
							>
								<div>
									<p
										style={{
											color: 'var(--slate)',
											fontSize: 11,
											textTransform: 'uppercase',
											letterSpacing: '0.1em',
											margin: '0 0 4px',
										}}
									>
										Your Dashboard
									</p>
									<p
										className="font-display"
										style={{
											color: 'var(--white)',
											fontSize: 18,
											fontWeight: 700,
											margin: 0,
										}}
									>
										This Week&apos;s Leads
									</p>
								</div>
								<div
									style={{
										background: 'rgba(16,185,129,0.15)',
										border: '1px solid rgba(16,185,129,0.28)',
										borderRadius: 8,
										padding: '6px 12px',
									}}
								>
									<span
										style={{
											color: 'var(--success)',
											fontWeight: 600,
											fontSize: 13,
										}}
									>
										↑ 34%
									</span>
								</div>
							</div>

							{/* Stats row */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(3,1fr)',
									gap: 12,
									marginBottom: 20,
								}}
							>
								{[
									{ v: '47', l: 'Leads Captured', c: 'var(--amber)' },
									{ v: '$14k', l: 'Avg. Job Value', c: 'var(--steel-light)' },
									{ v: '68%', l: 'Conversion Rate', c: 'var(--success)' },
								].map(s => (
									<div
										key={s.l}
										style={{
											background: 'rgba(20,35,72,0.6)',
											borderRadius: 12,
											padding: '12px 14px',
											border: '1px solid rgba(255,255,255,0.05)',
										}}
									>
										<p
											className="font-display"
											style={{
												color: s.c,
												fontSize: 22,
												fontWeight: 700,
												margin: '0 0 2px',
											}}
										>
											{s.v}
										</p>
										<p
											style={{
												color: 'var(--slate)',
												fontSize: 11,
												margin: 0,
												lineHeight: 1.3,
											}}
										>
											{s.l}
										</p>
									</div>
								))}
							</div>

							<LiveTicker />

							<div
								style={{
									marginTop: 20,
									paddingTop: 16,
									borderTop: '1px solid rgba(59,130,246,0.1)',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<span style={{ color: 'var(--slate)', fontSize: 13 }}>
									<span style={{ color: 'var(--amber)', fontWeight: 600 }}>
										$341,200
									</span>{' '}
									in pipeline this month
								</span>
								<div
									style={{
										width: 8,
										height: 8,
										borderRadius: '50%',
										background: 'var(--success)',
									}}
									className="dot-pulse"
								/>
							</div>
						</div>

						{/* Floating badge */}
						<motion.div
							animate={{ y: [0, -6, 0] }}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'easeInOut',
								delay: 1,
							}}
							style={{
								position: 'absolute',
								top: -14,
								right: -14,
								background: 'var(--amber)',
								color: 'var(--navy)',
								fontSize: 12,
								fontWeight: 700,
								padding: '8px 14px',
								borderRadius: 12,
								boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
								zIndex: 2,
							}}
						>
							🔥 New lead just in!
						</motion.div>
					</motion.div>
				</div>

				{/* Stats bar */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.85 }}
					style={{
						marginTop: 56,
						paddingTop: 40,
						borderTop: '1px solid rgba(59,130,246,0.12)',
					}}
				>
					<div className="grid-4">
						{[
							{ end: 2400, suffix: '+', label: 'Contractors Using BuildRail' },
							{ end: 98, suffix: 'K+', label: 'Leads Captured This Year' },
							{ end: 3, suffix: 'min', label: 'Avg. Time to Setup' },
							{ end: 67, suffix: '%', label: 'More Leads vs. Contact Forms' },
						].map(s => (
							<div key={s.label} style={{ textAlign: 'center' }}>
								<p
									className="font-display"
									style={{
										color: 'var(--amber)',
										fontSize: 'clamp(28px,4vw,40px)',
										fontWeight: 700,
										margin: '0 0 6px',
									}}
								>
									<CountUp end={s.end} suffix={s.suffix} />
								</p>
								<p style={{ color: 'var(--slate)', fontSize: 13, margin: 0 }}>
									{s.label}
								</p>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
