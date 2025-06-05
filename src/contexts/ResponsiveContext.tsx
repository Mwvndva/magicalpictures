import React, { createContext, useContext, useState, useEffect } from 'react';
import { BREAKPOINTS, isMobile, isTablet, isDesktop } from '../lib/constants';

interface ResponsiveContextType {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileS: boolean;
  isMobileM: boolean;
  isMobileL: boolean;
  isTabletL: boolean;
  isDesktopL: boolean;
  isDesktopXL: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};

interface ResponsiveProviderProps {
  children: React.ReactNode;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveContext: ResponsiveContextType = {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobile: isMobile(windowDimensions.width),
    isTablet: isTablet(windowDimensions.width),
    isDesktop: isDesktop(windowDimensions.width),
    isMobileS: windowDimensions.width < BREAKPOINTS.MOBILE_S,
    isMobileM: windowDimensions.width >= BREAKPOINTS.MOBILE_S && windowDimensions.width < BREAKPOINTS.MOBILE_M,
    isMobileL: windowDimensions.width >= BREAKPOINTS.MOBILE_M && windowDimensions.width < BREAKPOINTS.MOBILE_L,
    isTabletL: windowDimensions.width >= BREAKPOINTS.TABLET_L && windowDimensions.width < BREAKPOINTS.DESKTOP,
    isDesktopL: windowDimensions.width >= BREAKPOINTS.DESKTOP_L && windowDimensions.width < BREAKPOINTS.DESKTOP_XL,
    isDesktopXL: windowDimensions.width >= BREAKPOINTS.DESKTOP_XL
  };

  return (
    <ResponsiveContext.Provider value={responsiveContext}>
      {children}
    </ResponsiveContext.Provider>
  );
};
