"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { getUserPoints } from "@/lib/points"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export function UserPoints() {
  const { user } = useAuth()
  const [points, setPoints] = useState({ totalPoints: 0, transactions: [] })

  useEffect(() => {
    if (user) {
      const userPoints = getUserPoints(user.id)
      setPoints(userPoints)
    }
  }, [user])

  if (!user) return null

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-amber-400">내 포인트</CardTitle>
        <CardDescription className="text-gray-400">현재 보유 포인트 및 적립/사용 내역</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-2xl font-bold text-white">{points.totalPoints.toLocaleString()}P</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">최근 내역</h3>

          {points.transactions.length > 0 ? (
            <div className="space-y-2">
              {points.transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-2 rounded bg-zinc-800">
                  <div>
                    <p className="text-sm text-white">{transaction.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(transaction.createdAt)}</p>
                  </div>
                  <Badge className={transaction.type === "use" ? "bg-red-500" : "bg-green-500"}>
                    {transaction.type === "use" ? "-" : "+"}
                    {transaction.amount.toLocaleString()}P
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">포인트 내역이 없습니다.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
