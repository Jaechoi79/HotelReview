"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import type { Hotel } from "@/types/hotel"
import { sampleHotels } from "@/data/sample-hotels"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { DatePicker } from "@/components/date-picker"

export default function Home() {
  const router = useRouter()
  const [hotels, setHotels] = useLocalStorage<Hotel[]>("hotels", sampleHotels)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("hotel")
  const { t } = useLanguage()

  // 날짜 상태 관리
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)

  // 슬라이더 관련 상태
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesPerView = 4
  const totalSlides = Math.ceil(hotels.length / slidesPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const visibleHotels = hotels.slice(
    currentSlide * slidesPerView,
    Math.min((currentSlide + 1) * slidesPerView, hotels.length),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-400 mb-3">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-lg">
            <Tabs defaultValue="hotel" onValueChange={setActiveTab}>
              <TabsList className="bg-zinc-800 mb-6">
                <TabsTrigger value="hotel" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  {t.hotelReviewSystem}
                </TabsTrigger>
                <TabsTrigger value="resort" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  {t.resort}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotel" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1 flex items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        placeholder={t.stayedHotel}
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button className="ml-2 bg-amber-500 hover:bg-amber-600 text-black">{t.search_btn}</Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <DatePicker date={checkInDate} setDate={setCheckInDate} label="체크인" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <DatePicker date={checkOutDate} setDate={setCheckOutDate} label="체크아웃" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resort" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1 flex items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input placeholder={t.stayedHotel} className="pl-10 bg-zinc-800 border-zinc-700 text-white" />
                    </div>
                    <Button className="ml-2 bg-amber-500 hover:bg-amber-600 text-black">{t.search_btn}</Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <DatePicker date={checkInDate} setDate={setCheckInDate} label="체크인" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <DatePicker date={checkOutDate} setDate={setCheckOutDate} label="체크아웃" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">{t.recommended}</h2>

          <div className="relative">
            <div className="flex justify-between absolute -left-12 -right-12 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 border-zinc-700 hover:bg-black/80"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/50 border-zinc-700 hover:bg-black/80"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                initial={{ x: 0 }}
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {visibleHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="min-w-[calc(25%-18px)] cursor-pointer"
                    onClick={() => router.push(`/hotel/${hotel.id}`)}
                  >
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <img
                        src={hotel.imageUrl || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  i < Math.floor(hotel.finalRating)
                                    ? "text-amber-400 fill-amber-400"
                                    : i < hotel.finalRating
                                      ? "text-amber-400 fill-amber-400 opacity-50"
                                      : "text-gray-400"
                                }`}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-300">{hotel.finalRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
