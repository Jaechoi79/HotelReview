"use client"

import { useEffect, useRef } from "react"
import type { Hotel, Language } from "@/types/hotel"
import { translations } from "@/lib/translations"
import { useTheme } from "next-themes"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface HotelDetailChartProps {
  hotel: Hotel
  language: Language
}

export function HotelDetailChart({ hotel, language }: HotelDetailChartProps) {
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

    const isDarkMode = theme === "dark"
    const textColor = isDarkMode ? "#e5e7eb" : "#374151"
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    const labels = [
      t.staffComplaint,
      t.staffSpeed,
      t.managerComplaint,
      t.managerSpeed,
      t.facility,
      t.cleanliness,
      t.experience,
    ]

    const data = [
      hotel.scores.staffComplaint,
      hotel.scores.staffSpeed,
      hotel.scores.managerComplaint,
      hotel.scores.managerSpeed,
      hotel.scores.facility,
      hotel.scores.cleanliness,
      hotel.scores.experience,
    ]

    chartInstance.current = new Chart(chartRef.current, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: hotel.name,
            data,
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgb(99, 102, 241)",
            pointBackgroundColor: "rgb(99, 102, 241)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(99, 102, 241)",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
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
          },
        },
        scales: {
          r: {
            angleLines: {
              color: gridColor,
            },
            grid: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 11,
              },
            },
            ticks: {
              color: textColor,
              backdropColor: isDarkMode ? "#1f2937" : "#ffffff",
              font: {
                size: 10,
              },
              showLabelBackdrop: false,
            },
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [hotel, language, theme, t])

  return <canvas ref={chartRef} />
}
