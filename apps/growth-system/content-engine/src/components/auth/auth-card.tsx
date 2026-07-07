'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthCardProps = {
	mode: 'login' | 'signup';
};

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function AuthCard({ mode }: AuthCardProps) {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();

	const isSignup = mode === 'signup';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [state, setState] = useState<SubmitState>('idle');
	const [message, setMessage] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setState('loading');
		setMessage('');

		if (!email || !password) {
			setState('error');
			setMessage('Please enter your email and password.');
			toast.error('Missing email or password');
			return;
		}

		if (password.length < 6) {
			setState('error');
			setMessage('Password must be at least 6 characters.');
			toast.error('Password is too short');
			return;
		}

		if (isSignup) {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/onboarding`,
				},
			});

			if (error) {
				setState('error');
				setMessage(error.message);
				toast.error('Signup failed', {
					description: error.message,
				});
				return;
			}

			setState('success');
			setMessage(
				'Account created. Check your email to confirm your account, then return here to log in.',
			);

			toast.success('Account created', {
				description: 'Check your email to confirm your LocalProof account.',
			});

			return;
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setState('error');
			setMessage(error.message);
			toast.error('Login failed', {
				description: error.message,
			});
			return;
		}

		setState('success');
		setMessage('Logged in successfully.');

		toast.success('Logged in', {
			description: 'Taking you to your dashboard.',
		});

		window.setTimeout(() => {
			router.push('/dashboard');
			router.refresh();
		}, 600);
	}

	return (
		<Card className="mx-auto w-full max-w-md overflow-hidden shadow-sm">
			<CardHeader className="border-b bg-muted/30 text-center">
				<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-background">
					{isSignup ? (
						<Sparkles className="size-5" />
					) : (
						<LockKeyhole className="size-5" />
					)}
				</div>

				<Badge variant="secondary" className="mx-auto mb-3 w-fit">
					{isSignup ? 'Start your workspace' : 'Welcome back'}
				</Badge>

				<CardTitle className="text-3xl">
					{isSignup
						? 'Create your LocalProof account.'
						: 'Log in to LocalProof.'}
				</CardTitle>

				<p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
					{isSignup
						? 'Create an account so your content system can move from local demo mode into a real saved workspace.'
						: 'Log in to continue working on your LocalProof content system.'}
				</p>
			</CardHeader>

			<CardContent className="space-y-5 p-6">
				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="At least 6 characters"
							value={password}
							onChange={event => setPassword(event.target.value)}
						/>
					</div>

					<Button className="w-full" disabled={state === 'loading'}>
						{state === 'loading'
							? 'Working...'
							: isSignup
								? 'Create Account'
								: 'Log In'}
					</Button>
				</form>

				{message ? (
					<div
						className={
							state === 'error'
								? 'rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive'
								: 'rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground'
						}
					>
						<p className="font-medium">
							{state === 'success' && isSignup
								? 'Check your email'
								: state === 'success'
									? 'Success'
									: 'Something went wrong'}
						</p>

						<p className="mt-2 leading-6">{message}</p>

						{state === 'success' && isSignup ? (
							<div className="mt-4 grid gap-2">
								<Button className="w-full" asChild>
									<Link href="/login">
										Go to Login
										<ArrowRight className="ml-2 size-4" />
									</Link>
								</Button>

								<Button variant="outline" className="w-full" asChild>
									<Link href="/onboarding">Continue in Demo Mode</Link>
								</Button>
							</div>
						) : null}
					</div>
				) : null}

				<div className="rounded-2xl border bg-muted/30 p-4">
					<p className="text-sm font-semibold">Still want demo mode?</p>
					<p className="mt-2 text-sm leading-6 text-muted-foreground">
						You can keep using the local demo in this browser while we finish
						database-backed profiles and saved packs.
					</p>

					<Button className="mt-4 w-full" variant="outline" asChild>
						<Link href={isSignup ? '/onboarding' : '/dashboard'}>
							{isSignup ? 'Continue Demo Setup' : 'Open Demo Dashboard'}
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</div>

				<div className="text-center text-sm text-muted-foreground">
					{isSignup ? (
						<>
							Already have an account?{' '}
							<Link href="/login" className="font-medium text-foreground">
								Log in
							</Link>
						</>
					) : (
						<>
							New to LocalProof?{' '}
							<Link href="/signup" className="font-medium text-foreground">
								Start free
							</Link>
						</>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
