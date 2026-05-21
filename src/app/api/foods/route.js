import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Food from "@/models/Food";
import { NextResponse } from "next/server";
import { clientData } from "@/data/clientData";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    await connectDB();
    
    const query = { restaurantId: session.user.restaurantId };
    if (categoryId) {
      query.categoryId = categoryId;
    }

    const foods = await Food.find(query)
      .select("_id name description categoryId image featured pricing createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, foods });
  } catch (error) {
    console.error("FOODS API ERROR:", error);
    return NextResponse.json({ 
      success: true, 
      foods: clientData.items || []
    });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { 
      name, 
      description, 
      image, 
      categoryId, 
      featured, 
      pricing 
    } = data;

    if (!name || !categoryId || !pricing) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    
    const newFood = await Food.create({
      name,
      description: description || "",
      image: image || "",
      categoryId,
      featured: !!featured,
      pricing,
      restaurantId: session.user.restaurantId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, food: newFood });
  } catch (error) {
    console.error("FOODS API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
