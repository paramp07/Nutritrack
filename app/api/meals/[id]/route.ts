import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { name, type, time, calories, protein, carbs, fats } = body;

    // Convert time string to ISO date string
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const updatedMeal = await db.meal.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        type,
        time: date.toISOString(),
        calories,
        protein,
        carbs,
        fats,
      },
    });

    return NextResponse.json(updatedMeal);
  } catch (error) {
    console.error('Error updating meal:', error);
    return NextResponse.json({ error: 'Failed to update meal' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await db.meal.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal:', error);
    return NextResponse.json({ error: 'Failed to delete meal' }, { status: 500 });
  }
} 