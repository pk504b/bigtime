import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clock",
  openGraph: {
    title: "Clock - Local & World Time",
    description: "View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.",
  },
  twitter: {
    title: "Clock - Local & World Time",
    description: "View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
