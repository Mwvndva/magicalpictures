// Portfolio Categories
export const PORTFOLIO_CATEGORIES = {
  WEDDING: 'Wedding',
  CORPORATE: 'Corporate',
  MUSIC: 'Music',
  DOCUMENTARY: 'Documentary',
  COMMERCIAL: 'Commercial',
  BRAND: 'Brand'
} as const;

// Image sizes
export const IMAGE_SIZES = {
  THUMBNAIL: '500x300',
  LARGE: '1200x800',
} as const;

// Color Theme
export const COLORS = {
  PRIMARY: '#0070f3',
  SECONDARY: '#2083ff',
  BACKGROUND: '#000000',
  TEXT: '#ffffff',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  TABLET_L: 1024,
  DESKTOP: 1280,
  DESKTOP_L: 1440,
  DESKTOP_XL: 1920
} as const;

// Responsive utilities
export const isMobile = (width: number) => width < BREAKPOINTS.TABLET;
export const isTablet = (width: number) => width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.DESKTOP;
export const isDesktop = (width: number) => width >= BREAKPOINTS.DESKTOP;

// CSS breakpoints
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
  LOADED: 'loaded'
} as const;

export const cssBreakpoints = {
  mobileS: `${BREAKPOINTS.MOBILE_S}px`,
  mobileM: `${BREAKPOINTS.MOBILE_M}px`,
  mobileL: `${BREAKPOINTS.MOBILE_L}px`,
  tablet: `${BREAKPOINTS.TABLET}px`,
  tabletL: `${BREAKPOINTS.TABLET_L}px`,
  desktop: `${BREAKPOINTS.DESKTOP}px`,
  desktopL: `${BREAKPOINTS.DESKTOP_L}px`,
  desktopXL: `${BREAKPOINTS.DESKTOP_XL}px`
} as const;

export type LoadingState = typeof LOADING_STATES[keyof typeof LOADING_STATES];

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error occurred. Please try again later.',
  INVALID_DATA: 'Invalid data received from server.',
  TIMEOUT: 'Request timed out. Please try again later.',
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.8,
} as const;
// Menu Items
export const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Brands', path: '/brands' },
  { name: 'Booking', path: '/booking' },
  { name: 'Contact', path: '/contact' },
] as const;

export type MenuItem = typeof MENU_ITEMS[number];
