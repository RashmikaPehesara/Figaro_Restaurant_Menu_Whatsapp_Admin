"use client";

import { clientData } from "@/data/clientData";
import { useData } from "@/context/DataContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LazyImage, { cloudinaryLoader } from "@/components/LazyImage";
import { PhoneCall, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState } from "react";
import { GalleryModal } from "@/components/GalleryModal";

const getNormalMapUrl = (embedUrl, address) => {
  if (!embedUrl) return `https://www.google.com/maps?q=${encodeURIComponent(address || "")}`;
  
  const match = embedUrl.match(/!2d([^!]+)!3d([^!]+)/);
  if (match) {
    const lng = match[1];
    const lat = match[2];
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
  
  const matchInverse = embedUrl.match(/!3d([^!]+)!2d([^!]+)/);
  if (matchInverse) {
    const lat = matchInverse[1];
    const lng = matchInverse[2];
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  if (address) {
    return `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  }

  return "https://www.google.com/maps";
};

export default function HomePage() {
  const data = useData();
  const { restaurantInfo, features, offers, gallery, socialMedia: social = clientData.socialMedia, items, heroBackgroundImage } = data;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [initialGalleryIndex, setInitialGalleryIndex] = useState(0);

  const socialMedia = social || {};

  const showFacebook =
    socialMedia.facebook &&
    socialMedia.facebookEnabled !== false;

  const showInstagram =
    socialMedia.instagram &&
    socialMedia.instagramEnabled !== false;

  const showTikTok =
    socialMedia.tiktok &&
    socialMedia.tiktokEnabled !== false;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const nameContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const nameLetterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  const openGallery = (index) => {
    setInitialGalleryIndex(index);
    setGalleryOpen(true);
  };

  const chefRecommendations = items?.filter(item => item.featured) || [];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            loader={heroBackgroundImage && heroBackgroundImage.includes("res.cloudinary.com") ? cloudinaryLoader : undefined}
            src={heroBackgroundImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"}
            alt="Hero Background"
            fill
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center items-center w-full">
            {restaurantInfo.logo ? (
              <Image
                loader={restaurantInfo.logo && restaurantInfo.logo.includes("res.cloudinary.com") ? cloudinaryLoader : undefined}
                src={restaurantInfo.logo}
                alt="Logo"
                width={190}
                height={190}
                className="object-contain"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-yellow-500 shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center border-2 border-primary/50 text-white font-black text-5xl">
                {restaurantInfo.name.charAt(0)}
              </div>
            )}
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="w-full text-center text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white leading-tight break-words"
          >
            {restaurantInfo.name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}  // Name letters transition speed (increase number for more slow)
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-10 font-medium">
            {restaurantInfo.tagline}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <Link 
              href="/menu" 
              style={{ fontFamily: "var(--font-outfit)" }}
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-extrabold px-10 py-5 rounded-full text-xl shadow-lg"
            >
              View Menu
            </Link>

            {/* Social Media Links */}
            {features.showSocialMedia && (showFacebook || showInstagram || showTikTok) && (
              <div className="flex items-center justify-center gap-4 mt-8">
                {showFacebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-all"
                  >
                    <FaFacebook size={22} />
                  </a>
                )}

                {showInstagram && (
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-all"
                  >
                    <FaInstagram size={22} />
                  </a>
                )}

                {showTikTok && (
                  <a
                    href={socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-all"
                  >
                    <FaTiktok size={20} />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Offers Section */}
      {features.showOffers && offers.length > 0 && (
        <section className="py-16 container px-4 flex-none">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-4xl font-extrabold pb-2 tracking-tight">Special Offers</h2>
            <div className="w-16 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offers.map(offer => (
              <motion.div 
                key={offer.id}
                whileHover={{ y: -5 }}
                className="relative h-48 rounded-3xl overflow-hidden border border-border group"
              >
                <LazyImage src={offer.image} alt={offer.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-primary mb-2 shadow-sm drop-shadow-md">{offer.title}</h3>
                  <p className="text-muted-foreground font-medium drop-shadow-md max-w-[70%]">{offer.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Picks Section */}
      {features.showPopularPicks && chefRecommendations.length > 0 && (
          <section className="py-16 container px-4 overflow-hidden flex-none">
            <div className="flex flex-col items-center mb-10 text-center">
              <h2 className="text-4xl font-extrabold pb-2 tracking-tight">Popular Picks</h2>
              <div className="w-16 h-1 bg-white/20 rounded-full" />
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 scroll-smooth">
              {chefRecommendations.map((item) => (
                <div key={item.id} className="min-w-[260px] max-w-[260px] flex-shrink-0">
                  <Link href={`/menu/${item.categoryId}`} className="block w-full">
                  <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg group hover:border-primary/50 transition-colors">
                    <div className="relative h-48 bg-muted">
                      <LazyImage src={item.image} alt={item.name} fill sizes="280px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                      {features.showDescription && item.description && (
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{item.description}</p>
                      )}
                      <p className="text-primary font-semibold text-lg tracking-wide font-sans tabular-nums whitespace-nowrap">{clientData.currency} {Number(item.pricing.type === "single" ? item.pricing.price : item.pricing.options[0].price).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
      )}

      {/* Auto-scrolling Gallery */}
      {features.showGallery && gallery.length > 0 && (
        <section className="py-16 bg-card/30 border-y border-border/50 flex-none overflow-hidden">
          <div className="container px-4">
             <div className="flex flex-col items-center mb-10 text-center">
              <h2 className="text-3xl font-extrabold pb-2 tracking-tight">Moments at Our Place</h2>
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
            
            <div className="flex w-[200%] md:w-[150%] animate-marquee">
              <motion.div 
                className="flex gap-4 px-4 w-full justify-around"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              >
                {[...gallery, ...gallery].map((src, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openGallery(idx % gallery.length)}
                    className="relative w-64 h-40 md:w-72 md:h-44 rounded-2xl overflow-hidden shrink-0 shadow-lg cursor-pointer group"
                  >
                    <LazyImage src={src} alt="Ambience" fill sizes="288px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-semibold transition-opacity bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View Full</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Contact & Map Section */}
      <section className="py-20 container px-4 flex-none">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-4xl font-extrabold pb-2 tracking-tight">Find Us Here</h2>
          <div className="w-20 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="bg-card rounded-[2rem] p-6 lg:p-10 border border-border shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex flex-col justify-center">
              <ul className="space-y-8">
                <li className="flex items-start gap-5">
                  <div className="p-4 rounded-full bg-primary/10 text-primary shrink-0 box-content">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-xl mb-1">Our Location</p>
                    <p className="text-muted-foreground text-lg leading-relaxed">{restaurantInfo.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="p-4 rounded-full bg-primary/10 text-primary shrink-0 box-content">
                    <Clock size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-xl mb-1">Opening Hours</p>
                    <p className="text-muted-foreground text-lg leading-relaxed">{restaurantInfo.openingHours}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a 
                  href={`tel:${restaurantInfo.phone}`}
                  className="flex-1 flex items-center justify-center gap-3 bg-muted hover:bg-border transition-colors font-bold py-5 rounded-2xl active:scale-95 text-lg"
                >
                  <PhoneCall size={22} className="text-primary" />
                  Call Us
                </a>
                {restaurantInfo.whatsapp && (
                  <a 
                    href={`https://wa.me/${restaurantInfo.whatsapp.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors font-bold py-5 rounded-2xl active:scale-95 text-lg"
                  >
                    <MessageCircle size={22} />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>

            {features.showMap && restaurantInfo.mapEmbedUrl && (
              <div className="flex flex-col gap-6 items-center w-full">
                <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-border shadow-inner">
                  <div className="relative w-full h-full">
                    <iframe
                      src={restaurantInfo.mapEmbedUrl}
                      className="w-full h-full border-0 rounded-2xl"
                      loading="lazy"
                      title="Google Maps Location"
                    />
                     <button
                      onClick={() => {
                        const mapUrl = getNormalMapUrl(restaurantInfo.mapEmbedUrl, restaurantInfo.address);
                        window.open(mapUrl, "_blank");
                      }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-[0_10px_30px_rgba(249,115,22,0.45)] hover:scale-105 transition-all cursor-pointer"
                    >
                      Open in Maps
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-8 text-center mt-auto flex flex-col items-center gap-2 mb-3">
        <p className="font-medium text-sm text-muted-foreground/80">© {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.</p>
        <div className="text-xs text-muted-foreground/50">
          Developed by{" "}
          <a 
            href="https://wa.me/94768638725" 
            target="_blank" 
            rel="noreferrer"
            className="text-white/60 hover:text-white transition-colors hover:underline"
          >
            Pixora Studio
          </a>
        </div>
      </footer>

      {/* Fullscreen Gallery Modal */}
      <GalleryModal 
        images={gallery} 
        isOpen={galleryOpen} 
        initialIndex={initialGalleryIndex} 
        onClose={() => setGalleryOpen(false)} 
      />
    </main>
  );
}
