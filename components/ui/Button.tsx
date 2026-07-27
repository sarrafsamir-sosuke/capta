import { cn } from "@/lib/utils"

type Variante = "primario" | "secundario" | "ghost"

const VARIANTES: Record<Variante, string> = {
  // Texto escuro sobre o verde: 5.84:1. O hover clareia — escurecer
  // derrubaria o contraste do texto para 3.19:1.
  primario:
    "bg-capta-500 text-zinc-950 font-medium hover:bg-capta-400 px-5 py-2.5",
  secundario:
    "border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 px-5 py-2.5",
  ghost: "text-zinc-400 hover:text-zinc-200 gap-1.5",
}

export function Button({
  href,
  variante = "primario",
  externo = false,
  className,
  children,
}: {
  href: string
  variante?: Variante
  externo?: boolean
  className?: string
  children: React.ReactNode
}) {
  const externoProps = externo
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {}

  return (
    <a
      href={href}
      {...externoProps}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm",
        "transition-colors duration-150",
        VARIANTES[variante],
        className
      )}
    >
      {children}
    </a>
  )
}
