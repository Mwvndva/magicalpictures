import { PORTFOLIO_CATEGORIES, LOADING_STATES } from '../lib/constants';

export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[keyof typeof PORTFOLIO_CATEGORIES];

export interface VideoItem {
  id: number;
  title: string;
  category: PortfolioCategory;
  thumbnail: string;
  videoUrl: string;
  description?: string;
  tags?: string[];
  createdAt?: string;
}

export type LoadingState = typeof LOADING_STATES[keyof typeof LOADING_STATES];

export interface PortfolioState {
  items: VideoItem[];
  loading: LoadingState;
  error?: string;
  currentPage: number;
  totalPages: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  category: PortfolioCategory;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}
