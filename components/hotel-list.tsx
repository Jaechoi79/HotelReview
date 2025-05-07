"use client"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getReviews } from "@/lib/reviews"
import { Star, MapPin, ArrowRight } from "lucide-react"

export function HotelList() {
  const router = useRouter()
  const { t } = useLanguage()
  const reviews = getReviews()

  // Group reviews by hotel name and calculate average rating
  const hotels = reviews.reduce(
    (acc, review) => {
      if (!acc[review.hotelName]) {
        acc[review.hotelName] = {
          name: review.hotelName,
          location: review.location,
          category: review.category,
          totalRating: review.rating,
          reviewCount: 1,
          latestReview: review.comment,
        }
      } else {
        acc[review.hotelName].totalRating += review.rating
        acc[review.hotelName].reviewCount += 1
        // Keep the latest review comment
        if (new Date(review.createdAt) > new Date(acc[review.hotelName].latestReview)) {
          acc[review.hotelName].latestReview = review.comment
        }
      }
      return acc
    },
    {} as Record<
      string,
      {
        name: string
        location: string
        category: string
        totalRating: number
        reviewCount: number
        latestReview: string
      }
    >,
  )

  const hotelList = Object.values(hotels)
    .map((hotel) => ({
      ...hotel,
      averageRating: hotel.totalRating / hotel.reviewCount,
    }))
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 6) // Show top 6 hotels

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">{t.topRatedHotels}</h2>
          <p className="text-muted-foreground">{t.basedOnUserReviews}</p>
        </div>
        <Button variant="ghost" onClick={() => router.push("/reviews")}>
          {t.viewAll}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelList.length > 0 ? (
          hotelList.map((hotel) => (
            <Card key={hotel.name} className="overflow-hidden">
              <div className="h-48 bg-muted relative">
                <img
                  src={`/abstract-geometric-shapes.png?height=300&width=500&query=${encodeURIComponent(hotel.category + " hotel")}`}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary text-white text-sm font-medium px-2 py-1 rounded-md flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {hotel.averageRating.toFixed(1)}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{hotel.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3">{hotel.latestReview}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {hotel.reviewCount} {hotel.reviewCount === 1 ? t.review : t.reviews}
                </div>
                <Button variant="ghost" size="sm" onClick={() => router.push("/reviews")}>
                  {t.readReviews}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">{t.noReviewsYet}</h3>
            <p className="text-muted-foreground mt-1">{t.beFirstToReview}</p>
            <Button className="mt-4" onClick={() => router.push("/reviews/new")}>
              {t.writeReview}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
