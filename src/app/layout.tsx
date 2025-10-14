import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Rubik } from "next/font/google";

export const metadata: Metadata = {
  title: "Bigtime",
  description: "Big simple clock",
};

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${rubik.className} h-screen flex flex-col bg-hintofyellow`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Navigation />
      </body>
    </html>
  );
}
