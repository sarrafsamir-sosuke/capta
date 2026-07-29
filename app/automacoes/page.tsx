import type { Metadata } from "next"
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconClock,
  IconCalendarCheck,
  IconBell,
} from "@tabler/icons-react"
import { Nav } from "@/components/shared/Nav"
import { Footer } from "@/components/shared/Footer"
import { ChatDemo } from "@/components/sections/ChatDemo"
import { RevealSection } from "@/components/ui/RevealSection"
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup"
import { AUTOMACOES_PAGE, linkWhatsApp } from "@/lib/constants"

export const metadata: Metadata = {
  // Sem "· Capta" aqui: o template do metadata global (app/layout.tsx) já
  // acrescenta " | Capta" a todo title de página filha.
  title: "Automação de WhatsApp",
  description:
    "Atendimento automático no WhatsApp para o seu negócio em São Luís. Responde, agenda e avisa você, no ar em até 7 dias.",
}

// Ícones dos cards "o que está incluso" (apresentação); copy vem de constants.
const INCLUSO_ICONES = [IconClock, IconCalendarCheck, IconBell]

export default function AutomacoesPage() {
  const { hero, comoFunciona, incluso, ctaFinal } = AUTOMACOES_PAGE

  return (
    <>
      <Nav />
      <main>
        {/* Hero da página */}
        <section className="mx-auto max-w-6xl px-5 pt-24 pb-16 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]">
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-100 md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {hero.subheadline}
            </p>
            <div className="mt-10">
              <a
                href={linkWhatsApp(hero.cta.texto)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                <IconBrandWhatsapp size={16} />
                {hero.cta.label}
              </a>
            </div>
          </RevealSection>
        </section>

        {/* Como funciona — 4 passos */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            {comoFunciona.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
            {comoFunciona.titulo}
          </h2>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {comoFunciona.passos.map((passo) => (
              <StaggerItem key={passo.n}>
                <div className="text-3xl font-bold tracking-tight text-zinc-700">
                  {passo.n}
                </div>
                <h3 className="mt-3 text-base font-medium text-zinc-100">
                  {passo.titulo}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {passo.texto}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        {/* Chat demo centralizado */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]">
          <RevealSection className="flex justify-center">
            <ChatDemo />
          </RevealSection>
        </section>

        {/* O que está incluso — 3 cards */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 xl:max-w-[1200px] tv:max-w-[1400px]">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            {incluso.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
            {incluso.titulo}
          </h2>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {incluso.cards.map((card, i) => {
              const Icone = INCLUSO_ICONES[i]
              return (
                <StaggerItem
                  key={card.titulo}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
                >
                  <Icone size={22} stroke={1.5} className="text-zinc-300" />
                  <h3 className="mt-4 text-base font-medium text-zinc-100">
                    {card.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {card.texto}
                  </p>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-3xl px-5 py-24 text-center md:px-6">
          <RevealSection>
            <p className="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
              {ctaFinal.texto}
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={linkWhatsApp(ctaFinal.cta.texto)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                {ctaFinal.cta.label}
                <IconArrowRight size={16} />
              </a>
            </div>
          </RevealSection>
        </section>
      </main>
      <Footer />
    </>
  )
}
