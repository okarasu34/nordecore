'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Locale = 'en' | 'no'

interface LocaleStore {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (en: string, no: string) => string
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      t: (en, no) => (get().locale === 'no' ? no : en),
    }),
    { name: 'nordecore-locale' }
  )
)