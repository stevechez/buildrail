import type { ContextItem, ContextItemType } from '@/types';

export const CONTEXT_VAULT_STORAGE_KEY = 'localproof-context-vault';

export const contextTypeLabels: Record<ContextItemType, string> = {
	brand: 'Brand',
	offer: 'Offer',
	service: 'Service',
	customer: 'Customer',
	review: 'Review',
	faq: 'FAQ',
	rule: 'Rule',
	platform: 'Platform',
	local: 'Local',
};

export const contextTypes: ContextItemType[] = [
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

export function createContextItemId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `context-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function canUseStorage() {
	return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function getContextItems(): ContextItem[] {
	if (!canUseStorage()) {
		return [];
	}

	const rawItems = window.localStorage.getItem(CONTEXT_VAULT_STORAGE_KEY);

	if (!rawItems) {
		return [];
	}

	try {
		const parsedItems = JSON.parse(rawItems);

		if (!Array.isArray(parsedItems)) {
			return [];
		}

		return parsedItems as ContextItem[];
	} catch {
		return [];
	}
}

export function saveContextItems(items: ContextItem[]) {
	if (!canUseStorage()) {
		return;
	}

	window.localStorage.setItem(CONTEXT_VAULT_STORAGE_KEY, JSON.stringify(items));

	window.dispatchEvent(new Event('localproof-context-vault-updated'));
}

export function addContextItem({
	title,
	type,
	body,
}: {
	title: string;
	type: ContextItemType;
	body: string;
}) {
	const now = new Date().toISOString();

	const newItem: ContextItem = {
		id: createContextItemId(),
		title,
		type,
		body,
		enabled: true,
		createdAt: now,
		updatedAt: now,
	};

	const nextItems = [newItem, ...getContextItems()];

	saveContextItems(nextItems);

	return newItem;
}

export function toggleContextItem(id: string) {
	const nextItems = getContextItems().map(item => {
		if (item.id !== id) {
			return item;
		}

		return {
			...item,
			enabled: !item.enabled,
			updatedAt: new Date().toISOString(),
		};
	});

	saveContextItems(nextItems);

	return nextItems;
}

export function deleteContextItem(id: string) {
	const nextItems = getContextItems().filter(item => item.id !== id);

	saveContextItems(nextItems);

	return nextItems;
}

export function getEnabledContextItems() {
	return getContextItems().filter(item => item.enabled);
}
