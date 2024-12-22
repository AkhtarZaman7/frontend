'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextUIProvider>
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="sync" initial={false}>
            <div key="app-content">
              {children}
            </div>
          </AnimatePresence>
        </LazyMotion>
      </NextUIProvider>
    </NextThemeProvider>
  )
} 