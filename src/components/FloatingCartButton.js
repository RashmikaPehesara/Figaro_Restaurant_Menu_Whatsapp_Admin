"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function FloatingCartButton() {
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-xl flex items-center justify-center border-4 border-card"
        >
          <div className="relative">
            <ShoppingBag size={28} />
            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center shadow-md">
              {totalItems}
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}





