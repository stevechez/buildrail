import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void:   "#0A0A0F",
        obsid:  "#111118",
        carbon: "#18181F",
        panel:  "#1E1E28",
        rim:    "#2A2A38",
        wire:   "#3A3A50",
        gold:   "#F5A623",
        chalk:  "#FFFFFF",
        fog:    "#8A8AA0",
        mist:   "#B0B0C8",
        jade:   "#22C55E",
        violet: "#6366F1",
        ember:  "#F97316",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Inter", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
