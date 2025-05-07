"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, MapPin } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { sampleHotels } from "@/data/sample-hotels"
import { useLanguage } from "@/context/language-context"
import { useReviewFlow } from "@/context/review-flow-context"
import type { Hotel } from "@/types/hotel"

export default function SearchResults() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [hotels] = useLocalStorage<Hotel[]>("hotels", sampleHotels)
  const [searchResults, setSearchResults] = useState<Hotel[]>([])
  const { setCurrentHotel } = useReviewFlow()

  useEffect(() => {
    if (query) {
      const results = hotels.filter((hotel) => hotel.name.toLowerCase().includes(query.toLowerCase()))
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query, hotels])

  const handleStartReview = (hotel: Hotel) => {
    setCurrentHotel(hotel.id)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t.back}
        </Button>
        <h1 className="text-2xl font-bold">
          {t.searchResults}: {query}
        </h1>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">{t.noResultsFound}</h2>
          <p className="text-muted-foreground">{t.tryDifferentSearch}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="h-48 bg-muted relative">
                <img
                  src={hotel.imageUrl || "/placeholder.svg?height=300&width=500&query=hotel"}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary text-white text-sm font-medium px-2 py-1 rounded-md flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {hotel.finalRating.toFixed(1)}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{hotel.name}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {hotel.name.split(" ").pop()}, Korea
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-3">
                  <Button onClick={() => router.push(`/hotel/${hotel.id}`)} variant="outline" className="w-full">
                    {t.viewDetails}
                  </Button>
                  <Button onClick={() => handleStartReview(hotel)} className="w-full">
                    {t.writeReview}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
