"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ImageUpload({ value, onChange, label = "Upload Image" }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so the same file can be re-selected if needed
    e.target.value = "";

    // Validate type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WEBP image");
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && (data.url || data.imageUrl)) {
        const uploadedUrl = data.url || data.imageUrl;
        onChange(uploadedUrl);
        toast.success("Image uploaded successfully!");
      } else {
        console.error("Upload API error:", data);
        toast.error(data.error || "Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("ImageUpload fetch error:", error);
      toast.error("Network error during upload. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">{label}</label>

      {/* Preview when image exists */}
      {value && !isUploading ? (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-800">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all"
          >
            <X size={16} />
          </button>
          {/* Replace button overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 left-2 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-all flex items-center gap-1.5"
          >
            <Upload size={12} />
            Replace
          </button>
        </div>
      ) : (
        /* Upload drop zone */
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`w-full h-48 border-2 border-dashed border-zinc-800 hover:border-orange-500/50 hover:bg-orange-500/5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group ${
            isUploading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <p className="text-sm text-zinc-500 font-medium">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="p-3 bg-zinc-800 rounded-2xl group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-all text-zinc-500">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-300">Click to upload image</p>
                <p className="text-xs text-zinc-500 mt-1">PNG, JPG or WEBP (Max. 5MB)</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        disabled={isUploading}
      />
    </div>
  );
}
