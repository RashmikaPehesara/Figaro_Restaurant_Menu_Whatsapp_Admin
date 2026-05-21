"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  UtensilsCrossed,
  Layers,
  TicketPercent,
} from "lucide-react";
import Link from "next/link";
import { normalizeArray } from "@/utils/normalizeArray";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState({
    foods: 0,
    categories: 0,
    offers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
      return;
    }

    if (status !== "authenticated") return;

    const fetchStats = async () => {
      try {
        const [foodRes, catRes, offerRes] = await Promise.all([
          fetch("/api/foods", { cache: "no-store" }),
          fetch("/api/categories", { cache: "no-store" }),
          fetch("/api/offers", { cache: "no-store" }),
        ]);

        const foodData = await foodRes.json();
        const catData = await catRes.json();
        const offerData = await offerRes.json();

        setStats({
          foods: normalizeArray(foodData, "foods").length,
          categories: normalizeArray(catData, "categories").length,
          offers: normalizeArray(offerData, "offers").length,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div>
          <div className="h-8 w-56 bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-zinc-800/60 rounded-lg" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-zinc-900 border border-zinc-800 rounded-2xl"
            />
          ))}
        </div>

        <div className="h-48 bg-zinc-900 border border-zinc-800 rounded-2xl" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Foods",
      value: stats.foods,
      icon: UtensilsCrossed,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-500",
    },
    {
      label: "Categories",
      value: stats.categories,
      icon: Layers,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      label: "Active Offers",
      value: stats.offers,
      icon: TicketPercent,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
  ];

  const quickActions = [
    {
      label: "Add New Food",
      href: "/admin/foods",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-500",
      icon: UtensilsCrossed,
    },
    {
      label: "Add Category",
      href: "/admin/categories",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      icon: Layers,
    },
    {
      label: "Create Offer",
      href: "/admin/offers",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      icon: TicketPercent,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-xl ${card.iconBg}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </div>

              <p className="text-zinc-400 text-sm mb-1">
                {card.label}
              </p>

              <p className="text-3xl font-bold text-white">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;

            return (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
              >
                <div className={`p-2 rounded-lg ${action.iconBg}`}>
                  <Icon className={`h-4 w-4 ${action.iconColor}`} />
                </div>

                <span className="text-sm font-medium text-white">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}