import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Shell } from "@/components/shell";
import { Sidebar } from "@/components/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TSK - Your Second Brain",
  description: "AI-powered Second Brain app for personal knowledge management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Shell>
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </Shell>
      </body>
    </html>
  );
}


