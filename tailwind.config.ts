import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        'oswald': ["var(--font-oswald)"],
        'raleway': ["var(--font-raleway)"],
      },
      colors:{
        "accent-background" : "#474B4F"
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    base:false,
    themes:[
      {
        myTheme: {
          "primary": "#F6DE58",
          "secondary": "#cc9955",
          "accent": "#4f46e5",
          "neutral": "#6b7280",
          "base-100": "#25282A",
          "info": "#3b82f6",
          "success": "#4ade80",
          "warning": "#eb810f",
          "error": "#f75058",
        }
      }
    ]
  }
}
export default config
