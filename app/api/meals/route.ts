import { NextResponse } from "next/server";
import { db } from '@/lib/db';

// Handle GET request
export async function GET(req: Request) {
  console.log("✅ API /api/meals received a GET request");

  try {
    // Get the date from the URL parameters
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get('date');
    
    // Use the provided date or default to today
    const targetDate = dateParam ? new Date(dateParam) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const day = await db.day.upsert({
      where: { date: targetDate },
      update: {},
      create: { date: targetDate },
    });

    const meals = await db.meal.findMany({
      where: { dayId: day.id },
      orderBy: { time: 'asc' },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error("❌ Error fetching meals:", error);
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 });
  }
}

// Handle POST request
export async function POST(req: Request) {
  console.log("✅ API /api/meals received a POST request");

  try {
    // Ensure the request has a JSON body
    if (!req.body) {
      console.error("❌ No request body received");
      return NextResponse.json({ error: "Invalid request: No body" }, { status: 400 });
    }

    const body = await req.json();
    console.log("📝 Received Data:", body);

    const { name, type, time, calories, protein, carbs, fats } = body;

    if (!name || !type || !time || !calories || !protein || !carbs || !fats) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = await db.day.upsert({
      where: { date: today },
      update: {},
      create: { date: today },
    });

    // Create a full ISO date string for the time
    const [hours, minutes] = time.split(':');
    const mealTime = new Date(today);
    mealTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const meal = await db.meal.create({
      data: {
        name,
        type,
        time: mealTime.toISOString(),
        calories,
        protein,
        carbs,
        fats,
        dayId: day.id,
      },
    });

    console.log("✅ Meal added successfully:", meal);
    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding meal:", error);
    return NextResponse.json({ error: "Error adding meal" }, { status: 500 });
  }
}
