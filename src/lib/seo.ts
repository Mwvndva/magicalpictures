export const SITE_URL = 'https://magicalpicturesproductions.com';
export const SITE_NAME = 'Magical Pictures Productions';
export const DEFAULT_OG_IMAGE = '/assets/hero-poster.jpg';

export const SOCIAL_LINKS = [
  'https://www.facebook.com/share/1BqkE5K5FL/?mibextid=wwXIfr',
  'https://x.com/magicalpkenya?s=21',
  'https://www.instagram.com/magical_pictures_productions?igsh=MXdlcHEwY2lyb3ZtbQ==',
  'https://youtube.com/@magicalpicturesproductions5452?si=HQDux0VALQJgyQX6',
];

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/assets/hero-poster.jpg`,
  logo: `${SITE_URL}/assets/logo/logo.png`,
  telephone: '+254790108410',
  email: 'talktomagicalpictures@gmail.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    addressCountry: 'KE',
  },
  areaServed: [
    { '@type': 'City', name: 'Nairobi' },
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Place', name: 'East Africa' },
  ],
  sameAs: SOCIAL_LINKS,
  description:
    'Nairobi-based photography, videography, video production, event coverage, documentary, commercial, live streaming, drone coverage, animation, and digital marketing studio.',
  knowsAbout: [
    'Photography in Nairobi',
    'Videography in Nairobi',
    'Video production in Kenya',
    'Corporate videography',
    'Event photography',
    'Wedding photography',
    'Documentary production',
    'Commercial video production',
    'Live streaming',
    'Drone coverage',
    'Motion graphics',
  ],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-KE',
  publisher: { '@id': `${SITE_URL}/#business` },
};
