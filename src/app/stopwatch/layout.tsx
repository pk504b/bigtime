import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Stopwatch",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Stopwatch - Track Every Moment",
    description: "Track your time with Bigtime's Stopwatch. Record timestamps.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Stopwatch - Track Every Moment",
    description: "Track your time with Bigtime's Stopwatch. Record timestamps.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
