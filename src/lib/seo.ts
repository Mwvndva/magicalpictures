import { PORTFOLIO_CATEGORIES } from './constants';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
  type: 'website' | 'article' | 'video' | 'image';
  locale: string;
}

export const seoConfig: SEOConfig = {
  title: 'Magical Lens Pictures - Professional Photography & Videography',
  description: 'Capture your special moments with professional photography and videography services. Specializing in weddings, corporate events, music videos, and documentaries.',
  keywords: [
    'photography', 'videography', 'wedding photographer', 'corporate photography', 'music video production', 'documentary filmmaker',
    'professional photographer', 'event photography', 'video production', 'film production'
  ],
  image: '/og-image.jpg',
  url: 'https://magical-lens-pictures.com',
  type: 'website',
  locale: 'en_US'
};

export const categorySEO: Record<PORTFOLIO_CATEGORIES, SEOConfig> = {
  Wedding: {
    title: 'Wedding Photography & Videography Services',
    description: 'Capture your special day with our professional wedding photography and videography services. Preserve every moment of your wedding day.',
    keywords: [
      'wedding photographer', 'wedding videographer', 'wedding photography', 'wedding video', 'wedding day photography', 'wedding videography'
    ],
    image: '/categories/wedding-og.jpg',
    url: 'https://magical-lens-pictures.com/weddings',
    type: 'website',
    locale: 'en_US'
  },
  Corporate: {
    title: 'Corporate Photography & Videography Services',
    description: 'Professional corporate photography and videography services for businesses, events, and branding.',
    keywords: [
      'corporate photographer', 'corporate videographer', 'business photography', 'event photography', 'corporate video', 'brand photography'
    ],
    image: '/categories/corporate-og.jpg',
    url: 'https://magical-lens-pictures.com/corporate',
    type: 'website',
    locale: 'en_US'
  },
  Music: {
    title: 'Music Video Production Services',
    description: 'Create professional music videos that capture the essence of your music and brand.',
    keywords: [
      'music video production', 'music video director', 'music video editor', 'music video photographer', 'music video production company'
    ],
    image: '/categories/music-og.jpg',
    url: 'https://magical-lens-pictures.com/music',
    type: 'website',
    locale: 'en_US'
  },
  Documentary: {
    title: 'Documentary Film Production Services',
    description: 'Professional documentary film production services to tell your story.',
    keywords: [
      'documentary filmmaker', 'documentary production', 'documentary photography', 'storytelling', 'film production'
    ],
    image: '/categories/documentary-og.jpg',
    url: 'https://magical-lens-pictures.com/documentary',
    type: 'website',
    locale: 'en_US'
  }
};
