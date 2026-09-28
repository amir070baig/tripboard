import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TripBoard — Find your somewhere", template: "%s | TripBoard" },
  description: "Thoughtful local experiences and multi-day trips, made by people who know the way.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
