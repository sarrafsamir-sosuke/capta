"use client"

import { useEffect, useRef, useState } from "react"
import {
  IconClock,
  IconMessages,
  IconFilter,
  IconBuildingStore,
} from "@tabler/icons-react"
import { AUTOMACOES } from "@/lib/constants"

// Ícones dos blocos de resultado ficam no componente (apresentação); a copy
// vem de constants.
const RESULT_ICONES = [IconClock, IconMessages, IconFilter]

type Bolha = { tipo: string; texto: string }

export function Automacoes() {
  const { titulo, subtitulo, resultados, nota, chat } = AUTOMACOES
  const mensagens = chat.mensagens

  const [visiveis, setVisiveis] = useState<Bolha[]>([])
  const [digitando, setDigitando] = useState(false)
  const corpoRef = useRef<HTMLDivElement>(null)

  // Máquina de estados do chat, dirigida por timeouts encadeados. Bot mostra o
  // "digitando" por 900ms antes da bolha; cliente aparece após 600ms; 3s depois
  // da última mensagem o loop reinicia. Todos os timers são limpos no unmount.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let cancelado = false

    const agendar = (fn: () => void, ms: number) => {
      timers.push(
        setTimeout(() => {
          if (!cancelado) fn()
        }, ms),
      )
    }

    const rodar = (i: number) => {
      if (cancelado) return

      if (i >= mensagens.length) {
        agendar(() => {
          setVisiveis([])
          setDigitando(false)
          rodar(0)
        }, 3000)
        return
      }

      const msg = mensagens[i]
      if (msg.tipo === "bot") {
        setDigitando(true)
        agendar(() => {
          setDigitando(false)
          setVisiveis((v) => [...v, msg])
          rodar(i + 1)
        }, 900)
      } else {
        agendar(() => {
          setVisiveis((v) => [...v, msg])
          rodar(i + 1)
        }, 600)
      }
    }

    rodar(0)

    return () => {
      cancelado = true
      timers.forEach(clearTimeout)
    }
  }, [mensagens])

  // Mantém o corpo do chat rolado para a última bolha.
  useEffect(() => {
    const el = corpoRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visiveis, digitando])

  return (
    <section id="automacoes" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {AUTOMACOES.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {titulo}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        {subtitulo}
      </p>

      <div className="mt-14 grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        {/* Esquerda: blocos de resultado + nota */}
        <div>
          <div className="space-y-8">
            {resultados.map((resultado, i) => {
              const Icone = RESULT_ICONES[i]
              return (
                <div key={resultado.titulo} className="flex gap-4">
                  <Icone
                    size={24}
                    stroke={1.5}
                    className="mt-0.5 shrink-0 text-zinc-300"
                  />
                  <div>
                    <h3 className="text-base font-medium text-zinc-100">
                      {resultado.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {resultado.texto}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-10 text-sm text-zinc-500">{nota}</p>
        </div>

        {/* Direita: phone frame com o chat */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/30">
            {/* Header estilo WhatsApp */}
            <div className="flex items-center gap-3 bg-[#128C7E] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <IconBuildingStore size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-white">{chat.contato}</p>
                <p className="text-xs text-white/70">{chat.status}</p>
              </div>
            </div>

            {/* Corpo com scroll interno e altura fixa */}
            <div
              ref={corpoRef}
              className="h-[280px] space-y-2 overflow-y-auto bg-zinc-900 px-4 py-4"
            >
              {visiveis.map((bolha, i) => {
                const doBot = bolha.tipo === "bot"
                return (
                  <div
                    key={i}
                    className={`flex ${doBot ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`chat-bubble-in max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                        doBot
                          ? "bg-[#25D366] text-white"
                          : "bg-zinc-700 text-zinc-100"
                      }`}
                    >
                      {bolha.texto}
                    </div>
                  </div>
                )
              })}

              {digitando && (
                <div className="flex justify-end">
                  <div
                    aria-label="digitando"
                    className="flex items-center gap-1 rounded-2xl bg-[#25D366] px-3 py-3"
                  >
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
