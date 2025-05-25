import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import BookingSection from '../components/BookingSection';
import ContactSection from '../components/ContactSection';

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
      <BookingSection />
      <ContactSection />
    </div>
  );
};

export default Index;
