import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void:    "#09090B",
        surface: "#111113",
        panel:   "#18181C",
        card:    "#1F1F24",
        rim:     "#2A2A32",
        wire:    "#383844",
        orange:  "#F97316",
        oranglit:"#FB923C",
        chalk:   "#FAFAFA",
        fog:     "#71717A",
        mist:    "#A1A1AA",
        silver:  "#D4D4D8",
        green:   "#22C55E",
        blue:    "#3B82F6",
        purple:  "#A855F7",
        amber:   "#F59E0B",
        red:     "#EF4444",
        teal:    "#14B8A6",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "'Courier New'", "monospace"],
      },
      animation: {
        "fade-up":    "fadeUp 0.5s ease both",
        "fade-in":    "fadeIn 0.3s ease both",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:  { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
      },
    },
  },
  plugins: [],
};
export default config;
