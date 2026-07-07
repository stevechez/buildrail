import type { Config } from "tailwindcss";

const config: Config = {
  // Disable Preflight so the widget doesn't reset the host page's global styles.
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{ts,tsx}",
    // Scan the package source so every utility class used in components is included.
    "../estimator-ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
