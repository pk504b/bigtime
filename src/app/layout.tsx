import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Rubik } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://bigtime.pw"),
  title: {
    default: "Bigtime",
    template: "%s • Bigtime",
  },
  description: "The big simple clock",
  keywords: ["clock", "world clock", "timer", "stopwatch", "pomodoro", "time", "tracking"],
  openGraph: {
    type: "website",
    url: "https://bigtime.pw",
    title: "Bigtime",
    description: "The big simple clock",
    siteName: "Bigtime",
    images: [
      {
        url: "https://bigtime.pw/og-card.png",
        width: 1200,
        height: 630,
        alt: "Bigtime",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bigtime",
    description: "The big simple clock",
    images: [
      {
        url: "https://bigtime.pw/og-card.png",
        width: 1200,
        height: 630,
        alt: "Bigtime",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://bigtime.pw",
  },
};

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="apple-mobile-web-app-title" content="Bigtime" />
      </head>
      <body
        className={`${rubik.className} h-screen flex flex-col bg-hintofyellow text-midnight dark:bg-midnight dark:text-lightbrigtgreen`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Navigation />
      </body>
    </html>
  );
}
