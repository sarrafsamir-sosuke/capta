import { Nav } from "@/components/shared/Nav"
import { Footer } from "@/components/shared/Footer"
import { Hero } from "@/components/sections/home/Hero"
import { Resolve } from "@/components/sections/home/Resolve"
import { Projetos } from "@/components/sections/home/Projetos"
import { Automacoes } from "@/components/sections/home/Automacoes"
import { Nichos } from "@/components/sections/home/Nichos"
import { Pacotes } from "@/components/sections/home/Pacotes"
import { CTAFinal } from "@/components/sections/home/CTAFinal"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Resolve />
        <Projetos />
        <Automacoes />
        <Nichos />
        <Pacotes />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
