export interface Hotel {
  id: string
  name: string
  imageUrl: string
  review: string
  finalRating: number
  scores: {
    staffComplaint: number
    staffSpeed: number
    managerComplaint: number
    managerSpeed: number
    facility: number
    cleanliness: number
    experience: number
  }
}

// 언어 타입 정의 추가
export type Language = "ko" | "en" | "ja" | "zh" | "ar" | "de" | "it"
