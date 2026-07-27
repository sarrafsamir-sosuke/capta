import { cn } from "@/lib/utils"

export function Badge({
  children,
  destaque = false,
  className,
}: {
  children: React.ReactNode
  destaque?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        destaque
          ? "bg-capta-500/10 text-capta-300 ring-1 ring-inset ring-capta-500/25"
          : "bg-zinc-800/60 text-zinc-400 ring-1 ring-inset ring-zinc-700/50",
        className
      )}
    >
      {children}
    </span>
  )
}
