import type { UserPoints, PointTransaction } from "@/types/point"

// 포인트 정보 가져오기
export function getUserPoints(userId: string): UserPoints {
  if (typeof window === "undefined") return { userId, totalPoints: 0, transactions: [] }

  const storedPoints = localStorage.getItem("userPoints")
  if (!storedPoints) return { userId, totalPoints: 0, transactions: [] }

  try {
    const allUserPoints: Record<string, UserPoints> = JSON.parse(storedPoints)
    return allUserPoints[userId] || { userId, totalPoints: 0, transactions: [] }
  } catch (error) {
    console.error("Failed to parse stored points:", error)
    return { userId, totalPoints: 0, transactions: [] }
  }
}

// 포인트 추가
export function addPoints(
  userId: string,
  amount: number,
  type: "signup" | "review" | "use",
  description: string,
): void {
  const allUserPoints: Record<string, UserPoints> = {}

  // 기존 포인트 데이터 로드
  const storedPoints = localStorage.getItem("userPoints")
  if (storedPoints) {
    try {
      Object.assign(allUserPoints, JSON.parse(storedPoints))
    } catch (error) {
      console.error("Failed to parse stored points:", error)
    }
  }

  // 현재 사용자의 포인트 정보 가져오기
  const userPoints = allUserPoints[userId] || { userId, totalPoints: 0, transactions: [] }

  // 새 트랜잭션 생성
  const newTransaction: PointTransaction = {
    id: Date.now().toString(),
    userId,
    amount,
    type,
    description,
    createdAt: new Date().toISOString(),
  }

  // 포인트 업데이트
  userPoints.transactions.push(newTransaction)
  userPoints.totalPoints += amount

  // 저장
  allUserPoints[userId] = userPoints
  localStorage.setItem("userPoints", JSON.stringify(allUserPoints))
}

// 회원가입 포인트 지급
export function addSignupPoints(userId: string): void {
  addPoints(userId, 50000, "signup", "회원가입 보너스 포인트")
}

// 리뷰 작성 포인트 지급
export function addReviewPoints(userId: string, hotelName: string): void {
  addPoints(userId, 50000, "review", `${hotelName} 리뷰 작성 보너스 포인트`)
}
