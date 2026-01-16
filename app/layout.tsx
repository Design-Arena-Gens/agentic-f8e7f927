import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic QA Assistant",
  description:
    "Autonomous QA companion for planning, prioritizing, and orchestrating software test strategy."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
