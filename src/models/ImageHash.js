import mongoose from "mongoose";

const ImageHashSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "image_hashes",
  }
);

export default mongoose.models.ImageHash || mongoose.model("ImageHash", ImageHashSchema);
