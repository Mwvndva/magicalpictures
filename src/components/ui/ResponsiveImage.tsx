import React from 'react';
import Image from 'next/image';
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
  quality = 75,
  placeholder = 'blur',
  loading = 'lazy',
  blurDataURL,
  onError
}) => {
  const [error, setError] = React.useState(false);

  const handleError = (e: Error) => {
    setError(true);
    onError?.(e);
  };

  if (error) {
    return (
      <div className="relative w-full h-full">
        <Skeleton
          variant="rounded"
          width="100%"
          height="100%"
          className="absolute inset-0"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <span>Image failed to load</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        loading={loading}
        blurDataURL={blurDataURL}
        onError={handleError}
        aria-hidden={false}
        role="img"
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height="100%"
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
};
