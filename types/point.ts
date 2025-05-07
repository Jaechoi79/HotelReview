export interface PointTransaction {
  id: string
  userId: string
  amount: number
  type: "signup" | "review" | "use"
  description: string
  createdAt: string
}

export interface UserPoints {
  userId: string
  totalPoints: number
  transactions: PointTransaction[]
}
