"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Globe, LogIn, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  // 언어 이모지 매핑
  const languageEmoji: Record<string, string> = {
    ko: "🇰🇷",
    en: "🇺🇸",
    ja: "🇯🇵",
    zh: "🇨🇳",
  }

  // 언어 이름 매핑
  const languageNames: Record<string, string> = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
  }

  return (
    <header className="w-full border-b border-zinc-800 bg-black">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-amber-400 mr-6">
          HRS<sup className="text-xs">™</sup>
        </Link>

        <nav className="hidden md:flex items-center space-x-5">
          <Link
            href="/announcements"
            className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
          >
            {t.announcements}
          </Link>
          <Link
            href="/customer-voice"
            className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
          >
            CV
          </Link>
          <Link
            href="/staff-evaluation"
            className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
          >
            {t.staffEvaluation}
          </Link>
          <Link
            href="/room-review"
            className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
          >
            {t.roomReview}
          </Link>
          <Link
            href="/restaurant-review"
            className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
          >
            {t.restaurantReview}
          </Link>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-400 hover:text-amber-400">
                <Globe className="h-4 w-4" />
                <span className="text-xs">{languageEmoji[language]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800" onClick={() => setLanguage("ko")}>
                🇰🇷 한국어
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800" onClick={() => setLanguage("en")}>
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800" onClick={() => setLanguage("ja")}>
                🇯🇵 日本語
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800" onClick={() => setLanguage("zh")}>
                🇨🇳 中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  onClick={() => router.push("/admin")}
                >
                  {t.admin}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
                onClick={() => router.push("/profile")}
              >
                마이페이지
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-gray-300 hover:text-white"
                onClick={logout}
              >
                {t.logout}
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-gray-300 hover:text-white"
                onClick={() => router.push("/login")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {t.login}
              </Button>
              <Button
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => router.push("/register")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {t.register}
              </Button>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-400">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t.menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 border-zinc-800">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-amber-400">
                  HRS<sup className="text-xs">™</sup>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t.close}</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-5 mt-8">
                <Link
                  href="/announcements"
                  className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  {t.announcements}
                </Link>
                <Link
                  href="/customer-voice"
                  className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  CV
                </Link>
                <Link
                  href="/staff-evaluation"
                  className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  {t.staffEvaluation}
                </Link>
                <Link
                  href="/room-review"
                  className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  {t.roomReview}
                </Link>
                <Link
                  href="/restaurant-review"
                  className="text-xs uppercase tracking-wide font-medium transition-colors hover:text-amber-400 text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  {t.restaurantReview}
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  {user ? (
                    <>
                      {user.role === "admin" && (
                        <Button
                          variant="ghost"
                          className="text-gray-300 hover:text-white"
                          onClick={() => {
                            router.push("/admin")
                            setIsOpen(false)
                          }}
                        >
                          {t.admin}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-gray-300 hover:text-white"
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                      >
                        {t.logout}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-gray-300 hover:text-white"
                        onClick={() => {
                          router.push("/login")
                          setIsOpen(false)
                        }}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        {t.login}
                      </Button>
                      <Button
                        className="bg-amber-500 hover:bg-amber-600 text-black"
                        onClick={() => {
                          router.push("/register")
                          setIsOpen(false)
                        }}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        {t.register}
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
