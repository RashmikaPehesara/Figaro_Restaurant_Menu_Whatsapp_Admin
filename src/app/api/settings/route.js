import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const CACHE_FILE = path.join(process.cwd(), "settings-cache.json");

const defaultSettings = {
  restaurantName: "FIGARO",
  phoneNumber: "",
  whatsappNumber: "",
  address: "",
  openingHours: "",
  serviceCharge: 5,
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9113693245455!2d79.8776!3d6.9244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMjtwOCJOIDc5wrA1MiczOS40IkU!5e0!3m2!1sen!2slk!4v1700000000000",
  socialMedia: {
    facebook: "",
    instagram: "",
    tiktok: "",
    facebookEnabled: true,
    instagramEnabled: true,
    tiktokEnabled: true,
  },
  features: {
    showGallery: true,
    showOffers: true,
    enableWhatsappOrder: true,
    showItemImages: true,
    showSocialMedia: true,
    showMap: true,
    showDescription: true,
    showPopularPicks: true,
    showWaiterMode: false,
  },
  gallery: []
};

function writeToCache(settings) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (error) {
    console.error("FAILED TO WRITE SETTINGS CACHE FILE:", error);
  }
}

function readFromCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    }
  } catch (error) {
    console.error("FAILED TO READ SETTINGS CACHE FILE:", error);
  }
  return null;
}

export async function GET(req) {
  let settings = null;

  try {
    await connectDB();
    settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create(defaultSettings);
    }
  } catch (mongoError) {
    console.error("SETTINGS GET MONGO ERROR:", mongoError);
  }

  if (!settings) {
    settings = readFromCache();
  }

  if (!settings) {
    settings = defaultSettings;
  }

  settings = settings.toObject ? settings.toObject() : settings;
  settings.features = { ...defaultSettings.features, ...(settings.features || {}) };
  settings.socialMedia = { ...defaultSettings.socialMedia, ...(settings.socialMedia || {}) };

  const getSafeVal = (val, fallback) => (val === undefined || val === null) ? fallback : val;
  settings.restaurantName = getSafeVal(settings.restaurantName, defaultSettings.restaurantName);
  settings.phoneNumber = getSafeVal(settings.phoneNumber, defaultSettings.phoneNumber);
  settings.whatsappNumber = getSafeVal(settings.whatsappNumber, defaultSettings.whatsappNumber);
  settings.address = getSafeVal(settings.address, defaultSettings.address);
  settings.openingHours = getSafeVal(settings.openingHours, defaultSettings.openingHours);
  settings.serviceCharge = getSafeVal(settings.serviceCharge, defaultSettings.serviceCharge);
  settings.heroBackgroundImage = getSafeVal(settings.heroBackgroundImage, "");
  settings.gallery = settings.gallery || [];

  writeToCache(settings);

  return NextResponse.json({ success: true, settings });
}

export async function PUT(req) {
  try {
    const body = await req.json();
    let existingGallery = [];
    try {
      await connectDB();
      const existingSettings = await Settings.findOne({}).lean();
      if (existingSettings && Array.isArray(existingSettings.gallery)) {
        existingGallery = existingSettings.gallery;
      }
    } catch (dbErr) {
      console.error("PUT SETTINGS DB READ ERROR:", dbErr);
    }

    const updateDoc = {
      restaurantName: body.restaurantName || "",
      phoneNumber: body.phoneNumber || "",
      whatsappNumber: body.whatsappNumber || "",
      address: body.address || "",
      openingHours: body.openingHours || "",
      heroBackgroundImage: body.heroBackgroundImage || "",
      serviceCharge: Number(body.serviceCharge) >= 0 ? Number(body.serviceCharge) : 0,
      mapEmbedUrl: body.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9113693245455!2d79.8776!3d6.9244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMjtwOCJOIDc5wrA1MiczOS40IkU!5e0!3m2!1sen!2slk!4v1700000000000",
      socialMedia: {
        facebook: body.socialMedia?.facebook || "",
        instagram: body.socialMedia?.instagram || "",
        tiktok: body.socialMedia?.tiktok || "",
        facebookEnabled: body.socialMedia?.facebookEnabled ?? true,
        instagramEnabled: body.socialMedia?.instagramEnabled ?? true,
        tiktokEnabled: body.socialMedia?.tiktokEnabled ?? true,
      },
      features: {
        showGallery: body.features?.showGallery ?? true,
        showOffers: body.features?.showOffers ?? true,
        enableWhatsappOrder: body.features?.enableWhatsappOrder ?? true,
        showItemImages: body.features?.showItemImages ?? true,
        showSocialMedia: body.features?.showSocialMedia ?? true,
        showMap: body.features?.showMap ?? true,
        showDescription: body.features?.showDescription ?? true,
        showPopularPicks: body.features?.showPopularPicks ?? true,
        showWaiterMode: body.features?.showWaiterMode ?? false,
      },
      gallery: Array.isArray(body.gallery) ? body.gallery : existingGallery
    };

    writeToCache(updateDoc);

    let updatedSettings = updateDoc;

    try {
      await connectDB();
      const result = await Settings.findOneAndUpdate(
        {},
        { $set: updateDoc },
        { new: true, upsert: true }
      );
      if (result) {
        updatedSettings = result.toObject ? result.toObject() : result;
      }
    } catch (mongoError) {
      console.error("MONGO DB SETTINGS UPDATE FAILED:", mongoError);
    }

    return NextResponse.json({ 
      success: true, 
      settings: updatedSettings 
    });
  } catch (error) {
    console.error("SETTINGS SAVE ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
