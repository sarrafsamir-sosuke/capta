"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

/**
 * Fade + subida de entrada, disparado quando o bloco entra na viewport (Prompt 7).
 * Framer Motion só nas seções; nunca no mesmo elemento que o GSAP anima (Hero).
 */
export function RevealSection({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
