import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../lib/seo';

interface PageMetaProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    keywords?: string[];
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const PageMeta: React.FC<PageMetaProps> = ({
    title,
    description,
    canonical,
    image = DEFAULT_OG_IMAGE,
    keywords = [],
    jsonLd,
}) => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    return (
        <Helmet>
            <html lang="en-KE" />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow, max-image-preview:large" />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_KE" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};
