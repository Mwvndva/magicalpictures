import React, { useState, useEffect } from 'react';
import { Skeleton } from './skeleton';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  loading?: 'lazy' | 'eager';
  blurDataURL?: string;
  onError?: (error: Error) => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality,
  placeholder,
  loading = 'lazy',
  blurDataURL,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(blurDataURL || src);
  const [imageError, setImageError] = useState<Error | null>(null);

  useEffect(() => {
    if (onError && imageError) {
      onError(imageError);
    }
  }, [imageError, onError]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const error = new Error(`Failed to load image: ${src}`);
    setImageError(error);
    if (onError) {
      onError(error);
    }
    setIsLoading(false);
  };

  // Use Vite's asset handling for the image URL
  const getImageUrl = () => {
    try {
      return new URL(src, import.meta.url).href;
    } catch (e) {
      return src; // Fallback to the original src if URL parsing fails
    }
  };

  const imageUrl = getImageUrl();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
      }}
    >
      {isLoading && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      <img
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && !blurDataURL && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
};
