import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Local Lead OS — Done-For-You Local Lead Systems",
  description: "We build practical lead-generation assets for realtors, contractors, and home-service businesses — landing pages, local content plans, lead magnets, review systems, and follow-up scripts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
