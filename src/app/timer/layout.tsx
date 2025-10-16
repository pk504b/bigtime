import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timer",
  openGraph: {
    title: "Timer - Set and Track Time",
    description: "Effortlessly set and manage countdowns with Bigtime's Timer. Scroll to adjust time and stay on top of your tasks.",
  },
  twitter: {
    title: "Timer - Set and Track Time",
    description: "Effortlessly set and manage countdowns with Bigtime's Timer. Scroll to adjust time and stay on top of your tasks.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
