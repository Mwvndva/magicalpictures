// src/components/HeroSection.tsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
  };

  const scrollToNextSection = () => {
    if (sectionRef.current && sectionRef.current.nextElementSibling) {
      sectionRef.current.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* 1. Poster Layer: Shows instantly as a background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero-poster.jpg')" }}
      >
        {/* 2. Video Layer: Fades in over the poster when ready */}
        <video
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-90' : 'opacity-0'
            }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* 3. Dark Overlay (applied over whatever is showing) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
      </div>

      {/* Hero Container */}
      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-20">
        <div className="relative z-10 w-full">
          <div className="text-center">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-100 uppercase tracking-wide leading-tight">
              <span className="block hover:text-yellow-400 transition-colors duration-300">MAGICAL</span>
              <span className="block hover:text-yellow-400 transition-colors duration-300 mt-2 sm:mt-3">PICTURES</span>
              <span className="block hover:text-yellow-400 transition-colors duration-300 mt-2 sm:mt-3">PRODUCTIONS</span>
            </h1>
            <p className="font-body text-sm sm:text-base md:text-lg text-gray-300 mt-6 sm:mt-7 hover:text-yellow-400 transition-colors duration-300 max-w-xl mx-auto">
              Cinematic Videography That Tells Your Story
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center z-10">
        <motion.button
          onClick={scrollToNextSection}
          className="flex flex-col items-center text-gray-100 hover:text-yellow-400 transition-colors duration-300 focus:outline-none"
          aria-label="Scroll down"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-xs mb-1.5 font-light tracking-wider">SCROLL</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <ChevronsDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
