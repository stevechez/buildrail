import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import './globals.css';

export const metadata: Metadata = {
	title: 'LocalProof',
	description: 'The AI content engine for businesses that do real work.',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				'h-full',
				'antialiased',
				geistSans.variable,
				geistMono.variable,
				'font-sans',
				inter.variable,
			)}
			suppressHydrationWarning
		>
			<body className={cn('min-h-full flex flex-col', 'antialiased')}>
				{children}
				<Toaster richColors position="top-right" />
			</body>
		</html>
	);
}
