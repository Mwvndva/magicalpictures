import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]); // Zoom out effect: from 1 to 3
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]); // Fade out effect: from 1 to 0

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 text-center"
        style={{
          scale,
          opacity,
        }}
      >
        <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300">
          MAGICAL
        </h1>
        <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 mt-4">
          PICTURES
        </h1>
        <p className="font-body text-lg md:text-xl text-gray-300 mt-8 hover:text-yellow-400 transition-colors duration-300">
          Cinematic Videography That Tells Your Story
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white hover:text-yellow-400 transition-colors duration-300">
          <span className="font-body text-sm mb-2">SCROLL</span>
          <div className="w-px h-12 bg-white hover:bg-yellow-400 transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
