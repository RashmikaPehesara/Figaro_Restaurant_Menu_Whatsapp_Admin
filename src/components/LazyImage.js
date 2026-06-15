"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Custom loader to apply Cloudinary auto-optimization and responsive width transformations.
export const cloudinaryLoader = ({ src, width, quality }) => {
  if (!src || typeof src !== "string") return src;
  if (!src.includes("res.cloudinary.com")) return src;

  // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/v<version>/<public_id>
  // We want to add f_auto,q_auto,w_<width> to the transformations.
  const qualityParam = quality ? `q_${quality}` : "q_auto";
  const transform = `f_auto,${qualityParam},w_${width}`;

  return src.replace("/image/upload/", `/image/upload/${transform}/`);
};

export default function LazyImage({ src, alt, fill, className, sizes, priority = false }) {
  const [isInView, setIsInView] = useState(priority);
  const ref = useRef(null);

  useEffect(() => {
    if (priority) return;
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Preload 200px before entering viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const isCloudinary = src && typeof src === "string" && src.includes("res.cloudinary.com");

  return (
    <div ref={ref} className="w-full h-full relative min-h-[inherit]">
      {isInView ? (
        <Image
          loader={isCloudinary ? cloudinaryLoader : undefined}
          src={src}
          alt={alt}
          fill={fill}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes={sizes}
          className={className}
        />
      ) : (
        <div className="w-full h-full bg-muted/20 animate-pulse rounded-[inherit]" />
      )}
    </div>
  );
}
