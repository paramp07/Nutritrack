import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handle GET request
export async function GET() {
  console.log("✅ API /api/meals received a GET request");

  try {
    const meals = await db.meal.findMany();
    return NextResponse.json(meals, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching meals:", error);
    return NextResponse.json({ error: "Error fetching meals" }, { status: 500 });
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

    const { name, type, time, calories, protein, carbs, fats, date } = body;

    if (!name || !type || !time || !calories || !protein || !carbs || !fats || !date) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const meal = await db.meal.create({
      data: {
        name,
        type,
        time: new Date(time).toISOString(),
        calories,
        protein,
        carbs,
        fats,
        day: {
          connectOrCreate: {
            where: { date: new Date(date).toISOString() },
            create: { date: new Date(date).toISOString() },
          },
        },
      },
    });

    console.log("✅ Meal added successfully:", meal);
    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding meal:", error);
    return NextResponse.json({ error: "Error adding meal" }, { status: 500 });
  }
}
