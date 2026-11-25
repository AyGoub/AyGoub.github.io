'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import translations, { Language } from '@/locales/translations'

type Vars = Record<string, string | number>

interface LanguageContextType {
  language: Language
  setLanguage: (l: Language) => void
  toggleLanguage: () => void
  /** Translate a dotted key; `{name}` placeholders are filled from `vars`. */
  t: (key: string, vars?: Vars) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'lang'

export function translate(language: Language, key: string, vars?: Vars): string {
  let result: unknown = translations[language]
  for (const k of key.split('.')) {
    if (typeof result !== 'object' || result === null) return key
    result = (result as Record<string, unknown>)[k]
  }
  if (typeof result !== 'string') return key
  return vars ? result.replace(/\{(\w+)\}/g, (m, v) => (v in vars ? String(vars[v]) : m)) : result
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>('en')

  // Restore the visitor's choice, or follow the browser language on first visit
  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {}
    if (saved === 'en' || saved === 'fr') setLang(saved)
    else if (navigator.language?.toLowerCase().startsWith('fr')) setLang('fr')
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (l: Language) => {
    setLang(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }

  const toggleLanguage = () => setLanguage(language === 'en' ? 'fr' : 'en')

  const t = (key: string, vars?: Vars) => translate(language, key, vars)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
