import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparkBackground from './SparkBackground';

interface VideoItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

const PortfolioSection: React.FC = () => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 100, 100, 0]);

  const videos: VideoItem[] = [
    {
      id: 1,
      title: "Wedding Highlights",
      category: "Wedding",
      thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 2,
      title: "Corporate Event",
      category: "Corporate",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 3,
      title: "Music Video",
      category: "Music",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 4,
      title: "Documentary",
      category: "Documentary",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
      id: 5,
      title: "Product Launch",
      category: "Commercial",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
      id: 6,
      title: "Brand Story",
      category: "Brand",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden mb-20 h-screen">
      <SparkBackground />
      <motion.div
        className="container mx-auto px-6 h-full"
        style={{
          opacity,
          zIndex,
        }}
      >
        <div className="text-center mb-16">
          <h2 
            className="font-heading font-bold text-5xl text-white uppercase tracking-wide mb-6"
          >
            PORTFOLIO
          </h2>
          <p 
            className="font-body text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-16 md:mb-20"
          >
            Discover our latest work and see how we bring stories to life through the power of cinema
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative group flex justify-center items-center"
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <div className="relative overflow-hidden rounded-lg aspect-video bg-transparent border-2 border-yellow-400 w-[250px] shadow-2xl">
                  {hoveredVideo === video.id ? (
                    <video
                      className="w-full h-full object-cover transform scale-110 transition-transform duration-500"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300 rounded-lg">
                    <div className="absolute bottom-2 left-2 right-2">
                      <span 
                        className="inline-block px-1.5 py-0.5 bg-yellow-400 text-black text-xs md:text-sm font-body font-medium rounded-full mb-0.5 md:mb-1"
                      >
                        {video.category}
                      </span>
                      <h3 
                        className="font-heading font-semibold text-base text-white"
                      >
                        {video.title}
                      </h3>
                    </div>
                  </div>

                  {hoveredVideo !== video.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioSection;
