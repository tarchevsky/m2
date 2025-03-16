import type { Config } from 'tailwindcss'
import {
  cont_md,
  cont_sm,
  cont_xs,
  cont_xxl,
  DARK_THEME,
  ind_md,
  ind_sm,
  ind_xs,
  ind_xxl,
  THEME,
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
        '.ind': {
          margin: [ind_xs],
          '@screen sm': {
            margin: [ind_sm],
          },
          '@screen md': {
            margin: [ind_md],
          },
          '@screen 2xl': {
            margin: [ind_xxl],
          },
        },
        '.cont': {
          'padding-left': [cont_xs],
          'padding-right': [cont_xs],
          '@screen sm': {
            'padding-left': [cont_sm],
            'padding-right': [cont_sm],
          },
          '@screen md': {
            'padding-left': [cont_md],
            'padding-right': [cont_md],
          },
          '@screen 2xl': {
            'padding-left': [cont_xxl],
            'padding-right': [cont_xxl],
          },
        },
        '.cont-left': {
          'padding-left': [cont_xs],
          '@screen sm': {
            'padding-left': [cont_sm],
          },
          '@screen md': {
            'padding-left': [cont_md],
          },
          '@screen 2xl': {
            'padding-left': [cont_xxl],
          },
        },
        '.cont-right': {
          'padding-right': [cont_xs],
          '@screen sm': {
            'padding-right': [cont_sm],
          },
          '@screen md': {
            'padding-right': [cont_md],
          },
          '@screen 2xl': {
            'padding-right': [cont_xxl],
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
