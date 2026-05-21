import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Offer from "@/models/Offer";
import { clientData } from "@/data/clientData";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const offers = await Offer.find({ restaurantId: session.user.restaurantId })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, offers });
  } catch (error) {
    console.error("OFFERS API ERROR:", error);
    return NextResponse.json({ 
      success: true, 
      offers: clientData.offers || []
    });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { title, description, image, active, startDate, endDate } = data;

    if (!title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    
    const newOffer = await Offer.create({
      title,
      description: description || "",
      image: image || "",
      active: active !== undefined ? !!active : true,
      startDate: startDate || null,
      endDate: endDate || null,
      restaurantId: session.user.restaurantId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, offer: newOffer });
  } catch (error) {
    console.error("OFFERS API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
