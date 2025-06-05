import React from 'react';
import { useResponsive } from '../../contexts/ResponsiveContext';
import { ResponsiveImage } from './ResponsiveImage';

interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio?: number;
}

interface ResponsiveGalleryProps {
  items: GalleryItem[];
  className?: string;
  gap?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export const ResponsiveGallery: React.FC<ResponsiveGalleryProps> = ({
  items,
  className = '',
  gap = 'gap-4',
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }
}) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className={`grid ${gap} ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`aspect-[${item.aspectRatio || (item.width / item.height)}]`}
        >
          <ResponsiveImage
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="object-cover w-full h-full"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};
