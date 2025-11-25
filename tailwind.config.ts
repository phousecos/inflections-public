import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Inflections brand colors (based on UPL guidelines)
        brand: {
          blue: "#0020C2", // Medium Blue - primary
          orange: "#FFA300", // Orange Web - accent
          jet: "#2D2D2D", // Dark neutral
          black: "#000000",
          rose: "#F22080", // Accent
          ghost: "#F3F6FF", // Light background
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
