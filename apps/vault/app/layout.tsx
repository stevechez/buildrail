import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildRail Vault — Run Your Construction Company Like a High-Performance Firm",
  description: "BuildRail Vault centralizes client communication, approvals, payments, and field documentation into one operating system built for premium residential construction firms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
