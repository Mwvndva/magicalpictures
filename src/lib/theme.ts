import { COLORS, BREAKPOINTS } from './constants';

export const theme = {
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    background: COLORS.BACKGROUND,
    text: COLORS.TEXT,
    error: '#ff4444',
    success: '#4CAF50',
    warning: '#FFC107',
    muted: '#666666',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  breakpoints: {
    mobile: `${BREAKPOINTS.MOBILE}px`,
    tablet: `${BREAKPOINTS.TABLET}px`,
    desktop: `${BREAKPOINTS.DESKTOP}px`,
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.4s ease-in-out',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;

// CSS Custom Properties
export const cssVariables = {
  colors: {
    primary: `--color-primary`,
    secondary: `--color-secondary`,
    background: `--color-background`,
    text: `--color-text`,
    error: `--color-error`,
    success: `--color-success`,
    warning: `--color-warning`,
    muted: `--color-muted`,
  },
  spacing: {
    xs: `--spacing-xs`,
    sm: `--spacing-sm`,
    md: `--spacing-md`,
    lg: `--spacing-lg`,
    xl: `--spacing-xl`,
    '2xl': `--spacing-2xl`,
  },
  breakpoints: {
    mobile: `--breakpoint-mobile`,
    tablet: `--breakpoint-tablet`,
    desktop: `--breakpoint-desktop`,
  },
} as const;

export type CSSVariables = typeof cssVariables;
