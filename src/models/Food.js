import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    categoryId: { type: String, required: true },
    featured: { type: Boolean, default: false },
    pricing: { type: mongoose.Schema.Types.Mixed, required: true },
    restaurantId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "foods",
  }
);

export default mongoose.models.Food || mongoose.model("Food", FoodSchema);
