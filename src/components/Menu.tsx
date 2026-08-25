"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useI18n } from "@/lib/i18n";

type Category = "espresso" | "cold" | "specialty" | "pastries";

interface MenuItem {
  id: string;
  price: number;
  emoji: string;
  category: Category;
  tags?: string[];
}

const categories: { key: Category; labelKey: string; emoji: string }[] = [
  { key: "espresso", labelKey: "cat.espresso", emoji: "☕" },
  { key: "cold", labelKey: "cat.cold", emoji: "🧊" },
  { key: "specialty", labelKey: "cat.specialty", emoji: "✨" },
  { key: "pastries", labelKey: "cat.pastries", emoji: "🥐" },
];

const menuItems: MenuItem[] = [
  // Espresso
  {
    id: "espresso-1",
    price: 3.5,
    emoji: "☕",
    category: "espresso",
    tags: ["houseBlend"],
  },
  {
    id: "espresso-2",
    price: 5.0,
    emoji: "☕",
    category: "espresso",
    tags: ["popular"],
  },
  {
    id: "espresso-3",
    price: 5.5,
    emoji: "🥛",
    category: "espresso",
  },
  {
    id: "espresso-4",
    price: 5.5,
    emoji: "☕",
    category: "espresso",
  },
  {
    id: "espresso-5",
    price: 4.5,
    emoji: "☕",
    category: "espresso",
  },
  {
    id: "espresso-6",
    price: 4.0,
    emoji: "☕",
    category: "espresso",
  },

  // Cold Brew
  {
    id: "cold-1",
    price: 5.0,
    emoji: "🧊",
    category: "cold",
    tags: ["slowSteeped"],
  },
  {
    id: "cold-2",
    price: 6.0,
    emoji: "🧊",
    category: "cold",
    tags: ["sweet"],
  },
  {
    id: "cold-3",
    price: 6.0,
    emoji: "🧊",
    category: "cold",
  },
  {
    id: "cold-4",
    price: 6.0,
    emoji: "🧊",
    category: "cold",
    tags: ["onTap"],
  },

  // Specialty
  {
    id: "spec-1",
    price: 6.5,
    emoji: "💜",
    category: "specialty",
    tags: ["signature"],
  },
  {
    id: "spec-2",
    price: 6.5,
    emoji: "🍁",
    category: "specialty",
  },
  {
    id: "spec-3",
    price: 6.0,
    emoji: "🍯",
    category: "specialty",
  },
  {
    id: "spec-4",
    price: 7.0,
    emoji: "🍫",
    category: "specialty",
    tags: ["indulgent"],
  },

  // Pastries
  {
    id: "pasty-1",
    price: 3.5,
    emoji: "🥐",
    category: "pastries",
    tags: ["freshBaked"],
  },
  {
    id: "pasty-2",
    price: 3.5,
    emoji: "🧁",
    category: "pastries",
  },
  {
    id: "pasty-3",
    price: 4.0,
    emoji: "🍥",
    category: "pastries",
  },
  {
    id: "pasty-4",
    price: 2.5,
    emoji: "🍪",
    category: "pastries",
  },
];

export default function MenuSection() {
  const [active, setActive] = useState<Category>("espresso");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();
  const { t, lang } = useI18n();

  const handleAdd = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: t(`menu.${item.id}.n`),
      price: item.price,
    });
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
          <span className={`text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 mb-3 inline-block ${lang === "ar" ? "" : "tracking-widest uppercase"}`}>
            {t("menu.kicker")}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold text-zinc-900 dark:text-zinc-50 ${lang === "ar" ? "font-[family-name:var(--font-amiri)]" : ""}`}>
            {t("menu.title")}
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t("menu.sub")}
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
              <span>{t(cat.labelKey)}</span>
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
                              className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40 ${lang === "ar" ? "font-[family-name:var(--font-cairo)] normal-case tracking-normal" : "tracking-wider uppercase"}`}
                            >
                              {t(`tag.${tag}`)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <h3 className={`text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 mt-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors ${lang === "ar" ? "font-[family-name:var(--font-amiri)]" : ""}`}>
                      {t(`menu.${item.id}.n`)}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      {t(`menu.${item.id}.d`)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 num" data-ltr>
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
                          <span>{t("menu.added")}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t("menu.add")}</span>
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
