"use client"

import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { translations } from "@/lib/translations"
import type { Language } from "@/types/hotel"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { motion, AnimatePresence } from "framer-motion"

interface LanguageSelectorProps {
  language: Language
  setLanguage: (language: Language) => void
  compact?: boolean
}

export function LanguageSelector({ language, setLanguage, compact = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [storedLanguage, setStoredLanguage] = useLocalStorage<Language>("preferredLanguage", "ko")
  const t = translations[language]
  const menuRef = useRef<HTMLDivElement>(null)

  // 언어 플래그 이모지 매핑
  const languageEmoji: Record<Language, string> = {
    ko: "🇰🇷",
    en: "🇺🇸",
    ja: "🇯🇵",
    zh: "🇨🇳",
    ar: "🇸🇦",
    de: "🇩🇪",
    it: "🇮🇹",
  }

  // 언어 이름 매핑
  const languageNames: Record<Language, string> = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    ar: "العربية",
    de: "Deutsch",
    it: "Italiano",
  }

  // 로컬 스토리지에서 언어 설정 로드
  useEffect(() => {
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [storedLanguage, setLanguage])

  // 언어 변경 시 로컬 스토리지에 저장
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language
    setLanguage(newLanguage)
    setStoredLanguage(newLanguage)
    setIsOpen(false)
  }

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (compact) {
    return (
      <div className="relative" ref={menuRef}>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 px-2 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Globe className="h-4 w-4" />
          <span>{languageEmoji[language]}</span>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 mt-1 w-40 rounded-lg bg-background shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {Object.keys(translations).map((lang) => (
                  <button
                    key={lang}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      lang === language ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"
                    }`}
                    role="menuitem"
                    onClick={() => handleLanguageChange(lang as Language)}
                  >
                    <span className="mr-2">{languageEmoji[lang as Language]}</span>
                    {languageNames[lang as Language]}
                    {lang === language && <Check className="ml-auto h-4 w-4" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{t.languageSelect}</span>
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px] rounded-full border-primary/20">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(translations).map((lang) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex items-center">
                <span className="mr-2">{languageEmoji[lang as Language]}</span>
                {languageNames[lang as Language]}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
