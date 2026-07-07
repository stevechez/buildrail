/**
 * The BuildRail product catalog shown on the dashboard (docs/platform/
 * identity-foundation.md's "Available Products Displayed" step). Each
 * product is a separate Next.js app sharing this same Supabase project and
 * (in production, via NEXT_PUBLIC_COOKIE_DOMAIN) the same session cookie —
 * clicking through here doesn't require a second login.
 *
 * URLs are env-configurable per product so each deploys to its own
 * subdomain in production (e.g. field.buildrail.app) while still working
 * against local dev ports.
 */
export interface Product {
	id: string;
	name: string;
	description: string;
	url: string;
}

export function getProducts(): Product[] {
	return [
		{
			id: "field",
			name: "Field",
			description: "AI-structured crew messaging, change orders, and client portals.",
			url: process.env.NEXT_PUBLIC_FIELD_URL ?? "http://localhost:3001",
		},
		{
			id: "estimator",
			name: "Estimator",
			description: "AI-assisted estimating and instant quote tools.",
			url: process.env.NEXT_PUBLIC_ESTIMATOR_URL ?? "http://localhost:3002",
		},
		{
			id: "siteverdict",
			name: "SiteVerdict",
			description: "AI inspection, compliance, and audit reporting.",
			url: process.env.NEXT_PUBLIC_SITEVERDICT_URL ?? "http://localhost:3003",
		},
		{
			id: "vault",
			name: "Vault",
			description: "Secure project document storage and retrieval.",
			url: process.env.NEXT_PUBLIC_VAULT_URL ?? "http://localhost:3004",
		},
	];
}
