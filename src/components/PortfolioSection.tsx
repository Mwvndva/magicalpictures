import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparkBackground from './SparkBackground';
import { useResponsive } from '@/components/ui/responsive/ResponsiveContext';
import { PORTFOLIO_CATEGORIES, BREAKPOINTS } from '../lib/constants';
import { VideoItem, PortfolioState, LoadingState } from '../types';

const PortfolioSection: React.FC = () => {
  const { width, isMobile, isTablet, isDesktop } = useResponsive();
  const [selectedItem, setSelectedItem] = useState<{ type: 'video' | 'photo', url: string, title: string } | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: 1,
      title: "Wedding Highlights",
      category: PORTFOLIO_CATEGORIES.WEDDING,
      thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 2,
      title: "Corporate Event",
      category: PORTFOLIO_CATEGORIES.CORPORATE,
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 3,
      title: "Music Video",
      category: PORTFOLIO_CATEGORIES.MUSIC,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 4,
      title: "Documentary",
      category: PORTFOLIO_CATEGORIES.DOCUMENTARY,
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
      id: 5,
      title: "Product Launch",
      category: PORTFOLIO_CATEGORIES.COMMERCIAL,
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
      id: 6,
      title: "Brand Story",
      category: PORTFOLIO_CATEGORIES.BRAND,
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    }
  ]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 100, 100, 0]);

  // Responsive grid columns
  const gridColumns = {
    mobileS: 1,
    mobileM: 1,
    mobileL: 1,
    tablet: 2,
    tabletL: 3,
    desktop: 3,
    desktopL: 4,
    desktopXL: 5
  };

  // Determine grid columns based on screen width
  const columns = width < BREAKPOINTS.TABLET ? gridColumns.mobileS :
                  width < BREAKPOINTS.TABLET_L ? gridColumns.tablet :
                  width < BREAKPOINTS.DESKTOP ? gridColumns.tabletL :
                  width < BREAKPOINTS.DESKTOP_L ? gridColumns.desktop :
                  width < BREAKPOINTS.DESKTOP_XL ? gridColumns.desktopL :
                  gridColumns.desktopXL;

  // Responsive video player size
  const videoSize = {
    width: width < BREAKPOINTS.TABLET ? '100%' :
           width < BREAKPOINTS.TABLET_L ? '480px' :
           width < BREAKPOINTS.DESKTOP ? '640px' :
           width < BREAKPOINTS.DESKTOP_L ? '720px' :
           width < BREAKPOINTS.DESKTOP_XL ? '800px' :
           '960px',
    height: width < BREAKPOINTS.TABLET ? 'auto' :
            width < BREAKPOINTS.TABLET_L ? '270px' :
            width < BREAKPOINTS.DESKTOP ? '360px' :
            width < BREAKPOINTS.DESKTOP_L ? '405px' :
            width < BREAKPOINTS.DESKTOP_XL ? '450px' :
            '540px'
  };

  return (
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden min-h-screen" style={{ position: 'relative' }}>
      <SparkBackground />
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <motion.div
          className="h-full"
          style={{
            opacity,
            zIndex,
          }}
        >
          <div className="text-center mb-16">
            <h2 
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-wide mb-6"
            >
              PORTFOLIO
            </h2>
            <p 
              className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-16 md:mb-20"
            >
              Discover our latest work and see how we bring stories to life through the power of cinema
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Videos Container */}
            <div>
              <h3 className="font-heading font-bold text-3xl text-white uppercase tracking-wide mb-8 text-center">
                Videos
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="relative group cursor-pointer aspect-video"
                    onClick={() => setSelectedItem({ type: 'video', url: video.videoUrl, title: video.title })}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos Container */}
            <div>
              <h3 className="font-heading font-bold text-3xl text-white uppercase tracking-wide mb-8 text-center">
                Photos
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((photo) => (
                  <div
                    key={photo}
                    className="relative group cursor-pointer aspect-square"
                    onClick={() => setSelectedItem({ type: 'photo', url: `https://source.unsplash.com/random/800x800?photography&sig=${photo}`, title: `Photo ${photo}` })}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={`https://source.unsplash.com/random/800x800?photography&sig=${photo}`}
                        alt={`Photo ${photo}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
              <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                <button 
                  className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors duration-300"
                  onClick={() => setSelectedItem(null)}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-white text-2xl mb-4">{selectedItem.title}</h3>
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    className="w-full aspect-video rounded-lg"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
