"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Sliders } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type DrinkType = "latte" | "cappuccino" | "americano" | "cold-brew";

interface Option {
  id: string;
  label: string;
  emoji: string;
  price: number;
}

const drinkTypes: { id: DrinkType; label: string; emoji: string; basePrice: number; defaultProfile: { intensity: number; sweetness: number; creaminess: number } }[] = [
  { id: "latte", label: "Caffè Latte", emoji: "🥛", basePrice: 4.5, defaultProfile: { intensity: 60, sweetness: 40, creaminess: 85 } },
  { id: "cappuccino", label: "Cappuccino", emoji: "☕", basePrice: 4.5, defaultProfile: { intensity: 75, sweetness: 30, creaminess: 70 } },
  { id: "americano", label: "Americano", emoji: "☕", basePrice: 3.5, defaultProfile: { intensity: 85, sweetness: 10, creaminess: 10 } },
  { id: "cold-brew", label: "Cold Brew", emoji: "🧊", basePrice: 4.0, defaultProfile: { intensity: 80, sweetness: 20, creaminess: 15 } },
];

const sizes: Option[] = [
  { id: "small", label: "Small (8oz)", emoji: "🥤", price: 0 },
  { id: "medium", label: "Medium (12oz)", emoji: "🥤", price: 0.75 },
  { id: "large", label: "Large (16oz)", emoji: "🥤", price: 1.25 },
];

const milks: Option[] = [
  { id: "whole", label: "Whole Milk", emoji: "🥛", price: 0 },
  { id: "oat", label: "Barista Oat Milk", emoji: "🌾", price: 0.6 },
  { id: "almond", label: "Organic Almond", emoji: "🥜", price: 0.6 },
  { id: "soy", label: "Soy Milk", emoji: "🫘", price: 0.5 },
  { id: "coconut", label: "Coconut Milk", emoji: "🥥", price: 0.6 },
];

const extras: Option[] = [
  { id: "vanilla", label: "Madagascar Vanilla", emoji: "🍦", price: 0.5 },
  { id: "caramel", label: "Sea Salt Caramel", emoji: "🍯", price: 0.75 },
  { id: "hazelnut", label: "Toasted Hazelnut", emoji: "🌰", price: 0.5 },
  { id: "cinnamon", label: "Ceylon Cinnamon", emoji: "🫚", price: 0.25 },
  { id: "whipped", label: "Whipped Cream", emoji: "🍦", price: 0.5 },
  { id: "extra-shot", label: "Extra Ristretto Shot", emoji: "☕", price: 1.0 },
];

export default function CustomDrinkBuilder() {
  const [drink, setDrink] = useState<DrinkType>("latte");
  const [size, setSize] = useState("medium");
  const [milk, setMilk] = useState("whole");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const selectedDrinkObj = drinkTypes.find((d) => d.id === drink) ?? drinkTypes[0];
  const basePrice = selectedDrinkObj.basePrice;
  const sizePrice = sizes.find((s) => s.id === size)?.price ?? 0;
  const milkPrice = milks.find((m) => m.id === milk)?.price ?? 0;
  const extrasPrice = extras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const total = basePrice + sizePrice + milkPrice + extrasPrice;

  // Compute live taste profile metrics
  const extraSweetness = selectedExtras.filter((e) => ["vanilla", "caramel", "hazelnut"].includes(e)).length * 20;
  const extraIntensity = selectedExtras.includes("extra-shot") ? 20 : 0;
  const extraCreaminess = selectedExtras.includes("whipped") ? 15 : 0;

  const currentIntensity = Math.min(100, selectedDrinkObj.defaultProfile.intensity + extraIntensity);
  const currentSweetness = Math.min(100, selectedDrinkObj.defaultProfile.sweetness + extraSweetness);
  const currentCreaminess = Math.min(100, selectedDrinkObj.defaultProfile.creaminess + extraCreaminess);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const sizeLabel = sizes.find((s) => s.id === size)?.label ?? "";
    const milkLabel = milks.find((m) => m.id === milk)?.label ?? "";
    const extrasLabels = extras
      .filter((e) => selectedExtras.includes(e.id))
      .map((e) => e.label)
      .join(", ");
    const customizations = [sizeLabel, milkLabel, extrasLabels].filter(Boolean).join(" • ");

    addItem({
      id: `custom-${drink}-${Date.now()}`,
      name: `Custom ${selectedDrinkObj.label}`,
      price: total,
      customizations,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <section
      id="customize"
      className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200/80 dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 tracking-widest uppercase mb-3 inline-block">
            Barista Lab
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
            Build Your Recipe
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Customize the foundation, volume, dairy alternatives, and artisan house syrups.
          </p>
        </motion.div>

        {/* Builder Studio Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-50 dark:bg-zinc-900/70 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          {/* 1. Base Drink Type */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              01 / Select Foundation
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {drinkTypes.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDrink(d.id)}
                  className={`flex flex-col items-center gap-1 p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer ${
                    drink === d.id
                      ? "border-amber-500 bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm ring-2 ring-amber-500/20"
                      : "border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  <span className="text-2xl mb-1">{d.emoji}</span>
                  <span className="font-semibold text-xs sm:text-sm">{d.label}</span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    ${d.basePrice.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-7">
            {/* 2. Size */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                02 / Size &amp; Volume
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {sizes.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSize(opt.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      size === opt.id
                        ? "border-amber-500 bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.price > 0 ? (
                      <span className="text-[11px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                        +${opt.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-zinc-400 font-mono">Std</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Milk */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                03 / Milk &amp; Plant Bases
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {milks.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMilk(opt.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      milk === opt.id
                        ? "border-amber-500 bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span className="flex-1 text-left truncate">{opt.label}</span>
                    {opt.price > 0 && (
                      <span className="text-[11px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                        +${opt.price.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Extras */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                04 / Syrups &amp; Add-ons
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {extras.map((ext) => {
                  const selected = selectedExtras.includes(ext.id);
                  return (
                    <button
                      key={ext.id}
                      onClick={() => toggleExtra(ext.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        selected
                          ? "border-amber-500 bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                      }`}
                    >
                      <span>{ext.emoji}</span>
                      <span className="flex-1 text-left truncate">{ext.label}</span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        +${ext.price.toFixed(2)}
                      </span>
                      {selected && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sensory Tasting Profile Visualizer */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Sensory Profile Estimate</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span>Espresso Intensity</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300">{currentIntensity}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full transition-all duration-300" style={{ width: `${currentIntensity}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span>Sweetness Level</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300">{currentSweetness}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-300" style={{ width: `${currentSweetness}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span>Microfoam Creaminess</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300">{currentCreaminess}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-300 rounded-full transition-all duration-300" style={{ width: `${currentCreaminess}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Total & Order Button */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Calculated Total
              </span>
              <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white mt-0.5">
                ${total.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleAdd}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-zinc-950"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add Custom Drink</span>
                  </>
                )}
              </button>

              <button
                onClick={openCart}
                className="px-4 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-zinc-700 dark:text-zinc-300 text-xs font-semibold cursor-pointer"
              >
                Review Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
