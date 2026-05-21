"use client";

import { useData } from "@/context/DataContext";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function MenuPage() {
  const data = useData();
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-10">
        <Link href="/" className="mr-5 p-3 bg-muted hover:bg-border rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Menu</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link href={`/menu/${cat.id}`} key={cat.id} className="group">
            <div className="relative h-56 rounded-3xl overflow-hidden border border-border shadow-lg">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-wide mb-1">{cat.name}</h2>
                  <p className="text-primary font-medium text-sm">View Items →</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
