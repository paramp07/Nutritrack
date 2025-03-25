import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DaySliderProps {
  currentDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
}

export function DaySlider({ currentDate, onPreviousDay, onNextDay }: DaySliderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm mb-4">
      <Button variant="ghost" size="icon" onClick={onPreviousDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-bold text-lg">{formatDate(currentDate)}</span>
      <Button variant="ghost" size="icon" onClick={onNextDay}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

