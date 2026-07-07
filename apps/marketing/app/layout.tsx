import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildRail — The Operating System for Contractor Businesses",
  description: "Six products. One ecosystem. Built to serve contractors from the first missed call to the last coat of paint — and every stage in between. Explore the complete BuildRail platform.",
  openGraph: {
    title: "BuildRail Ecosystem",
    description: "Six products built for the complete contractor lifecycle.",
    siteName: "BuildRail",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
