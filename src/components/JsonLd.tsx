'use client';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface Props {
  organizationSchema?: boolean;
  websiteSchema?: boolean;
  webPageSchema?: boolean;
  breadcrumbSchema?: {
    items: BreadcrumbItem[];
  };
  title?: string;
  description?: string;
  logoUrl?: string;
  sameAs?: string[];
}

export default function JsonLd({
  organizationSchema = true,
  websiteSchema = true,
  webPageSchema = true,
  breadcrumbSchema,
  title,
  description,
  logoUrl = 'https://hmtc-its.com/favicon256x256.png',
  sameAs = [
    'https://www.instagram.com/hmtc_its/',
    'https://arek.its.ac.id/hmtc/',
  ],
}: Props) {
  const pathname = usePathname();
  const url = `https://hmtc-its.com${pathname}`;

  return (
    <>
      {organizationSchema && (
        <Script
          id='ld-org'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Himpunan Mahasiswa Teknik Computer ITS',
              alternateName: 'HMTC ITS',
              url: 'https://hmtc-its.com',
              logo: logoUrl,
              sameAs,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Surabaya',
                addressRegion: 'Jawa Timur',
                addressCountry: 'ID',
              },
            }),
          }}
        />
      )}

      {websiteSchema && (
        <Script
          id='ld-website'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://hmtc-its.com',
              name: 'HMTC ITS',
              alternateName: 'Himpunan Mahasiswa Teknik Computer ITS',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://hmtc-its.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      )}

      {webPageSchema && title && description && (
        <Script
          id='ld-webpage'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              url,
              name: title,
              description,
              inLanguage: 'id',
              isPartOf: { '@type': 'WebSite', url: 'https://hmtc-its.com' },
            }),
          }}
        />
      )}

      {breadcrumbSchema && (
        <Script
          id='ld-breadcrumb'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbSchema.items.map((item, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: item.name,
                item: item.item,
              })),
            }),
          }}
        />
      )}
    </>
  );
}
