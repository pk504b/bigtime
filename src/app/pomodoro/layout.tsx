import { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Pomodoro",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Pomodoro - Focus & Productivity",
    description: "Boost your productivity with Bigtime's Pomodoro. Work in 25-minute intervals with 5-minute breaks for optimal focus.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Pomodoro - Focus & Productivity",
    description: "Boost your productivity with Bigtime's Pomodoro. Work in 25-minute intervals with 5-minute breaks for optimal focus.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
