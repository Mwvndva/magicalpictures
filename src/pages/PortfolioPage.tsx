import { motion } from 'framer-motion';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PortfolioShowcase from '../components/PortfolioShowcase';
import { PageMeta } from '../components/PageMeta';
import PageTransition from '../components/PageTransition';
import {
  CategoryDef,
  PortfolioItem,
  DEFAULT_PORTFOLIO_CATEGORIES,
  DEFAULT_PORTFOLIO_VIDEOS,
  DEFAULT_PORTFOLIO_IMAGES,
  DEFAULT_PORTFOLIO_REELS,
} from '../lib/portfolio-data';
import { apiGetPortfolio } from '../lib/api';

type MediaTab = 'images' | 'videos' | 'reels';

import { LS_KEY } from '../lib/admin-store';

// ── Portfolio data hook ────────────────────────────────────────────────────────
// Priority order:
//   1. localStorage (written by admin's Save & Publish — instant, no network)
//   2. API server (Node.js local / Vercel serverless)
//   3. Static defaults (always works, even offline)
function usePortfolioData() {
  // Initialise from localStorage immediately — zero latency for admin changes
  const getInitialData = () => {
    try {
      const cached = localStorage.getItem(LS_KEY);
      if (cached) return JSON.parse(cached);
    } catch { /* ignore */ }
    return null;
  };

  const cached = getInitialData();

  const [categories, setCategories] = useState<CategoryDef[]>(
    cached?.categories?.length
      ? [...cached.categories].sort((a: CategoryDef, b: CategoryDef) => (a.order ?? 0) - (b.order ?? 0))
      : [...DEFAULT_PORTFOLIO_CATEGORIES].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  );
  const [images, setImages] = useState<PortfolioItem[]>(cached?.images ?? DEFAULT_PORTFOLIO_IMAGES);
  const [videos, setVideos] = useState<PortfolioItem[]>(cached?.videos ?? DEFAULT_PORTFOLIO_VIDEOS);
  const [reels, setReels] = useState<PortfolioItem[]>(cached?.reels ?? DEFAULT_PORTFOLIO_REELS);

  // Apply a full data snapshot to state
  const applyData = useCallback((d: { categories?: CategoryDef[]; images?: PortfolioItem[]; videos?: PortfolioItem[]; reels?: PortfolioItem[] }) => {
    if (d.categories?.length) {
      setCategories([...d.categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    }
    if (d.images) setImages(d.images);
    if (d.videos) setVideos(d.videos);
    if (d.reels) setReels(d.reels);
  }, []);

  // Also try the API in the background (picks up server-side changes)
  useEffect(() => {
    apiGetPortfolio()
      .then(res => { if (res?.data) applyData(res.data); })
      .catch(() => {/* stay with localStorage/defaults */});
  }, [applyData]);

  // Listen for storage events — if admin saves in another tab, update instantly
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== LS_KEY || !e.newValue) return;
      try { applyData(JSON.parse(e.newValue)); } catch { /* ignore */ }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [applyData]);

  return { categories, images, videos, reels };
}


const PortfolioPage = () => {
  const { categories, images, videos, reels } = usePortfolioData();

  const [selectedCategory, setSelectedCategory] = useState<CategoryDef | null>(null);
  const [activeTab, setActiveTab] = useState<MediaTab>('images');

  // Keep selected category in sync when category list changes
  const resolvedCategory = useMemo(() => {
    if (selectedCategory) {
      return categories.find(c => c.id === selectedCategory.id) ?? categories[0];
    }
    return categories[0];
  }, [categories, selectedCategory]);

  // All items across all media types
  const allMedia = useMemo(() => [...videos, ...images, ...reels], [videos, images, reels]);

  // Filtered items for the selected category and tab — respect `order` field
  const filteredItems = useMemo(() => {
    if (!resolvedCategory) return [];
    let items = allMedia.filter(item => item.category === resolvedCategory.id);

    if (activeTab === 'images') {
      items = items.filter(item => item.mediaType === 'image');
    } else if (activeTab === 'videos') {
      items = items.filter(item => item.mediaType === 'youtube');
    } else if (activeTab === 'reels') {
      items = items.filter(item => item.mediaType === 'instagram-reel' || item.mediaType === 'youtube-short');
    }

    return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [resolvedCategory, activeTab, allMedia]);

  const handleCategoryChange = (category: CategoryDef) => {
    setSelectedCategory(category);
    setActiveTab('images');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs: { id: MediaTab; label: string }[] = [
    { id: 'images', label: 'Images' },
    { id: 'videos', label: 'Videos' },
    { id: 'reels', label: 'Reels' },
  ];

  if (!resolvedCategory) return null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-gray-100">
        <PageMeta
          title={`${resolvedCategory.label} Portfolio Nairobi Kenya`}
          description={`${resolvedCategory.description} View ${resolvedCategory.label.toLowerCase()} photography and video production work by Magical Pictures Productions in Nairobi, Kenya.`}
          canonical="/portfolio"
          keywords={[
            `${resolvedCategory.label} portfolio Nairobi`,
            `${resolvedCategory.label} photography Kenya`,
            `${resolvedCategory.label} video production Nairobi`,
            'Magical Pictures Productions portfolio',
          ]}
        />

        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-8 md:pt-28 md:pb-10 bg-zinc-950/20">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 text-center">
            <motion.h1
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              key={resolvedCategory.id}
            >
              {resolvedCategory.label}
            </motion.h1>
            <motion.div
              className="w-16 h-0.5 bg-yellow-500 mx-auto mb-5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.p
              className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              key={`desc-${resolvedCategory.id}`}
            >
              {resolvedCategory.description}
            </motion.p>
          </div>
        </section>

        {/* Category Tabs */}
        <div className="sticky top-16 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="mx-auto w-full max-w-7xl px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 py-2.5 min-w-max justify-start md:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative pb-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${resolvedCategory.id === cat.id
                    ? 'text-yellow-500'
                    : 'text-gray-400 hover:text-gray-100'
                    }`}
                >
                  {cat.label}
                  {resolvedCategory.id === cat.id && (
                    <motion.div
                      layoutId="category-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:py-8">
          {/* Media Filters */}
          <div className="flex justify-center mb-6 px-4 overflow-x-auto no-scrollbar">
            <div className="inline-flex rounded-lg bg-zinc-900 p-1 gap-1 flex-shrink-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeTab === tab.id
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-gray-100'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <motion.div
            key={`${resolvedCategory.id}-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioShowcase
              items={filteredItems}
              itemsPerPage={9}
              showFilter={false}
              activeFilter={resolvedCategory.id}
              setActiveFilter={() => { }}
            />
          </motion.div>
        </div>

        {/* CTA */}
        <section className="w-full py-10 md:py-12 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
          <div className="mx-auto w-full max-w-4xl px-4 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's create something extraordinary together.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 shadow-md shadow-yellow-500/10"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PortfolioPage;
