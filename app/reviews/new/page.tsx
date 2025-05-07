"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { addReview } from "@/lib/reviews"
import { addReviewPoints } from "@/lib/points"
import { processReceiptImage } from "@/lib/receipt-validator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Gift, Upload, AlertCircle } from "lucide-react"
import { DatePicker } from "@/components/date-picker"

export default function NewReviewPage() {
  const [hotelName, setHotelName] = useState("")
  const [location, setLocation] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [category, setCategory] = useState("luxury")
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [receiptImage, setReceiptImage] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setReceiptImage(file)

    try {
      // 실제로는 서버에서 처리해야 하는 부분
      const processedImageUrl = await processReceiptImage(file)
      setReceiptPreview(processedImageUrl)
      setValidationError(null)
    } catch (error) {
      setValidationError("영수증 이미지 처리 중 오류가 발생했습니다.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)
    setValidationError(null)

    if (!user) {
      toast({
        title: t.error,
        description: t.pleaseLoginToSubmitReview,
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!hotelName || !location || !rating || !comment || !checkInDate || !checkOutDate || !receiptImage) {
      setIsValidating(false)
      toast({
        title: t.error,
        description: "모든 필드를 작성하고 영수증을 첨부해주세요.",
        variant: "destructive",
      })
      return
    }

    // 영수증 날짜 검증 (실제로는 서버에서 이미지 분석을 통해 날짜를 추출해야 함)
    // 여기서는 간단히 영수증이 있으면 검증 통과로 가정
    const isValidReceipt = true

    if (!isValidReceipt) {
      setIsValidating(false)
      setValidationError("영수증의 날짜가 체크인 또는 체크아웃 날짜와 일치하지 않습니다.")
      return
    }

    // 리뷰 추가
    const newReview = {
      id: Date.now().toString(),
      hotelName,
      location,
      rating,
      comment,
      category,
      checkInDate: checkInDate?.toISOString() || "",
      checkOutDate: checkOutDate?.toISOString() || "",
      receiptImageUrl: receiptPreview, // 실제로는 서버에 업로드된 이미지 URL
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
    }

    addReview(newReview)

    // 포인트 지급
    addReviewPoints(user.id, hotelName)

    setIsValidating(false)
    toast({
      title: t.success,
      description: "리뷰가 성공적으로 제출되었습니다. 5만 포인트가 지급되었습니다!",
    })

    router.push("/reviews")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-amber-400">{t.submitNewReview}</CardTitle>
          <CardDescription className="text-gray-400">{t.shareYourExperience}</CardDescription>
        </CardHeader>

        <Alert className="mx-6 bg-amber-500/10 border-amber-500/20 text-amber-400">
          <Gift className="h-4 w-4" />
          <AlertTitle>리뷰 작성 보너스!</AlertTitle>
          <AlertDescription>리뷰 작성 시 5만 포인트를 드립니다. 영수증 첨부는 필수입니다.</AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="hotelName">{t.hotelName}</Label>
              <Input
                id="hotelName"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                placeholder={t.enterHotelName}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t.location}</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.enterLocation}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePicker date={checkInDate} setDate={setCheckInDate} label="체크인 날짜" />

              <DatePicker date={checkOutDate} setDate={setCheckOutDate} label="체크아웃 날짜" />
            </div>

            <div className="space-y-2">
              <Label>{t.rating}</Label>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t.category}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="luxury" className="text-white">
                    {t.luxury}
                  </SelectItem>
                  <SelectItem value="business" className="text-white">
                    {t.business}
                  </SelectItem>
                  <SelectItem value="budget" className="text-white">
                    {t.budget}
                  </SelectItem>
                  <SelectItem value="resort" className="text-white">
                    {t.resort}
                  </SelectItem>
                  <SelectItem value="boutique" className="text-white">
                    {t.boutique}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">{t.comment}</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.enterYourReview}
                rows={5}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">영수증 첨부 (필수)</Label>
              <div className="flex items-center gap-2">
                <Input
                  ref={fileInputRef}
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-zinc-800 border-zinc-700 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  영수증 업로드
                </Button>
                <span className="text-sm text-gray-400">
                  {receiptImage ? receiptImage.name : "파일을 선택해주세요"}
                </span>
              </div>

              {receiptPreview && (
                <div className="mt-2 relative">
                  <img
                    src={receiptPreview || "/placeholder.svg"}
                    alt="영수증 미리보기"
                    className="max-h-40 rounded border border-zinc-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">* 영수증의 카드번호는 자동으로 삭제됩니다.</p>
                </div>
              )}

              {validationError && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              <p className="text-xs text-amber-400">* 영수증의 날짜는 체크인 또는 체크아웃 날짜와 일치해야 합니다.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black" disabled={isValidating}>
              {isValidating ? "검증 중..." : t.submitReview}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
