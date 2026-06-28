import React, { useState } from 'react';
import { motion } from 'framer-motion';

const brands = [
  { id: 1, name: 'AA', logo: '/assets/brands/aakenya.png' },
  { id: 2, name: 'CAPWELL', logo: '/assets/brands/capwell.png' },
  { id: 3, name: 'BETIKA', logo: '/assets/brands/betika.png' },
  { id: 4, name: 'DKT', logo: '/assets/brands/dkt.png' },
  { id: 5, name: 'USIU', logo: '/assets/brands/usiu.png' },
  { id: 6, name: 'UCSF', logo: '/assets/brands/ucsf.png' },
  { id: 7, name: 'BINGWA FEST', logo: '/assets/brands/bingwa-fest.png' },
  { id: 8, name: 'AFC', logo: '/assets/brands/afc.png' },
  { id: 9, name: 'WEB360', logo: '/assets/brands/wave-360.png' },
  { id: 10, name: 'KIJIVU', logo: '/assets/brands/kijivu.png' },
  { id: 11, name: 'HOTPOINT', logo: '/assets/brands/hotpoint.png' },
  { id: 12, name: 'MOSMOS', logo: '/assets/brands/mosmos.png' },
  { id: 13, name: 'MINISTRY OF HEALTH', logo: '/assets/brands/ministry-of-health.png' },
  { id: 14, name: 'SFR', logo: '/assets/brands/safari-rally-kenya.png' },
  { id: 15, name: 'AIRTEL', logo: '/assets/brands/airtel.png' },
  { id: 16, name: 'E&K', logo: '/assets/brands/e-and-k.png' },
  { id: 17, name: 'PEPSI', logo: '/assets/brands/pepsi.png' }
];

interface LogoShowcaseProps {
  variant?: 'grid' | 'carousel' | 'masonry';
  maxLogos?: number;
  showTitles?: boolean;
  grayscale?: boolean;
  className?: string;
}

const LogoShowcase: React.FC<LogoShowcaseProps> = ({
  maxLogos = brands.length,
  showTitles = false,
  grayscale = false,
  className = ''
}) => {
  const displayedBrands = maxLogos ? brands.slice(0, maxLogos) : brands;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1 sm:p-3 w-full max-w-6xl mx-auto"
      >
        {displayedBrands.map((brand) => (
          <motion.div
            key={brand.id}
            className="flex flex-col items-center justify-center"
            variants={item}
          >
            <LogoItem
              brand={brand}
              showTitle={showTitles}
              grayscale={grayscale}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

interface LogoItemProps {
  brand: { id: number; name: string; logo: string };
  showTitle: boolean;
  grayscale: boolean;
}

const LogoItem: React.FC<LogoItemProps> = ({
  brand,
  showTitle,
  grayscale
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full group">
      <div
        className={`relative w-full aspect-[4/3] flex items-center justify-center p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/70 group-hover:border-yellow-500/40 transition-all duration-300 ${grayscale ? 'filter grayscale group-hover:grayscale-0' : ''}`}
      >
        {!imageError ? (
          <img
            src={brand.logo}
            alt={brand.name}
            loading="lazy"
            decoding="async"
            width={220}
            height={160}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="w-full h-full object-contain max-h-16 md:max-h-20 transform transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-950 rounded-lg">
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center p-2">
              {brand.name}
            </span>
          </div>
        )}
      </div>
      {showTitle && (
        <span className="mt-2 text-xs text-center text-gray-400 group-hover:text-yellow-500 font-medium transition-colors">
          {brand.name}
        </span>
      )}
    </div>
  );
};

export default LogoShowcase;
