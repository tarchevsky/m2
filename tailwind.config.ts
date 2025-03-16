import type { Config } from 'tailwindcss'
import {
  DARK_THEME,
  MD,
  SM,
  THEME,
  XS,
  XXL,
} from './src/constants/theme.constants'
import { tailwindSafelist } from './src/utils/wpToTailwind'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: tailwindSafelist,
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }: any) {
      const containerUtility = {
        '.cont': {
          'padding-left': [XS],
          'padding-right': [XS],
          '@screen sm': {
            'padding-left': [SM],
            'padding-right': [SM],
          },
          '@screen md': {
            'padding-left': [MD],
            'padding-right': [MD],
          },
          '@screen 2xl': {
            'padding-left': [XXL],
            'padding-right': [XXL],
          },
        },
        '.cont-left': {
          'padding-left': [XS],
          '@screen sm': {
            'padding-left': [SM],
          },
          '@screen md': {
            'padding-left': [MD],
          },
          '@screen 2xl': {
            'padding-left': [XXL],
          },
        },
        '.cont-right': {
          'padding-right': [XS],
          '@screen sm': {
            'padding-right': [SM],
          },
          '@screen md': {
            'padding-right': [MD],
          },
          '@screen 2xl': {
            'padding-right': [XXL],
          },
        },
      }
      addUtilities(containerUtility, ['responsive'])
    },
  ],
  daisyui: {
    themes: [
      {
        [THEME]: {
          ...require('daisyui/src/theming/themes')[THEME],
          '--glass-blur': '3px',
          '.glass': {
            'background-image':
              'linear-gradient(\n' +
              '        rgb(255 255 255 / var(--glass-opacity, 20%)) 50%,\n' +
              '        rgb(0 0 0 / 0%) 100%\n' +
              '      )',
          },
        },
        [DARK_THEME]: {
          ...require('daisyui/src/theming/themes')[DARK_THEME],
        },
      },
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
  darkMode: ['class', `[data-theme=${DARK_THEME}]`],
}
export default config
