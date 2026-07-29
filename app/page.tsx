import { Nav } from "@/components/shared/Nav"
import { Footer } from "@/components/shared/Footer"
import { Hero } from "@/components/sections/Hero"
import { Resolve } from "@/components/sections/Resolve"
import { Projetos } from "@/components/sections/Projetos"
import { Automacoes } from "@/components/sections/Automacoes"
import { Resultados } from "@/components/sections/Resultados"
import { Faq } from "@/components/sections/Faq"
import { Diagnostico } from "@/components/sections/Diagnostico"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Resolve />
        <Projetos />
        <Automacoes />
        <Resultados />
        <Faq />
        <Diagnostico />
      </main>
      <Footer />
    </>
  )
}
