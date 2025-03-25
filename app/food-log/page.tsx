'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

interface Meal {
  id: number;
  name: string;
  type: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function FoodLog() {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    type: 'breakfast',
    time: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meals');
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMeal) {
        const response = await fetch(`/api/meals/${editingMeal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMeal),
        });

        if (response.ok) {
          toast.success("Meal updated successfully!");
          router.push('/');
        } else {
          toast.error("Failed to update meal");
        }
      } else {
        const response = await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMeal),
        });

        if (response.ok) {
          toast.success("Meal added successfully!");
          router.push('/');
        } else {
          toast.error("Failed to add meal");
        }
      }
    } catch (error) {
      console.error('Error saving meal:', error);
      toast.error("An error occurred while saving the meal");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Meal deleted successfully!");
        fetchMeals();
      } else {
        toast.error("Failed to delete meal");
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast.error("An error occurred while deleting the meal");
    }
  };

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setNewMeal({
      name: meal.name,
      type: meal.type,
      time: meal.time,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Log</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingMeal ? 'Edit Meal' : 'Add New Meal'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Meal Name</Label>
                <Input
                  id="name"
                  value={newMeal.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMeal({ ...newMeal, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Meal Type</Label>
                <Select
                  value={newMeal.type}
                  onValueChange={(value: string) => setNewMeal({ ...newMeal, type: value })}
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
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMeal.time}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMeal({ ...newMeal, time: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={newMeal.calories}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={newMeal.protein}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMeal({ ...newMeal, protein: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMeal({ ...newMeal, carbs: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fats">Fats (g)</Label>
                <Input
                  id="fats"
                  type="number"
                  value={newMeal.fats}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMeal({ ...newMeal, fats: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingMeal ? 'Update Meal' : 'Add Meal'}
              </Button>
              {editingMeal && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingMeal(null);
                    setNewMeal({
                      name: '',
                      type: 'breakfast',
                      time: '',
                      calories: 0,
                      protein: 0,
                      carbs: 0,
                      fats: 0,
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Today's Meals</h2>
        {meals.map((meal) => (
          <Card key={meal.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{meal.name}</h3>
                  <p className="text-sm text-gray-500">
                    {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)} • {meal.time}
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Calories</p>
                      <p className="text-sm">{meal.calories}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Protein</p>
                      <p className="text-sm">{meal.protein}g</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Carbs</p>
                      <p className="text-sm">{meal.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fats</p>
                      <p className="text-sm">{meal.fats}g</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(meal)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(meal.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 