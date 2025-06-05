import React from 'react';
import { useResponsive } from '../contexts/ResponsiveContext';

interface ResponsiveGridProps {
  children: React.ReactNode;
  gap?: string;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const defaultColumns = {
  mobile: 1,
  tablet: 2,
  desktop: 3
};

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  gap = 'gap-4',
  className = '',
  columns = defaultColumns
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getGridTemplateColumns = () => {
    if (isMobile) {
      return `grid-cols-${columns.mobile}`;
    }
    if (isTablet) {
      return `grid-cols-${columns.tablet}`;
    }
    return `grid-cols-${columns.desktop}`;
  };

  return (
    <div
      className={`grid ${getGridTemplateColumns()} ${gap} ${className}`}
    >
      {children}
    </div>
  );
};
