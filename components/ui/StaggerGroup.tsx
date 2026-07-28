"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"

/**
 * Entrada escalonada dos filhos (Prompt 7). O container define o estado
 * "hidden" -> "show"; cada StaggerItem herda esse estado via variants, então o
 * filho NÃO deve ter initial/animate próprios — é isso que faz o stagger propagar.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function StaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
