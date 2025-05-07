"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type ReviewStep = "staff" | "restaurant" | "room" | "complete"

interface ReviewFlowContextType {
  currentHotelId: string | null
  currentStep: ReviewStep
  setCurrentHotel: (hotelId: string) => void
  moveToNextStep: () => void
  resetFlow: () => void
}

const ReviewFlowContext = createContext<ReviewFlowContextType | undefined>(undefined)

export function ReviewFlowProvider({ children }: { children: ReactNode }) {
  const [currentHotelId, setCurrentHotelId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<ReviewStep>("staff")
  const router = useRouter()

  const setCurrentHotel = (hotelId: string) => {
    setCurrentHotelId(hotelId)
    setCurrentStep("staff")
    router.push(`/staff-evaluation?hotelId=${hotelId}`)
  }

  const moveToNextStep = () => {
    if (!currentHotelId) return

    if (currentStep === "staff") {
      setCurrentStep("restaurant")
      router.push(`/restaurant-review?hotelId=${currentHotelId}`)
    } else if (currentStep === "restaurant") {
      setCurrentStep("room")
      router.push(`/room-review?hotelId=${currentHotelId}`)
    } else if (currentStep === "room") {
      setCurrentStep("complete")
      router.push(`/hotel/${currentHotelId}`)
    }
  }

  const resetFlow = () => {
    setCurrentHotelId(null)
    setCurrentStep("staff")
  }

  return (
    <ReviewFlowContext.Provider
      value={{
        currentHotelId,
        currentStep,
        setCurrentHotel,
        moveToNextStep,
        resetFlow,
      }}
    >
      {children}
    </ReviewFlowContext.Provider>
  )
}

export function useReviewFlow() {
  const context = useContext(ReviewFlowContext)
  if (context === undefined) {
    throw new Error("useReviewFlow must be used within a ReviewFlowProvider")
  }
  return context
}
