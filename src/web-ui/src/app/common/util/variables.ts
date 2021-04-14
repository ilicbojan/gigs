const size = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1440px',
};

// MOBILE FIRST
export const BREAKPOINTS = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};

export const COLOR = {
  primary: '#283D3B',
  primaryLight: '#406461',
  primaryDark: '#203230',
  secondary: '#197278',
  secondaryDark: '#115055',
  danger: '#772E25',
  red: '#C44536',
  gray1: '#464646',
  gray2: '#2d2d2d',
  gray3: '#575757',
  grayLight: '#f6f6f6 ',
  grayDark: '#333',
  white: '#fff',
  black: '#000',
};

export const utilities = {
  shadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
  navHeight: '60px',
};
