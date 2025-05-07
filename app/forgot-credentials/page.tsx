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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ForgotCredentialsPage() {
  // 비밀번호 찾기 상태
  const [passwordEmail, setPasswordEmail] = useState("")
  const [passwordPhone, setPasswordPhone] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [foundUserId, setFoundUserId] = useState<string | null>(null)

  // 아이디 찾기 상태
  const [idName, setIdName] = useState("")
  const [idPhone, setIdPhone] = useState("")
  const [foundUsername, setFoundUsername] = useState<string | null>(null)

  const { findUserByEmailAndPhone, resetPassword, findUserByNameAndPhone } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  // 비밀번호 찾기 처리
  const handleFindPassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordEmail || !passwordPhone) {
      toast({
        title: t.error,
        description: "이메일과 전화번호를 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    const result = findUserByEmailAndPhone(passwordEmail, passwordPhone)

    if (result.found && result.userId) {
      setFoundUserId(result.userId)
      toast({
        title: "사용자 확인",
        description: "사용자 정보가 확인되었습니다. 새 비밀번호를 설정해주세요.",
      })
    } else {
      toast({
        title: t.error,
        description: "일치하는 사용자 정보를 찾을 수 없습니다.",
        variant: "destructive",
      })
    }
  }

  // 비밀번호 재설정 처리
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      toast({
        title: t.error,
        description: "새 비밀번호와 확인을 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: t.error,
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      })
      return
    }

    if (foundUserId) {
      const success = resetPassword(foundUserId, newPassword)

      if (success) {
        toast({
          title: "성공",
          description: "비밀번호가 성공적으로 재설정되었습니다.",
        })
        router.push("/login")
      } else {
        toast({
          title: t.error,
          description: "비밀번호 재설정에 실패했습니다.",
          variant: "destructive",
        })
      }
    }
  }

  // 아이디 찾기 처리
  const handleFindId = (e: React.FormEvent) => {
    e.preventDefault()

    if (!idName || !idPhone) {
      toast({
        title: t.error,
        description: "이름과 전화번호를 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    const result = findUserByNameAndPhone(idName, idPhone)

    if (result.found && result.username) {
      setFoundUsername(result.username)
      toast({
        title: "아이디 찾기 성공",
        description: "회원님의 아이디를 찾았습니다.",
      })
    } else {
      toast({
        title: t.error,
        description: "일치하는 사용자 정보를 찾을 수 없습니다.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-amber-400">계정 정보 찾기</CardTitle>
          <CardDescription className="text-gray-400">아이디 또는 비밀번호를 찾으세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger value="password" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                비밀번호 찾기
              </TabsTrigger>
              <TabsTrigger value="id" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                아이디 찾기
              </TabsTrigger>
            </TabsList>

            {/* 비밀번호 찾기 탭 */}
            <TabsContent value="password" className="mt-4">
              {!foundUserId ? (
                <form onSubmit={handleFindPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordEmail" className="text-gray-300">
                      이메일
                    </Label>
                    <Input
                      id="passwordEmail"
                      type="email"
                      value={passwordEmail}
                      onChange={(e) => setPasswordEmail(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordPhone" className="text-gray-300">
                      전화번호
                    </Label>
                    <Input
                      id="passwordPhone"
                      type="tel"
                      value={passwordPhone}
                      onChange={(e) => setPasswordPhone(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="01012345678"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    사용자 확인
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-300">
                      새 비밀번호
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      비밀번호 확인
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    비밀번호 재설정
                  </Button>
                </form>
              )}
            </TabsContent>

            {/* 아이디 찾기 탭 */}
            <TabsContent value="id" className="mt-4">
              {!foundUsername ? (
                <form onSubmit={handleFindId} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="idName" className="text-gray-300">
                      이름
                    </Label>
                    <Input
                      id="idName"
                      type="text"
                      value={idName}
                      onChange={(e) => setIdName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idPhone" className="text-gray-300">
                      전화번호
                    </Label>
                    <Input
                      id="idPhone"
                      type="tel"
                      value={idPhone}
                      onChange={(e) => setIdPhone(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="01012345678"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    아이디 찾기
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-800 rounded-md">
                    <p className="text-gray-300 mb-2">회원님의 아이디는:</p>
                    <p className="text-amber-400 text-xl font-bold">{foundUsername}</p>
                  </div>
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    로그인하기
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.push("/login")} className="w-full">
            로그인 페이지로 돌아가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
