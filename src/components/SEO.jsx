import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Thiên Long Ninh Thuận';
const SITE_URL = 'https://thienlongninhthuan.com';
const DEFAULT_TITLE = 'Thiên Long Ninh Thuận — Tư vấn & Thí nghiệm chuyên ngành xây dựng';
const DEFAULT_DESCRIPTION =
  'Công ty TNHH Xây dựng và Thương mại Thiên Long Ninh Thuận — đơn vị thí nghiệm, kiểm định và thi công xây dựng tại Khánh Hòa. LAS-XD, đạt chuẩn TCVN.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

function resolveOgImage(image) {
  if (/^https?:\/\//.test(image)) return image;
  return new URL(image, SITE_URL).href;
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
}) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const ogImage = resolveOgImage(image);
  const schemaJson = useMemo(() => {
    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    return schemas.map((schema) => JSON.stringify(schema));
  }, [jsonLd]);

  return (
    <Helmet>
      <html lang="vi" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="vi_VN" />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemaJson.map((json, i) => (
        <script key={i} type="application/ld+json">
          {json}
        </script>
      ))}
    </Helmet>
  );
}
