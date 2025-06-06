import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaSearchPlus } from 'react-icons/fa';

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  client?: string;
  year?: string;
  videoUrl?: string;
};

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  itemsPerPage?: number;
  showFilter?: boolean;
  className?: string;
}

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  items,
  itemsPerPage = 9,
  showFilter = true,
  className = '',
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.category))];

  // Filter items based on active filter
  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Category Filter */}
      {showFilter && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-gray-900 aspect-[4/3]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleItemClick(item)}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {item.videoUrl ? (
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-black transform transition-transform group-hover:scale-110">
                      <FaPlay className="ml-1" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-black transform transition-transform group-hover:scale-110">
                      <FaSearchPlus />
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white font-medium text-lg">{item.title}</h3>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>{item.client}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === page
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white text-2xl hover:text-yellow-500 transition-colors"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl">
              {selectedItem.videoUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={selectedItem.videoUrl}
                    className="w-full h-full"
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-2xl font-bold">{selectedItem.title}</h3>
                <div className="flex justify-between text-gray-300 mt-2">
                  <span>{selectedItem.client}</span>
                  <span>{selectedItem.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioShowcase;
