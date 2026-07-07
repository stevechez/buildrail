'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { CheckCircle2, PlusCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import type { ContextItem } from '@/types';
import { contextSkillPresets } from '@/lib/context-skill-presets';
import { CONTEXT_VAULT_STORAGE_KEY } from '@/lib/context-vault-storage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function createId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `context-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

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

function readContextItems(): ContextItem[] {
	return parseContextItems(getContextVaultSnapshot());
}

function writeContextItems(items: ContextItem[]) {
	window.localStorage.setItem(CONTEXT_VAULT_STORAGE_KEY, JSON.stringify(items));
	window.dispatchEvent(new Event('localproof-context-vault-updated'));
}

export function ContentSkillImporter() {
	const contextVaultSnapshot = useSyncExternalStore(
		subscribeToContextVault,
		getContextVaultSnapshot,
		getContextVaultServerSnapshot,
	);

	const contextItems = useMemo(() => {
		return parseContextItems(contextVaultSnapshot);
	}, [contextVaultSnapshot]);

	const importedTitles = useMemo(() => {
		return new Set(contextItems.map(item => item.title));
	}, [contextItems]);

	function importSkill(skillId: string) {
		const skill = contextSkillPresets.find(preset => preset.id === skillId);

		if (!skill) {
			return;
		}

		const currentItems = readContextItems();
		const alreadyImported = currentItems.some(
			item => item.title === skill.title,
		);

		if (alreadyImported) {
			toast.info('Skill already imported', {
				description: `${skill.title} is already in your Context Vault.`,
			});
			return;
		}

		const now = new Date().toISOString();

		const newItem: ContextItem = {
			id: createId(),
			type: skill.type,
			title: skill.title,
			body: skill.body,
			enabled: true,
			createdAt: now,
			updatedAt: now,
		};

		const nextItems = [newItem, ...currentItems];

		writeContextItems(nextItems);

		toast.success('Content skill imported', {
			description: `${skill.title} is now active in your Context Vault.`,
		});
	}

	return (
		<Card className="overflow-hidden border-[#5B74FF]/30 bg-[linear-gradient(180deg,rgba(95,182,255,0.08)_0%,rgba(10,16,34,0.98)_42%,rgba(10,16,34,1)_100%)] shadow-[0_0_35px_rgba(91,116,255,0.14)]">
			<CardHeader className="border-b border-white/10 bg-white/[0.03] p-5">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
					<div>
						<Badge variant="secondary" className="mb-3">
							Prebuilt Skills
						</Badge>

						<CardTitle className="text-2xl">Import AI content skills</CardTitle>

						<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
							Add proven content rules to your Context Vault. Imported skills
							are enabled automatically and used by the generator.
						</p>
					</div>

					<div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted-foreground">
						<Sparkles className="size-3.5" />
						{contextSkillPresets.length} skills
					</div>
				</div>
			</CardHeader>

			<CardContent className="grid gap-3 p-5 md:grid-cols-2">
				{contextSkillPresets.map(skill => {
					const imported = importedTitles.has(skill.title);

					return (
						<div
							key={skill.id}
							className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
						>
							<div className="mb-3 flex flex-wrap items-center gap-2">
								<Badge variant="outline">{skill.tag}</Badge>
								{imported ? <Badge variant="secondary">Imported</Badge> : null}
							</div>

							<p className="font-semibold">{skill.title}</p>

							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								{skill.description}
							</p>

							<Button
								type="button"
								variant={imported ? 'outline' : 'default'}
								className="mt-4 w-full"
								onClick={() => importSkill(skill.id)}
								disabled={imported}
							>
								{imported ? (
									<>
										<CheckCircle2 className="mr-2 size-4" />
										Imported
									</>
								) : (
									<>
										<PlusCircle className="mr-2 size-4" />
										Import Skill
									</>
								)}
							</Button>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
