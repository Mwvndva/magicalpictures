import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaExpand, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Sample portfolio items - replace with your actual portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'Wedding Highlights',
    category: 'wedding',
    thumbnail: '/images/portfolio/wedding-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'Beautiful wedding highlights capturing the magic of the special day.'
  },
  {
    id: 2,
    title: 'Corporate Event',
    category: 'corporate',
    thumbnail: '/images/portfolio/corporate-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'Professional coverage of a major corporate conference.'
  },
  {
    id: 3,
    title: 'Music Video',
    category: 'music',
    thumbnail: '/images/portfolio/music-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'Cinematic music video production for an up-and-coming artist.'
  },
  {
    id: 4,
    title: 'Commercial Ad',
    category: 'commercial',
    thumbnail: '/images/portfolio/commercial-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'High-energy commercial spot for a leading brand.'
  },
  {
    id: 5,
    title: 'Documentary',
    category: 'documentary',
    thumbnail: '/images/portfolio/doc-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'Compelling documentary storytelling at its finest.'
  },
  {
    id: 6,
    title: 'Event Coverage',
    category: 'event',
    thumbnail: '/images/portfolio/event-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your-video-id',
    description: 'Comprehensive coverage of a major cultural event.'
  },
];

const categories = ['all', 'wedding', 'corporate', 'music', 'commercial', 'documentary', 'event'];

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const selectedVideo = portfolioItems.find(item => item.id === selectedItem);

  const openModal = (id: number) => {
    setSelectedItem(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedItem);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % portfolioItems.length;
    } else {
      newIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    }
    
    setSelectedItem(portfolioItems[newIndex].id);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Listen for fullscreen change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section id="portfolio" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide mb-4">
            Our Portfolio
          </h2>
          <p className="font-body text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our latest work and see how we bring stories to life through the lens.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-gray-800 aspect-video"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 z-10">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => openModal(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full p-4 transform transition-transform hover:scale-110"
                    aria-label={`Play ${item.title}`}
                  >
                    <FaPlay className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/800x450/1a1a1a/ffffff?text=${encodeURIComponent(item.title)}`;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No portfolio items found in this category.</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedItem && selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <div 
              className="relative w-full max-w-6xl bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 text-white hover:text-yellow-500 transition-colors"
                aria-label="Close video"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-16 z-20 text-white hover:text-yellow-500 transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <FaExpand className="w-6 h-6" />
              </button>

              {/* Video Container */}
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>

              {/* Video Info */}
              <div className="p-6 bg-gray-900">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-300">{selectedVideo.description}</p>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors"
                aria-label="Previous video"
              >
                <FaArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors"
                aria-label="Next video"
              >
                <FaArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
