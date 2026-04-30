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
        background: "#0a0a0a",
        foreground: "#f5f5f5",
        gold: "#FFD700",
        "gold-dark": "#B8860B",
        silver: "#C0C0C0",
        "red-boxing": "#DC2626",
        "red-dark": "#991B1B",
        zinc: {
          850: "#1e1e1e",
          900: "#111111",
          950: "#080808",
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
