"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { IconBuildingStore } from "@tabler/icons-react"
import { CHAT_UNIVERSAL, CHAT_TIMING, type MensagemChat } from "@/lib/constants"
import { cn } from "@/lib/utils"

const ENTRADA = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const },
}

export function ChatUniversal() {
  const ref = useRef<HTMLDivElement>(null)
  const emVista = useInView(ref, { once: true, margin: "-120px" })
  const reduzirMovimento = useReducedMotion()

  const total = CHAT_UNIVERSAL.conversa.length
  const [visiveis, setVisiveis] = useState(0)
  const [digitando, setDigitando] = useState(false)

  useEffect(() => {
    // A conversa só começa quando entra na tela — rodar antes
    // significaria o visitante chegar com tudo já resolvido.
    if (!emVista) return

    if (reduzirMovimento) {
      setVisiveis(total)
      return
    }

    if (visiveis >= total) return

    const proxima = CHAT_UNIVERSAL.conversa[visiveis]

    // Bot: mostra "digitando…" e só então solta a mensagem.
    if (proxima.de === "negocio") {
      setDigitando(true)
      const t = setTimeout(() => {
        setDigitando(false)
        setVisiveis((v) => v + 1)
      }, CHAT_TIMING.digitando)
      return () => clearTimeout(t)
    }

    const espera = visiveis === 0 ? CHAT_TIMING.inicial : CHAT_TIMING.cliente
    const t = setTimeout(() => setVisiveis((v) => v + 1), espera)
    return () => clearTimeout(t)
  }, [emVista, visiveis, reduzirMovimento, total])

  return (
    <section className="px-5 pb-8 pt-10 sm:px-8 md:pb-12 md:pt-14">
      <div ref={ref} className="mx-auto w-full max-w-[380px]">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-2">
          <div className="overflow-hidden rounded-[1.6rem] border border-zinc-800 bg-zinc-950">
            {/* Cabeçalho da conversa */}
            <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                <IconBuildingStore
                  size={18}
                  stroke={1.75}
                  className="text-zinc-400"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-200">
                  {CHAT_UNIVERSAL.contato}
                </p>
                {/* Como no WhatsApp de verdade: o status vira "digitando…" */}
                <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  {!digitando && (
                    <span className="size-1.5 rounded-full bg-capta-500" />
                  )}
                  {digitando
                    ? CHAT_UNIVERSAL.statusDigitando
                    : CHAT_UNIVERSAL.statusOnline}
                </span>
              </div>
            </div>

            {/* Mensagens — altura fixa para a seção não crescer
                conforme as bolhas entram. */}
            <div className="flex h-[440px] flex-col justify-end gap-2 overflow-hidden p-4">
              {CHAT_UNIVERSAL.conversa
                .slice(0, visiveis)
                .map((msg, i) => (
                  <Bolha key={`${msg.hora}-${i}`} mensagem={msg} />
                ))}

              {digitando && <Digitando />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Bolha({ mensagem }: { mensagem: MensagemChat }) {
  const doNegocio = mensagem.de === "negocio"

  return (
    <motion.div
      layout
      {...ENTRADA}
      className={cn(
        "max-w-[85%] rounded-2xl px-3 py-2",
        doNegocio
          ? "self-end rounded-br-md bg-green-700"
          : "self-start rounded-bl-md bg-zinc-700"
      )}
    >
      <p className="text-[13px] leading-snug text-zinc-100">{mensagem.texto}</p>
      <p
        className={cn(
          "mt-1 text-right text-[10px]",
          doNegocio ? "text-green-200/80" : "text-zinc-400"
        )}
      >
        {mensagem.hora}
      </p>
    </motion.div>
  )
}

function Digitando() {
  return (
    <motion.div
      layout
      {...ENTRADA}
      aria-label="digitando"
      className="self-end rounded-2xl rounded-br-md bg-green-700 px-4 py-3"
    >
      <span className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-green-200"
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
    </motion.div>
  )
}
