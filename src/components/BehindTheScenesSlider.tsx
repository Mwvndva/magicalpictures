import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BehindTheScenesImage {
  id: number;
  image: string;
  title?: string;
}

const behindTheScenesImages: BehindTheScenesImage[] = [
  {
    id: 1,
    image: '/assets/behind-the-scenes/1.jpg',
    title: 'Behind the Scenes - Shot 1'
  },
  {
    id: 2,
    image: '/assets/behind-the-scenes/2.jpg',
    title: 'Behind the Scenes - Shot 2'
  },
  {
    id: 3,
    image: '/assets/behind-the-scenes/3.jpg',
    title: 'Behind the Scenes - Shot 3'
  },
  {
    id: 4,
    image: '/assets/behind-the-scenes/4.jpg',
    title: 'Behind the Scenes - Shot 4'
  }
];

const BehindTheScenesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === behindTheScenesImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? behindTheScenesImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full bg-black py-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-3"
          >
            Behind the Scenes
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
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4"
          >
            A glimpse into our creative process and the magic that happens behind the camera
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-gray-800/80 bg-zinc-950/50">
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
                className="relative"
              >
                <div className="relative aspect-[16/10] min-h-60 md:min-h-[360px]">
                  <img
                    src={behindTheScenesImages[currentIndex].image}
                    alt={behindTheScenesImages[currentIndex].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={1000}
                    height={625}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    onError={(e) => {
                      console.error('Failed to load image:', behindTheScenesImages[currentIndex].image);
                      (e.target as HTMLImageElement).src = '/assets/hero-poster.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/70 hover:bg-yellow-500 hover:text-white transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/70 hover:bg-yellow-500 hover:text-white transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="mt-6 max-w-xl mx-auto">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {behindTheScenesImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                  ? 'ring-2 ring-yellow-500 ring-offset-2 scale-105'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                aria-label={`Go to ${image.title}`}
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={200}
                  height={200}
                  sizes="150px"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-yellow-500/10" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindTheScenesSlider;
