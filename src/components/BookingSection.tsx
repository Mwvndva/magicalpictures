import React, { useRef } from 'react';
import { BookOpen, Camera, Users } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparkBackground from './SparkBackground';

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animation transforms (can be adjusted later if needed)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 100, 100, 0]);

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden mb-20 h-screen flex items-center justify-center">
      <SparkBackground />
      <motion.div 
        className="container mx-auto px-6 h-full flex justify-center items-center"
        style={{
          scale,
          opacity,
          zIndex,
        }}
      >
        <div className="w-[400px] h-[280px] bg-black text-white p-6 rounded-xl shadow-2xl flex flex-col justify-center items-center">
          <h2 
            className="font-heading font-bold text-5xl text-yellow-400 uppercase tracking-wide mb-6"
          >
            Book Your Session
          </h2>
          <p 
            className="font-body text-sm text-center mb-4"
          >
            Ready to capture your special moments? Contact us to schedule your videography session.
          </p>
          <div className="flex space-x-4 mb-4">
            <div className="flex flex-col items-center">
              <Camera size={24} className="text-yellow-400 mb-1" />
              <span 
                className="font-body text-sm"
              >
                Videography
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Users size={24} className="text-yellow-400 mb-1" />
              <span 
                className="font-body text-sm"
              >
                Events
              </span>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen size={20} className="text-yellow-400 mb-1" />
              <span 
                className="font-body text-xs"
              >
                Consultation
              </span>
            </div>
          </div>
          <button
            type="button"
            className="font-heading px-4 py-1 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-300"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book Now
              </button>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingSection;
