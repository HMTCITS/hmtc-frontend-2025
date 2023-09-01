const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-fairplay-display)'],
        secondary: ['var(--font-poppins)'],
      },
      fontSize: {
        mid: ['15px', '22px'],
        macro: ['17px', '26px'],
      },
      colors: {
        white: {
          DEFAULT: '#FFFFFF',
          light: {
            1: '#FFFFFF',
            2: '#FEFEFD',
            3: '#FEFDFA',
            4: '#FEFCF8',
            5: '#FEFBF4',
          },
          main: '#FDFAF0',
          dark: {
            1: '#EDE8DB',
            2: '#DCD7C6',
            3: '#CBC6B1',
            4: '#B9B49C',
            5: '#A8A287',
          },
        },
        black: {
          DEFAULT: '#000000',
          light: {
            1: '#778087',
            2: '#697178',
            3: '#5B6369',
            4: '#4D555A',
            5: '#3F474B',
          },
          main: '#31393C',
          dark: {
            1: '#2B3436',
            2: '#242F30',
            3: '#1E2A2A',
            4: '#172425',
            5: '#101F1F',
          },
        },
        blue: {
          light: {
            1: '#78C6FF',
            2: '#67B6FF',
            3: '#55A6FF',
            4: '#4496FF',
            5: '#3386FF',
          },
          main: '#2176FF',
          dark: {
            1: '#1C66E0',
            2: '#1655C0',
            3: '#1145A1',
            4: '#0B3481',
            5: '#062461',
          },
        },
        yellow: {
          light: {
            1: '#FFFF90',
            2: '#FFF480',
            3: '#FFEA70',
            4: '#FFDF60',
            5: '#FED450',
          },
          main: '#FDCA40',
          dark: {
            1: '#E9B536',
            2: '#D5A02C',
            3: '#C18B22',
            4: '#AD7518',
            5: '#995F0E',
          },
        },
        red: {
          light: {
            1: '#FF8080',
            2: '#FF6F6F',
            3: '#FF5E5E',
            4: '#F84D4D',
            5: '#F03C3C',
          },
          main: '#E82C2C',
          dark: {
            1: '#D02121',
            2: '#B91616',
            3: '#A20B0B',
            4: '#8B0000',
            5: '#740000',
          },
        },
        green: {
          light: {
            1: '#8CFF91',
            2: '#7AF680',
            3: '#69E56F',
            4: '#57D55E',
            5: '#45C54D',
          },
          main: '#34B53C',
          dark: {
            1: '#2AA32D',
            2: '#207F1E',
            3: '#165C0F',
            4: '#0C3800',
            5: '#021500',
          },
        },
        purple: {
          light: {
            1: '#DA8AFD',
            2: '#CA79FD',
            3: '#BA67FD',
            4: '#57D55E',
            5: '#9A44FD',
          },
          main: '#8A33FD',
          dark: {
            1: '#792CE3',
            2: '#6925C9',
            3: '#581FAF',
            4: '#481895',
            5: '#021500',
          },
        },
        orange: {
          light: {
            1: '#FCC471',
            2: '#FBB360',
            3: '#FAA24F',
            4: '#FAA24F',
            5: '#F7802D',
          },
          main: '#F56F1C',
          dark: {
            1: '#E35F10',
            2: '#D14F05',
            3: '#BF3F00',
            4: '#AD2F00',
            5: '#9B1F00',
          },
        },
        teal: {
          light: {
            1: '#73E4F6',
            2: '#62D9E6',
            3: '#50CED6',
            4: '#3FC3C6',
            5: '#2DB8B6',
          },
          main: '#1CADA6',
          dark: {
            1: '#199A96',
            2: '#168786',
            3: '#137476',
            4: '#106166',
            5: '#0D4D56',
          },
        },
        base: {
          dark: '#212121',
          gray: '#F0F2F5',
          nav: '#9AA2B1',
          icon: '#757575',
          border: '#E4E7EB',
          subtle: '#2f2f33',
        },
      },
      transitionProperty: {
        decoration: 'text-decoration',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
