"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { clientData as fallbackData } from "@/data/clientData";
import { normalizeArray, normalizeGallery, galleryItemToUrl } from "@/utils/normalizeArray";

const DataContext = createContext(null);

const defaultFeatures = {
  showGallery: true,
  showOffers: true,
  enableWhatsappOrder: true,
  showItemImages: true,
  showSocialMedia: true,
  showMap: true,
  showDescription: true,
  showPopularPicks: true,
};

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("figaro_client_data");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {}
      }
    }
    return { ...fallbackData, features: defaultFeatures };
  });
  const [loading, setLoading] = useState(true);

  const fetchDbData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      // Both fetches bypass all caches to always get the latest data
      const [clientRes, galleryRes] = await Promise.all([
        fetch("/api/client-data", { cache: "no-store" }),
        fetch("/api/gallery", { cache: "no-store" }),
      ]);

      let dbData = {};
      if (clientRes.ok) {
        dbData = await clientRes.json();
      } else {
        console.warn("client-data API returned:", clientRes.status);
      }

      // Normalize gallery images to URL strings
      let galleryImages = [];
      if (galleryRes.ok) {
        const galleryJson = await galleryRes.json();
        const galleryItems = normalizeGallery(galleryJson);
        galleryImages = galleryItems
          .map(galleryItemToUrl)
          .filter((s) => typeof s === "string" && s.startsWith("http"));
      }

      setData(prev => {
        const merged = { ...prev };

        if (dbData.currency) merged.currency = dbData.currency;
        if (dbData.serviceCharge !== undefined) merged.serviceCharge = dbData.serviceCharge;
        if (dbData.heroBackgroundImage !== undefined) merged.heroBackgroundImage = dbData.heroBackgroundImage;

        if (dbData.restaurantInfo) {
          merged.restaurantInfo = { ...prev.restaurantInfo, ...dbData.restaurantInfo };
        }
        if (dbData.features) {
          merged.features = { ...defaultFeatures, ...prev.features, ...dbData.features };
        }
        if (dbData.socialMedia) {
          merged.socialMedia = { ...(prev.socialMedia || {}), ...dbData.socialMedia };
        }

        // Gallery: prefer live gallery API, then client-data gallery field
        const safeGallery =
          galleryImages.length > 0
            ? galleryImages
            : normalizeArray(dbData?.gallery, "gallery");
        if (safeGallery.length > 0) {
          merged.gallery = safeGallery;
        }

        // Offers
        if (dbData?.offers) {
          const safeOffers = normalizeArray(dbData.offers, "offers");
          if (safeOffers.length > 0) merged.offers = safeOffers;
        }

        // Categories
        if (dbData?.categories) {
          const safeCats = normalizeArray(dbData.categories, "categories");
          if (safeCats.length > 0) merged.categories = safeCats;
        }

        // Foods / Items
        const rawItems = dbData?.items || dbData?.foods;
        if (rawItems) {
          const safeItems = normalizeArray(rawItems, "items");
          if (safeItems.length > 0) merged.items = safeItems;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("figaro_client_data", JSON.stringify(merged));
        }
        return merged;
      });
    } catch (error) {
      console.error("DataContext: failed to load dynamic data, using fallback:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchDbData();
  }, [fetchDbData]);

  // Re-fetch silently when user switches back to this browser tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchDbData(true); // silent = true keeps existing data while refreshing
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [fetchDbData]);

  // Also poll every 60 seconds in the background while the tab is open
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchDbData(true);
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [fetchDbData]);

  const value = useMemo(
    () => ({ data, loading, refresh: () => fetchDbData(true) }),
    [data, loading, fetchDbData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context.data;
};

export const useIsDataLoading = () => {
  const context = useContext(DataContext);
  return context?.loading || false;
};

/** Call this after any admin save to instantly push fresh data to the public site context */
export const useRefreshData = () => {
  const context = useContext(DataContext);
  return context?.refresh || (() => {});
};