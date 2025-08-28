import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nasrul Irfan - Full-Stack Developer",
    template: "%s | Nasrul Irfan - Full-Stack Developer"
  },
  description: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Nasrul Irfan",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Developer Malaysia",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "Software Engineer",
    "Web Development",
    "Portfolio"
  ],
  authors: [{ name: "Nasrul Irfan", url: "https://nasrul.dev" }],
  creator: "Nasrul Irfan",
  publisher: "Nasrul Irfan",
  metadataBase: new URL("https://nasrul.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasrul.dev",
    siteName: "Nasrul Irfan Portfolio",
    title: "Nasrul Irfan - Full-Stack Developer",
    description: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specializing in React, Next.js, Node.js, and modern web technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nasrul Irfan - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasrul Irfan - Full-Stack Developer",
    description: "Passionate full-stack developer with 5+ years of experience building scalable web applications.",
    images: ["/og-image.png"],
    creator: "@nasrulirfan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
