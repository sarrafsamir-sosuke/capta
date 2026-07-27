import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Verde da marca — herdado do site atual (#1D9E75).
        // Escala montada para dark mode: texto escuro sobre o 500 dá 5.84:1 (AA),
        // e o hover CLAREIA para o 400 (7.99:1) em vez de escurecer.
        capta: {
          300: "#9FE1CB", // texto verde sobre fundo escuro
          400: "#35B98C", // hover de superfície verde
          500: "#1D9E75", // cor de destaque — a única do site
          600: "#16805E",
          700: "#0F6E56", // bordas e estados sutis
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
