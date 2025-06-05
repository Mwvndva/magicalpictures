import React from 'react';
import SparkBackground from './SparkBackground';

const brands = [
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' }
];

const BrandsSection: React.FC = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <SparkBackground />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-wide mb-6">
            Brands We've Worked With
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto">
            Trusted by leading brands worldwide for our exceptional videography and photography services
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection; 