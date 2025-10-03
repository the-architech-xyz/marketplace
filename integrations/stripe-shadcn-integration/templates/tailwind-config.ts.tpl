import type { Config } from 'tailwindcss';

export function withPaymentConfig(config: Config): Config {
  return {
    ...config,
    theme: {
      ...config.theme,
      extend: {
        ...config.theme?.extend,
        colors: {
          ...config.theme?.extend?.colors,
          payment: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
        },
        fontFamily: {
          ...config.theme?.extend?.fontFamily,
          'payment': ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
  };
}
