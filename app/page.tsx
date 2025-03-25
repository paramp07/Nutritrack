"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlusCircle, Edit2, Trash2, ChevronRight } from "lucide-react"
import { DaySlider } from "../components/DaySlider"
import Link from "next/link"
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Meal {
  id: number;
  type: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function FoodLogPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    type: '',
    time: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  })

  useEffect(() => {
    fetchMealsForDate(currentDate);
  }, [currentDate]);

  const fetchMealsForDate = async (date: Date) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/meals?date=${date.toISOString()}`);
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieGoal = 2000 // Example goal
  const calorieProgress = (totalCalories / calorieGoal) * 100

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
  }

  const deleteMeal = async (id: number) => {
    // Optimistically update the UI
    setMeals(meals.filter(meal => meal.id !== id));

    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
      });

      // If the delete fails, revert the optimistic update
      if (!response.ok) {
        fetchMealsForDate(currentDate);
        console.error('Failed to delete meal');
      }
    } catch (error) {
      // If there's an error, revert the optimistic update
      fetchMealsForDate(currentDate);
      console.error('Error deleting meal:', error);
    }
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getMealTypeEmoji = (type: string) => {
    switch (type.toLowerCase()) {
      case 'breakfast':
        return '🍳';
      case 'lunch':
        return '🥗';
      case 'dinner':
        return '🍽️';
      case 'snack':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  const handleEditClick = (meal: Meal) => {
    setEditingMeal(meal);
    setEditForm({
      name: meal.name,
      type: meal.type,
      time: formatTime(meal.time),
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMeal) return;

    try {
      const response = await fetch(`/api/meals/${editingMeal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        fetchMealsForDate(currentDate);
        setEditingMeal(null);
      }
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

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
        {isLoading ? (
          <div className="text-center py-4">Loading meals...</div>
        ) : meals.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No meals recorded for this day</div>
        ) : (
          meals.map((meal) => (
            <Card key={meal.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getMealTypeEmoji(meal.type)}</span>
                    <div>
                      <h3 className="font-semibold">{meal.name}</h3>
                      <p className="text-sm text-gray-500">{formatTime(meal.time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(meal)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Meal</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-name">Meal Name</Label>
                              <Input
                                id="edit-name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-type">Meal Type</Label>
                              <Select
                                value={editForm.type}
                                onValueChange={(value) => setEditForm({ ...editForm, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="breakfast">Breakfast</SelectItem>
                                  <SelectItem value="lunch">Lunch</SelectItem>
                                  <SelectItem value="dinner">Dinner</SelectItem>
                                  <SelectItem value="snack">Snack</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-time">Time</Label>
                              <Input
                                id="edit-time"
                                type="time"
                                value={editForm.time}
                                onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-calories">Calories</Label>
                              <Input
                                id="edit-calories"
                                type="number"
                                value={editForm.calories}
                                onChange={(e) => setEditForm({ ...editForm, calories: parseInt(e.target.value) })}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="edit-protein">Protein (g)</Label>
                              <Input
                                id="edit-protein"
                                type="number"
                                value={editForm.protein}
                                onChange={(e) => setEditForm({ ...editForm, protein: parseFloat(e.target.value) })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-carbs">Carbs (g)</Label>
                              <Input
                                id="edit-carbs"
                                type="number"
                                value={editForm.carbs}
                                onChange={(e) => setEditForm({ ...editForm, carbs: parseFloat(e.target.value) })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-fats">Fats (g)</Label>
                              <Input
                                id="edit-fats"
                                type="number"
                                value={editForm.fats}
                                onChange={(e) => setEditForm({ ...editForm, fats: parseFloat(e.target.value) })}
                                required
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button type="submit">Update Meal</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
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
          ))
        )}
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
        <Link href="/food-log" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Meal
        </Link>
      </Button>
    </div>
  )
}

