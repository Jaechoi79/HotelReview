"use client"

import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Star, Search } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="relative py-20 px-6 overflow-hidden rounded-xl mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 opacity-90" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/luxury-hotel-lobby-chandelier.png')",
          mixBlendMode: "overlay",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Star className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.discoverBestHotels}</h1>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{t.heroDescription}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => router.push("/reviews")}>
            <Search className="mr-2 h-4 w-4" />
            {t.exploreReviews}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/20"
            onClick={() => router.push("/reviews/new")}
          >
            {t.writeReview}
          </Button>
        </div>
      </div>
    </div>
  )
}
