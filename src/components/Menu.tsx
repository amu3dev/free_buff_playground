"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Category = "espresso" | "cold" | "specialty" | "pastries";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: Category;
  tags?: string[];
}

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: "espresso", label: "Espresso & Milk", emoji: "☕" },
  { key: "cold", label: "Cold Brew & Nitro", emoji: "🧊" },
  { key: "specialty", label: "Signature Crafts", emoji: "✨" },
  { key: "pastries", label: "Artisan Bakery", emoji: "🥐" },
];

const menuItems: MenuItem[] = [
  // Espresso
  {
    id: "espresso-1",
    name: "Classic Espresso",
    description: "Bold, rich, and balanced double shot with dense golden crema",
    price: 3.5,
    emoji: "☕",
    category: "espresso",
    tags: ["House Blend"],
  },
  {
    id: "espresso-2",
    name: "Cappuccino",
    description: "Equal thirds espresso, steamed whole milk, and microfoam cushion",
    price: 5.0,
    emoji: "☕",
    category: "espresso",
    tags: ["Popular"],
  },
  {
    id: "espresso-3",
    name: "Caffè Latte",
    description: "Smooth double shot layered with velvety steamed milk",
    price: 5.5,
    emoji: "🥛",
    category: "espresso",
  },
  {
    id: "espresso-4",
    name: "Flat White",
    description: "Double ristretto poured delicately with glossy microfoam",
    price: 5.5,
    emoji: "☕",
    category: "espresso",
  },
  {
    id: "espresso-5",
    name: "Cortado",
    description: "Equal parts espresso and warm textured milk",
    price: 4.5,
    emoji: "☕",
    category: "espresso",
  },
  {
    id: "espresso-6",
    name: "Americano",
    description: "Espresso extracted over hot water for clarity and aroma",
    price: 4.0,
    emoji: "☕",
    category: "espresso",
  },

  // Cold Brew
  {
    id: "cold-1",
    name: "24-Hour Cold Brew",
    description: "Steeped slowly in chilled filtered water for zero astringency",
    price: 5.0,
    emoji: "🧊",
    category: "cold",
    tags: ["Slow Steeped"],
  },
  {
    id: "cold-2",
    name: "Iced Sea Salt Caramel Latte",
    description: "Espresso, organic milk, and house caramel over crystal ice",
    price: 6.0,
    emoji: "🧊",
    category: "cold",
    tags: ["Sweet"],
  },
  {
    id: "cold-3",
    name: "Kyoto Drip Cold Brew",
    description: "Slow Japanese drip brew showcasing delicate floral tasting notes",
    price: 6.0,
    emoji: "🧊",
    category: "cold",
  },
  {
    id: "cold-4",
    name: "Nitro Cold Brew",
    description: "Nitrogenated cold brew poured on tap with cascading stout body",
    price: 6.0,
    emoji: "🧊",
    category: "cold",
    tags: ["On Tap"],
  },

  // Specialty
  {
    id: "spec-1",
    name: "Lavender Oat Latte",
    description: "Espresso with barista oat milk and organic French lavender syrup",
    price: 6.5,
    emoji: "💜",
    category: "specialty",
    tags: ["Signature"],
  },
  {
    id: "spec-2",
    name: "Maple Cinnamon Cortado",
    description: "Grade-A Vermont maple, Ceylon cinnamon, and velvety espresso",
    price: 6.5,
    emoji: "🍁",
    category: "specialty",
  },
  {
    id: "spec-3",
    name: "Honey Cardamom Latte",
    description: "Aromatic crushed green cardamom paired with wildflower honey",
    price: 6.0,
    emoji: "🍯",
    category: "specialty",
  },
  {
    id: "spec-4",
    name: "Mocha Royale",
    description: "70% single-origin dark chocolate, espresso, and vanilla cream",
    price: 7.0,
    emoji: "🍫",
    category: "specialty",
    tags: ["Indulgent"],
  },

  // Pastries
  {
    id: "pasty-1",
    name: "Butter Croissant",
    description: "Flaky, multi-layered French pastry baked fresh every morning",
    price: 3.5,
    emoji: "🥐",
    category: "pastries",
    tags: ["Fresh Baked"],
  },
  {
    id: "pasty-2",
    name: "Blueberry Lemon Muffin",
    description: "Loaded with wild blueberries and Meyer lemon zest sugar topping",
    price: 3.5,
    emoji: "🧁",
    category: "pastries",
  },
  {
    id: "pasty-3",
    name: "Cinnamon Brioche Roll",
    description: "Warm spiced swirl pastry topped with cream cheese glaze",
    price: 4.0,
    emoji: "🍥",
    category: "pastries",
  },
  {
    id: "pasty-4",
    name: "Almond Twice-Baked Biscotti",
    description: "Crunchy roasted almond cookie crafted for espresso dipping",
    price: 2.5,
    emoji: "🍪",
    category: "pastries",
  },
];

export default function MenuSection() {
  const [active, setActive] = useState<Category>("espresso");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();

  const handleAdd = (item: MenuItem) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const filtered = menuItems.filter((item) => item.category === active);

  return (
    <section id="menu" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 tracking-widest uppercase mb-3 inline-block">
            Curated Menu
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
            Handcrafted Offerings
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Every beverage is dialed in daily by our lead baristas to preserve delicate tasting notes.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                active === cat.key
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const isAdded = !!addedItems[item.id];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="group flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-2xl border border-zinc-200/60 dark:border-zinc-700/60 group-hover:scale-105 transition-transform">
                        {item.emoji}
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono font-medium tracking-wider uppercase px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 mt-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-900 dark:bg-zinc-100 hover:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-zinc-950 hover:text-zinc-950 shadow-xs"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
