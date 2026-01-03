import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Rubik } from "next/font/google";
import { baseMetadata } from "@/lib/metadata";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = baseMetadata;

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
      <GoogleAnalytics gaId="G-VH8F8CHWBM" />
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
