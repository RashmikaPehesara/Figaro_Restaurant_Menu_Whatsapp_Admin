import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
    id: { type: String, required: true },
    restaurantId: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
