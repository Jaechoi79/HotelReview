"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Hotel } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Hotel as HotelType } from "@/types/hotel"
// 파일 상단에 Language 타입 import 추가
import type { Language } from "@/types/hotel"
import { v4 as uuidv4 } from "uuid"
// 파일 상단에 LanguageSelector import 추가
import { LanguageSelector } from "@/components/language-selector"

export default function AddHotel() {
  const router = useRouter()
  // useState 부분 수정
  const [language, setLanguage] = useState<Language>("ko")
  const [hotels, setHotels] = useLocalStorage<HotelType[]>("hotels", [])
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    review: "",
    staffComplaint: 5,
    staffSpeed: 5,
    managerComplaint: 5,
    managerSpeed: 5,
    facility: 5,
    cleanliness: 5,
    experience: 5,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSliderChange = (id: string, value: number[]) => {
    setFormData({ ...formData, [id]: value[0] })
  }

  const calculateRating = () => {
    const scores = {
      staffComplaint: formData.staffComplaint,
      staffSpeed: formData.staffSpeed,
      managerComplaint: formData.managerComplaint,
      managerSpeed: formData.managerSpeed,
      facility: formData.facility,
      cleanliness: formData.cleanliness,
      experience: formData.experience,
    }

    const weights = {
      staffComplaint: 0.15,
      staffSpeed: 0.1,
      managerComplaint: 0.1,
      managerSpeed: 0.05,
      facility: 0.3,
      cleanliness: 0.2,
      experience: 0.1,
    }

    let total = 0
    for (const key in scores) {
      total += scores[key as keyof typeof scores] * weights[key as keyof typeof weights]
    }

    return (total / 2).toFixed(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newHotel: HotelType = {
      id: uuidv4(),
      name: formData.name,
      imageUrl: formData.imageUrl || "",
      review: formData.review,
      finalRating: Number.parseFloat(calculateRating()),
      scores: {
        staffComplaint: formData.staffComplaint,
        staffSpeed: formData.staffSpeed,
        managerComplaint: formData.managerComplaint,
        managerSpeed: formData.managerSpeed,
        facility: formData.facility,
        cleanliness: formData.cleanliness,
        experience: formData.experience,
      },
    }

    setHotels([...hotels, newHotel])
    router.push("/")
  }

  return (
    // 페이지 상단에 언어 선택기 추가 (Button 아래)
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t.backToList}
        </Button>
        <LanguageSelector language={language} setLanguage={setLanguage} compact />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Hotel className="h-6 w-6 mr-2" />
            <CardTitle>{t.addNewHotel}</CardTitle>
          </div>
          <CardDescription>{t.fillInHotelDetails}</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t.hotelName}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={t.enterHotelName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">
                {t.imageUrl} ({t.optional})
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder={t.enterImageUrl}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review">{t.review}</Label>
              <Textarea
                id="review"
                value={formData.review}
                onChange={handleInputChange}
                required
                placeholder={t.enterReview}
                rows={3}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">{t.ratings}</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="staffComplaint">{t.staffComplaint}</Label>
                    <span className="text-sm font-medium">{formData.staffComplaint}/10</span>
                  </div>
                  <Slider
                    id="staffComplaint"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.staffComplaint]}
                    onValueChange={(value) => handleSliderChange("staffComplaint", value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="staffSpeed">{t.staffSpeed}</Label>
                    <span className="text-sm font-medium">{formData.staffSpeed}/10</span>
                  </div>
                  <Slider
                    id="staffSpeed"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.staffSpeed]}
                    onValueChange={(value) => handleSliderChange("staffSpeed", value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="managerComplaint">{t.managerComplaint}</Label>
                    <span className="text-sm font-medium">{formData.managerComplaint}/10</span>
                  </div>
                  <Slider
                    id="managerComplaint"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.managerComplaint]}
                    onValueChange={(value) => handleSliderChange("managerComplaint", value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="managerSpeed">{t.managerSpeed}</Label>
                    <span className="text-sm font-medium">{formData.managerSpeed}/10</span>
                  </div>
                  <Slider
                    id="managerSpeed"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.managerSpeed]}
                    onValueChange={(value) => handleSliderChange("managerSpeed", value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="facility">{t.facility}</Label>
                    <span className="text-sm font-medium">{formData.facility}/10</span>
                  </div>
                  <Slider
                    id="facility"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.facility]}
                    onValueChange={(value) => handleSliderChange("facility", value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cleanliness">{t.cleanliness}</Label>
                    <span className="text-sm font-medium">{formData.cleanliness}/10</span>
                  </div>
                  <Slider
                    id="cleanliness"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.cleanliness]}
                    onValueChange={(value) => handleSliderChange("cleanliness", value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="experience">{t.experience}</Label>
                    <span className="text-sm font-medium">{formData.experience}/10</span>
                  </div>
                  <Slider
                    id="experience"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[formData.experience]}
                    onValueChange={(value) => handleSliderChange("experience", value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{t.calculatedRating}</h4>
                  <p className="text-2xl font-bold">
                    {calculateRating()} {t.stars}
                  </p>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = Number.parseFloat(calculateRating())
                    return (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : i < rating
                              ? "text-yellow-500 fill-yellow-500 opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/")}>
              {t.cancel}
            </Button>
            <Button type="submit">{t.saveHotel}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

import { Star } from "lucide-react"
