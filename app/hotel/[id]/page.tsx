"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Hotel, Star, Edit, Trash2, AlertTriangle, MapPin, Calendar, Users, Coffee } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Hotel as HotelType, Language } from "@/types/hotel"
import { HotelDetailChart } from "@/components/hotel-detail-chart"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { LanguageSelector } from "@/components/language-selector"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HotelDetail() {
  const router = useRouter()
  const params = useParams()
  const [language, setLanguage] = useState<Language>("ko")
  const [hotels, setHotels] = useLocalStorage<HotelType[]>("hotels", [])
  const [hotel, setHotel] = useState<HotelType | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const t = translations[language]
  const hotelId = params.id as string

  // Dummy images for gallery
  const galleryImages = [
    hotel?.imageUrl || "",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  ]

  useEffect(() => {
    const foundHotel = hotels.find((h) => h.id === hotelId)
    if (foundHotel) {
      setHotel(foundHotel)
    } else {
      router.push("/")
    }
  }, [hotelId, hotels, router])

  const handleDelete = () => {
    const updatedHotels = hotels.filter((h) => h.id !== hotelId)
    setHotels(updatedHotels)
    router.push("/")
  }

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="bg-primary/10 p-6 rounded-full mx-auto mb-4">
            <Hotel className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-xl font-medium">{t.loadingHotelDetails}</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-0 rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToList}
          </Button>
          <LanguageSelector language={language} setLanguage={setLanguage} compact />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border/40">
              <div className="relative">
                <div className="h-80 relative overflow-hidden">
                  <img
                    src={galleryImages[selectedImage] || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1">{hotel.name}</h1>
                      <div className="flex items-center text-white/90">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hotel.name.split(" ").pop()}, Korea</span>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.floor(hotel.finalRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < hotel.finalRating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-white font-medium">{hotel.finalRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex gap-2 overflow-x-auto">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Gallery ${index}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 flex-wrap">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">
                      <Users className="h-3.5 w-3.5 mr-1" /> 2-4 {t.guests}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" /> {t.availableNow}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">
                      <Coffee className="h-3.5 w-3.5 mr-1" /> {t.breakfast}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/edit-hotel/${hotel.id}`)}
                      className="rounded-full"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      {t.edit}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteDialogOpen(true)}
                      className="rounded-full"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t.delete}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4 bg-background border border-border/40 p-1 rounded-full">
                    <TabsTrigger
                      value="overview"
                      className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {t.overview}
                    </TabsTrigger>
                    <TabsTrigger
                      value="ratings"
                      className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {t.detailedRatings}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div>
                      <h3 className="text-lg font-medium mb-3">{t.review}</h3>
                      <p className="text-muted-foreground">{hotel.review}</p>

                      <Separator className="my-6" />

                      <h3 className="text-lg font-medium mb-4">{t.amenities}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                              <line x1="6" y1="1" x2="6" y2="4"></line>
                              <line x1="10" y1="1" x2="10" y2="4"></line>
                              <line x1="14" y1="1" x2="14" y2="4"></line>
                            </svg>
                          </div>
                          <span>{t.freeWifi}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M3 18h18"></path>
                              <path d="M3 12h18"></path>
                              <path d="M3 6h18"></path>
                            </svg>
                          </div>
                          <span>{t.airConditioning}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                          <span>{t.gym}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M2 12h20"></path>
                              <path d="M7 12v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5"></path>
                              <path d="M22 12v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-5"></path>
                              <path d="M17 12v5a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-5"></path>
                              <path d="M12 7V4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v3"></path>
                              <path d="M7.5 7V4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v3"></path>
                              <path d="M17 7V4a2 2 0 0 0-2-2h-.5a2 2 0 0 0-2 2v3"></path>
                            </svg>
                          </div>
                          <span>{t.swimmingPool}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                          </div>
                          <span>{t.roomService}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </div>
                          <span>{t.parking}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ratings">
                    <div className="h-[350px]">
                      <HotelDetailChart hotel={hotel} language={language} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-border/40 sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{t.scoreBreakdown}</CardTitle>
                <CardDescription>{t.individualScores}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScoreItem label={t.staffComplaint} value={hotel.scores.staffComplaint} weight={15} />
                <ScoreItem label={t.staffSpeed} value={hotel.scores.staffSpeed} weight={10} />
                <ScoreItem label={t.managerComplaint} value={hotel.scores.managerComplaint} weight={10} />
                <ScoreItem label={t.managerSpeed} value={hotel.scores.managerSpeed} weight={5} />
                <ScoreItem label={t.facility} value={hotel.scores.facility} weight={30} />
                <ScoreItem label={t.cleanliness} value={hotel.scores.cleanliness} weight={20} />
                <ScoreItem label={t.experience} value={hotel.scores.experience} weight={10} />
              </CardContent>
              <CardFooter className="flex flex-col items-start border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">{t.weightedCalculation}</p>
                <div className="flex justify-between w-full items-center">
                  <span className="font-medium">{t.finalRating}:</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{hotel.finalRating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(hotel.finalRating)
                              ? "text-yellow-500 fill-yellow-500"
                              : i < hotel.finalRating
                                ? "text-yellow-500 fill-yellow-500 opacity-50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="border-border/40">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                  {t.confirmDelete}
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t.deleteHotelConfirmation.replace("{hotelName}", hotel.name)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">{t.cancel}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground rounded-full"
              >
                {t.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

function ScoreItem({ label, value, weight }: { label: string; value: number; weight: number }) {
  const [language] = useState<Language>("ko")
  const t = translations[language]

  // Calculate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "bg-green-500"
    if (score >= 7) return "bg-blue-500"
    if (score >= 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}/10</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${getScoreColor(value)} rounded-full`} style={{ width: `${value * 10}%` }} />
      </div>
      <div className="text-xs text-muted-foreground text-right">
        {weight}% {t.weight}
      </div>
    </div>
  )
}
