"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
}

export function StarRating({ rating, onRatingChange, readOnly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index)
    }
  }

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={`h-6 w-6 cursor-pointer ${
            index <= (hoverRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  )
}
