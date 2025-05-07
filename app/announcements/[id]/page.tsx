"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Megaphone, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { getAnnouncementsByLanguage } from "@/lib/announcements"
import type { Announcement } from "@/types/announcement"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function AnnouncementDetailPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [nextAnnouncement, setNextAnnouncement] = useState<Announcement | null>(null)
  const [prevAnnouncement, setPrevAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    const announcementId = params.id as string
    const announcements = getAnnouncementsByLanguage(language)
    const currentIndex = announcements.findIndex((a) => a.id === announcementId)

    if (currentIndex !== -1) {
      setAnnouncement(announcements[currentIndex])

      // 이전 및 다음 공지사항 설정
      if (currentIndex > 0) {
        setPrevAnnouncement(announcements[currentIndex - 1])
      } else {
        setPrevAnnouncement(null)
      }

      if (currentIndex < announcements.length - 1) {
        setNextAnnouncement(announcements[currentIndex + 1])
      } else {
        setNextAnnouncement(null)
      }
    } else {
      // 현재 언어에 해당 ID의 공지사항이 없으면 기본 언어(한국어)에서 찾기
      const defaultAnnouncements = getAnnouncementsByLanguage("ko")
      const defaultIndex = defaultAnnouncements.findIndex((a) => a.id === announcementId)

      if (defaultIndex !== -1) {
        setAnnouncement(defaultAnnouncements[defaultIndex])

        // 이전 및 다음 공지사항 설정
        if (defaultIndex > 0) {
          setPrevAnnouncement(defaultAnnouncements[defaultIndex - 1])
        } else {
          setPrevAnnouncement(null)
        }

        if (defaultIndex < defaultAnnouncements.length - 1) {
          setNextAnnouncement(defaultAnnouncements[defaultIndex + 1])
        } else {
          setNextAnnouncement(null)
        }
      } else {
        router.push("/announcements")
      }
    }

    setLoading(false)
  }, [params.id, language, router])

  // 공지사항이 최근인지 확인 (7일 이내)
  const isRecent = announcement && new Date(announcement.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  if (loading || !announcement) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-amber-500/10 p-6 rounded-full mx-auto mb-4">
            <Calendar className="h-16 w-16 text-amber-500" />
          </div>
          <h2 className="text-xl font-medium text-gray-300">{t.loadingHotelDetails || "공지사항 로딩 중..."}</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button
          variant="ghost"
          onClick={() => router.push("/announcements")}
          className="mb-6 text-gray-300 hover:text-white group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t.backToAnnouncements}
        </Button>

        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <CardHeader className="pb-4 border-b border-zinc-800">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Megaphone className="h-5 w-5 text-amber-500 mr-2" />
                  {isRecent && <Badge className="bg-amber-500 text-black mr-2">NEW</Badge>}
                  <CardTitle className="text-2xl text-amber-400">{announcement.title}</CardTitle>
                </div>
                <CardDescription className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(announcement.date).toLocaleDateString(language === "ko" ? "ko-KR" : undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </CardDescription>
              </div>
              <Button variant="outline" size="icon" className="rounded-full border-zinc-700">
                <Share2 className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-6">
            <div className="prose prose-invert max-w-none">
              {announcement.content.split("\n\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-zinc-800 pt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex justify-between w-full">
              {prevAnnouncement ? (
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/announcements/${prevAnnouncement.id}`)}
                  className="flex items-center text-gray-400 hover:text-amber-400 group"
                >
                  <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs opacity-70">이전 공지사항</div>
                    <div className="truncate max-w-[150px]">{prevAnnouncement.title}</div>
                  </div>
                </Button>
              ) : (
                <div></div>
              )}

              {nextAnnouncement && (
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/announcements/${nextAnnouncement.id}`)}
                  className="flex items-center text-gray-400 hover:text-amber-400 group ml-auto"
                >
                  <div className="text-right">
                    <div className="text-xs opacity-70">다음 공지사항</div>
                    <div className="truncate max-w-[150px]">{nextAnnouncement.title}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
