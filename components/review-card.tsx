"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, User } from "lucide-react"
import type { Review } from "@/types/review"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { t } = useLanguage()

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "luxury":
        return t.luxury
      case "business":
        return t.business
      case "budget":
        return t.budget
      case "resort":
        return t.resort
      case "boutique":
        return t.boutique
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "luxury":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "business":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "budget":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "resort":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "boutique":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{review.hotelName}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {review.location}
            </div>
          </div>
          <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-md">
            <Star className="h-4 w-4 mr-1 fill-current" />
            <span className="font-medium">{review.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.comment}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5 mr-1" />
          {review.userName}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${getCategoryColor(review.category)}`}>
            {getCategoryLabel(review.category)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
