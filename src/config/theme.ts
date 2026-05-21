export const colors = {
  primary: '#E63946',
  secondary: '#F4A261',
  tertiary: '#2A9D8F',
  dark: '#264653',
  cream: '#FEFAE0',
  warmWhite: '#FFF8F0',
  saffron: '#E9C46A',
  deepRed: '#C1121F',
} as const;

export const gradients = {
  heroOverlay: `linear-gradient(135deg, ${colors.primary}1a 0%, ${colors.secondary}1a 100%)`,
  cta: `linear-gradient(135deg, ${colors.tertiary}, ${colors.dark})`,
  ctaHover: `linear-gradient(135deg, ${colors.dark}, ${colors.tertiary})`,
  warmSection: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.warmWhite} 100%)`,
  darkSection: `linear-gradient(135deg, ${colors.dark} 0%, #1a3340 100%)`,
} as const;

export const shadows = {
  card: '0 8px 32px rgba(38, 70, 83, 0.12)',
  cardHover: '0 16px 48px rgba(38, 70, 83, 0.2)',
  glow: `0 0 40px ${colors.secondary}40`,
} as const;

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export const spacing = {
  sectionY: 'clamp(4rem, 10vw, 8rem)',
  containerX: 'clamp(1.5rem, 5vw, 6rem)',
  maxWidth: '1200px',
} as const;
