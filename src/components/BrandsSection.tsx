import React, { useState } from 'react';
import SparkBackground from './SparkBackground';

// Generate array for 16 brands with extension support
const brands = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: `Brand ${i + 1}`,
  logo: `/images/brands/${i + 1}`, // Base path without extension
  extensions: ['.png', '.PNG', '.jpg', '.jpeg', '.svg'] // Supported extensions
}));

// Split brands into two equal rows of 8 logos each
const firstRow = brands.slice(0, 8);
const secondRow = brands.slice(8);

// Custom Image component with extension fallback
const BrandImage = ({ src, extensions = ['.png'], alt, id }: { 
  src: string; 
  extensions?: string[]; 
  alt: string; 
  id: number 
}) => {
  const [currentSrc, setCurrentSrc] = useState('');
  const [currentExtIndex, setCurrentExtIndex] = useState(0);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize with first extension
  React.useEffect(() => {
    setCurrentSrc(`${src}${extensions[0]}`);
  }, [src, extensions]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Try next extension
    const nextIndex = currentExtIndex + 1;
    if (nextIndex < extensions.length) {
      setCurrentExtIndex(nextIndex);
      setCurrentSrc(`${src}${extensions[nextIndex]}`);
      return;
    }
    setError(true);
  };

  const handleLoad = () => setLoaded(true);

  if (error) return null;



  return (
    <div className="relative w-full h-full">
      <img
        key={currentSrc}
        src={`${currentSrc}?t=${Date.now()}`}
        alt={alt}
        className={`absolute inset-0 m-auto transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          objectPosition: 'center'
        }}
        loading="eager"
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

const BrandsSection: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <SparkBackground />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide mb-4">
            Brands We've Worked With
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Trusted by leading brands worldwide for our exceptional videography and photography services
          </p>
        </div>

        <div className="w-full px-12">
          {/* First Row - 8 logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mb-12">
            {firstRow.map((brand) => (
              <div key={brand.id} className="w-[20%] sm:w-[10%] aspect-square flex items-center justify-center p-1 sm:p-1.5">
                <div className="w-full h-full flex items-center justify-center rounded-lg border-2 border-yellow-400 p-2 sm:p-3 hover:bg-yellow-50/10 transition-colors">
                  <div className="w-full h-full flex items-center justify-center">
                    <BrandImage src={brand.logo} alt={brand.name} id={brand.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second Row - 8 logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {secondRow.map((brand) => (
              <div key={brand.id} className="w-[20%] sm:w-[10%] aspect-square flex items-center justify-center p-1 sm:p-1.5">
                <div className="w-full h-full flex items-center justify-center rounded-lg border-2 border-yellow-400 p-2 sm:p-3 hover:bg-yellow-50/10 transition-colors">
                  <div className="w-full h-full flex items-center justify-center">
                    <BrandImage src={brand.logo} alt={brand.name} id={brand.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
