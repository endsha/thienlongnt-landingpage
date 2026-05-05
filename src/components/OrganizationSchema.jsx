import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://gianguyenkhanhhoa.vn';

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: 'Công ty TNHH Xây dựng và Thương mại Gia Nguyên',
  alternateName: 'Gia Nguyên',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-default.jpg`,
  description:
    'Đơn vị tư vấn, thí nghiệm chuyên ngành xây dựng (LAS-XD), kiểm định chất lượng và thi công công trình tại Khánh Hòa và khu vực Nam Trung Bộ.',
  telephone: '+84-908-700-009',
  email: 'lienhe@gianguyenkhanhhoa.vn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Số 6 đường Lê Nại',
    addressLocality: 'Phường Bảo An',
    addressRegion: 'Khánh Hòa',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 11.59429,
    longitude: 108.95203,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:30',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+84-908-700-009',
      contactType: 'customer service',
      email: 'lienhe@gianguyenkhanhhoa.vn',
      areaServed: 'VN',
      availableLanguage: ['Vietnamese'],
    },
  ],
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Khánh Hòa, Nam Trung Bộ, Việt Nam',
  },
  knowsAbout: [
    'Thí nghiệm vật liệu xây dựng',
    'Kiểm định chất lượng công trình',
    'Khảo sát địa chất',
    'Thi công xây dựng',
    'Tư vấn giám sát',
  ],
};

const ORGANIZATION_JSON = JSON.stringify(ORGANIZATION);

export default function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{ORGANIZATION_JSON}</script>
    </Helmet>
  );
}
