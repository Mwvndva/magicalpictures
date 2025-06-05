import React, { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (event: string, action: string, params?: Record<string, any>) => void;
  }
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {

  useEffect(() => {
    // Initialize analytics
    const initializeAnalytics = () => {
      // Initialize Google Analytics
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = (event: string, action: string, params?: Record<string, any>) => {
          window.dataLayer.push([event, action, params]);
        };
        window.gtag('js', 'new', { timestamp: new Date().toISOString() });
        window.gtag('config', 'YOUR_GA_MEASUREMENT_ID');
      }
    };

    // Track portfolio interactions
    const trackPortfolioInteraction = (type: string, data: Record<string, any>) => {
      if (typeof window !== 'undefined') {
        window.gtag('event', 'portfolio_interaction', {
          event_category: 'portfolio',
          event_label: type,
          ...data
        });
      }
    };

    // Track form submissions
    const trackFormSubmission = (formType: string, data: Record<string, any>) => {
      if (typeof window !== 'undefined') {
        window.gtag('event', 'form_submission', {
          event_category: 'forms',
          event_label: formType,
          ...data
        });
      }
    };

    // Initialize analytics when component mounts
    initializeAnalytics();
  }, []);

  return <>{children}</>;
};
