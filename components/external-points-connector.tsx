"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { connectKakaoAccount, connectNaverAccount, saveConnectedService } from "@/lib/external-points-service"

interface ExternalPointsConnectorProps {
  onConnect: () => void
}

export function ExternalPointsConnector({ onConnect }: ExternalPointsConnectorProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isConnectingKakao, setIsConnectingKakao] = useState(false)
  const [isConnectingNaver, setIsConnectingNaver] = useState(false)

  const handleConnectKakao = async () => {
    if (!user) {
      toast({
        title: "로그인 필요",
        description: "카카오페이 포인트를 연동하려면 로그인이 필요합니다.",
        variant: "destructive",
      })
      return
    }

    setIsConnectingKakao(true)
    try {
      const result = await connectKakaoAccount()
      if (result.success && result.accessToken) {
        saveConnectedService(user.id, "kakao", result.accessToken)
        toast({
          title: "연동 성공",
          description: "카카오페이 포인트가 성공적으로 연동되었습니다.",
        })
        onConnect()
      } else {
        toast({
          title: "연동 실패",
          description: "카카오페이 포인트 연동에 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "연동 오류",
        description: "카카오페이 포인트 연동 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsConnectingKakao(false)
    }
  }

  const handleConnectNaver = async () => {
    if (!user) {
      toast({
        title: "로그인 필요",
        description: "네이버페이 포인트를 연동하려면 로그인이 필요합니다.",
        variant: "destructive",
      })
      return
    }

    setIsConnectingNaver(true)
    try {
      const result = await connectNaverAccount()
      if (result.success && result.accessToken) {
        saveConnectedService(user.id, "naver", result.accessToken)
        toast({
          title: "연동 성공",
          description: "네이버페이 포인트가 성공적으로 연동되었습니다.",
        })
        onConnect()
      } else {
        toast({
          title: "연동 실패",
          description: "네이버페이 포인트 연동에 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "연동 오류",
        description: "네이버페이 포인트 연동 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsConnectingNaver(false)
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-amber-400">외부 포인트 연동</CardTitle>
        <CardDescription className="text-gray-400">
          카카오페이와 네이버페이 포인트를 연동하여 통합 관리하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">K</span>
            </div>
            <h3 className="text-white font-medium mb-2">카카오페이 포인트</h3>
            <p className="text-gray-400 text-sm text-center mb-4">카카오페이 계정을 연동하여 포인트를 확인하세요</p>
            <Button
              onClick={handleConnectKakao}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
              disabled={isConnectingKakao}
            >
              {isConnectingKakao ? "연동 중..." : "카카오페이 연동하기"}
            </Button>
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h3 className="text-white font-medium mb-2">네이버페이 포인트</h3>
            <p className="text-gray-400 text-sm text-center mb-4">네이버페이 계정을 연동하여 포인트를 확인하세요</p>
            <Button
              onClick={handleConnectNaver}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={isConnectingNaver}
            >
              {isConnectingNaver ? "연동 중..." : "네이버페이 연동하기"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        * 실제 연동 시 각 서비스의 로그인 페이지로 이동하여 인증이 진행됩니다.
      </CardFooter>
    </Card>
  )
}
