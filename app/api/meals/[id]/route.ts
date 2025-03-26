import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    // Extract the id from the URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];

    const data = await request.json();
    const { name, type, time, calories, protein, carbs, fats } = data;

    // Create a Date object from the time string
    const [hours, minutes] = time.split(':');
    const mealTime = new Date();
    mealTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    const updatedMeal = await db.meal.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        time: mealTime.toISOString(),
        calories,
        protein,
        carbs,
        fats,
      },
    });

    return NextResponse.json(updatedMeal);
  } catch (error) {
    console.error('Error updating meal:', error);
    return NextResponse.json(
      { error: 'Failed to update meal' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Extract the id from the URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];

    await db.meal.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal:', error);
    return NextResponse.json(
      { error: 'Failed to delete meal' },
      { status: 500 }
    );
  }
} 