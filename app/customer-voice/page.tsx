"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { sampleFeedbacks } from "@/data/sample-feedbacks"
import type { Feedback } from "@/types/feedback"
import {
  MessageSquare,
  AlertCircle,
  Send,
  MessageCircle,
  ThumbsUp,
  AlertTriangle,
  HelpCircle,
  Search,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CustomerVoicePage() {
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("suggestion")
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [feedbacks, setFeedbacks] = useLocalStorage<Feedback[]>("feedbacks", sampleFeedbacks)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 유효성 검사를 위한 상태
  const [validationError, setValidationError] = useState<string | null>(null)

  // 텍스트 영역 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  // 한국어와 영어만 허용하는 유효성 검사 함수
  const isKoreanOrEnglish = (text: string): boolean => {
    // 한국어, 영어, 숫자, 공백, 일반적인 문장부호만 허용
    const koreanEnglishRegex = /^[가-힣A-Za-z0-9\s.,!?;:()\-'"[\]{}@#$%^&*+=_\\|~<>/]+$/
    return koreanEnglishRegex.test(text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!user) {
      toast({
        title: t.error,
        description: t.pleaseLoginToSubmitReview,
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!title || !content) {
      toast({
        title: t.error,
        description: t.pleaseCompleteAllFields,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // 한국어와 영어만 허용하는 유효성 검사
    if (!isKoreanOrEnglish(title) || !isKoreanOrEnglish(content)) {
      setValidationError(
        language === "ko" ? "한국어와 영어로만 작성해주세요." : "Please write in Korean or English only.",
      )
      setIsSubmitting(false)
      return
    }

    // 제출 지연 시뮬레이션 (실제 API 호출 대체)
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        title,
        content,
        type,
        userId: user.id,
        userName: user.name,
        createdAt: new Date().toISOString(),
      }

      setFeedbacks([newFeedback, ...feedbacks])

      toast({
        title: t.success,
        description: t.feedbackSubmittedSuccessfully,
      })

      // Reset form
      setTitle("")
      setContent("")
      setType("suggestion")
      setValidationError(null)
      setIsSubmitting(false)
    }, 800)
  }

  // 피드백 필터링
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = activeTab === "all" || feedback.type === activeTab

    return matchesSearch && matchesType
  })

  // 피드백 타입에 따른 아이콘 및 색상
  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case "suggestion":
        return <MessageCircle className="h-4 w-4" />
      case "complaint":
        return <AlertTriangle className="h-4 w-4" />
      case "praise":
        return <ThumbsUp className="h-4 w-4" />
      case "question":
        return <HelpCircle className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case "suggestion":
        return "bg-blue-900 text-blue-300"
      case "complaint":
        return "bg-red-900 text-red-300"
      case "praise":
        return "bg-green-900 text-green-300"
      case "question":
        return "bg-purple-900 text-purple-300"
      default:
        return "bg-gray-900 text-gray-300"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-xl p-8 mb-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-20">
          <MessageSquare className="w-full h-full text-blue-500" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">Customer's Voice (CV)</h1>
          <p className="text-gray-300 max-w-2xl">{t.customerVoiceDescription}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-zinc-900 border-zinc-800 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">Customer's Voice (CV)</CardTitle>
                <CardDescription className="text-gray-400">{t.customerVoiceDescription}</CardDescription>
              </CardHeader>

              <div className="px-6 pb-4">
                <div className="w-full bg-blue-900/20 border border-blue-800/30 rounded-md overflow-hidden">
                  <div className="p-3 flex flex-col">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="ml-2">
                        <h3 className="text-sm font-semibold text-blue-400">Korean & English Only</h3>
                        <p className="text-xs text-blue-300 mt-1">
                          Please note that feedback must be submitted in Korean or English only.
                        </p>
                        <p className="text-xs text-blue-300">고객의 소리는 한국어와 영어로만 작성 가능합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{t.feedbackType}</label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder={t.selectCategory} />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="suggestion" className="text-white">
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
                            {t.suggestion}
                          </div>
                        </SelectItem>
                        <SelectItem value="complaint" className="text-white">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                            {t.complaint}
                          </div>
                        </SelectItem>
                        <SelectItem value="praise" className="text-white">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-2 text-green-400" />
                            {t.praise}
                          </div>
                        </SelectItem>
                        <SelectItem value="question" className="text-white">
                          <div className="flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-purple-400" />
                            {t.question}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{t.title}</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">{t.yourFeedback}</label>
                    <Textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                      placeholder={t.enterYourReview}
                      rows={5}
                    />
                    {validationError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {validationError}
                      </motion.p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t.submitting || "제출 중..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t.submitFeedback}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>

          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-bold text-blue-400">{t.recentFeedback}</h2>
              <div className="flex items-center">
                <Input
                  placeholder="피드백 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto bg-zinc-800 border-zinc-700 text-white focus:ring-blue-500 focus:border-blue-500 rounded-r-none"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-zinc-800 border border-zinc-700 p-1 rounded-lg">
                <TabsTrigger
                  value="all"
                  className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  전체
                </TabsTrigger>
                <TabsTrigger
                  value="suggestion"
                  className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  {t.suggestion}
                </TabsTrigger>
                <TabsTrigger
                  value="complaint"
                  className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  {t.complaint}
                </TabsTrigger>
                <TabsTrigger
                  value="praise"
                  className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  {t.praise}
                </TabsTrigger>
                <TabsTrigger
                  value="question"
                  className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <HelpCircle className="h-3.5 w-3.5 mr-1" />
                  {t.question}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <AnimatePresence>
              {filteredFeedbacks.length > 0 ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredFeedbacks.map((feedback, index) => (
                    <motion.div
                      key={feedback.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card key={feedback.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10 border border-zinc-700">
                                <AvatarFallback className="bg-blue-900 text-blue-300">
                                  {feedback.userName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg text-white">{feedback.title}</CardTitle>
                                <div className="flex items-center mt-1">
                                  <span className="text-sm text-gray-400 mr-2">{feedback.userName}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(feedback.createdAt).toLocaleDateString(
                                      language === "ko" ? "ko-KR" : undefined,
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      },
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge className={`flex items-center gap-1 ${getFeedbackTypeColor(feedback.type)}`}>
                              {getFeedbackTypeIcon(feedback.type)}
                              {t[feedback.type as keyof typeof t]}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 whitespace-pre-line">{feedback.content}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 bg-zinc-900 rounded-lg border border-zinc-800"
                >
                  <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300">{t.noFeedbackFound}</h3>
                  <p className="text-gray-400 mt-2">검색어를 변경하거나 다른 카테고리를 선택해보세요.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-zinc-900 border-zinc-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Customer's Voice (CV)</CardTitle>
                <CardDescription className="text-gray-400">{t.customerVoiceDescription}</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <h3 className="text-blue-400 font-medium mb-2 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      피드백 가이드라인
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        구체적이고 건설적인 피드백을 제공해주세요.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        한국어 또는 영어로만 작성해주세요.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        개인정보는 포함하지 마세요.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        모든 피드백은 24-48시간 내에 검토됩니다.
                      </li>
                    </ul>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <h3 className="text-white font-medium mb-3">피드백 유형</h3>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 rounded-lg bg-blue-900/10 border border-blue-900/20">
                        <MessageCircle className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-blue-300">{t.suggestion}</span>
                      </div>
                      <div className="flex items-center p-2 rounded-lg bg-red-900/10 border border-red-900/20">
                        <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-red-300">{t.complaint}</span>
                      </div>
                      <div className="flex items-center p-2 rounded-lg bg-green-900/10 border border-green-900/20">
                        <ThumbsUp className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-green-300">{t.praise}</span>
                      </div>
                      <div className="flex items-center p-2 rounded-lg bg-purple-900/10 border border-purple-900/20">
                        <HelpCircle className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-purple-300">{t.question}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <p>
                    We value your feedback and are committed to continuously improving our services based on your
                    suggestions and concerns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
