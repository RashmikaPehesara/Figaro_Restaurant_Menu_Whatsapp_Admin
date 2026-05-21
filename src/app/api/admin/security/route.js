import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const admin = await Admin.findById(new mongoose.Types.ObjectId(session.user.id));

    if (!admin) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      email: admin.email,
      verified: true,
    });
  } catch (error) {
    console.error("GET /api/admin/security error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = await req.json();
    
    await connectDB();
    
    const currentAdminId = new mongoose.Types.ObjectId(session.user.id);
    const updateData = {};

    if (email !== undefined) {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        return NextResponse.json({ error: "Login email cannot be empty" }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return NextResponse.json({ error: "Invalid login email format" }, { status: 400 });
      }

      const existingAdmin = await Admin.findOne({ 
        email: trimmedEmail.toLowerCase(), 
        _id: { $ne: currentAdminId } 
      });

      if (existingAdmin) {
        return NextResponse.json({ error: "This login email is already registered to another account" }, { status: 400 });
      }

      updateData.email = trimmedEmail.toLowerCase();
    }



    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
    }

    const result = await Admin.updateOne(
      { _id: currentAdminId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Security credentials updated successfully.",
      email: updateData.email || undefined
    });
  } catch (error) {
    console.error("PUT /api/admin/security error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
