import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EE0768",
        lightPrimary: '#FFEFF6',
        secondary: '#050B2C',
        dark: '#1F0610',
        disabled: '#F5A3B9'
      },
      backgroundImage: {
        footer: "url('/footer-bg.svg')",
        footerMobile: "url('/footer-bg-mobile.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
