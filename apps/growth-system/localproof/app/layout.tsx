import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalProof — One job note. A week of local content.",
  description: "Describe what you fixed today. LocalProof writes your Google post, Facebook update, Instagram caption, video script, and more — in your voice, for your area, ready to copy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
