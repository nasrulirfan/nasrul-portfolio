import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono", 
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Wan Nasrul Irfan - Full-Stack Developer",
    template: "%s | Wan Nasrul Irfan - Full-Stack Developer"
  },
  description: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Wan Nasrul Irfan",
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
  authors: [{ name: "Wan Nasrul Irfan", url: "https://nasrul.dev" }],
  creator: "Wan Nasrul Irfan",
  publisher: "Wan Nasrul Irfan",
  metadataBase: new URL("https://nasrul.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasrul.dev",
    siteName: "Wan Nasrul Irfan Portfolio",
    title: "Wan Nasrul Irfan - Full-Stack Developer",
    description: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specializing in React, Next.js, Node.js, and modern web technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wan Nasrul Irfan - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wan Nasrul Irfan - Full-Stack Developer",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
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
