"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { useReviewFlow } from "@/context/review-flow-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { sampleHotels } from "@/data/sample-hotels"
import type { Hotel } from "@/types/hotel"
import type { RestaurantReview } from "@/types/restaurant-review"

export default function RestaurantReviewPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotelIdParam = searchParams.get("hotelId")
  const { toast } = useToast()
  const [hotels] = useLocalStorage<Hotel[]>("hotels", sampleHotels)
  const [restaurantReviews, setRestaurantReviews] = useLocalStorage<RestaurantReview[]>("restaurantReviews", [])
  const { currentHotelId, moveToNextStep } = useReviewFlow()

  const [selectedHotel, setSelectedHotel] = useState("")
  const [staffFriendliness, setStaffFriendliness] = useState("")
  const [menuExplanation, setMenuExplanation] = useState("")
  const [walkInResponse, setWalkInResponse] = useState("")
  const [walkInServiceEquality, setWalkInServiceEquality] = useState("")
  const [additionalComments, setAdditionalComments] = useState("")

  // Set the selected hotel from URL parameter or review flow context
  useEffect(() => {
    if (hotelIdParam) {
      setSelectedHotel(hotelIdParam)
    } else if (currentHotelId) {
      setSelectedHotel(currentHotelId)
    }
  }, [hotelIdParam, currentHotelId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: t.error,
        description: t.pleaseLoginToSubmitReview,
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!selectedHotel || !staffFriendliness || !menuExplanation || !walkInResponse || !walkInServiceEquality) {
      toast({
        title: t.error,
        description: t.pleaseRateAllItems,
        variant: "destructive",
      })
      return
    }

    const newReview: RestaurantReview = {
      id: Date.now().toString(),
      hotelId: selectedHotel,
      staffFriendliness: Number.parseInt(staffFriendliness),
      menuExplanation: Number.parseInt(menuExplanation),
      walkInResponse: Number.parseInt(walkInResponse),
      walkInServiceEquality: Number.parseInt(walkInServiceEquality),
      additionalComments,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
    }

    setRestaurantReviews([newReview, ...restaurantReviews])

    toast({
      title: t.success,
      description: t.restaurantReviewSubmittedSuccessfully,
    })

    // Move to the next step in the review flow
    moveToNextStep()
  }

  // Get hotel name for display
  const hotelName = hotels.find((h) => h.id === selectedHotel)?.name || ""

  // 평가 항목을 렌더링하는 함수
  const renderRatingItem = (label: string, value: string, setValue: (value: string) => void, name: string) => (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <RadioGroup value={value} onValueChange={setValue} className="flex justify-between">
        {[1, 2, 3, 4, 5].map((val) => (
          <div key={val} className="flex flex-col items-center space-y-1">
            <RadioGroupItem value={val.toString()} id={`${name}-${val}`} className="sr-only" />
            <Label
              htmlFor={`${name}-${val}`}
              className={`cursor-pointer p-2 rounded-full ${
                value === val.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
              }`}
            >
              {val}
            </Label>
            <span className="text-xs text-gray-400">
              {val === 1
                ? t.veryDissatisfied
                : val === 2
                  ? t.dissatisfied
                  : val === 3
                    ? t.neutral
                    : val === 4
                      ? t.satisfied
                      : t.verySatisfied}
            </span>
          </div>
        ))}
      </RadioGroup>
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="bg-zinc-900 border-zinc-800 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-400">
            {hotelName ? `${hotelName} - ${t.restaurantReviewTitle}` : t.restaurantReviewTitle}
          </CardTitle>
          <CardDescription className="text-gray-400">{t.restaurantReviewDescription}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {!hotelIdParam && !currentHotelId && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.hotelSelection}</label>
                <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder={t.selectHotel} />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {hotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id} className="text-white">
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {renderRatingItem(
              t.restaurantStaffFriendliness,
              staffFriendliness,
              setStaffFriendliness,
              "staff-friendliness",
            )}
            {renderRatingItem(t.menuExplanation, menuExplanation, setMenuExplanation, "menu-explanation")}

            {/* 새로 추가된 평가 항목 */}
            {renderRatingItem(
              "워크인으로 이용시 직원의 응대는 어땠나요?",
              walkInResponse,
              setWalkInResponse,
              "walk-in-response",
            )}
            {renderRatingItem(
              "워크인으로 이용시 직원이 예약한 손님과 동등한 서비스를 제공했나요?",
              walkInServiceEquality,
              setWalkInServiceEquality,
              "walk-in-service-equality",
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{t.additionalComments}</label>
              <Textarea
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder={t.shareMoreFeedback}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black">
              {t.submitAndContinue}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
