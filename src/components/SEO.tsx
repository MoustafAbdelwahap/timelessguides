import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  schemas?: Record<string, unknown>[];
  noindex?: boolean;
}


const BASE_URL = "https://www.timelessguides.com";
const DEFAULT_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca74fc84-44cb-4b45-9335-7400bf36674a/id-preview-43e34c3f--a8dcd052-0fcb-44a0-8c25-746f565fab02.lovable.app-1774823097889.png";

export default function SEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt,
  type = "website",
  publishedAt,
  updatedAt,
  schemas = [],
  noindex = false,
}: SEOProps) {

  const url = `${BASE_URL}${path}`;
  const altText = imageAlt || title;

  const articleSchema = type === "article" && publishedAt ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image,
    datePublished: publishedAt,
    ...(updatedAt && { dateModified: updatedAt }),
    author: {
      "@type": "Organization",
      name: "Timeless Guides",
    },
    publisher: {
      "@type": "Organization",
      name: "Timeless Guides",
      url: BASE_URL,
    },
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Timeless Guides" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={altText} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={altText} />
      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === "article" && updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}
      {type === "article" && (
        <meta property="article:author" content="Timeless Guides" />
      )}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>

  );
}
