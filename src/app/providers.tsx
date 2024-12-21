'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        themes={['light', 'dark']}
      >
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="sync" initial={false}>
            <div key="app-content">
              {children}
            </div>
          </AnimatePresence>
        </LazyMotion>
      </NextThemesProvider>
    </NextUIProvider>
  )
} 