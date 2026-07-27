import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-widest text-zinc-500",
        className
      )}
    >
      {children}
    </p>
  )
}
