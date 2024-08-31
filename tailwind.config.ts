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
        lightPrimary: "#FFEFF6",
        secondary: "#050B2C",
        dark: "#1F0610",
        disabled: "#F5A3B9",
      },
      backgroundImage: {
        footer: "url('/footer-bg.svg')",
        footerMobile: "url('/footer-bg-mobile.svg')",
      },
      boxShadow: {
        custom: "0px 0px 0px 1px rgba(29, 29, 32, 0.16)",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
