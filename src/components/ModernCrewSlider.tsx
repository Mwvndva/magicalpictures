import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { crewMembers } from '@/lib/data';

const ModernCrewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === crewMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? crewMembers.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full rounded-lg border border-gray-800/70 bg-zinc-950/35 p-4 sm:p-5">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-3"
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-16 h-0.5 bg-yellow-500 mx-auto"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-300 max-w-2xl mx-auto mt-4"
        >
          The talented individuals behind Magical Pictures Productions
        </motion.p>
      </div>

      <div className="relative">
        <div className="relative overflow-hidden rounded-lg border border-gray-800/80 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            >
              <div className="relative h-60 sm:h-72 lg:h-80">
                <img
                  src={crewMembers[currentIndex].image}
                  alt={crewMembers[currentIndex].name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                  decoding="async"
                  width={600}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    console.error('Failed to load image:', crewMembers[currentIndex].image);
                    (e.target as HTMLImageElement).src = '/assets/hero-poster.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-100 mb-2 leading-tight">
                    {crewMembers[currentIndex].name}
                  </h3>
                  <p className="text-yellow-500 font-semibold text-base mb-4 leading-tight">
                    {crewMembers[currentIndex].role}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {crewMembers[currentIndex].description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/70 hover:bg-yellow-500 hover:text-white transition-all duration-300 group z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/70 hover:bg-yellow-500 hover:text-white transition-all duration-300 group z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {crewMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
              ? 'bg-yellow-500 w-8'
              : 'bg-gray-600 hover:bg-gray-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernCrewSlider;
