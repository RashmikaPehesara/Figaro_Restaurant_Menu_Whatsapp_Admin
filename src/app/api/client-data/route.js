import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Food from "@/models/Food";
import Offer from "@/models/Offer";
import Settings from "@/models/Settings";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";
import { clientData as fallback } from "@/data/clientData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESTAURANT_ID = process.env.DEFAULT_RESTAURANT_ID || "figaro_main";

export async function GET() {
  try {
    await connectDB();

    // Fetch everything in parallel — no auth needed for public data
    const [categories, foods, offers, settings, galleryDocs] = await Promise.all([
      Category.find({ restaurantId: RESTAURANT_ID }).sort({ order: 1, createdAt: -1 }).lean(),
      Food.find({ restaurantId: RESTAURANT_ID }).sort({ createdAt: -1 }).lean(),
      Offer.find({ restaurantId: RESTAURANT_ID, active: { $ne: false } }).sort({ createdAt: -1 }).lean(),
      Settings.findOne({}).lean(),
      Gallery.find({ restaurantId: RESTAURANT_ID }).sort({ createdAt: -1 }).lean(),
    ]);

    const s = settings || {};

    // Normalize categories — map _id to id for frontend compatibility
    const safeCategories = categories.map(c => ({
      ...c,
      id: c.id || c._id?.toString(),
      _id: c._id?.toString(),
    }));

    // Normalize foods — map _id to id
    const safeFoods = foods.map(f => ({
      ...f,
      id: f._id?.toString(),
      _id: f._id?.toString(),
    }));

    // Normalize offers — map _id to id
    const safeOffers = offers.map(o => ({
      ...o,
      id: o._id?.toString(),
      _id: o._id?.toString(),
    }));

    // Normalize gallery to array of URLs for homepage
    const settingsGallery = Array.isArray(s.gallery) ? s.gallery : [];
    const dbGallery = galleryDocs.map(g => g.imageUrl || g.image || g.url || "").filter(Boolean);
    
    const combinedGallery = settingsGallery.length > 0 ? settingsGallery : dbGallery;
    const gallery = combinedGallery.map(img => 
      typeof img === "string" ? img : (img?.imageUrl || img?.image || img?.url || img?.src || "")
    ).filter(Boolean);

    const socialMedia = { ...fallback.socialMedia, ...(s.socialMedia || {}) };
    const features = { ...{ showGallery: true, showOffers: true, enableWhatsappOrder: true, showItemImages: true, showSocialMedia: true, showMap: true, showDescription: true, showPopularPicks: true }, ...(s.features || {}) };

    const responseData = {
      restaurantInfo: {
        name: s.restaurantName || fallback.restaurantInfo?.name || "FIGARO",
        tagline: s.tagline || fallback.restaurantInfo?.tagline || "",
        logo: s.logo || fallback.restaurantInfo?.logo || "",
        phone: s.phoneNumber || fallback.restaurantInfo?.phone || "",
        whatsapp: s.whatsappNumber || fallback.restaurantInfo?.whatsapp || "",
        address: s.address || fallback.restaurantInfo?.address || "",
        openingHours: s.openingHours || fallback.restaurantInfo?.openingHours || "",
        mapEmbedUrl: s.mapEmbedUrl || fallback.restaurantInfo?.mapEmbedUrl || "",
      },
      heroBackgroundImage: s.heroBackgroundImage || "",
      features,
      socialMedia,
      currency: fallback.currency || "LKR",
      serviceCharge: s.serviceCharge ?? 5,
      categories: safeCategories.length > 0 ? safeCategories : fallback.categories || [],
      items: safeFoods.length > 0 ? safeFoods : fallback.items || [],
      offers: safeOffers.length > 0 ? safeOffers : fallback.offers || [],
      gallery: gallery.length > 0 ? gallery : fallback.gallery || [],
    };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });
  } catch (error) {
    console.error("CLIENT-DATA API ERROR:", error);
    // Return fallback data so public site still renders
    return NextResponse.json(fallback, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
