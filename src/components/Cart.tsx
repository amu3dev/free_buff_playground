"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Coffee,
  Gift,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

const quickPairings = [
  { id: "pasty-1", name: "Butter Croissant", price: 3.5, emoji: "🥐" },
  { id: "pasty-3", name: "Cinnamon Roll", price: 4.0, emoji: "🍥" },
  { id: "pasty-4", name: "Almond Biscotti", price: 2.5, emoji: "🍪" },
];

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    itemCount,
    appliedReward,
    removeReward,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [customerName, setCustomerName] = useState("");
  const [pickupStore, setPickupStore] = useState("store-1");
  const [orderNumber, setOrderNumber] = useState("");

  const handleStartCheckout = () => {
    setCheckoutStep("checkout");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep("success");
    clearCart();
  };

  const handleClose = () => {
    closeCart();
    setTimeout(() => {
      setCheckoutStep("cart");
    }, 300);
  };

  // Milestone calculation for in-cart gamification
  const nextMilestoneTarget = 15;
  const amountToNextReward = Math.max(0, nextMilestoneTarget - total);
  const milestoneProgress = Math.min(100, (total / nextMilestoneTarget) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 z-50 flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                  <ShoppingBag className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-base font-serif font-bold text-zinc-900 dark:text-white">
                    {checkoutStep === "success"
                      ? "Order Confirmed"
                      : checkoutStep === "checkout"
                      ? "Quick Checkout"
                      : "Your Order"}
                  </h2>
                  {checkoutStep === "cart" && (
                    <p className="text-[11px] font-mono text-zinc-400">
                      {itemCount} {itemCount === 1 ? "item" : "items"} selected
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* In-Cart Reward Progress Bar */}
            {checkoutStep === "cart" && items.length > 0 && (
              <div className="bg-amber-50/70 dark:bg-amber-950/30 px-5 py-2.5 border-b border-amber-200/50 dark:border-amber-900/40">
                <div className="flex items-center justify-between text-[11px] font-medium text-amber-900 dark:text-amber-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-500" />
                    {amountToNextReward > 0 ? (
                      <>
                        Add <strong>${amountToNextReward.toFixed(2)}</strong> for a Free Espresso!
                      </>
                    ) : (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        🎉 You unlocked a Free Reward!
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[10px] opacity-75">{Math.round(milestoneProgress)}%</span>
                </div>
                <div className="h-1.5 bg-amber-200/60 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${milestoneProgress}%` }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Content Area */}
            {checkoutStep === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-3">
                        <Coffee className="w-7 h-7 text-zinc-400" />
                      </div>
                      <p className="text-zinc-900 dark:text-white text-base font-serif font-bold">
                        Your cart is empty
                      </p>
                      <p className="text-zinc-500 text-xs mt-1 max-w-xs leading-relaxed">
                        Handcrafted coffees and fresh bakery items are waiting for you.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-5 px-5 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs shadow-sm hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        Explore Menu
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items List */}
                      <div className="space-y-2.5">
                        {items.map((item) => (
                          <motion.div
                            key={`${item.id}-${item.customizations || ""}`}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3.5 border border-zinc-200/80 dark:border-zinc-800"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-serif font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                                  {item.name}
                                </h3>
                                {item.customizations && (
                                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    {item.customizations}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
                              <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800 p-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-serif font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </motion.div>
                        ))}

                        {/* Applied Loyalty Reward */}
                        {appliedReward && (
                          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/60">
                            <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-300 font-medium">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>{appliedReward.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                                -${appliedReward.discount.toFixed(2)}
                              </span>
                              <button
                                onClick={removeReward}
                                className="text-zinc-400 hover:text-red-500 cursor-pointer"
                                title="Remove reward"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 1-Click Pastry Cross-Sell Carousel */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500">
                            Pair with Fresh Bakery
                          </span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                            Baked Daily
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {quickPairings.map((snack) => (
                            <button
                              key={snack.id}
                              onClick={() =>
                                addItem({
                                  id: snack.id,
                                  name: snack.name,
                                  price: snack.price,
                                })
                              }
                              className="flex flex-col items-center text-center p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 hover:border-amber-500/50 hover:bg-white dark:hover:bg-zinc-800 transition-all cursor-pointer group"
                            >
                              <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
                                {snack.emoji}
                              </span>
                              <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate w-full">
                                {snack.name}
                              </span>
                              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                                +${snack.price.toFixed(2)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Cart Summary Bottom Bar */}
                {items.length > 0 && (
                  <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-zinc-500">
                        <span>Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>
                      {appliedReward && (
                        <div className="flex justify-between text-amber-600 dark:text-amber-400 font-medium">
                          <span>Reward Discount</span>
                          <span className="font-mono">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-baseline text-sm font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        <span className="font-serif">Total Due</span>
                        <span className="text-base font-serif text-amber-600 dark:text-amber-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleStartCheckout}
                      className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-zinc-950 active:scale-98 py-3.5 rounded-full font-semibold transition-all shadow-sm cursor-pointer text-xs sm:text-sm"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full text-center text-[11px] text-zinc-400 hover:text-red-500 py-1 transition-colors cursor-pointer"
                    >
                      Clear order
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Checkout Step */}
            {checkoutStep === "checkout" && (
              <form
                onSubmit={handlePlaceOrder}
                className="flex-1 flex flex-col justify-between p-5 overflow-y-auto"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      Pickup Roastery
                    </label>
                    <select
                      value={pickupStore}
                      onChange={(e) => setPickupStore(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="store-1">Downtown Flagship — 123 Main St</option>
                      <option value="store-2">Riverside Roastery — 456 River Rd</option>
                      <option value="store-3">University Commons — 789 College Ave</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ready in approx. 8–12 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Express Counter pickup ready</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex justify-between items-baseline text-sm">
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        Total Amount
                      </span>
                      <span className="text-base font-serif font-bold text-amber-600 dark:text-amber-400">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-zinc-950 py-3.5 rounded-full font-semibold transition-all shadow-sm cursor-pointer text-xs sm:text-sm"
                  >
                    Confirm &amp; Place Order (${total.toFixed(2)})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="w-full text-center text-xs text-zinc-400 hover:text-zinc-700 py-1 cursor-pointer"
                  >
                    Back to cart review
                  </button>
                </div>
              </form>
            )}

            {/* Success Step */}
            {checkoutStep === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5"
                >
                  <CheckCircle2 className="w-7 h-7" />
                </motion.div>

                <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">
                  Order In The Works!
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Thank you, <span className="font-semibold">{customerName || "Friend"}</span>!
                </p>

                <div className="my-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-xs text-left space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Order Ref:</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Est. Ready:</span>
                    <span className="font-medium text-zinc-900 dark:text-white">10 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Club Points:</span>
                    <span className="font-bold text-amber-500">+25 pts</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs shadow-sm hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
