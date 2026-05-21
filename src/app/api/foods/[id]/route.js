import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Food from "@/models/Food";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const data = await req.json();
    
    const updateData = {};
    const allowedFields = ['name', 'description', 'image', 'categoryId', 'featured', 'pricing'];
    
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    await connectDB();
    
    const result = await Food.updateOne(
      { _id: new mongoose.Types.ObjectId(id), restaurantId: session.user.restaurantId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Food updated successfully", food: { _id: id, ...updateData } });
  } catch (error) {
    console.error("[API ERROR] PUT /api/foods/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    await connectDB();

    const result = await Food.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      restaurantId: session.user.restaurantId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("[API ERROR] DELETE /api/foods/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
