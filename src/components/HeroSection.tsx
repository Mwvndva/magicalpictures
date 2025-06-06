import React, { useRef } from 'react';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover opacity-80 max-h-screen"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
      </div>

      {/* Hero Container */}
      <div className="container mx-auto px-4 sm:px-6 h-screen flex items-center justify-center">
        <div className="relative z-10 w-full">
          <div className="text-center">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300">
                MAGICAL
              </h1>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 mt-4">
                PICTURES
              </h1>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 mt-4">
                PRODUCTIONS
              </h1>
              <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mt-8 sm:mt-10 md:mt-12 hover:text-yellow-400 transition-colors duration-300 max-w-2xl mx-auto">
                Cinematic Videography That Tells Your Story
              </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white hover:text-yellow-400 transition-colors duration-300">
          <span className="font-body text-xs sm:text-sm md:text-base mb-1 sm:mb-2">SCROLL</span>
          <div className="w-px h-8 sm:h-10 md:h-12 bg-white hover:bg-yellow-400 transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
