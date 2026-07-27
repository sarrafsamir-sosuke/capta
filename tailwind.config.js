/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // Varre o HTML e o JS: as classes montadas dentro do js/ precisam
  // aparecer como string inteira para o Tailwind enxergar.
  content: ["./*.html", "./js/**/*.js"],
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
        sans: ["Sora", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        // Seta do hero — era um loop do Framer Motion.
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        // Pontinhos do "digitando…" no chat.
        "typing-dot": {
          "0%, 100%": { opacity: "0.35", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-2px)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        bob: "bob 2s ease-in-out infinite",
        "typing-dot": "typing-dot 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
