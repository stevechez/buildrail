import { brand } from '@/lib/constants';

export function SiteFooter() {
	return (
		<footer className="border-t border-white/10 px-6 py-8">
			<div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
				<p>
					© {new Date().getFullYear()} {brand.name}. All rights reserved.
				</p>

				<p>Real work turned into useful local content.</p>
			</div>
		</footer>
	);
}
