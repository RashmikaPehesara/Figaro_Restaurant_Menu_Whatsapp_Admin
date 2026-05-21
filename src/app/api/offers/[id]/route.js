import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Offer from "@/models/Offer";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Offer ID format" }, { status: 400 });
    }

    const data = await req.json();
    
    const updateData = {};
    const allowedFields = ['title', 'description', 'image', 'active', 'startDate', 'endDate'];
    
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    await connectDB();
    
    const result = await Offer.updateOne(
      { _id: new mongoose.Types.ObjectId(id), restaurantId: session.user.restaurantId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Offer updated successfully", 
      offer: { _id: id, ...updateData } 
    });
  } catch (error) {
    console.error("[API ERROR] PUT /api/offers/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Offer ID format" }, { status: 400 });
    }

    await connectDB();

    const result = await Offer.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      restaurantId: session.user.restaurantId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Offer deleted successfully" });
  } catch (error) {
    console.error("[API ERROR] DELETE /api/offers/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
