import type { Metadata } from "next"
import { Sora } from "next/font/google"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Capta — Sites e atendimento automático em São Luís",
  description:
    "A Capta constrói a presença digital de micro e pequenas empresas em São Luís — site que aparece no Google e atendimento automático que funciona enquanto você trabalha.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning é exigido pelo next-themes: ele escreve a classe
    // do tema no <html> antes da hidratação, o que sem isso vira warning.
    <html
      lang="pt-BR"
      className={sora.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
