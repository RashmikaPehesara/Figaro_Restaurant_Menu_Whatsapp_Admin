import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "admins", // Ensure it maps to the exact existing 'admins' collection
  }
);

// Prevent compile-time duplicate registration during HMR hot reloads
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
