import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const SETTINGS_CACHE_FILE = path.join(process.cwd(), "settings-cache.json");

function readSettingsFromCache() {
  try {
    if (fs.existsSync(SETTINGS_CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(SETTINGS_CACHE_FILE, "utf-8"));
    }
  } catch {}
  return null;
}

// ── DELETE — Removes image directly from Settings collection's gallery array ──
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID/URL parameter" }, { status: 400 });
    }

    const decodedId = decodeURIComponent(id);

    await connectDB();
    
    // Find current settings
    const settings = await Settings.findOne({}).lean();
    if (settings) {
      const currentGallery = Array.isArray(settings.gallery) ? settings.gallery : [];
      const updatedGallery = currentGallery.filter((img) => {
        const imgSrc = img?.imageUrl || img?.image || img?.url || img?.src || (typeof img === "string" ? img : "");
        const imgId = img?.id || img?._id || imgSrc;
        return imgId !== decodedId && imgSrc !== decodedId;
      });

      // Update directly via updateOne to bypass Mongoose tracking gotchas
      await Settings.updateOne({}, { $set: { gallery: updatedGallery } });

      // Update settings-cache.json file
      try {
        const cached = readSettingsFromCache() || {};
        cached.gallery = updatedGallery;
        fs.writeFileSync(SETTINGS_CACHE_FILE, JSON.stringify(cached, null, 2), "utf-8");
      } catch (cacheErr) {
        console.error("Cache update failed:", cacheErr);
      }

      return NextResponse.json({ success: true, message: "Photo deleted successfully" });
    }

    return NextResponse.json({ success: false, error: "Settings document not found" }, { status: 404 });
  } catch (error) {
    console.error("GALLERY DELETE ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
