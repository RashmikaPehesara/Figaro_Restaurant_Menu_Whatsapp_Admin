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
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "admins", // Ensure it maps to the exact existing 'admins' collection
  }
);

// Prevent compile-time duplicate registration during HMR hot reloads
if (mongoose.models.Admin && !mongoose.models.Admin.schema.paths.resetToken) {
  delete mongoose.models.Admin;
}
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
