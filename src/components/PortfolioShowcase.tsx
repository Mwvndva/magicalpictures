import React, { useState, useCallback, memo, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Search, X } from 'lucide-react';
import {
  PortfolioItem,
  PORTFOLIO_CATEGORIES,
  getThumbnail,
  getEmbedUrl,
  getWatchUrl,
} from '@/lib/portfolio-data';

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  itemsPerPage?: number;
  showFilter?: boolean;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  className?: string;
}

const PortfolioThumb = memo(forwardRef<HTMLDivElement, { item: PortfolioItem; onClick: () => void }>(({ item, onClick }, ref) => {
  const [thumb, setThumb] = useState(getThumbnail(item));
  const isVideo = item.mediaType === 'youtube' || item.mediaType === 'instagram-reel' || item.mediaType === 'youtube-short';
  const isReel = item.mediaType === 'instagram-reel' || item.mediaType === 'youtube-short';

  const handleThumbError = () => {
    if (item.youtubeId && thumb.includes('hqdefault')) {
      setThumb(`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`);
    } else {
      setThumb('/assets/hero-poster.jpg');
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-md border border-zinc-800/70 bg-zinc-900 cursor-pointer ${isReel ? 'aspect-[9/16]' : 'aspect-[4/3]'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
    >
      <img
        src={thumb}
        alt={item.title ?? item.category}
        loading="lazy"
        decoding="async"
        width={isReel ? 400 : 800}
        height={isReel ? 711 : 600}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        onError={handleThumbError}
      />

      <div className="absolute inset-0 bg-black/45 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center transform scale-95 group-hover:scale-100 transition-transform duration-300">
          {isVideo ? (
            <Play className="text-black ml-0.5 h-4 w-4" />
          ) : (
            <Search className="text-black h-4 w-4" />
          )}
        </div>
      </div>

      {item.title && (
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-medium text-xs sm:text-sm leading-tight">{item.title}</p>
          {item.client && <p className="text-gray-300 text-xs mt-0.5">{item.client}</p>}
        </div>
      )}
    </motion.div>
  );
}));
PortfolioThumb.displayName = 'PortfolioThumb';

const Lightbox = memo(({ item, onClose }: { item: PortfolioItem; onClose: () => void }) => {
  const embedUrl = getEmbedUrl(item);
  const watchUrl = getWatchUrl(item);
  const isReel = item.mediaType === 'instagram-reel' || item.mediaType === 'youtube-short';

  return (
    <motion.div
      className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:text-yellow-500 transition-colors sm:top-4 sm:right-4"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        className={`relative w-full ${isReel ? 'max-w-[min(92vw,380px)]' : 'max-w-5xl'} mx-auto max-h-[92dvh]`}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
      >
        {embedUrl ? (
          <div className={`${isReel ? 'aspect-[9/16] max-h-[86dvh]' : 'aspect-video max-h-[78dvh]'} w-full rounded-md overflow-hidden bg-black`}>
            <iframe
              src={embedUrl}
              className="w-full h-full"
              title={item.title ?? item.category}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : (
          <img
            src={item.imagePath ?? ''}
            alt={item.title ?? item.category}
            className="mx-auto max-h-[86dvh] w-auto max-w-full object-contain rounded-md"
            loading="eager"
          />
        )}

        {(item.title || item.client) && (
          <div className="mt-2 text-center">
            {item.title && <p className="text-white font-semibold text-sm sm:text-base">{item.title}</p>}
            {item.client && <p className="text-gray-400 text-sm">{item.client}</p>}
          </div>
        )}

        {watchUrl && (
          <div className="mt-3 text-center sm:hidden">
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-black"
            >
              Open video
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});
Lightbox.displayName = 'Lightbox';

const shouldUseDirectVideoPlayback = (item: PortfolioItem) => {
  if (!item.youtubeId || typeof window === 'undefined') return false;

  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
};

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  items,
  itemsPerPage = 9,
  showFilter = true,
  activeFilter,
  setActiveFilter,
  className = '',
}) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const availableCategories = PORTFOLIO_CATEGORIES.filter(cat =>
    items.some(item => item.category === cat.id)
  );

  const filtered = showFilter ? items.filter(item => item.category === activeFilter) : items;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openLightbox = useCallback((item: PortfolioItem) => {
    if (shouldUseDirectVideoPlayback(item)) {
      const watchUrl = getWatchUrl(item);
      if (watchUrl) {
        window.open(watchUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    }

    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedItem(null);
    document.body.style.overflow = '';
  }, []);

  const handleCategoryChange = useCallback((catId: string) => {
    setActiveFilter(catId);
    setCurrentPage(1);
  }, [setActiveFilter]);

  return (
    <div className={`w-full ${className}`}>
      {showFilter && availableCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {availableCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${activeFilter === cat.id
                ? 'bg-yellow-500 text-black'
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {paginated.map(item => (
              <PortfolioThumb
                key={item.id}
                item={item}
                onClick={() => openLightbox(item)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-base">No items in this category yet.</p>
          <p className="text-sm mt-2">Check back soon or browse another category.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-7 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${currentPage === page
                ? 'bg-yellow-500 text-black'
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioShowcase;
