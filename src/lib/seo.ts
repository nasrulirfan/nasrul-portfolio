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
  const defaultTitle = "Wan Nasrul Irfan - Senior Software Engineer";
  const defaultDescription = "Senior software engineer with 7+ years of experience building full-stack platforms, microservices, and AI-assisted delivery workflows with Python, Laravel, Next.js, and AWS.";
  
  const seoTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  
  const baseUrl = "https://nasrul.dev";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Wan Nasrul Irfan",
      "Senior Software Engineer",
      "Platform Engineer",
      "Python Developer",
      "Laravel Developer",
      "Next.js Developer",
      "AWS Developer",
      "Kubernetes Engineer",
      "Software Engineer Malaysia",
      "AI-Assisted Software Engineering",
      "Microservices Architecture",
      "Software Engineer",
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
    jobTitle: "Senior Software Engineer",
    description: "Senior software engineer building full-stack platforms, microservices, and AI-assisted delivery workflows.",
    image: "https://nasrul.dev/nasrul-memoji-400.png",
    sameAs: [
      "https://github.com/nasrulirfan",
      "https://linkedin.com/in/nasrulirfan",
      "https://twitter.com/nasrulirfan",
    ],
    knowsAbout: [
      "Python",
      "Laravel",
      "Next.js",
      "React",
      "AWS",
      "Kubernetes",
      "Platform Engineering",
      "Microservices Architecture",
      "AI-Assisted Software Delivery",
      "Software Engineering",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Omnicom Group",
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
    description: "Professional portfolio of Wan Nasrul Irfan, a senior software engineer focused on platform systems, full-stack delivery, and AI-assisted workflows.",
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
