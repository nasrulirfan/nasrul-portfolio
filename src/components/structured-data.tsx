import { generatePersonStructuredData, generateWebsiteStructuredData } from "@/lib/seo";

export function StructuredData() {
  const personData = generatePersonStructuredData();
  const websiteData = generateWebsiteStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
    </>
  );
}