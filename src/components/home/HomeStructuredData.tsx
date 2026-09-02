import { buildHomeStructuredData } from "@/lib/seo/home-structured-data";

export function HomeStructuredData() {
  const data = buildHomeStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
