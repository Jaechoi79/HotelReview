"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewCard } from "@/components/review-card"
import { getReviews } from "@/lib/reviews"
import { PlusCircle, Search } from "lucide-react"

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  const reviews = getReviews()

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || review.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.hotelReviews}</h1>
          <p className="text-muted-foreground">{t.browseAndSearchReviews}</p>
        </div>

        <Button onClick={() => router.push("/reviews/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t.writeReview}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.searchReviews}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.filterByCategory} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allCategories}</SelectItem>
                <SelectItem value="luxury">{t.luxury}</SelectItem>
                <SelectItem value="business">{t.business}</SelectItem>
                <SelectItem value="budget">{t.budget}</SelectItem>
                <SelectItem value="resort">{t.resort}</SelectItem>
                <SelectItem value="boutique">{t.boutique}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">{t.noReviewsFound}</h3>
              <p className="text-muted-foreground mt-1">{t.tryAdjustingFilters}</p>
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t.topHotels}</CardTitle>
              <CardDescription>{t.highestRatedHotels}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 5)
                  .map((review) => (
                    <div key={review.id} className="flex items-start space-x-2">
                      <div className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center">
                        {review.rating}
                      </div>
                      <div>
                        <h4 className="font-medium">{review.hotelName}</h4>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
