"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPoints } from "@/components/user-points"
import { ExternalPointsConnector } from "@/components/external-points-connector"
import { IntegratedPointsDisplay } from "@/components/integrated-points-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("profile")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handlePointsConnected = () => {
    // 포인트 정보를 새로고침하기 위해 refreshKey를 변경
    setRefreshKey((prev) => prev + 1)
  }

  if (!user) return null

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-800 border border-zinc-700 mb-6">
          <TabsTrigger value="profile" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            프로필 정보
          </TabsTrigger>
          <TabsTrigger value="points" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
            포인트 관리
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-amber-400">내 프로필</CardTitle>
                  <CardDescription className="text-gray-400">계정 정보 및 설정</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">이름</h3>
                      <p className="text-white">{user.name}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-300">이메일</h3>
                      <p className="text-white">{user.email}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-300">계정 유형</h3>
                      <p className="text-white">{user.role === "admin" ? "관리자" : "일반 회원"}</p>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" className="border-zinc-700 text-gray-300 hover:text-white">
                        프로필 수정
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <UserPoints key={refreshKey} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="points">
          <div className="grid grid-cols-1 gap-6">
            <IntegratedPointsDisplay key={refreshKey} />
            <ExternalPointsConnector onConnect={handlePointsConnected} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
