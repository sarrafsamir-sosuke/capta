"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

/**
 * O ThemeProvider do next-themes usa hooks, então precisa ser Client Component.
 * O layout raiz é Server Component — este wrapper é a ponte entre os dois.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
