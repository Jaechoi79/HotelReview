"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { sampleHotels } from "@/data/sample-hotels"
import { useLanguage } from "@/context/language-context"
import { useReviewFlow } from "@/context/review-flow-context"
import type { Hotel } from "@/types/hotel"

export function HotelSearch() {
  const { t } = useLanguage()
  const router = useRouter()
  const { setCurrentHotel } = useReviewFlow()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Hotel[]>([])
  const [showResults, setShowResults] = useState(false)
  const [hotels] = useLocalStorage<Hotel[]>("hotels", sampleHotels)

  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = hotels.filter((hotel) => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchTerm, hotels])

  const handleHotelSelect = (hotel: Hotel) => {
    setCurrentHotel(hotel.id)
    setSearchTerm("")
    setShowResults(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.length > 1) {
      router.push(`/search-results?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
      setShowResults(false)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder={t.searchHotels}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {showResults && searchResults.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg">
          <CardContent className="p-0">
            <ul className="py-2">
              {searchResults.map((hotel) => (
                <li
                  key={hotel.id}
                  className="px-4 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleHotelSelect(hotel)}
                >
                  {hotel.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
