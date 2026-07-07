'use client';

import type { FormEvent } from 'react';
import { useMemo, useState, useSyncExternalStore } from 'react';
import {
	CheckCircle2,
	Circle,
	FileText,
	Plus,
	Power,
	Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { ContentSkillImporter } from '@/components/context/content-skill-importer';

import {
	addContextItem,
	CONTEXT_VAULT_STORAGE_KEY,
	contextTypeLabels,
	contextTypes,
	deleteContextItem,
	toggleContextItem,
} from '@/lib/context-vault-storage';
import type { ContextItem, ContextItemType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

function subscribeToContextVault(callback: () => void) {
	if (typeof window === 'undefined') {
		return () => {};
	}

	window.addEventListener('storage', callback);
	window.addEventListener('localproof-context-vault-updated', callback);

	return () => {
		window.removeEventListener('storage', callback);
		window.removeEventListener('localproof-context-vault-updated', callback);
	};
}

function getContextVaultSnapshot() {
	if (typeof window === 'undefined') {
		return null;
	}

	return window.localStorage.getItem(CONTEXT_VAULT_STORAGE_KEY);
}

function getContextVaultServerSnapshot() {
	return null;
}

function parseContextItems(snapshot: string | null): ContextItem[] {
	if (!snapshot) {
		return [];
	}

	try {
		const parsedItems = JSON.parse(snapshot);

		if (!Array.isArray(parsedItems)) {
			return [];
		}

		return parsedItems as ContextItem[];
	} catch {
		return [];
	}
}

export function ContextVault() {
	const contextVaultSnapshot = useSyncExternalStore(
		subscribeToContextVault,
		getContextVaultSnapshot,
		getContextVaultServerSnapshot,
	);

	const contextItems = useMemo(() => {
		return parseContextItems(contextVaultSnapshot);
	}, [contextVaultSnapshot]);

	const enabledItems = contextItems.filter(item => item.enabled);
	const disabledItems = contextItems.filter(item => !item.enabled);

	return (
		<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
			<div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
				<ContentSkillImporter />

				<ContextForm />

				<Card className="border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
					<CardHeader>
						<CardTitle>Vault Status</CardTitle>
						<p className="text-sm leading-6 text-muted-foreground">
							Enabled context will be used later to improve content generation.
						</p>
					</CardHeader>

					<CardContent className="grid gap-4 sm:grid-cols-3">
						<StatBlock label="Total" value={String(contextItems.length)} />
						<StatBlock label="Enabled" value={String(enabledItems.length)} />
						<StatBlock label="Disabled" value={String(disabledItems.length)} />
					</CardContent>
				</Card>
			</div>

			<div className="space-y-8">
				<ContextList
					title="Enabled Context"
					description="These items are active and ready to influence future generations."
					items={enabledItems}
					emptyMessage="No enabled context yet."
				/>

				<ContextList
					title="Disabled Context"
					description="These items are saved but currently turned off."
					items={disabledItems}
					emptyMessage="No disabled context yet."
				/>
			</div>
		</div>
	);
}

function ContextForm() {
	const [title, setTitle] = useState('');
	const [type, setType] = useState<ContextItemType>('brand');
	const [body, setBody] = useState('');

	function handleAddContext(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!title.trim() || !body.trim()) {
			toast.error('Context needs a title and body.');
			return;
		}

		addContextItem({
			title: title.trim(),
			type,
			body: body.trim(),
		});

		toast.success('Context saved', {
			description: 'This item was added to your Context Vault.',
		});

		setTitle('');
		setType('brand');
		setBody('');
	}

	function loadExample() {
		setTitle('Same-day garage door repair');
		setType('offer');
		setBody(
			'We offer same-day garage door repair when available for broken springs, stuck doors, opener problems, noisy doors, and safety issues in Aptos, Santa Cruz, Capitola, and nearby areas.',
		);
	}

	return (
		<Card className="border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
			<CardHeader>
				<CardTitle>Add Context</CardTitle>
				<p className="text-sm leading-6 text-muted-foreground">
					Add reusable rules, offers, notes, reviews, FAQs, and service details.
				</p>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleAddContext} className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="context-title">Title</Label>
						<Input
							id="context-title"
							placeholder="Example: Same-day garage door repair"
							value={title}
							onChange={event => setTitle(event.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label>Type</Label>
						<Select
							value={type}
							onValueChange={value => setType(value as ContextItemType)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select context type" />
							</SelectTrigger>

							<SelectContent>
								{contextTypes.map(contextType => (
									<SelectItem key={contextType} value={contextType}>
										{contextTypeLabels[contextType]}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="context-body">Context</Label>
						<Textarea
							id="context-body"
							className="min-h-40"
							placeholder="Write the exact information LocalProof should remember..."
							value={body}
							onChange={event => setBody(event.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
						<Button type="submit">
							<Plus className="mr-2 size-4" />
							Add Context
						</Button>

						<Button type="button" variant="outline" onClick={loadExample}>
							Load Example
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

function ContextList({
	title,
	description,
	items,
	emptyMessage,
}: {
	title: string;
	description: string;
	items: ContextItem[];
	emptyMessage: string;
}) {
	return (
		<Card className="border-white/10 bg-white/[0.04] shadow-sm backdrop-blur">
			<CardHeader>
				<div className="flex items-start justify-between gap-4">
					<div>
						<CardTitle>{title}</CardTitle>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{description}
						</p>
					</div>

					<Badge variant="secondary">{items.length}</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{items.length === 0 ? (
					<div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
						<div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/[0.04]">
							<FileText className="size-5" />
						</div>

						<p className="text-sm leading-7 text-muted-foreground">
							{emptyMessage}
						</p>
					</div>
				) : (
					items.map(item => <ContextCard key={item.id} item={item} />)
				)}
			</CardContent>
		</Card>
	);
}

function ContextCard({ item }: { item: ContextItem }) {
	function handleToggle() {
		toggleContextItem(item.id);

		toast.success(item.enabled ? 'Context disabled' : 'Context enabled');
	}

	function handleDelete() {
		deleteContextItem(item.id);

		toast.success('Context deleted');
	}

	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
			<div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
				<div>
					<div className="mb-3 flex flex-wrap gap-2">
						<Badge variant={item.enabled ? 'default' : 'secondary'}>
							{contextTypeLabels[item.type]}
						</Badge>

						<Badge variant="outline">
							{item.enabled ? 'Enabled' : 'Disabled'}
						</Badge>
					</div>

					<h3 className="text-xl font-bold">{item.title}</h3>
				</div>

				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={handleToggle}>
						{item.enabled ? (
							<>
								<CheckCircle2 className="mr-2 size-4" />
								On
							</>
						) : (
							<>
								<Circle className="mr-2 size-4" />
								Off
							</>
						)}
					</Button>

					<Button variant="outline" size="sm" onClick={handleDelete}>
						<Trash2 className="mr-2 size-4" />
						Delete
					</Button>
				</div>
			</div>

			<p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
				{item.body}
			</p>

			<div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
				<Power className="size-3.5" />
				{item.enabled
					? 'This context is active.'
					: 'This context is saved but inactive.'}
			</div>
		</div>
	);
}

function StatBlock({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="mt-2 text-3xl font-bold">{value}</p>
		</div>
	);
}
