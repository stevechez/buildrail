'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Tables } from '@/types/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

// Derived from the generated Database type — stays in sync automatically.
export type Lead = Tables<'leads'>;

type SortKey = 'created_at' | 'estimate_min' | 'estimate_max';
type SortDir = 'asc' | 'desc';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
	n.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	});

const fmtDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

const SCOPE_COLORS: Record<string, string> = {
	Remodel: 'bg-[var(--steel)]/15 text-[var(--steel-light)]',
	Addition: 'bg-[var(--amber)]/15 text-[var(--amber)]',
	'New Build': 'bg-[var(--success)]/15 text-[var(--success)]',
};

function exportCsv(leads: Lead[]) {
	const headers = [
		'Date',
		'Name',
		'Email',
		'Phone',
		'Scope',
		'Size',
		'Finish',
		'Spaces',
		'Est. Min',
		'Est. Max',
	];
	const rows = leads.map(l => [
		fmtDate(l.created_at),
		l.name,
		l.email,
		l.phone ?? '',
		l.scope ?? '',
		l.size ?? '',
		l.finish ?? '',
		(l.remodel_rooms ?? []).join(' | '),
		l.estimate_min,
		l.estimate_max,
	]);
	const csv = [headers, ...rows]
		.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
		.join('\n');
	const blob = new Blob([csv], { type: 'text/csv' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
	a.click();
	URL.revokeObjectURL(url);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LeadsTable({ leads }: { leads: Lead[] }) {
	const [search, setSearch] = useState('');
	const [scopeFilter, setScopeFilter] = useState<string>('All');
	const [sortKey, setSortKey] = useState<SortKey>('created_at');
	const [sortDir, setSortDir] = useState<SortDir>('desc');

	const scopes = useMemo(
		() => [
			'All',
			...Array.from(
				new Set(leads.map(l => l.scope).filter(Boolean) as string[]),
			),
		],
		[leads],
	);

	const renderSortIcon = (col: SortKey) => {
		if (sortKey !== col) {
			return <span className="opacity-30">↕</span>; // Or your default icon
		}
		return sortDir === 'asc' ? '↑' : '↓'; // Or your lucide-react/heroicon components
	};

	const filtered = useMemo(() => {
		const q = search.toLowerCase();
		return leads
			.filter(l => {
				const matchSearch =
					!q ||
					l.name.toLowerCase().includes(q) ||
					l.email.toLowerCase().includes(q);
				const matchScope = scopeFilter === 'All' || l.scope === scopeFilter;
				return matchSearch && matchScope;
			})
			.sort((a, b) => {
				const av =
					sortKey === 'created_at'
						? new Date(a[sortKey]).getTime()
						: a[sortKey];
				const bv =
					sortKey === 'created_at'
						? new Date(b[sortKey]).getTime()
						: b[sortKey];
				return sortDir === 'desc'
					? (bv as number) - (av as number)
					: (av as number) - (bv as number);
			});
	}, [leads, search, scopeFilter, sortKey, sortDir]);

	const toggleSort = (key: SortKey) => {
		if (sortKey === key) setSortDir(d => (d === 'desc' ? 'asc' : 'desc'));
		else {
			setSortKey(key);
			setSortDir('desc');
		}
	};

	const SortIcon = ({ col }: { col: SortKey }) =>
		sortKey !== col ? (
			<span className="ml-1 opacity-30">↕</span>
		) : (
			<span className="ml-1 text-[var(--amber)]">
				{sortDir === 'desc' ? '↓' : '↑'}
			</span>
		);

	return (
		<div>
			{/* ── Toolbar ──────────────────────────────────────────────────────── */}
			<div className="mb-5 flex flex-wrap items-center gap-3">
				{/* Search */}
				<input
					type="search"
					placeholder="Search name or email…"
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="h-9 w-64 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-[var(--white)] placeholder:text-[var(--slate)] focus:border-[var(--amber)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--amber)]/30"
				/>

				{/* Scope filter pills */}
				<div className="flex flex-wrap gap-1.5">
					{scopes.map(s => (
						<button
							key={s}
							onClick={() => setScopeFilter(s)}
							className={[
								'rounded-full px-3 py-1 text-xs font-semibold transition-all duration-150',
								scopeFilter === s
									? 'bg-[var(--amber)] text-[var(--navy)]'
									: 'border border-white/[0.08] text-[var(--slate)] hover:border-white/20 hover:text-[var(--white)]',
							].join(' ')}
						>
							{s}
						</button>
					))}
				</div>

				{/* Spacer + export */}
				<div className="ml-auto flex items-center gap-3">
					<span className="text-xs text-[var(--slate)]">
						{filtered.length} of {leads.length} lead
						{leads.length !== 1 ? 's' : ''}
					</span>
					<button
						onClick={() => exportCsv(filtered)}
						className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[var(--slate)] transition-all duration-150 hover:border-white/20 hover:text-[var(--white)]"
					>
						<svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
							<path
								d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Export CSV
					</button>
				</div>
			</div>

			{/* ── Table ────────────────────────────────────────────────────────── */}

			<div className="overflow-x-auto rounded-xl border border-white/[0.06]">
				{filtered.length === 0 ? (
					<div className="py-16 text-center text-sm text-[var(--slate)]">
						{leads.length === 0
							? 'No leads yet — submit the estimator to create one.'
							: 'No leads match your filters.'}
					</div>
				) : (
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-white/[0.06] bg-white/[0.02] text-left text-xs font-semibold uppercase tracking-wide text-[var(--slate)]">
								<th className="px-4 py-3">Contact</th>
								<th className="px-4 py-3">Scope</th>
								<th className="px-4 py-3">Details</th>
								<th
									className="cursor-pointer select-none px-4 py-3 hover:text-[var(--white)]"
									onClick={() => toggleSort('estimate_min')}
								>
									<div className="flex items-center gap-1">
										Estimate {renderSortIcon('estimate_min')}
									</div>
								</th>
								<th
									className="cursor-pointer select-none px-4 py-3 hover:text-[var(--white)]"
									onClick={() => toggleSort('created_at')}
								>
									<div className="flex items-center gap-1">
										Date {renderSortIcon('created_at')}
									</div>
								</th>
								<th className="px-4 py-3" />
							</tr>
						</thead>
						<tbody className="divide-y divide-white/[0.04]">
							{filtered.map(lead => (
								<tr
									key={lead.id}
									className="transition-colors duration-100 hover:bg-white/[0.02]"
								>
									{/* Contact */}
									<td className="px-4 py-3">
										<p className="font-medium text-[var(--white)]">
											{lead.name}
										</p>
										<p className="text-xs text-[var(--slate)]">{lead.email}</p>
										{lead.phone && (
											<p className="text-xs text-[var(--slate)]">
												{lead.phone}
											</p>
										)}
									</td>

									{/* Scope badge */}
									<td className="px-4 py-3">
										{lead.scope ? (
											<span
												className={[
													'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
													SCOPE_COLORS[lead.scope] ??
														'bg-white/10 text-[var(--white-dim)]',
												].join(' ')}
											>
												{lead.scope}
											</span>
										) : (
											<span className="text-[var(--slate)]">—</span>
										)}
									</td>

									{/* Details */}
									<td className="px-4 py-3 text-xs text-[var(--slate)]">
										{[lead.size, lead.finish].filter(Boolean).join(' · ') ||
											'—'}
										{lead.remodel_rooms && lead.remodel_rooms.length > 0 && (
											<p className="mt-0.5">{lead.remodel_rooms.join(', ')}</p>
										)}
									</td>

									{/* Estimate */}
									<td className="px-4 py-3 font-semibold tabular-nums text-[var(--amber)]">
										{fmt(lead.estimate_min)}
										<span className="mx-1 font-normal text-[var(--slate)]">
											–
										</span>
										{fmt(lead.estimate_max)}
									</td>

									{/* Date */}
									<td className="px-4 py-3 text-xs text-[var(--slate)]">
										{fmtDate(lead.created_at)}
									</td>

									{/* View link */}
									<td className="px-4 py-3 text-right">
										<Link
											href={`/admin/leads/${lead.id}`}
											className="text-xs font-medium text-[var(--slate)] transition-colors hover:text-[var(--amber)]"
										>
											View →
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
