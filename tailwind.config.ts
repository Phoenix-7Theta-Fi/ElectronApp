import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
        muted: "#171717",
        border: "#262626",
        primary: "#FFFFFF",
        secondary: "#A3A3A3",
        accent: "#404040"
      }
    }
  },
  plugins: []
};

export default config;

