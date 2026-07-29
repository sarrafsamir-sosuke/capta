"use client"

import { useState } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { FAQ } from "@/lib/constants"
import { RevealSection } from "@/components/ui/RevealSection"
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup"

// Client Component: acordeão precisa de estado (item aberto). Mesma copy do
// FAQPage (JSON-LD) em StructuredData.tsx, vinda de FAQ (constants).
export function Faq() {
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="mx-auto max-w-3xl px-5 py-24 md:px-6"
    >
      <RevealSection>
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          {FAQ.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
          {FAQ.titulo}
        </h2>
      </RevealSection>

      <StaggerGroup className="mt-12 divide-y divide-zinc-800 border-t border-zinc-800">
        {FAQ.perguntas.map((item, i) => {
          const estaAberto = aberto === i
          return (
            <StaggerItem key={item.pergunta}>
              <button
                type="button"
                onClick={() => setAberto(estaAberto ? null : i)}
                aria-expanded={estaAberto}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-medium text-zinc-100">
                  {item.pergunta}
                </span>
                <IconChevronDown
                  size={18}
                  className={`shrink-0 text-zinc-500 transition-transform duration-300 ${
                    estaAberto ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/*
                Anima via grid-template-rows (0fr -> 1fr) em vez de height,
                que força reflow a cada frame e travava no celular. O truque
                do grid deixa o navegador animar sem recalcular layout do
                resto da página a cada frame.
              */}
              <div
                aria-hidden={!estaAberto}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  estaAberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`pb-5 pr-8 text-sm leading-relaxed text-zinc-400 transition-opacity duration-300 ${
                      estaAberto ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.resposta}
                  </p>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
