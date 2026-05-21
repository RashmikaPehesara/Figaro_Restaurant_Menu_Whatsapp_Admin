/**
 * Normalize any API response into a plain array.
 * Handles: [], { key: [] }, { data: [] }, { items: [] }, null, undefined
 */
export function normalizeArray(data, key = null) {
  if (Array.isArray(data)) return data;
  if (!data) return [];

  if (key && Array.isArray(data[key])) return data[key];
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.items)) return data.items;

  return [];
}

/**
 * Normalize any gallery API response into an array of gallery objects.
 * Handles: [], { images: [] }, { gallery: [] }, { data: [] }
 * Each item is expected to have imageUrl / image / url / src field.
 */
export function normalizeGallery(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  const arr =
    data.images ??
    data.gallery ??
    data.data ??
    data.items ??
    [];

  return Array.isArray(arr) ? arr : [];
}

/**
 * Extract a URL string from a gallery item.
 * Accepts string URLs directly, or objects with imageUrl/image/url/src.
 */
export function galleryItemToUrl(item) {
  if (!item) return "";
  if (typeof item === "string") return item;
  return item.imageUrl || item.image || item.url || item.src || "";
}
