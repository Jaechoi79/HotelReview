"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/context/auth-context"
import {
  fetchKakaoPayPoints,
  fetchNaverPayPoints,
  getConnectedServices,
  getIntegratedPointInfo,
  saveIntegratedPointInfo,
} from "@/lib/external-points-service"
import { getUserPoints } from "@/lib/points"
import { RefreshCw } from "lucide-react"
import type { IntegratedPointInfo } from "@/types/external-points"

export function IntegratedPointsDisplay() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pointInfo, setPointInfo] = useState<IntegratedPointInfo>({
    hotelPoints: 0,
    externalPoints: {
      kakao: { connected: false },
      naver: { connected: false },
    },
  })

  const loadPointInfo = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      // 호텔 포인트 로드
      const hotelPoints = getUserPoints(user.id)

      // 저장된 통합 포인트 정보 로드
      const savedPointInfo = getIntegratedPointInfo(user.id)

      // 연결된 서비스 정보 로드
      const connectedServices = getConnectedServices(user.id)

      // 초기 상태 설정
      const initialPointInfo: IntegratedPointInfo = {
        hotelPoints: hotelPoints.totalPoints,
        externalPoints: {
          kakao: {
            connected: !!connectedServices.kakao?.connected,
            balance: savedPointInfo.externalPoints?.kakao?.balance,
            lastUpdated: savedPointInfo.externalPoints?.kakao?.lastUpdated,
          },
          naver: {
            connected: !!connectedServices.naver?.connected,
            balance: savedPointInfo.externalPoints?.naver?.balance,
            lastUpdated: savedPointInfo.externalPoints?.naver?.lastUpdated,
          },
        },
      }

      setPointInfo(initialPointInfo)

      // 연결된 서비스의 최신 포인트 정보 로드
      if (connectedServices.kakao?.connected) {
        try {
          const kakaoPoints = await fetchKakaoPayPoints(connectedServices.kakao.accessToken)
          if (kakaoPoints.success) {
            initialPointInfo.externalPoints.kakao = {
              connected: true,
              balance: kakaoPoints.pointBalance,
              lastUpdated: new Date().toISOString(),
            }
          }
        } catch (error) {
          console.error("카카오페이 포인트 조회 실패:", error)
        }
      }

      if (connectedServices.naver?.connected) {
        try {
          const naverPoints = await fetchNaverPayPoints(connectedServices.naver.accessToken)
          if (naverPoints.resultCode === "00") {
            initialPointInfo.externalPoints.naver = {
              connected: true,
              balance: naverPoints.point.availablePoint,
              lastUpdated: new Date().toISOString(),
            }
          }
        } catch (error) {
          console.error("네이버페이 포인트 조회 실패:", error)
        }
      }

      // 최종 포인트 정보 업데이트 및 저장
      setPointInfo(initialPointInfo)
      saveIntegratedPointInfo(user.id, initialPointInfo)
    } catch (error) {
      console.error("포인트 정보 로드 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    if (!user) return

    setIsRefreshing(true)
    await loadPointInfo()
    setIsRefreshing(false)
  }

  useEffect(() => {
    if (user) {
      loadPointInfo()
    }
  }, [user])

  if (!user) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-amber-400">통합 포인트</CardTitle>
          <CardDescription className="text-gray-400">로그인 후 포인트 정보를 확인할 수 있습니다.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-amber-400">통합 포인트</CardTitle>
          <CardDescription className="text-gray-400">모든 포인트를 한 곳에서 확인하세요</CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-zinc-700"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="sr-only">새로고침</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 호텔 포인트 */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-medium">호텔 포인트</h3>
              <Badge className="bg-amber-500 text-black">기본</Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32 bg-zinc-700" />
            ) : (
              <p className="text-2xl font-bold text-amber-400">{pointInfo.hotelPoints.toLocaleString()}P</p>
            )}
          </div>

          {/* 카카오페이 포인트 */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-medium">카카오페이 포인트</h3>
              {pointInfo.externalPoints.kakao?.connected ? (
                <Badge className="bg-yellow-400 text-black">연동됨</Badge>
              ) : (
                <Badge className="bg-zinc-600 text-zinc-300">미연동</Badge>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32 bg-zinc-700" />
            ) : pointInfo.externalPoints.kakao?.connected ? (
              <div>
                <p className="text-2xl font-bold text-yellow-400">
                  {pointInfo.externalPoints.kakao.balance?.toLocaleString() || 0}P
                </p>
                {pointInfo.externalPoints.kakao.lastUpdated && (
                  <p className="text-xs text-gray-400 mt-1">
                    마지막 업데이트: {new Date(pointInfo.externalPoints.kakao.lastUpdated).toLocaleString()}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">카카오페이 계정을 연동해주세요</p>
            )}
          </div>

          {/* 네이버페이 포인트 */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-medium">네이버페이 포인트</h3>
              {pointInfo.externalPoints.naver?.connected ? (
                <Badge className="bg-green-500 text-white">연동됨</Badge>
              ) : (
                <Badge className="bg-zinc-600 text-zinc-300">미연동</Badge>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-32 bg-zinc-700" />
            ) : pointInfo.externalPoints.naver?.connected ? (
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {pointInfo.externalPoints.naver.balance?.toLocaleString() || 0}P
                </p>
                {pointInfo.externalPoints.naver.lastUpdated && (
                  <p className="text-xs text-gray-400 mt-1">
                    마지막 업데이트: {new Date(pointInfo.externalPoints.naver.lastUpdated).toLocaleString()}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">네이버페이 계정을 연동해주세요</p>
            )}
          </div>

          {/* 총 포인트 */}
          <div className="bg-zinc-900 p-4 rounded-lg border border-amber-500/30">
            <h3 className="text-white font-medium mb-2">총 보유 포인트</h3>
            {isLoading ? (
              <Skeleton className="h-10 w-40 bg-zinc-700" />
            ) : (
              <p className="text-3xl font-bold text-white">
                {(
                  pointInfo.hotelPoints +
                  (pointInfo.externalPoints.kakao?.balance || 0) +
                  (pointInfo.externalPoints.naver?.balance || 0)
                ).toLocaleString()}
                P
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
