import Link from "next/link";

const BoltIcon = () => (
  <svg className="w-3.5 h-3.5 text-void" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L4.09 12.97A1 1 0 005 14.5h6.5L10 22l9.91-10.97A1 1 0 0019 10h-6.5L13 2z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-rim">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-orange flex items-center justify-center">
                <BoltIcon />
              </div>
              <span className="text-sm font-bold text-chalk">
                Contractor<span className="text-orange">Pro</span>
              </span>
            </div>
            <p className="text-xs text-fog leading-relaxed mb-4">
              Premium, conversion-optimized digital assets built specifically for elite home service professionals. Stop losing high-ticket leads to inferior competitors.
            </p>
            <Link href="/start" className="text-sm font-semibold text-chalk hover:text-orange flex items-center gap-1">
              Start your build →
            </Link>
          </div>

          {[
            {
              group: "Platform",
              links: [["Services", "/how-it-works"], ["Testimonials", "/#testimonials"], ["Pricing", "/pricing"], ["Apply Now", "/start"]],
            },
            {
              group: "Industries",
              links: [["General Contractors", "/start"], ["Painters", "/start"], ["Landscapers", "/start"], ["Handyman Services", "/start"]],
            },
            {
              group: "Company",
              links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Contact Support", "/start"]],
            },
          ].map((col) => (
            <div key={col.group}>
              <div className="text-xs font-bold text-chalk uppercase tracking-widest mb-4">{col.group}</div>
              <div className="flex flex-col gap-2">
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} className="text-sm text-fog hover:text-chalk">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-rim mt-10 pt-5 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-xs text-fog opacity-50">© 2025 BuildRail Sites. All rights reserved.</p>
          <p className="text-xs text-fog opacity-50">sites.buildrail.com</p>
        </div>
      </div>
    </footer>
  );
}
