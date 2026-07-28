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
      fontFamily: {
        // A Sora é carregada por next/font/google no layout raiz, que expõe
        // a família como variável CSS. Referenciar "Sora" direto faria o
        // browser procurar a fonte instalada na máquina e cair no fallback.
        sans: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
