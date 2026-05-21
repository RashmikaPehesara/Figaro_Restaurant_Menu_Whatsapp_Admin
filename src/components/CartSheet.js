"use client";

import { useCart } from "@/context/CartContext";
import { useData } from "@/context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function CartSheet() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const clientData = useData();
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const [tableNumber, setTableNumber] = useState("");
  const [showTablePrompt, setShowTablePrompt] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  if (isAdmin) return null;

  const serviceChargePercent = Number(clientData.restaurantInfo?.serviceCharge) || 0;
  const serviceChargeAmount = (subtotal * serviceChargePercent) / 100;
  const total = subtotal + serviceChargeAmount;

  const handleCheckout = () => {
    if (clientData.features?.enableWhatsappOrder) {
      setShowTablePrompt(true);
    } else {
      setShowOrderSummary(true);
    }
  };

  const submitWhatsappOrder = () => {
    if (!tableNumber) {
      alert("Please enter a table number");
      return;
    }

    const d = new Date();
    const timeString = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let message = `*New Order - Table ${tableNumber}*\n`;
    message += `Time: ${timeString}\n\n`;

    cartItems.forEach(item => {
      const sizeStr = item.size ? ` (${item.size.name})` : "";
      message += `- ${item.name}${sizeStr} x${item.quantity}\n`;
    });

    message += `\nSubtotal: ${clientData.currency} ${Number(subtotal).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
    if (serviceChargeAmount > 0) {
      message += `Service Charge (${serviceChargePercent}%): ${clientData.currency} ${Number(serviceChargeAmount).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
    }
    message += `*Total: ${clientData.currency} ${Number(total).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}*\n`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${clientData.restaurantInfo.whatsapp.replace(/\+/g, "")}?text=${encoded}`;
    
    window.open(waUrl, "_blank");
    setShowTablePrompt(false);
    // Option to clear cart here: clearCart()
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 transition-opacity"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-card border-l border-border shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">
                Your Order
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-muted hover:bg-border rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingBagEmptyIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size?.name || "single"}`} className="flex gap-4 items-center bg-background p-3 rounded-2xl border border-border">
                    {clientData.features?.showItemImages && item.image && (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill quality={70} sizes="64px" className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate pr-2">{item.name}</h4>
                      {item.size && (
                        <p className="text-xs text-muted-foreground">{item.size.name}</p>
                      )}
                      <div className="text-primary font-semibold text-lg tracking-wide font-[Rubik] tabular-nums mt-1">
                        {clientData.currency} {Number(item.size?.price || item.pricing.price).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <button 
                        onClick={() => removeFromCart(item.id, item.size?.name)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size?.name, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md bg-background text-foreground shadow-sm"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size?.name, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md bg-background text-foreground shadow-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-border bg-card">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-muted-foreground mb-4 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold tracking-wide font-[Rubik] tabular-nums">{clientData.currency} {Number(subtotal).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  {serviceChargeAmount > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground/80 my-2">
                      <span>Service Charge ({serviceChargePercent}%)</span>
                      <span className="font-semibold tracking-wide font-[Rubik] tabular-nums">{clientData.currency} {Number(serviceChargeAmount).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-xl md:text-2xl mt-4 pt-4 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-primary font-semibold text-lg md:text-xl tracking-wide font-[Rubik] tabular-nums">{clientData.currency} {Number(total).toLocaleString("en-LK", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                </div>

                {!showTablePrompt ? (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-orange-600 text-primary-foreground font-bold py-4 rounded-2xl flex justify-center items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  >
                    {clientData.features?.enableWhatsappOrder ? (
                      <>
                        <MessageCircle size={20} />
                        Checkout via WhatsApp
                      </>
                    ) : (
                      "Call Waiter to Place Order"
                    )}
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 bg-background p-4 rounded-2xl border border-border"
                  >
                    <label className="text-sm font-medium text-muted-foreground block text-center">
                      Enter your Table Number to continue
                    </label>
                    <div className="flex justify-center gap-4 py-2">
                       {/* Custom Number Picker */}
                       <button onClick={() => setTableNumber(prev => Math.max(1, (parseInt(prev) || 1) - 1))} className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-border active:scale-95 transition-all text-xl">
                          <Minus />
                       </button>
                       <input 
                         type="number" 
                         value={tableNumber} 
                         onChange={(e) => setTableNumber(e.target.value)}
                         className="w-20 h-12 bg-muted rounded-xl text-center text-xl font-bold border-none outline-none focus:ring-2 focus:ring-primary"
                         placeholder="10"
                       />
                       <button onClick={() => setTableNumber(prev => (parseInt(prev) || 0) + 1)} className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-border active:scale-95 transition-all text-xl">
                          <Plus />
                       </button>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowTablePrompt(false)}
                        className="flex-1 py-3 bg-muted rounded-xl text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={submitWhatsappOrder}
                        className="flex-1 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-sm font-medium flex justify-center items-center gap-2 shadow-lg shadow-[#25D366]/20"
                      >
                        <MessageCircle size={16} />
                        Send Order
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}

      {showOrderSummary && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#111] rounded-2xl shadow-2xl border border-white/10 p-5 text-white">
            
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold tracking-wide text-orange-500">
                {clientData.restaurantInfo.name}
              </h2>
              <div className="text-xs text-white/50">Order Summary</div>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-white/10 mb-4"></div>

            {/* Items */}
            <div className="space-y-3 text-sm max-h-[40vh] overflow-y-auto pr-2 font-[Rubik] tabular-nums tracking-wide">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size?.name || "single"}`}>
                  <div className="flex items-start gap-3">
                    
                    {/* Bullet */}
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-orange-500 flex-shrink-0"></div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        
                        {/* Name */}
                        <span className="font-medium text-white leading-tight">
                          {item.name}
                          {item.size?.name && (
                            <span className="text-white/50 text-xs ml-1">
                              ({item.size.name})
                            </span>
                          )}
                        </span>

                        {/* Quantity */}
                        <span className="text-white/70 text-xs ml-3 whitespace-nowrap mt-0.5">
                          {item.quantity} pcs
                        </span>

                      </div>
                    </div>

                  </div>
                  
                  {/* Subtle divider */}
                  {index < cartItems.length - 1 && (
                    <div className="border-b border-white/5 my-3 ml-5"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-white/10 my-4"></div>

            {/* Total */}
            <div className="flex justify-between text-base font-bold text-orange-500">
              <span>Total</span>
              <span className="font-[Rubik] tabular-nums">Rs. {total.toFixed(2)}</span>
            </div>

            {/* Close */}
            <button
              onClick={() => setShowOrderSummary(false)}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-full text-sm font-semibold transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagEmptyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
