import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparkBackground from './SparkBackground';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 100, 100, 0]);

  return (
    <section ref={sectionRef} className="bg-black relative overflow-hidden py-20 mb-20 h-screen flex items-center justify-center">
      <SparkBackground />
      <motion.div 
        className="container mx-auto px-6 h-full flex justify-center items-center"
        style={{
          scale,
          opacity,
          zIndex,
        }}
      >
        <div className="w-full max-w-2xl text-center">
          <div className="h-full flex flex-col justify-center">
            <h2 
              className="font-heading font-bold text-5xl text-yellow-400 uppercase tracking-wide mb-6"
            >
              ABOUT US
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:gap-8 mb-8">
              <div>
                <p 
                  className="font-body text-sm md:text-base text-gray-300 mb-2 md:mb-4"
                >
                  At Magical Pictures, we believe every moment has a story worth telling. Our team of passionate videographers specializes in capturing the essence of your most precious memories.
                </p>
                <p 
                  className="font-body text-sm md:text-base text-gray-300 mb-2 md:mb-4"
                >
                  From weddings to corporate events, from music videos to documentaries, we bring a cinematic approach to every project.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 
                    className="font-heading font-semibold text-xl md:text-2xl text-white mb-0.5 md:mb-1"
                  >
                    500+
                  </h3>
                  <p 
                    className="font-body text-xs md:text-sm text-gray-300"
                  >
                    Projects
                  </p>
                </div>
                <div>
                  <h3 
                    className="font-heading font-semibold text-xl md:text-2xl text-white mb-0.5 md:mb-1"
                  >
                    50+
                  </h3>
                  <p 
                    className="font-body text-xs md:text-sm text-gray-300"
                  >
                    Clients
                  </p>
                </div>
                <div>
                  <h3 
                    className="font-heading font-semibold text-xl md:text-2xl text-white mb-0.5 md:mb-1"
                  >
                    5+
                  </h3>
                  <p 
                    className="font-body text-xs md:text-sm text-gray-300"
                  >
                    Years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
