import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildRail Sites — Stop Losing $10K+ Jobs to Contractors With Better Websites",
  description: "We build your entire contractor website in 48 hours — so you look premium, rank on Google, and win higher-paying clients. One-time $2,499. Zero subscriptions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark"><body>{children}</body></html>
  );
}
