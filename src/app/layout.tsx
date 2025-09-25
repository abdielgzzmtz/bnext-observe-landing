import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bnext Observe",
  description: "Tu operación bajo control, en un solo lugar.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Bnext Observe",
    description: "Tu operación bajo control, en un solo lugar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bnext Observe",
    description: "Tu operación bajo control, en un solo lugar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>

        <Toaster />
      </body>
    </html>
  );
}
