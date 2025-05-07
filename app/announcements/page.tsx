"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Calendar, ArrowRight, Bell, Megaphone } from "lucide-react"
import { getAnnouncementsByLanguage } from "@/lib/announcements"
import type { Announcement } from "@/types/announcement"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function AnnouncementsPage() {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  // 언어가 변경될 때마다 해당 언어의 공지사항 데이터 가져오기
  useEffect(() => {
    const localizedAnnouncements = getAnnouncementsByLanguage(language)
    setAnnouncements(localizedAnnouncements)
  }, [language])

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 공지사항 날짜 기준으로 분류
  const recentAnnouncements = filteredAnnouncements.filter(
    (a) => new Date(a.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  )
  const olderAnnouncements = filteredAnnouncements.filter(
    (a) => new Date(a.date) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-xl p-8 mb-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-20">
          <Megaphone className="w-full h-full text-amber-500" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{t.announcementTitle}</h1>
          <p className="text-gray-300 max-w-2xl">{t.announcementDescription}</p>
        </div>
      </motion.div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={18} />
          <Input
            placeholder={t.searchReviews}
            className="pl-10 bg-zinc-800 border-zinc-700 text-white focus:ring-amber-500 focus:border-amber-500 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {recentAnnouncements.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <Badge className="bg-amber-500 text-black mr-2">NEW</Badge>
            <h2 className="text-xl font-semibold text-white">최근 공지사항</h2>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recentAnnouncements.map((announcement) => (
              <motion.div key={announcement.id} variants={item}>
                <Link href={`/announcements/${announcement.id}`} className="block h-full">
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full hover:border-amber-500/50 transition-colors duration-300">
                    <CardHeader className="pb-3 border-b border-zinc-800">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl text-amber-400">{announcement.title}</CardTitle>
                        <Bell className="h-4 w-4 text-amber-500 flex-shrink-0 mt-1" />
                      </div>
                      <CardDescription className="flex items-center text-gray-400">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {new Date(announcement.date).toLocaleDateString(language === "ko" ? "ko-KR" : undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-300 line-clamp-3">{announcement.content.substring(0, 150)}...</p>
                      <div className="flex justify-end mt-4">
                        <span className="inline-flex items-center text-amber-400 text-sm font-medium">
                          {t.readMore} <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {olderAnnouncements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">이전 공지사항</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {olderAnnouncements.map((announcement) => (
              <motion.div key={announcement.id} variants={item}>
                <Link href={`/announcements/${announcement.id}`} className="block h-full">
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full hover:border-zinc-700 transition-colors duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-white">{announcement.title}</CardTitle>
                      <CardDescription className="flex items-center text-gray-400">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {new Date(announcement.date).toLocaleDateString(language === "ko" ? "ko-KR" : undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 line-clamp-3">{announcement.content.substring(0, 150)}...</p>
                      <div className="flex justify-end mt-4">
                        <span className="inline-flex items-center text-gray-400 hover:text-amber-400 text-sm font-medium transition-colors">
                          {t.readMore} <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {filteredAnnouncements.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-zinc-900/50 rounded-lg border border-zinc-800"
        >
          <Megaphone className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300">{t.noAnnouncementsFound}</h3>
          <p className="text-gray-400 mt-2">검색어를 변경하거나 다른 언어로 시도해보세요.</p>
        </motion.div>
      )}
    </div>
  )
}
