'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	MessageSquare,
	Send,
	CheckCircle2,
	Loader2,
	ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import VerdictReport from '@/components/VerdictReport';

export default function ContractorSharePage({
	params,
}: {
	params: { id: string };
}) {
	const [reportData, setReportData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [testQuestions, setTestQuestions] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const searchParams = useSearchParams();
	const supabase = createClient();
	const encodedEmail = searchParams.get('ref');

	// Decode contractor name for the notification and UI
	let contractorName = 'Partner';
	if (encodedEmail) {
		try {
			contractorName = atob(encodedEmail).split('@')[0];
		} catch (e) {}
	}

	useEffect(() => {
		async function fetchReport() {
			const { data, error } = await supabase
				.from('verdicts')
				.select('*')
				.eq('id', params.id)
				.single();

			if (!error) setReportData(data);
			setLoading(false);
		}
		fetchReport();
	}, [params.id, supabase]);

	// --- INTEGRATED LOGIC ---
	const handleSubmitQuestions = async () => {
		if (testQuestions.length < 10) {
			toast.error('Please enter your test questions.');
			return;
		}

		setIsSubmitting(true);
		try {
			const currentMetadata = reportData?.metadata || {};

			// 1. Save to Database
			const { error: dbError } = await supabase
				.from('verdicts')
				.update({
					metadata: {
						...currentMetadata,
						contractor_test_questions: testQuestions,
					} as any,
				})
				.eq('id', params.id);

			if (dbError) throw dbError;

			// 2. Trigger Automated Notification (Edge Function)
			await supabase.functions.invoke('notify-feedback', {
				body: {
					auditId: params.id,
					address: reportData.assessments?.title || 'Residential Site',
					questions: testQuestions,
					contractorName: contractorName,
				},
			});

			setSubmitted(true);
			toast.success('Alpha Feedback Logged!');
		} catch (err: null | unknown) {
			console.error('Submission Error:', err);
			toast.error('Error: ' + (toast.message || 'Submission failed'));
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading)
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="animate-spin text-blue-600" />
			</div>
		);

	if (!reportData)
		return (
			<div className="flex h-screen items-center justify-center text-slate-500">
				<ShieldCheck className="mr-2" /> Report not found.
			</div>
		);

	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<div className="bg-blue-600 py-3 px-6 text-white text-center shadow-md no-print">
				<p className="text-xs font-bold uppercase tracking-widest">
					Welcome, {contractorName} • SiteVerdict Alpha Portal
				</p>
			</div>

			<main className="py-8">
				<VerdictReport data={reportData} isPublicView={true} />
			</main>

			{/* FEEDBACK SECTION */}
			<div className="max-w-4xl mx-auto px-6 no-print">
				<div className="bg-white border-2 border-dashed border-blue-200 rounded-3xl p-8 shadow-sm">
					<div className="flex items-center gap-3 mb-4">
						<MessageSquare className="w-5 h-5 text-blue-600" />
						<h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
							Alpha Test: 5 Questions
						</h3>
					</div>

					{!submitted ? (
						<div className="space-y-4">
							<Textarea
								placeholder="Type your technical test questions here..."
								className="min-h-[200px] rounded-2xl border-slate-200 focus:ring-blue-600"
								value={testQuestions}
								onChange={e => setTestQuestions(e.target.value)}
							/>
							<Button
								onClick={handleSubmitQuestions}
								disabled={isSubmitting}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl shadow-lg"
							>
								{isSubmitting
									? 'Sending Feedback...'
									: 'Submit 5-Question Test'}
								<Send className="ml-2 w-4 h-4" />
							</Button>
						</div>
					) : (
						<div className="text-center py-6 animate-in fade-in zoom-in duration-500">
							<CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
							<p className="font-bold text-slate-900 text-lg uppercase tracking-tight">
								Feedback Logged
							</p>
							<p className="text-sm text-slate-500 mt-1">
								Dunn Strategic Consulting has been notified. Thank you.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
