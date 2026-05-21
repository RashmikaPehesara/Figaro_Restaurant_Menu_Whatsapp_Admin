import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SETTINGS_CACHE_FILE = path.join(process.cwd(), "settings-cache.json");

function readSettingsFromCache() {
  try {
    if (fs.existsSync(SETTINGS_CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(SETTINGS_CACHE_FILE, "utf-8"));
    }
  } catch {}
  return null;
}

// ── GET — Reads gallery directly from Settings collection ──────────────────
export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne({}).lean();
    if (settings) {
      const rawGallery = Array.isArray(settings.gallery) ? settings.gallery : [];
      // Map elements to standardized objects with id, imageUrl, and createdAt
      const mapped = rawGallery.map((img, idx) => {
        if (typeof img === "string") {
          return { id: img, imageUrl: img, createdAt: new Date().toISOString() };
        }
        return {
          id: img?.id || img?._id || img?.imageUrl || `img-${idx}`,
          imageUrl: img?.imageUrl || img?.image || img?.url || img?.src || "",
          createdAt: img?.createdAt || new Date().toISOString()
        };
      }).filter(img => img.imageUrl);
      
      return NextResponse.json(mapped, {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      });
    }
  } catch (err) {
    console.error("GALLERY GET ERROR:", err);
  }

  // Fallback to cache
  const cached = readSettingsFromCache();
  const gallery = cached?.gallery || [];
  const mapped = gallery.map((img, idx) => {
    if (typeof img === "string") {
      return { id: img, imageUrl: img, createdAt: new Date().toISOString() };
    }
    return {
      id: img?.id || img?._id || img?.imageUrl || `img-${idx}`,
      imageUrl: img?.imageUrl || img?.image || img?.url || img?.src || "",
      createdAt: img?.createdAt || new Date().toISOString()
    };
  }).filter(img => img.imageUrl);

  return NextResponse.json(mapped, {
    headers: { "Cache-Control": "no-store" },
  });
}

// ── POST — Appends new image to Settings collection safely using updateOne ──
export async function POST(req) {
  try {
    const { imageUrl } = await req.json();
    if (!imageUrl) {
      return NextResponse.json({ success: false, error: "Missing imageUrl" }, { status: 400 });
    }

    await connectDB();
    
    // Find current settings
    let settings = await Settings.findOne({}).lean();
    const currentGallery = settings && Array.isArray(settings.gallery) ? settings.gallery : [];
    
    // Prepend new image
    const updatedGallery = [imageUrl, ...currentGallery];

    // Persist directly to DB to bypass any Mongoose change tracking gotchas
    await Settings.updateOne({}, { $set: { gallery: updatedGallery } }, { upsert: true });

    // Fetch the fully updated document to confirm it saved
    const updatedDoc = await Settings.findOne({}).lean();
    console.log("DEBUG: settings.gallery after updateOne:", updatedDoc?.gallery);

    // Update settings-cache.json file
    try {
      const cached = readSettingsFromCache() || {};
      cached.gallery = updatedGallery;
      fs.writeFileSync(SETTINGS_CACHE_FILE, JSON.stringify(cached, null, 2), "utf-8");
    } catch (cacheErr) {
      console.error("Cache update failed:", cacheErr);
    }

    const savedItem = { id: imageUrl, imageUrl, createdAt: new Date().toISOString() };

    return NextResponse.json({ success: true, image: savedItem });
  } catch (error) {
    console.error("GALLERY POST ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
