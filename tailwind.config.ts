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
      screens: {
        // Breakpoint "TV" do Prompt 10 (1920px+): telas grandes ganham um
        // max-width maior nos containers. Extend mantém sm/md/lg/xl/2xl padrão.
        tv: "1920px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
