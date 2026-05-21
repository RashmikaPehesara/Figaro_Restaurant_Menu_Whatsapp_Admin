import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    restaurantId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "gallery",
  }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
