"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NICHOS, AUTOMACOES_TEXTO } from "@/lib/constants"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { cn } from "@/lib/utils"

const TRANSICAO = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }

export function Automacoes({
  titulo = AUTOMACOES_TEXTO.titulo,
  mostrarCabecalho = true,
}: {
  titulo?: string
  mostrarCabecalho?: boolean
}) {
  const [ativo, setAtivo] = useState<string>(NICHOS[0].id)
  const pillsRef = useRef<(HTMLButtonElement | null)[]>([])

  const nicho = NICHOS.find((n) => n.id === ativo) ?? NICHOS[0]

  // Setas navegam entre as pills, como manda o padrão de tablist.
  function aoTeclar(e: React.KeyboardEvent, index: number) {
    const teclas: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: NICHOS.length - 1,
    }
    const alvo = teclas[e.key]
    if (alvo === undefined) return

    e.preventDefault()
    const proximo = (alvo + NICHOS.length) % NICHOS.length
    setAtivo(NICHOS[proximo].id)
    pillsRef.current[proximo]?.focus()
  }

  return (
    <section
      id="automacoes"
      className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-content">
        {mostrarCabecalho && (
          <div className="max-w-2xl">
            <SectionLabel>{AUTOMACOES_TEXTO.label}</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
              {titulo}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
              {AUTOMACOES_TEXTO.subhead}
            </p>
          </div>
        )}

        {/* Pills */}
        <div
          role="tablist"
          aria-label="Escolha o nicho"
          className="mt-10 flex flex-wrap gap-2"
        >
          {NICHOS.map((n, i) => {
            const selecionado = n.id === ativo
            const Icone = n.icon

            return (
              <button
                key={n.id}
                ref={(el) => {
                  pillsRef.current[i] = el
                }}
                role="tab"
                type="button"
                id={`pill-${n.id}`}
                aria-selected={selecionado}
                aria-controls={`painel-${n.id}`}
                tabIndex={selecionado ? 0 : -1}
                onClick={() => setAtivo(n.id)}
                onKeyDown={(e) => aoTeclar(e, i)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-colors duration-150",
                  selecionado
                    ? "font-medium text-zinc-900"
                    : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                )}
              >
                {selecionado && (
                  <motion.span
                    layoutId="pill-ativa"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-zinc-100"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icone size={14} stroke={1.75} aria-hidden="true" />
                  {n.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Painel */}
        <div
          role="tabpanel"
          id={`painel-${nicho.id}`}
          aria-labelledby={`pill-${nicho.id}`}
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:gap-10"
        >
          {/* Esquerda — fluxo.
              O celular é mais alto que o fluxo; centralizar verticalmente
              evita o vazio grande no rodapé do card. */}
          <div className="flex flex-col justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={nicho.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={TRANSICAO}
              >
                <p className="text-sm leading-relaxed text-zinc-400">
                  {nicho.problema}
                </p>

                <ol className="mt-8">
                  {nicho.fluxo.map((passo, i) => (
                    <motion.li
                      key={passo}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...TRANSICAO, delay: 0.06 + i * 0.06 }}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {i < nicho.fluxo.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[13px] top-7 h-[calc(100%-1rem)] w-px bg-zinc-800"
                        />
                      )}
                      <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[11px] font-medium text-zinc-400">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-sm text-zinc-200">{passo}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Direita — celular */}
          <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:w-[320px]">
            <div className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-2">
              <div className="overflow-hidden rounded-[1.35rem] border border-zinc-800 bg-zinc-950">
                {/* Cabeçalho da conversa */}
                <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-zinc-800">
                    <nicho.icon
                      size={16}
                      stroke={1.75}
                      className="text-zinc-400"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-200">
                      {nicho.label}
                    </p>
                    <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                      <span className="size-1.5 rounded-full bg-capta-500" />
                      respondendo
                    </span>
                  </div>
                </div>

                {/* Mensagens */}
                <div className="flex min-h-[380px] flex-col gap-2 p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={nicho.id}
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {nicho.conversa.map((msg, i) => {
                        const doNegocio = msg.de === "negocio"
                        return (
                          <motion.div
                            key={`${nicho.id}-${i}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: i * 0.07 }}
                            className={cn(
                              "max-w-[85%] rounded-xl px-3 py-2",
                              doNegocio
                                ? "self-end bg-capta-500/15 ring-1 ring-inset ring-capta-500/20"
                                : "self-start bg-zinc-800"
                            )}
                          >
                            <p className="text-[13px] leading-snug text-zinc-100">
                              {msg.texto}
                            </p>
                            <p className="mt-1 text-right text-[10px] text-zinc-500">
                              {msg.hora}
                            </p>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
