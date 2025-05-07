import { sampleAnnouncementsByLanguage } from "@/data/sample-announcements"
import type { Announcement } from "@/types/announcement"
import type { Language } from "@/types/hotel"

// 언어별 공지사항 가져오기
export function getAnnouncementsByLanguage(language: Language): Announcement[] {
  return sampleAnnouncementsByLanguage[language] || sampleAnnouncementsByLanguage.ko
}
