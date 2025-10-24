import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Clock",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Clock - Local & World Time",
    description: "View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Clock - Local & World Time",
    description: "View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
