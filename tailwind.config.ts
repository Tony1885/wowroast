import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          900: "#0b0b0d",
          800: "#111114",
          700: "#18181b",
          600: "#1e1e22",
        },
      },
      animation: {
        "fire-glow": "fireGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fireGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(249,115,22,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(249,115,22,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
