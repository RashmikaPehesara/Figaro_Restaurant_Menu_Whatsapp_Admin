import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    active: { type: Boolean, default: true },
    startDate: { type: String, default: null },
    endDate: { type: String, default: null },
    restaurantId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "offers",
  }
);

export default mongoose.models.Offer || mongoose.model("Offer", OfferSchema);
