import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Array of brand data with actual brand names and local images
const brands = [
  { id: 1, name: 'AA Kenya', logo: '/images/brands/aakenya.png' },
  { id: 2, name: 'AFC', logo: '/images/brands/afc.png' },
  { id: 3, name: 'Betika', logo: '/images/brands/betika.png' },
  { id: 4, name: 'Bingwa Fest', logo: '/images/brands/bingwa fest.png' },
  { id: 5, name: 'Capwell', logo: '/images/brands/capwell.png' },
  { id: 6, name: 'DKT', logo: '/images/brands/dkt.png' },
  { id: 7, name: 'Hotpoint', logo: '/images/brands/hotpoint.png' },
  { id: 8, name: 'Kijivu', logo: '/images/brands/kijivu.png' },
  { id: 9, name: 'Ministry of Health', logo: '/images/brands/ministry of health.png' },
  { id: 10, name: 'Mosmos', logo: '/images/brands/mosmos.png' },
  { id: 11, name: 'Nyashinski', logo: '/images/brands/nyashinski.png' },
  { id: 12, name: 'Safari Rally Kenya', logo: '/images/brands/safari rally kenya.png' },
  { id: 13, name: 'Treatos', logo: '/images/brands/treatos.png' },
  { id: 14, name: 'UCSF', logo: '/images/brands/ucsf.png' },
  { id: 15, name: 'USIU', logo: '/images/brands/usiu.png' },
  { id: 16, name: 'Wave 360', logo: '/images/brands/wave 360.png' }
];

interface LogoShowcaseProps {
  variant?: 'grid' | 'carousel' | 'masonry';
  maxLogos?: number;
  showTitles?: boolean;
  grayscale?: boolean;
  className?: string;
}

const LogoShowcase: React.FC<LogoShowcaseProps> = ({
  variant = 'grid',
  maxLogos = brands.length,
  showTitles = false,
  grayscale = true,
  className = ''
}) => {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const displayedBrands = maxLogos ? brands.slice(0, maxLogos) : brands;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      } 
    }
  };

  // Render logos in a 4x4 grid with larger size
  const renderLayout = () => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 w-full max-w-7xl mx-auto">
      {displayedBrands.slice(0, 16).map((brand) => (
        <motion.div
          key={brand.id}
          className="flex flex-col items-center justify-center h-56 md:h-64 lg:h-72 p-4"
          variants={item}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onMouseEnter={() => setHoveredLogo(brand.id)}
          onMouseLeave={() => setHoveredLogo(null)}
        >
          <LogoItem 
            brand={brand} 
            showTitle={showTitles} 
            grayscale={grayscale}
            isHovered={hoveredLogo === brand.id}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full"
      >
        {renderLayout()}
      </motion.div>
    </div>
  );

};

// Individual logo item component
interface LogoItemProps {
  brand: { id: number; name: string; logo: string };
  showTitle: boolean;
  grayscale: boolean;
  isHovered?: boolean;
}

const LogoItem: React.FC<LogoItemProps> = ({ 
  brand, 
  showTitle, 
  grayscale, 
  isHovered = false 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 transition-all duration-300">
      <div className={`relative w-full aspect-square flex items-center justify-center p-3 ${grayscale ? 'filter grayscale' : ''} ${isHovered ? 'grayscale-0' : ''} transition-all duration-300`}>
        {!imageError ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-full h-full object-contain max-h-24 md:max-h-32 lg:max-h-40"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center p-2">
              {brand.name}
            </span>
          </div>
        )}
      </div>
      {showTitle && (
        <span className="mt-2 text-xs md:text-sm text-center text-gray-600 dark:text-gray-300 font-medium">
          {brand.name}
        </span>
      )}
    </div>
  );
};

export default LogoShowcase;
