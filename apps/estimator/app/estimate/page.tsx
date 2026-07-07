import { InstantEstimator } from "@/components/estimator/InstantEstimator";

export default function EstimatePage() {
  return (
    <main className="min-h-screen bg-navy px-6 py-16 sm:py-24">
      <div className="page-container">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="badge badge-amber">Instant Estimate</span>
          <h1 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            Get your project estimate in 60 seconds
          </h1>
          <p className="mt-3 text-muted">
            Answer a few quick questions and we&apos;ll give you a real cost range — no waiting on a callback.
          </p>
        </div>
        <InstantEstimator />
      </div>
    </main>
  );
}
