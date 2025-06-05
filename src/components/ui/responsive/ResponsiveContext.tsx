import { createContext, useContext } from 'react';
import { BREAKPOINTS } from '@/lib/constants';

interface ResponsiveContextType {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
