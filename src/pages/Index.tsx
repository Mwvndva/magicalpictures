import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import BookingSection from '../components/BookingSection';
import ContactSection from '../components/ContactSection';
import BrandsSection from '../components/BrandsSection';
import SectionWrapper from '@/components/ui/SectionWrapper';

const Index = () => {
  useEffect(() => {
    // Reset cursor to default
    document.body.style.cursor = 'auto';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-black">
      <HeroSection />
      
      <SectionWrapper id="about">
        <AboutSection />
      </SectionWrapper>
      
      <SectionWrapper id="portfolio">
        <PortfolioSection />
      </SectionWrapper>
      
      <SectionWrapper id="brands">
        <BrandsSection />
      </SectionWrapper>
      
      <SectionWrapper id="booking">
        <BookingSection />
      </SectionWrapper>
      
      <SectionWrapper id="contact">
        <ContactSection />
      </SectionWrapper>
      
      <motion.div 
        className="text-center text-gray-500 text-sm py-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6,
            delay: 0.2
          } 
        }}
        viewport={{ once: true }}
      >
        &copy; {new Date().getFullYear()} Magical Pictures. All rights reserved.
      </motion.div>
    </div>
  );
};

export default Index;
