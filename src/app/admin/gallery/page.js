"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Trash2,
  Loader2,
  Image as ImageIcon,
  Upload,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Deletion state
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // ── Fetch gallery directly from /api/gallery (sourced from settings.gallery) ─
  const fetchImages = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (!res.ok) throw new Error(`Gallery API error: ${res.status}`);

      const data = await res.json();
      console.log("DEBUG: raw gallery API response data", data);

      const galleryImages = Array.isArray(data) ? data : [];
      console.log("DEBUG: fetched gallery array", galleryImages);
      console.log("DEBUG: render gallery array length", galleryImages.length);

      setGallery(galleryImages);
    } catch (err) {
      console.error("Gallery fetchImages error:", err);
      if (!silent) toast.error("Failed to load gallery images");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // ── Upload new image directly to /api/gallery (saves to settings.gallery) ───
  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      toast.error("Please select valid image files (PNG, JPG, WEBP)");
      return;
    }

    setIsUploading(true);
    let successCount = 0;
    const newImages = [];

    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        setUploadProgress(`Uploading ${i + 1} of ${imageFiles.length}...`);

        // 1. Upload to Cloudinary via /api/upload
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        const uploadedUrl = uploadData?.url || uploadData?.imageUrl;

        console.log("DEBUG: uploaded image URL", uploadedUrl);

        if (!uploadRes.ok || !uploadedUrl) {
          toast.error(`Failed to upload ${file.name}: ${uploadData?.error || "Unknown error"}`);
          continue;
        }

        // 2. Save URL to Settings via /api/gallery
        console.log("DEBUG: gallery state before save", gallery);
        const saveRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: uploadedUrl }),
        });

        const saveData = await saveRes.json();
        console.log("DEBUG: gallery state after save response", saveData);

        if (saveRes.ok && saveData.success) {
          successCount++;
          const savedImage = saveData.image || {
            id: uploadedUrl,
            imageUrl: uploadedUrl,
            createdAt: new Date().toISOString(),
          };
          newImages.push(savedImage);
        } else {
          console.error("Gallery save error:", saveData);
          toast.error(`Failed to save ${file.name} to settings: ${saveData?.error || "Unknown error"}`);
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} photo(s)!`);
        setGallery((prev) => [...newImages, ...prev]);
        fetchImages(true);
      }
    } catch (error) {
      console.error("Gallery upload error:", error);
      toast.error("An error occurred during file upload");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => uploadFiles(e.target.files);

  // ── Drag & drop ─────────────────────────────────────────────────────────────
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) uploadFiles(e.dataTransfer.files);
  };

  // ── Delete image directly from /api/gallery (removes from settings.gallery) ─
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/gallery/${encodeURIComponent(deleteTargetId)}`, {
        method: "DELETE",
      });
      const saveData = await res.json();

      if (res.ok && saveData.success) {
        toast.success("Photo deleted successfully");
        setGallery((prev) => prev.filter((img) => (img.id || img._id || img.imageUrl) !== deleteTargetId));
      } else {
        toast.error(saveData.error || "Failed to delete photo");
      }
    } catch (error) {
      console.error("Gallery delete error:", error);
      toast.error("An error occurred while deleting the photo");
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
      fetchImages(true);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full min-w-0 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
            Gallery Management
          </h1>
          <p className="text-zinc-400">
            Manage your restaurant moments gallery photos showcased on the homepage.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`w-full min-h-[220px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 cursor-pointer transition-all gap-4 select-none relative overflow-hidden group
          ${dragActive
            ? "border-orange-500 bg-orange-500/5 shadow-inner shadow-orange-500/10"
            : "border-zinc-800 bg-zinc-900/40 hover:border-orange-500/50 hover:bg-orange-500/5"}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">Uploading photos to storage &amp; database...</p>
              <p className="text-xs text-zinc-500 mt-1 font-mono">{uploadProgress}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl group-hover:bg-orange-500/10 group-hover:border-orange-500/20 group-hover:text-orange-500 transition-all text-zinc-500">
              <Upload size={28} />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-white tracking-wide">
                Drag &amp; Drop or Click to Upload Photos
              </p>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed max-w-sm">
                Supports PNG, JPG, or WEBP formats up to 5MB. You can select multiple images at once!
              </p>
            </div>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          disabled={isUploading}
          accept="image/jpeg,image/jpg,image/png,image/webp"
        />
      </div>

      {/* Gallery Grid Header */}
      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Gallery Grid{" "}
          <span className="text-xs font-mono font-normal text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-lg">
            {gallery.length} Photos
          </span>
        </h2>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-2xl border border-zinc-800 bg-zinc-900/50"
            />
          ))}
        </div>
      ) : gallery.length === 0 ? (
        <div className="w-full bg-zinc-900/30 border border-zinc-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in duration-300">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-600">
            <ImageIcon size={36} />
          </div>
          <div className="max-w-xs">
            <p className="text-white font-bold">No gallery photos yet</p>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              Upload your high quality dining moments and dishes above to showcase on your menu landing page.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-in fade-in duration-300">
          {gallery.map((image, idx) => {
            const imgSrc = image?.imageUrl || image?.image || image?.url || image?.src || (typeof image === "string" ? image : "");
            const imgId = image?.id || image?._id || imgSrc || `img-${idx}`;
            if (!imgSrc) return null;
            return (
              <div
                key={imgId}
                className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group shadow-md hover:border-orange-500/30 transition-all duration-300"
              >
                <img
                  src={imgSrc}
                  alt="Gallery photo"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Date tag if available */}
                {image?.createdAt && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded-lg text-[10px] font-medium text-zinc-300 backdrop-blur-sm flex items-center gap-1 shadow-sm border border-zinc-700/50 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Calendar size={10} className="text-orange-500" />
                    {formatDate(image.createdAt)}
                  </div>
                )}

                {/* Delete Button (absolute top-right) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTargetId(imgId);
                  }}
                  className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-all shadow-lg active:scale-95 border border-red-600/20"
                  title="Delete photo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Gallery Photo?"
        message="Are you sure you want to permanently delete this photo from your restaurant gallery?"
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
