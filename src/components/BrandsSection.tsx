import React from 'react';
import SparkBackground from './SparkBackground';
import LogoShowcase from './LogoShowcase';

const BrandsSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-20">
        <SparkBackground />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Brands We've Worked With
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <LogoShowcase 
            showTitles={false} 
            grayscale={true}
            className="my-8"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
