import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import BookingSection from '../components/BookingSection';
import ContactSection from '../components/ContactSection';
import BrandsSection from '../components/BrandsSection';

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
      <AboutSection />
      <PortfolioSection />
      <BrandsSection />
      <BookingSection />
      <ContactSection />
      <div className="text-center text-gray-500 text-sm py-8">
        &copy; {new Date().getFullYear()} Magical Pictures. All rights reserved.
      </div>
    </div>
  );
};

export default Index;
