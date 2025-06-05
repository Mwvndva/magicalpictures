import { createContext, useContext, useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/lib/constants';
import { ResponsiveContext } from './ui/responsive/ResponsiveContext';

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < BREAKPOINTS.TABLET;
  const isTablet = width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.DESKTOP;
  const isDesktop = width >= BREAKPOINTS.DESKTOP;

  return (
    <ResponsiveContext.Provider value={{
      width,
      isMobile,
      isTablet,
      isDesktop
    }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
