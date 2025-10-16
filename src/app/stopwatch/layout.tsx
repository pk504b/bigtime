import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stopwatch",
  openGraph: {
    title: "Stopwatch - Track Every Moment",
    description: "Track your time with Bigtime's Stopwatch. Record timestamps.",
  },
  twitter: {
    title: "Stopwatch - Track Every Moment",
    description: "Track your time with Bigtime's Stopwatch. Record timestamps.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
