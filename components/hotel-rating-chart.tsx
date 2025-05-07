"use client"

import { useEffect, useRef } from "react"
import type { Hotel, Language } from "@/types/hotel"
import { translations } from "@/lib/translations"
import { useTheme } from "next-themes"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface HotelRatingChartProps {
  hotels: Hotel[]
  language: Language
}

export function HotelRatingChart({ hotels, language }: HotelRatingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { theme } = useTheme()
  const t = translations[language]

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Sort hotels by rating
    const sortedHotels = [...hotels].sort((a, b) => b.finalRating - a.finalRating)
    const topHotels = sortedHotels.slice(0, 10) // Show top 10 hotels

    const isDarkMode = theme === "dark"
    const textColor = isDarkMode ? "#e5e7eb" : "#374151"
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: topHotels.map((hotel) => hotel.name),
        datasets: [
          {
            label: t.rating,
            data: topHotels.map((hotel) => hotel.finalRating),
            backgroundColor: topHotels.map((hotel) => {
              // Color based on rating
              if (hotel.finalRating >= 4.5) return "rgba(34, 197, 94, 0.7)"
              if (hotel.finalRating >= 3.5) return "rgba(59, 130, 246, 0.7)"
              if (hotel.finalRating >= 2.5) return "rgba(250, 204, 21, 0.7)"
              return "rgba(239, 68, 68, 0.7)"
            }),
            borderColor: topHotels.map((hotel) => {
              if (hotel.finalRating >= 4.5) return "rgb(34, 197, 94)"
              if (hotel.finalRating >= 3.5) return "rgb(59, 130, 246)"
              if (hotel.finalRating >= 2.5) return "rgb(250, 204, 21)"
              return "rgb(239, 68, 68)"
            }),
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
            titleColor: isDarkMode ? "#fff" : "#000",
            bodyColor: isDarkMode ? "#e5e7eb" : "#374151",
            borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              afterLabel: (context) => {
                const hotelIndex = context.dataIndex
                const hotel = topHotels[hotelIndex]
                return [
                  `${t.staffComplaint}: ${hotel.scores.staffComplaint}/10`,
                  `${t.facility}: ${hotel.scores.facility}/10`,
                  `${t.cleanliness}: ${hotel.scores.cleanliness}/10`,
                ]
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              color: textColor,
              padding: 8,
              font: {
                size: 11,
              },
            },
            grid: {
              color: gridColor,
              drawBorder: false,
            },
            border: {
              display: false,
            },
            title: {
              display: true,
              text: t.starRating,
              color: textColor,
              font: {
                size: 13,
                weight: "bold",
              },
              padding: { top: 0, bottom: 10 },
            },
          },
          x: {
            ticks: {
              color: textColor,
              maxRotation: 45,
              minRotation: 45,
              padding: 8,
              font: {
                size: 11,
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
        animation: {
          duration: 2000,
          easing: "easeOutQuart",
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [hotels, language, theme, t])

  return <canvas ref={chartRef} />
}
