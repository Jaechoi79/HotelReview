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
import type { RoomReview } from "@/types/room-review"

export default function RoomReviewPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotelIdParam = searchParams.get("hotelId")
  const { toast } = useToast()
  const [hotels] = useLocalStorage<Hotel[]>("hotels", sampleHotels)
  const [roomReviews, setRoomReviews] = useLocalStorage<RoomReview[]>("roomReviews", [])
  const { currentHotelId, moveToNextStep } = useReviewFlow()

  const [selectedHotel, setSelectedHotel] = useState("")
  const [roomCleanliness, setRoomCleanliness] = useState("")
  const [bathroomCleanliness, setBathroomCleanliness] = useState("")
  const [curtainSmell, setCurtainSmell] = useState("")
  const [beddingCleanliness, setBeddingCleanliness] = useState("")
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

    if (!selectedHotel || !roomCleanliness || !bathroomCleanliness || !curtainSmell || !beddingCleanliness) {
      toast({
        title: t.error,
        description: t.pleaseRateAllItems,
        variant: "destructive",
      })
      return
    }

    const newReview: RoomReview = {
      id: Date.now().toString(),
      hotelId: selectedHotel,
      roomCleanliness: Number.parseInt(roomCleanliness),
      bathroomCleanliness: Number.parseInt(bathroomCleanliness),
      curtainSmell: Number.parseInt(curtainSmell),
      beddingCleanliness: Number.parseInt(beddingCleanliness),
      additionalComments,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
    }

    setRoomReviews([newReview, ...roomReviews])

    toast({
      title: t.success,
      description: t.roomReviewSubmittedSuccessfully,
    })

    // Move to the next step in the review flow
    moveToNextStep()
  }

  // Get hotel name for display
  const hotelName = hotels.find((h) => h.id === selectedHotel)?.name || ""

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="bg-zinc-900 border-zinc-800 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-400">
            {hotelName ? `${hotelName} - ${t.roomReviewTitle}` : t.roomReviewTitle}
          </CardTitle>
          <CardDescription className="text-gray-400">{t.roomReviewDescription}</CardDescription>
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

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">{t.roomCleanliness}</label>
              <RadioGroup value={roomCleanliness} onValueChange={setRoomCleanliness} className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`room-cleanliness-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`room-cleanliness-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        roomCleanliness === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
                      }`}
                    >
                      {value}
                    </Label>
                    <span className="text-xs text-gray-400">
                      {value === 1
                        ? t.veryDissatisfied
                        : value === 2
                          ? t.dissatisfied
                          : value === 3
                            ? t.neutral
                            : value === 4
                              ? t.satisfied
                              : t.verySatisfied}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">{t.bathroomCleanliness}</label>
              <RadioGroup
                value={bathroomCleanliness}
                onValueChange={setBathroomCleanliness}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`bathroom-cleanliness-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`bathroom-cleanliness-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        bathroomCleanliness === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
                      }`}
                    >
                      {value}
                    </Label>
                    <span className="text-xs text-gray-400">
                      {value === 1
                        ? t.veryDissatisfied
                        : value === 2
                          ? t.dissatisfied
                          : value === 3
                            ? t.neutral
                            : value === 4
                              ? t.satisfied
                              : t.verySatisfied}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">{t.curtainSmell}</label>
              <RadioGroup value={curtainSmell} onValueChange={setCurtainSmell} className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`curtain-smell-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`curtain-smell-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        curtainSmell === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
                      }`}
                    >
                      {value}
                    </Label>
                    <span className="text-xs text-gray-400">
                      {value === 1
                        ? t.veryDissatisfied
                        : value === 2
                          ? t.dissatisfied
                          : value === 3
                            ? t.neutral
                            : value === 4
                              ? t.satisfied
                              : t.verySatisfied}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">{t.beddingCleanliness}</label>
              <RadioGroup
                value={beddingCleanliness}
                onValueChange={setBeddingCleanliness}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`bedding-cleanliness-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`bedding-cleanliness-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        beddingCleanliness === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
                      }`}
                    >
                      {value}
                    </Label>
                    <span className="text-xs text-gray-400">
                      {value === 1
                        ? t.veryDissatisfied
                        : value === 2
                          ? t.dissatisfied
                          : value === 3
                            ? t.neutral
                            : value === 4
                              ? t.satisfied
                              : t.verySatisfied}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

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
              {t.submitAndComplete}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
