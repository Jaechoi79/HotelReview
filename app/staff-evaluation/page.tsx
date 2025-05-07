"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { useReviewFlow } from "@/context/review-flow-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { sampleHotels } from "@/data/sample-hotels"
import type { Hotel } from "@/types/hotel"
import type { StaffEvaluation } from "@/types/staff-evaluation"

export default function StaffEvaluationPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotelIdParam = searchParams.get("hotelId")
  const { toast } = useToast()
  const [hotels] = useLocalStorage<Hotel[]>("hotels", sampleHotels)
  const [evaluations, setEvaluations] = useLocalStorage<StaffEvaluation[]>("staffEvaluations", [])
  const { currentHotelId, moveToNextStep } = useReviewFlow()

  const [selectedHotel, setSelectedHotel] = useState("")
  const [staffFriendliness, setStaffFriendliness] = useState("")
  const [staffAppearance, setStaffAppearance] = useState("")
  const [staffSmile, setStaffSmile] = useState("")
  const [staffTone, setStaffTone] = useState("")
  const [staffToneReason, setStaffToneReason] = useState("")
  const [staffComplaintHandling, setStaffComplaintHandling] = useState("")
  const [staffComplaintResolution, setStaffComplaintResolution] = useState("")
  const [managerHandling, setManagerHandling] = useState("")

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

    if (
      !selectedHotel ||
      !staffFriendliness ||
      !staffAppearance ||
      !staffSmile ||
      !staffTone ||
      !staffComplaintHandling ||
      !staffComplaintResolution ||
      !managerHandling
    ) {
      toast({
        title: t.error,
        description: t.pleaseRateAllItems,
        variant: "destructive",
      })
      return
    }

    // If staff tone is negative (1-2) but no reason provided
    if (Number.parseInt(staffTone) <= 2 && !staffToneReason) {
      toast({
        title: t.error,
        description: t.staffToneReason,
        variant: "destructive",
      })
      return
    }

    const newEvaluation: StaffEvaluation = {
      id: Date.now().toString(),
      hotelId: selectedHotel,
      staffFriendliness: Number.parseInt(staffFriendliness),
      staffAppearance: Number.parseInt(staffAppearance),
      staffSmile: Number.parseInt(staffSmile),
      staffTone: Number.parseInt(staffTone),
      staffToneReason: staffToneReason,
      staffComplaintHandling: Number.parseInt(staffComplaintHandling),
      staffComplaintResolution: Number.parseInt(staffComplaintResolution),
      managerHandling: Number.parseInt(managerHandling),
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
    }

    setEvaluations([newEvaluation, ...evaluations])

    toast({
      title: t.success,
      description: t.evaluationSubmittedSuccessfully,
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
            {hotelName ? `${hotelName} - ${t.staffEvaluationTitle}` : t.staffEvaluationTitle}
          </CardTitle>
          <CardDescription className="text-gray-400">{t.staffEvaluationDescription}</CardDescription>
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
              <label className="text-sm font-medium text-gray-300">{t.staffFriendliness}</label>
              <RadioGroup
                value={staffFriendliness}
                onValueChange={setStaffFriendliness}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`friendliness-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`friendliness-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        staffFriendliness === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
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
              <label className="text-sm font-medium text-gray-300">{t.staffAppearance}</label>
              <RadioGroup value={staffAppearance} onValueChange={setStaffAppearance} className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`appearance-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`appearance-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        staffAppearance === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
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
              <label className="text-sm font-medium text-gray-300">{t.staffSmile}</label>
              <RadioGroup value={staffSmile} onValueChange={setStaffSmile} className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`smile-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`smile-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        staffSmile === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
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
              <label className="text-sm font-medium text-gray-300">{t.staffTone}</label>
              <RadioGroup value={staffTone} onValueChange={setStaffTone} className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`tone-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`tone-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        staffTone === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
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

            {Number.parseInt(staffTone) <= 2 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.staffToneReason}</label>
                <Textarea
                  value={staffToneReason}
                  onChange={(e) => setStaffToneReason(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  maxLength={500}
                  rows={3}
                />
                <div className="text-xs text-gray-400 text-right">{staffToneReason.length}/500</div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">{t.staffComplaintHandling}</label>
              <RadioGroup
                value={staffComplaintHandling}
                onValueChange={setStaffComplaintHandling}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`complaint-handling-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`complaint-handling-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        staffComplaintHandling === value.toString()
                          ? "bg-amber-500 text-black"
                          : "bg-zinc-800 text-white"
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
              <label className="text-sm font-medium text-gray-300">{t.staffComplaintResolution}</label>
              <RadioGroup
                value={staffComplaintResolution}
                onValueChange={setStaffComplaintResolution}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`complaint-resolution-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`complaint-resolution-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        staffComplaintResolution === value.toString()
                          ? "bg-amber-500 text-black"
                          : "bg-zinc-800 text-white"
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
              <label className="text-sm font-medium text-gray-300">{t.managerHandling}</label>
              <RadioGroup value={managerHandling} onValueChange={setManagerHandling} className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={value.toString()} id={`manager-handling-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`manager-handling-${value}`}
                      className={`cursor-pointer p-2 rounded-full ${
                        managerHandling === value.toString() ? "bg-amber-500 text-black" : "bg-zinc-800 text-white"
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
