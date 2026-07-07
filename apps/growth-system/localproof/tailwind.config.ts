import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:     "#0C0F1A",
        navy:    "#111827",
        panel:   "#161D2E",
        rim:     "#1E2A42",
        wire:    "#2A3A55",
        sky:     "#5B8EF0",
        skylit:  "#7AAAF7",
        chalk:   "#F0F4FF",
        mist:    "#8A9BB5",
        amber:   "#F5A623",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["'Courier New'", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
