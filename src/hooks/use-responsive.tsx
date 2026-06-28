import React, { createContext, useContext, useState, useEffect } from 'react';
import { BREAKPOINTS, isMobile as checkIsMobile, isTablet as checkIsTablet, isDesktop as checkIsDesktop } from '@/lib/constants';

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
        if (typeof window === 'undefined') return;

        let timeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 100);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        // Initial call to set correct dimensions on mount
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout);
        };
    }, []);

    const { width, height } = windowDimensions;

    const value: ResponsiveContextType = {
        width,
        height,
        isMobile: checkIsMobile(width),
        isTablet: checkIsTablet(width),
        isDesktop: checkIsDesktop(width),
        isMobileS: width < BREAKPOINTS.MOBILE_S,
        isMobileM: width >= BREAKPOINTS.MOBILE_S && width < BREAKPOINTS.MOBILE_M,
        isMobileL: width >= BREAKPOINTS.MOBILE_M && width < BREAKPOINTS.MOBILE_L,
        isTabletL: width >= BREAKPOINTS.TABLET_L && width < BREAKPOINTS.DESKTOP,
        isDesktopL: width >= BREAKPOINTS.DESKTOP_L && width < BREAKPOINTS.DESKTOP_XL,
        isDesktopXL: width >= BREAKPOINTS.DESKTOP_XL
    };

    return (
        <ResponsiveContext.Provider value={value}>
            {children}
        </ResponsiveContext.Provider>
    );
};
