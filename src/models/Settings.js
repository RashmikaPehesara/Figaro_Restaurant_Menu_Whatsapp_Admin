import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, default: "FIGARO" },
    phoneNumber: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    openingHours: { type: String, default: "" },
    serviceCharge: { type: Number, default: 5 },
    mapEmbedUrl: { type: String, default: "" },
    heroBackgroundImage: { type: String, default: "" },
    socialMedia: { type: mongoose.Schema.Types.Mixed, default: {} },
    features: { type: mongoose.Schema.Types.Mixed, default: {} },
    gallery: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: "settings",
  }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
