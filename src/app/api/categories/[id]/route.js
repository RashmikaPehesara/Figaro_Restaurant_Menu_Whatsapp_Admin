import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const data = await req.json();
    const { name, image, order } = data;

    await connectDB();
    
    const updateData = {};
    if (name) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (order !== undefined) updateData.order = order;

    const result = await Category.updateOne(
      { _id: new mongoose.Types.ObjectId(id), restaurantId: session.user.restaurantId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    await connectDB();

    const result = await Category.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      restaurantId: session.user.restaurantId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
