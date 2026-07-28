import { IconArrowRight } from "@tabler/icons-react"
import { DIAGNOSTICO, linkWhatsApp } from "@/lib/constants"
import { RevealSection } from "@/components/ui/RevealSection"

// Server Component. Seção centralizada, botão único de conversão. O conteúdo
// entra com fade ao aparecer na viewport (Prompt 7).
export function Diagnostico() {
  return (
    <section
      id="diagnostico"
      className="mx-auto max-w-3xl px-6 py-24 text-center"
    >
      <RevealSection>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
          {DIAGNOSTICO.titulo}
        </h2>

        <div className="mt-6 space-y-4">
          {DIAGNOSTICO.paragrafos.map((paragrafo, i) => (
            <p key={i} className="text-base leading-relaxed text-zinc-400">
              {paragrafo}
            </p>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={linkWhatsApp(DIAGNOSTICO.cta.texto)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            {DIAGNOSTICO.cta.label}
            <IconArrowRight size={16} />
          </a>
        </div>
      </RevealSection>
    </section>
  )
}
