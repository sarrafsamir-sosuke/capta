import type { Metadata, Viewport } from "next"
import { Sora } from "next/font/google"
import { LenisProvider } from "@/components/shared/LenisProvider"
import { SITE } from "@/lib/constants"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nome} — ${SITE.tagline}`,
    template: `%s — ${SITE.nome}`,
  },
  description: SITE.descricao,
  keywords: [
    "site para academia",
    "site para consultório",
    "site para restaurante",
    "automação de WhatsApp",
    "São Luís",
    "Maranhão",
  ],
  authors: [{ name: SITE.nome }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.nome,
    title: `${SITE.nome} — ${SITE.tagline}`,
    description: SITE.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nome} — ${SITE.tagline}`,
    description: SITE.descricao,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`dark ${sora.variable}`}>
      <body className="font-sans">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
