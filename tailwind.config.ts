import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        theme: {
          light: "#f2f2e6",
          dark: "#07020a"
        },
        blueberry: {
          50: "#ebd1db",
          100: "#e3bdd4",
          200: "#d297d3",
          300: "#a775c2",
          400: "#7958af",
          500: "#504099",
          600: "#322c80",
          700: "#1f1d65",
          800: "#141148",
          900: "#0c0829",
        },
        biroBlue: {
          50: "#decfdb",
          100: "#c9b8ca",
          200: "#988ea4",
          300: "#6a6980",
          400: "#495060",
          500: "#303b46",
          600: "#1e2a32",
          700: "#121c23",
          800: "#0a1119",
          900: "#050811",
        },
        purplePennant: {
          50: "#ded0cf",
          100: "#cab8ba",
          200: "#a48e96",
          300: "#806977",
          400: "#60495c",
          500: "#463046",
          600: "#2f1e32",
          700: "#1f1223",
          800: "#140a19",
          900: "#0d0511",
        },
        blackishBrown: {
          50: "#deddcf",
          100: "#cac8b8",
          200: "#a4a08e",
          300: "#807a69",
          400: "#605849",
          500: "#463b30",
          600: "#32241e",
          700: "#231412",
          800: "#190a0b",
          900: "#110509",
        },
      }
    },
  },
  plugins: [],
}
export default config
