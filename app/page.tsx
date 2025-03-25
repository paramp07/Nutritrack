"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlusCircle, Edit2, Trash2, ChevronRight } from "lucide-react"
import { DaySlider } from "../components/DaySlider"
import Link from "next/link"

// Mock data for demonstration
const mockMealsData = {
  "2023-05-15": [
    { id: 1, type: "🍳", name: "Scrambled Eggs", time: "08:30 AM", calories: 300, protein: 20 },
    { id: 2, type: "🥗", name: "Caesar Salad", time: "12:45 PM", calories: 400, protein: 15 },
    { id: 3, type: "🍎", name: "Apple", time: "03:30 PM", calories: 95, protein: 0.5 },
    { id: 4, type: "🍛", name: "Chicken Curry", time: "07:00 PM", calories: 550, protein: 35 },
  ],
  "2023-05-16": [
    { id: 5, type: "🥣", name: "Oatmeal", time: "08:00 AM", calories: 250, protein: 10 },
    { id: 6, type: "🥪", name: "Turkey Sandwich", time: "01:00 PM", calories: 350, protein: 25 },
    { id: 7, type: "🍗", name: "Grilled Chicken", time: "07:30 PM", calories: 450, protein: 40 },
  ],
}

export default function FoodLogPage() {
  const [currentDate, setCurrentDate] = useState(new Date("2023-05-16"))
  const [meals, setMeals] = useState(mockMealsData[formatDateKey(currentDate)] || [])

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieGoal = 2000 // Example goal
  const calorieProgress = (totalCalories / calorieGoal) * 100

  function formatDateKey(date: Date) {
    return date.toISOString().split("T")[0]
  }

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
    setMeals(mockMealsData[formatDateKey(newDate)] || [])
  }

  const deleteMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Food Log</h1>

      <DaySlider currentDate={currentDate} onPreviousDay={() => changeDate(-1)} onNextDay={() => changeDate(1)} />

      {/* Daily Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-2">
            <span>Calories</span>
            <span>
              {totalCalories} / {calorieGoal}
            </span>
          </div>
          <Progress value={calorieProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Meal List */}
      <div className="space-y-4 mb-6">
        {meals.map((meal) => (
          <Card key={meal.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{meal.type}</span>
                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMeal(meal.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span>{meal.calories} cal</span> • <span>{meal.protein}g protein</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Weekly Log Button */}
      <Link href="/food-log/weekly-overview" passHref>
        <Button variant="outline" className="w-full mb-6">
          View Weekly Log
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      {/* Floating Add Meal Button */}
      <Button className="fixed bottom-4 right-4 rounded-full shadow-lg" style={{ backgroundColor: "#4CAF50" }}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Meal
      </Button>
    </div>
  )
}

