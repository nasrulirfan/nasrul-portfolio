import { Metadata } from "next";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = "/og-image.png",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const defaultTitle = "Wan Nasrul Irfan - Full-Stack Developer";
  const defaultDescription = "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specializing in React, Next.js, Node.js, and modern web technologies.";
  
  const seoTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  
  const baseUrl = "https://nasrul.dev";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  return {
    title: seoTitle,
    description: seoDescription,
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
      "Portfolio",
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl || "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: fullUrl,
      siteName: "Wan Nasrul Irfan Portfolio",
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
      creator: "@nasrulirfan",
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
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
  };
}

// Structured data for rich snippets
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wan Nasrul Irfan",
    url: "https://nasrul.dev",
    jobTitle: "Full-Stack Developer",
    description: "Passionate full-stack developer with 5+ years of experience building scalable web applications.",
    image: "https://nasrul.dev/profile-image.jpg",
    sameAs: [
      "https://github.com/nasrulirfan",
      "https://linkedin.com/in/nasrulirfan",
      "https://twitter.com/nasrulirfan",
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Full-Stack Development",
      "Web Development",
      "Software Engineering",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MY",
      addressLocality: "Malaysia",
    },
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wan Nasrul Irfan Portfolio",
    url: "https://nasrul.dev",
    description: "Professional portfolio of Wan Nasrul Irfan, a full-stack developer specializing in modern web technologies.",
    author: {
      "@type": "Person",
      name: "Wan Nasrul Irfan",
    },
    publisher: {
      "@type": "Person",
      name: "Wan Nasrul Irfan",
    },
  };
}