"use client"

import { useEffect, useRef, useState } from "react"
import { IconBuildingStore } from "@tabler/icons-react"
import { AUTOMACOES } from "@/lib/constants"

// Phone frame estilo WhatsApp com o chat animado em loop (Prompt 8). Extraído
// para um componente próprio no Prompt 9 para ser reusado na seção Automacoes
// (à direita) e na página /automacoes (centralizado, sem os blocos de resultado).

type Bolha = { tipo: string; texto: string }

export function ChatDemo() {
  const { chat } = AUTOMACOES
  const mensagens = chat.mensagens

  const [visiveis, setVisiveis] = useState<Bolha[]>([])
  const [digitando, setDigitando] = useState(false)
  const corpoRef = useRef<HTMLDivElement>(null)

  // Máquina de estados dirigida por timeouts encadeados. Bot mostra o "digitando"
  // por 900ms antes da bolha; cliente aparece após 600ms; 3s depois da última
  // mensagem o loop reinicia. Todos os timers são limpos no unmount.
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
                  doBot ? "bg-[#25D366] text-white" : "bg-zinc-700 text-zinc-100"
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
  )
}
