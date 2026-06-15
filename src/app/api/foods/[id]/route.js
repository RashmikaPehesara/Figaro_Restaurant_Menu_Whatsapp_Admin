import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Food from "@/models/Food";
import ImageHash from "@/models/ImageHash";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

async function cleanupImage(imageUrl, imagePublicId, currentFoodId, restaurantId) {
  if (!imageUrl) return;

  // Check if another food item uses this same image URL
  const count = await Food.countDocuments({
    image: imageUrl,
    _id: { $ne: currentFoodId },
    restaurantId: restaurantId,
  });

  if (count > 0) {
    console.log(`[CLEANUP] Image ${imageUrl} is still in use by ${count} other food item(s). Skipping Cloudinary deletion.`);
    return;
  }

  // Identify the public ID. Fallback to ImageHash if not present in the food record.
  let publicId = imagePublicId;
  if (!publicId) {
    const imgHashRec = await ImageHash.findOne({ url: imageUrl });
    if (imgHashRec) {
      publicId = imgHashRec.publicId;
    }
  }

  // If a public ID is identified, destroy it from Cloudinary and clean up its hash record.
  if (publicId) {
    try {
      console.log(`[CLEANUP] Deleting unused image from Cloudinary (publicId: ${publicId})...`);
      const destroyResult = await cloudinary.uploader.destroy(publicId);
      console.log(`[CLEANUP] Cloudinary destroy result:`, destroyResult);

      const deleteHashResult = await ImageHash.deleteMany({ publicId });
      console.log(`[CLEANUP] ImageHash deletion result:`, deleteHashResult);
    } catch (err) {
      console.error(`[CLEANUP] Error deleting image ${publicId} from Cloudinary:`, err);
    }
  } else {
    console.log(`[CLEANUP] No public ID found for URL: ${imageUrl}. Skipping Cloudinary deletion.`);
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const data = await req.json();

    await connectDB();

    const existingFood = await Food.findOne({
      _id: new mongoose.Types.ObjectId(id),
      restaurantId: session.user.restaurantId,
    });

    if (!existingFood) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    const updateData = {};
    const allowedFields = ['name', 'description', 'image', 'categoryId', 'featured', 'pricing'];

    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });

    // Check if the image changed
    const newImage = data.image;
    let finalImagePublicId = data.imagePublicId;

    if (newImage !== undefined && newImage !== existingFood.image) {
      // Clean up old image if no longer in use
      await cleanupImage(existingFood.image, existingFood.imagePublicId, existingFood._id, session.user.restaurantId);

      // If the client didn't supply imagePublicId, try to lookup
      if (newImage && !finalImagePublicId) {
        const imgHashRec = await ImageHash.findOne({ url: newImage });
        if (imgHashRec) {
          finalImagePublicId = imgHashRec.publicId;
        }
      }
      updateData.imagePublicId = finalImagePublicId || "";
    } else if (newImage !== undefined && newImage === existingFood.image && !existingFood.imagePublicId) {
      // Legacy data fallback: populate imagePublicId if it was empty
      if (!finalImagePublicId) {
        const imgHashRec = await ImageHash.findOne({ url: newImage });
        if (imgHashRec) {
          finalImagePublicId = imgHashRec.publicId;
        }
      }
      if (finalImagePublicId) {
        updateData.imagePublicId = finalImagePublicId;
      }
    } else if (data.imagePublicId !== undefined) {
      updateData.imagePublicId = data.imagePublicId;
    }

    const result = await Food.updateOne(
      { _id: existingFood._id },
      { $set: updateData }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Food updated successfully", 
      food: { _id: id, ...existingFood.toObject(), ...updateData } 
    });
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

    const existingFood = await Food.findOne({
      _id: new mongoose.Types.ObjectId(id),
      restaurantId: session.user.restaurantId,
    });

    if (!existingFood) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    // Clean up old image from Cloudinary if it is not referenced by other foods
    await cleanupImage(existingFood.image, existingFood.imagePublicId, existingFood._id, session.user.restaurantId);

    const result = await Food.deleteOne({
      _id: existingFood._id,
    });

    return NextResponse.json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("[API ERROR] DELETE /api/foods/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
