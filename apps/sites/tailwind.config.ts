import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../packages/estimator-ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void:    "#0A0A0A",
        carbon:  "#111111",
        panel:   "#181818",
        card:    "#1F1F1F",
        rim:     "#2A2A2A",
        wire:    "#383838",
        orange:  "#F97316",
        oranglit:"#FB923C",
        orangdim:"#7C3A0A",
        chalk:   "#FFFFFF",
        fog:     "#666666",
        mist:    "#999999",
        silver:  "#CCCCCC",
        red:     "#EF4444",
        jade:    "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
