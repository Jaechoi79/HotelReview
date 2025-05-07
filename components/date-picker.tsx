"use client"

import type * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label: string
  className?: string
}

export function DatePicker({ date, setDate, label, className }: DatePickerProps) {
  // 날짜를 문자열로 변환하는 함수
  const formatDateToString = (date: Date | undefined): string => {
    if (!date) return ""
    return format(date, "yyyy-MM-dd")
  }

  // 문자열을 날짜로 변환하는 함수
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) {
      setDate(undefined)
      return
    }

    try {
      const newDate = new Date(value)
      if (!isNaN(newDate.getTime())) {
        setDate(newDate)
      }
    } catch (error) {
      console.error("Invalid date format", error)
    }
  }

  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={`date-${label}`} className="text-sm font-medium text-gray-300 flex items-center">
        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-amber-400" />
        {label}
      </Label>
      <div className="relative">
        <Input
          type="date"
          id={`date-${label}`}
          value={formatDateToString(date)}
          onChange={handleDateChange}
          className="bg-zinc-800 border-zinc-700 text-white date-input-white pl-3"
        />
      </div>
    </div>
  )
}
