// src/lib/portfolio-data.ts

export type MediaType = 'youtube' | 'image' | 'instagram-reel' | 'youtube-short';

export interface PortfolioItem {
    id: string;
    title?: string;
    category: string; // widened to string so admin can add custom categories
    mediaType: MediaType;
    // YouTube: provide only the video ID (e.g. 'p1eZu4qwauQ')
    youtubeId?: string;
    // Images: path relative to /public
    imagePath?: string;
    // Instagram reels: full post URL
    reelUrl?: string;
    // Optional: override the auto-generated thumbnail
    customThumbnail?: string;
    client?: string;
    year?: string;
    /** display order within its category+mediaType bucket — lower = first */
    order?: number;
}

// Legacy narrow type kept for backwards compatibility
export type PortfolioCategory =
    | 'corporate'
    | 'wedding'
    | 'restaurant-clubs'
    | 'concerts'
    | 'sports'
    | 'documentary-film'
    | 'interviews-podcasts'
    | 'animation-graphics'
    | 'portraits-family'
    | 'product'
    | string;

export interface CategoryDef {
    id: string;
    label: string;
    description: string;
    order?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT / SEED DATA  (used if no server data exists yet)
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_PORTFOLIO_CATEGORIES: CategoryDef[] = [
    {
        id: 'corporate',
        label: 'Corporate',
        description: 'Professional video production for businesses, including interviews, event highlights, and internal communications.',
        order: 0,
    },
    {
        id: 'sports',
        label: 'Sports',
        description: 'Fast-paced action photography and videography for athletes and sporting events.',
        order: 1,
    },
    {
        id: 'documentary-film',
        label: 'Documentary/Film',
        description: 'Story-driven documentary production and creative filmmaking.',
        order: 2,
    },
    {
        id: 'interviews-podcasts',
        label: 'Interviews/Podcasts',
        description: 'Interview and podcast production built around clear stories, polished audio, and engaging visuals.',
        order: 3,
    },
    {
        id: 'product',
        label: 'Commercials',
        description: 'Stunning product photography and commercials that drive sales and brand awareness.',
        order: 4,
    },
    {
        id: 'concerts',
        label: 'Concerts',
        description: 'Dynamic coverage of live performances, festivals, and music events.',
        order: 5,
    },
    {
        id: 'animation-graphics',
        label: 'Animation/Graphics',
        description: 'Engaging motion graphics and 2D/3D animations for digital platforms.',
        order: 6,
    },
    {
        id: 'wedding',
        label: 'Wedding',
        description: 'Capturing your special day with cinematic elegance and emotional depth.',
        order: 7,
    },
    {
        id: 'restaurant-clubs',
        label: 'Restaurant/Clubs',
        description: 'High-energy visuals showcasing the best of nightlife, dining, and hospitality.',
        order: 8,
    },
    {
        id: 'portraits-family',
        label: 'Portraits/Family',
        description: 'Professional portraiture capturing the essence of individuals and family bonds.',
        order: 9,
    },
];

// Keep the old export shape for any component that still imports PORTFOLIO_CATEGORIES
export const PORTFOLIO_CATEGORIES = DEFAULT_PORTFOLIO_CATEGORIES;

// ---------------------------------------------------------------------------
// VIDEOS - Default YouTube videos
// ---------------------------------------------------------------------------
export const DEFAULT_PORTFOLIO_VIDEOS: PortfolioItem[] = [
    // Corporate
    { id: 'v-corp-1', category: 'corporate', mediaType: 'youtube', title: 'iGaming Afrika summit 2026 - Sarit Expo Centre Nairobi,Kenya', youtubeId: 'ke4abfpNhFE', order: 0 },
    { id: 'v-corp-2', category: 'corporate', mediaType: 'youtube', title: 'The W Initiative by Access Bank/National Bank - Nairobi Serena Hotel', youtubeId: 'mtN_dQFLgd0', order: 1 },
    { id: 'v-corp-3', category: 'corporate', mediaType: 'youtube', title: 'AA Road Safety Excellence Awards', youtubeId: 'QFyA8RLULKE', order: 2 },
    { id: 'v-corp-4', category: 'corporate', mediaType: 'youtube', title: 'TANQUEARREY KAREN BLIXEN', youtubeId: 'wSQbopkB8m0', order: 3 },
    { id: 'v-corp-5', category: 'corporate', mediaType: 'youtube', title: 'RUSINGA SCHOOL NAIROBI BAPTIST', youtubeId: 'iPI9pBBy61M', order: 4 },
    { id: 'v-corp-0', category: 'corporate', mediaType: 'youtube', title: 'Corporate event Highlight at BaoBox', youtubeId: 'KdkeiQJdb6g', order: 5 },
    // Sports
    { id: 'v-spo-3', category: 'sports', mediaType: 'youtube', title: 'AIRTEL CHACHISHA SPORT EVENT', youtubeId: 'SqKpDYFAmpk', order: 0 },
    { id: 'v-spo-2', category: 'sports', mediaType: 'youtube', title: 'MKO 2026 KAREN GOLF CLUB- JOHNNIEWALKER', youtubeId: 'AdGsAyh10xs', order: 1 },
    // Documentary/Film
    { id: 'v-doc-4', category: 'documentary-film', mediaType: 'youtube', title: 'Kiriri Womens- DKT International', youtubeId: '8uK6BKz1_NM', order: 0 },
    { id: 'v-doc-3', category: 'documentary-film', mediaType: 'youtube', title: 'Degtailed TAP VIDEO', youtubeId: 'J6Zg5Zql6Uw', order: 1 },
    { id: 'v-doc-2', category: 'documentary-film', mediaType: 'youtube', title: 'Tap Promo', youtubeId: 'cJ7el08mhFA', order: 2 },
    { id: 'v-doc-0', category: 'documentary-film', mediaType: 'youtube', title: 'Lost in the woods-Short Film', youtubeId: 'eZ3XxFu10Us', order: 3 },
    // Interviews/Podcasts
    { id: 'v-int-3', category: 'interviews-podcasts', mediaType: 'youtube', title: 'Spicy tech takes PROMO', youtubeId: 'jg17BAqX31I', order: 0 },
    { id: 'v-int-2', category: 'interviews-podcasts', mediaType: 'youtube', title: 'TALK SHOW PROMO', youtubeId: 'E8A_1uEbfZQ', order: 1 },
    { id: 'v-int-1', category: 'interviews-podcasts', mediaType: 'youtube', title: 'Promo Talk Ad', youtubeId: 'iuk3dPx6QvA', order: 2 },
    // Commercials
    { id: 'v-pro-3', category: 'product', mediaType: 'youtube', title: 'SBC Kenya production', youtubeId: 'p1eZu4qwauQ', order: 0 },
    { id: 'v-pro-2', category: 'product', mediaType: 'youtube', title: 'RESET MODE | A Cinematic Fitness Escape into Nature with @Shornarwa', youtubeId: 'VzNSePRDSGs', order: 1 },
    { id: 'v-pro-0', category: 'product', mediaType: 'youtube', title: 'SAMSUNG TRM SHOP SHOWCASE', youtubeId: 'MTZnAI2Lxk4', order: 2 },
    // Concerts
    { id: 'v-con-2', category: 'concerts', mediaType: 'youtube', title: 'St Paul´s University  Event Ft Khaligraph Jones', youtubeId: 'tfoQxbH5eDE', order: 0 },
    { id: 'v-con-1', category: 'concerts', mediaType: 'youtube', title: 'JKUAT Freshers Night 2024 Ft Breeder', youtubeId: 'dt7k65XgtiM', order: 1 },
    // Animation/Graphics
    { id: 'v-ani-4', category: 'animation-graphics', mediaType: 'youtube', title: 'Years motion graphics', youtubeId: 'ROtMfMJtTjM', order: 0 },
    { id: 'v-ani-3', category: 'animation-graphics', mediaType: 'youtube', title: 'STATISTICS Motion Graphics', youtubeId: '1j15MQvPKGA', order: 1 },
    { id: 'v-ani-2', category: 'animation-graphics', mediaType: 'youtube', title: 'E & K Squeeze back', youtubeId: 'cUgKAiDMJf0', order: 2 },
    { id: 'v-ani-1', category: 'animation-graphics', mediaType: 'youtube', title: 'MOTION GRAPHICS SHOWREEL', youtubeId: '3tvRvJhEqCM', order: 3 },
];

export const portfolioVideos = DEFAULT_PORTFOLIO_VIDEOS;

// ---------------------------------------------------------------------------
// REELS
// ---------------------------------------------------------------------------
export const DEFAULT_PORTFOLIO_REELS: PortfolioItem[] = [
    {
        id: 'reel-polo-1',
        category: 'sports',
        mediaType: 'youtube-short',
        title: 'Nairobi Polo 1',
        youtubeId: 'WkpXNQzYXIw',
        order: 0,
    },
];

export const portfolioReels = DEFAULT_PORTFOLIO_REELS;

// ---------------------------------------------------------------------------
// IMAGES
// ---------------------------------------------------------------------------
export const DEFAULT_PORTFOLIO_IMAGES: PortfolioItem[] = [
    // Corporate
    { id: 'img-corp-1', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/1.jpg', order: 0 },
    { id: 'img-corp-2', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/2.jpg', order: 1 },
    { id: 'img-corp-aa-1', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/21.jpg', order: 2 },
    { id: 'img-corp-aa-2', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/22.jpg', order: 3 },
    { id: 'img-corp-aa-3', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/23.jpg', order: 4 },
    { id: 'img-corp-aa-4', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/24.jpg', order: 5 },
    { id: 'img-corp-aa-5', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/25.jpg', order: 6 },
    { id: 'img-corp-aa-6', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/26.jpg', order: 7 },
    { id: 'img-corp-aa-7', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/27.jpg', order: 8 },
    { id: 'img-corp-aa-8', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/28.jpg', order: 9 },
    { id: 'img-corp-aa-9', category: 'corporate', mediaType: 'image', imagePath: '/portfolio/images/corporate/29.jpg', order: 10 },
    // Sports
    { id: 'img-spo-1', category: 'sports', mediaType: 'image', imagePath: '/portfolio/images/sports/1.jpg', order: 0 },
    { id: 'img-spo-2', category: 'sports', mediaType: 'image', imagePath: '/portfolio/images/sports/2.jpg', order: 1 },
    { id: 'img-spo-3', category: 'sports', mediaType: 'image', imagePath: '/portfolio/images/sports/3.jpg', order: 2 },
    { id: 'img-spo-4', category: 'sports', mediaType: 'image', imagePath: '/portfolio/images/sports/4.jpg', order: 3 },
    { id: 'img-spo-5', category: 'sports', mediaType: 'image', imagePath: '/portfolio/images/sports/5.jpg', order: 4 },
    { id: 'img-spo-6', category: 'sports', mediaType: 'image', imagePath: '/portfolio/images/sports/6.jpg', order: 5 },
    // Documentary/Film
    { id: 'img-doc-5', category: 'documentary-film', mediaType: 'image', imagePath: '/portfolio/images/documentary-film/5.jpg', order: 0 },
    { id: 'img-doc-6', category: 'documentary-film', mediaType: 'image', imagePath: '/portfolio/images/documentary-film/6.jpg', order: 1 },
    { id: 'img-doc-7', category: 'documentary-film', mediaType: 'image', imagePath: '/portfolio/images/documentary-film/7.jpg', order: 2 },
    { id: 'img-doc-8', category: 'documentary-film', mediaType: 'image', imagePath: '/portfolio/images/documentary-film/8.jpg', order: 3 },
    // Commercials
    { id: 'img-pro-14', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/14.jpg', order: 0 },
    { id: 'img-pro-15', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/15.jpg', order: 1 },
    { id: 'img-pro-16', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/16.jpg', order: 2 },
    { id: 'img-pro-17', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/17.jpg', order: 3 },
    { id: 'img-pro-18', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/18.jpg', order: 4 },
    { id: 'img-pro-19', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/19.jpg', order: 5 },
    { id: 'img-pro-20', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/20.jpg', order: 6 },
    { id: 'img-pro-21', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/21.jpg', order: 7 },
    { id: 'img-pro-22', category: 'product', mediaType: 'image', imagePath: '/portfolio/images/product/22.jpg', order: 8 },
];

export const portfolioImages = DEFAULT_PORTFOLIO_IMAGES;

// ---------------------------------------------------------------------------
// HELPER: derive thumbnail URL from a PortfolioItem
// ---------------------------------------------------------------------------
export function getThumbnail(item: PortfolioItem): string {
    if (item.customThumbnail) return item.customThumbnail;
    if (item.youtubeId) return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
    if (item.mediaType === 'youtube-short') return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
    if (item.reelUrl) return item.customThumbnail ?? '/assets/hero-poster.jpg';
    return item.imagePath ?? '/assets/hero-poster.jpg';
}

// ---------------------------------------------------------------------------
// HELPER: derive embed URL from a PortfolioItem (for lightbox)
// ---------------------------------------------------------------------------
export function getEmbedUrl(item: PortfolioItem): string | null {
    if (item.youtubeId) {
        return `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
    }
    if (item.mediaType === 'youtube-short' && item.youtubeId) {
        return `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
    }
    if (item.reelUrl) {
        const baseUrl = item.reelUrl.split('?')[0];
        return `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}embed/`;
    }
    return null; // images open in lightbox, not as embeds
}

export function getWatchUrl(item: PortfolioItem): string | null {
    if (item.youtubeId) {
        return `https://www.youtube.com/watch?v=${item.youtubeId}`;
    }
    if (item.reelUrl) {
        return item.reelUrl;
    }
    return null;
}
