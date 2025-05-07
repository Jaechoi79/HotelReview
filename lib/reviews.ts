import type { Review } from "@/types/review"

// Get reviews from localStorage
export function getReviews(): Review[] {
  if (typeof window === "undefined") return []

  const storedReviews = localStorage.getItem("reviews")
  if (!storedReviews) return []

  try {
    return JSON.parse(storedReviews)
  } catch (error) {
    console.error("Failed to parse stored reviews:", error)
    return []
  }
}

// Add a new review
export function addReview(review: Review): void {
  const reviews = getReviews()
  reviews.push(review)
  localStorage.setItem("reviews", JSON.stringify(reviews))
}

// Delete a review
export function deleteReview(id: string): void {
  const reviews = getReviews()
  const updatedReviews = reviews.filter((review) => review.id !== id)
  localStorage.setItem("reviews", JSON.stringify(updatedReviews))
}

// Initialize with sample data if empty
export function initializeReviews(): void {
  const reviews = getReviews()

  if (reviews.length === 0) {
    const sampleReviews: Review[] = [
      {
        id: "1",
        hotelName: "Grand Hyatt Seoul",
        location: "Seoul, South Korea",
        rating: 5,
        comment:
          "Exceptional service and stunning views of the city. The rooms are spacious and well-appointed, and the staff went above and beyond to make our stay memorable.",
        category: "luxury",
        userId: "admin",
        userName: "Admin User",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      },
      {
        id: "2",
        hotelName: "Shilla Stay Gwanghwamun",
        location: "Seoul, South Korea",
        rating: 4,
        comment:
          "Great location for business travelers. Clean rooms and efficient service. The breakfast buffet offers a good variety of options.",
        category: "business",
        userId: "admin",
        userName: "Admin User",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      },
      {
        id: "3",
        hotelName: "Jeju Shinhwa World Marriott Resort",
        location: "Jeju Island, South Korea",
        rating: 5,
        comment:
          "Perfect family resort with amazing facilities. The pools are fantastic and there are plenty of activities for children. The rooms are spacious and comfortable.",
        category: "resort",
        userId: "admin",
        userName: "Admin User",
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
      },
    ]

    localStorage.setItem("reviews", JSON.stringify(sampleReviews))
  }
}

// Call this function when the app initializes
if (typeof window !== "undefined") {
  initializeReviews()
}
