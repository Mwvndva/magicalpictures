import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig, categorySEO } from '../lib/seo';
import { PORTFOLIO_CATEGORIES } from '../lib/constants';
import { PortfolioCategory } from '../types';

interface SEOProviderProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'video' | 'image';
  category?: PortfolioCategory;
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({
  title,
  description,
  keywords,
  image,
  type,
  category,
  children
}) => {
  const baseConfig = category
    ? categorySEO[category]
    : seoConfig;

  const finalConfig = {
    title: title || baseConfig.title,
    description: description || baseConfig.description,
    keywords: keywords || baseConfig.keywords,
    image: image || baseConfig.image,
    type: type || baseConfig.type,
    url: baseConfig.url,
    locale: baseConfig.locale
  };

  return (
    <Helmet>
      <title>{finalConfig.title}</title>
      <meta name="description" content={finalConfig.description} />
      <meta name="keywords" content={finalConfig.keywords.join(', ')} />
      <meta property="og:title" content={finalConfig.title} />
      <meta property="og:description" content={finalConfig.description} />
      <meta property="og:image" content={finalConfig.image} />
      <meta property="og:url" content={finalConfig.url} />
      <meta property="og:type" content={finalConfig.type} />
      <meta property="og:locale" content={finalConfig.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalConfig.title} />
      <meta name="twitter:description" content={finalConfig.description} />
      <meta name="twitter:image" content={finalConfig.image} />
      {children}
    </Helmet>
  );
};
