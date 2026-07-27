import type { Metadata } from "next"
import { Nav } from "@/components/shared/Nav"
import { Footer } from "@/components/shared/Footer"
import { AutoHero } from "@/components/sections/automacoes/AutoHero"
import { ChatUniversal } from "@/components/sections/automacoes/ChatUniversal"
import { NichoBloco } from "@/components/sections/automacoes/NichoBloco"
import { ComoEntregamos } from "@/components/sections/automacoes/ComoEntregamos"
import { PacotesNicho } from "@/components/sections/automacoes/PacotesNicho"
import { AutoCTA } from "@/components/sections/automacoes/AutoCTA"
import { AUTO_HERO } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Automação de WhatsApp",
  description: AUTO_HERO.subhead,
}

export default function AutomacoesPage() {
  return (
    <>
      <Nav />
      <main>
        <AutoHero />
        {/* Sem pills aqui: os quatro nichos já aparecem em detalhe no
            NichoBloco logo abaixo. Esta conversa é a mesma para todos. */}
        <ChatUniversal />
        <NichoBloco />
        <ComoEntregamos />
        <PacotesNicho />
        <AutoCTA />
      </main>
      <Footer />
    </>
  )
}
