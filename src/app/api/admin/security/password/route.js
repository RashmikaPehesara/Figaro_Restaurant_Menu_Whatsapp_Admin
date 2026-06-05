import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmNewPassword } = await req.json();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json({ error: "All password fields are required" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long" }, { status: 400 });
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({ error: "Confirm password does not match new password" }, { status: 400 });
    }

    await connectDB();

    const admin = await Admin.findById(new mongoose.Types.ObjectId(session.user.id));

    if (!admin) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await Admin.updateOne(
      { _id: new mongoose.Types.ObjectId(session.user.id) },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json({
      success: true,
      message: "Password updated successfully."
    });
  } catch (error) {
    console.error("POST /api/admin/security/password error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
