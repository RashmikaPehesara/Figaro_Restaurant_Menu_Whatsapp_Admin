import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

// Disable Next.js body parsing — we handle raw multipart ourselves
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // Parse multipart/form-data
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPG, PNG, WEBP are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Convert File/Blob to Buffer → base64 data URI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "restaurant-menu",
      resource_type: "image",
      // Optimization: auto quality and format
      quality: "auto",
      fetch_format: "auto",
    });

    if (!result?.secure_url) {
      throw new Error("Cloudinary did not return a secure URL");
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      imageUrl: result.secure_url, // alias for gallery page compatibility
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("UPLOAD API ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
