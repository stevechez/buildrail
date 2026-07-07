import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildRail",
  description: "The connected operating system for modern contractors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
