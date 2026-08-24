"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Sun, Moon, Coffee } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Barista Lab", href: "#customize" },
  { label: "Rewards", href: "#rewards" },
  { label: "Locations", href: "#locations" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { dark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/70 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-50 group transition-transform hover:opacity-90"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5 text-amber-400 dark:text-zinc-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-tight leading-none">
                Brew &amp; Bean
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 dark:text-zinc-500 mt-0.5">
                Roastery &amp; Cafe
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white font-medium text-sm transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Switcher */}
            <button
              onClick={toggle}
              className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300 focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-zinc-700" />
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-200 focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
              aria-label={`Open shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-amber-500 text-zinc-950 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Toggle mobile menu"
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white py-2 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
