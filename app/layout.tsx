import type { Metadata } from "next"
import { Sora } from "next/font/google"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import { LenisProvider } from "@/components/shared/LenisProvider"
import { StructuredData } from "@/components/shared/StructuredData"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
})

const SITE_URL = "https://capta-beta.vercel.app"

// SEO técnico + AIO (Prompt SEO/AIO). Sem travessão no title/description
// (mesma regra da copy visível: "·" e ":" no lugar de "—").
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Capta | Agência Digital em São Luís: Sites e Automação de Atendimento",
    template: "%s | Capta",
  },

  description:
    "A Capta cria sites profissionais e automação de atendimento via WhatsApp para micro e pequenas empresas em São Luís, MA. Entrega em até 3 dias. Otimizado para Google e IA.",

  keywords: [
    "agência digital São Luís",
    "criação de sites São Luís",
    "site profissional Maranhão",
    "automação WhatsApp São Luís",
    "site para pequenas empresas São Luís",
    "agência de marketing digital São Luís MA",
    "site que aparece no Google",
    "site para clínica São Luís",
    "site para academia São Luís",
    "atendimento automático WhatsApp",
  ],

  authors: [{ name: "Capta", url: SITE_URL }],
  creator: "Capta",
  publisher: "Capta",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Capta",
    title: "Capta | Sites e Automação de Atendimento em São Luís",
    description:
      "Site profissional e atendimento automático no WhatsApp para o seu negócio em São Luís. Entrega em até 3 dias, otimizado para Google e para IA.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capta, Agência Digital em São Luís, MA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Capta | Agência Digital em São Luís",
    description:
      "Sites profissionais e automação de atendimento para pequenos negócios em São Luís, MA.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
