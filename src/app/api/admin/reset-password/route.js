import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { token, password, confirmPassword } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Password reset token is missing." },
        { status: 400 }
      );
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    await connectDB();

    // Hash the incoming token to match the database stored value
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Query for user matching the hashed token only
    const admin = await Admin.findOne({ resetToken: hashedToken });

    const now = new Date();
    const tokenMatch = !!admin;
    const expiryValid = admin ? admin.resetTokenExpiry && new Date(admin.resetTokenExpiry) > now : false;

    if (!admin) {
      return NextResponse.json(
        { error: "Password reset token is invalid or has expired." },
        { status: 400 }
      );
    }

    if (!expiryValid) {
      return NextResponse.json(
        { error: "Password reset token is invalid or has expired." },
        { status: 400 }
      );
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update credentials and clear reset token
    admin.password = hashedPassword;
    admin.resetToken = null;
    admin.resetTokenExpiry = null;
    await admin.save();

    console.log("Admin password reset successfully.");

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Reset password API handler error:", error);
    return NextResponse.json(
      { error: "An error occurred while resetting password. Please try again." },
      { status: 500 }
    );
  }
}
