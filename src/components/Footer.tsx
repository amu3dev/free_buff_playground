"use client";

import { Coffee, Globe, AtSign, Hash, Heart } from "lucide-react";

const links = {
  menu: [
    { label: "Espresso Drinks", href: "#menu" },
    { label: "Cold Brew", href: "#menu" },
    { label: "Signature Crafts", href: "#menu" },
    { label: "Artisan Bakery", href: "#menu" },
  ],
  company: [
    { label: "Our Story", href: "#" },
    { label: "Roastery Sourcing", href: "#" },
    { label: "Wholesale & Events", href: "#" },
    { label: "Careers", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "Order FAQ", href: "#" },
    { label: "Brew Club Perks", href: "#rewards" },
    { label: "Find a Cafe", href: "#locations" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <a href="#" className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Coffee className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-lg font-serif font-bold tracking-tight">Brew &amp; Bean</span>
            </a>
            <p className="mt-4 text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Pursuing the art of exceptional single-origin coffee, roasted in small batches with
              uncompromising craft since 2018.
            </p>
            <div className="flex gap-2.5 mt-6">
              {[
                { Icon: AtSign, label: "Instagram" },
                { Icon: Hash, label: "Twitter" },
                { Icon: Globe, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-800 flex items-center justify-center transition-colors text-zinc-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {[
            { title: "Offerings", items: links.menu },
            { title: "Roastery", items: links.company },
            { title: "Customer Care", items: links.support },
          ].map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-xs font-semibold text-zinc-200 mb-4 uppercase tracking-widest">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            © 2026 Brew &amp; Bean Coffee Roasters. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs flex items-center gap-1.5">
            Roasted with care <Heart className="w-3 h-3 text-amber-500 fill-current" /> in Portland &amp; Austin
          </p>
        </div>
      </div>
    </footer>
  );
}
