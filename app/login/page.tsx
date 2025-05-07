"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, socialLogin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!username || !password) {
      toast({
        title: t.error,
        description: "아이디와 비밀번호를 모두 입력해주세요.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const success = await login(username, password)

      if (success) {
        toast({
          title: t.success,
          description: t.loginSuccessful,
        })
        router.push("/")
      } else {
        toast({
          title: t.error,
          description: "아이디 또는 비밀번호가 올바르지 않습니다.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t.error,
        description: "로그인 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      await socialLogin(provider)
    } catch (error) {
      toast({
        title: t.error,
        description: `${provider} 로그인 중 오류가 발생했습니다.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-amber-400">{t.login}</CardTitle>
          <CardDescription className="text-gray-400">{t.pleaseEnterYourCredentials}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                아이디
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="사용자 아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                {t.password}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="text-right">
              <Link href="/forgot-credentials" className="text-xs text-amber-400 hover:underline">
                아이디/비밀번호 찾기
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black" disabled={isLoading}>
              {isLoading ? "로그인 중..." : t.login}
            </Button>

            <div className="flex items-center w-full my-4">
              <Separator className="flex-grow bg-zinc-700" />
              <span className="px-4 text-sm text-zinc-500">또는</span>
              <Separator className="flex-grow bg-zinc-700" />
            </div>

            {/* 소셜 로그인 버튼 */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center bg-white hover:bg-gray-100 text-black"
                onClick={() => handleSocialLogin("google")}
              >
                <Image src="/images/google-logo.png" alt="Google" width={20} height={20} className="mr-2" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center bg-[#03C75A] hover:bg-[#02b350] text-white"
                onClick={() => handleSocialLogin("naver")}
              >
                <Image src="/images/naver-logo.png" alt="Naver" width={20} height={20} className="mr-2" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center bg-[#FEE500] hover:bg-[#e6cf00] text-black"
                onClick={() => handleSocialLogin("kakao")}
              >
                <Image src="/images/kakao-logo.png" alt="Kakao" width={20} height={20} className="mr-2" />
              </Button>
            </div>

            <div className="text-center text-sm text-gray-400 mt-4">
              {t.dontHaveAccount}{" "}
              <Button variant="link" className="p-0 h-auto text-amber-400" onClick={() => router.push("/register")}>
                {t.register}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
