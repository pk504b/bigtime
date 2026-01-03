import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.bigtime.pw"),
  title: "Bigtime",
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
        url: "https://www.bigtime.pw/social-preview.png",
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
        url: "https://www.bigtime.pw/social-preview.png",
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
    canonical: "https://www.bigtime.pw",
  },
};