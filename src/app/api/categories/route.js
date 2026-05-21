import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { clientData } from "@/data/clientData";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const categories = await Category.find({ restaurantId: session.user.restaurantId })
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("CATEGORIES API ERROR:", error);
    return NextResponse.json({ 
      success: true, 
      categories: clientData.categories || []
    });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { name, image, id } = data;

    if (!name || !id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    
    const newCategory = await Category.create({
      name,
      image: image || "",
      id: id.toLowerCase().replace(/\s+/g, "-"),
      restaurantId: session.user.restaurantId,
      order: 0,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error("CATEGORIES API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
