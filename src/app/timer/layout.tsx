import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Timer",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Timer - Set and Track Time",
    description: "Effortlessly set and manage countdowns with Bigtime's Timer. Scroll to adjust time and stay on top of your tasks.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Timer - Set and Track Time",
    description: "Effortlessly set and manage countdowns with Bigtime's Timer. Scroll to adjust time and stay on top of your tasks.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
