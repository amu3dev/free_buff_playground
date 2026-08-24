"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Crown, Check, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const tiers = [
  { name: "Bean", min: 0, emoji: "☕" },
  { name: "Brew", min: 100, emoji: "🍵" },
  { name: "Barista", min: 300, emoji: "🧑‍🍳" },
  { name: "Legend", min: 500, emoji: "👑" },
];

const rewards = [
  { id: "reward-1", name: "Free Single-Origin Espresso Shot", points: 50, discountValue: 1.0, emoji: "☕" },
  { id: "reward-2", name: "Free Daily Bakery Croissant", points: 100, discountValue: 3.5, emoji: "🥐" },
  { id: "reward-3", name: "Complimentary Artisan Drink (Any Size)", points: 200, discountValue: 6.5, emoji: "🥤" },
  { id: "reward-4", name: "$5 Off Any In-Cafe Order", points: 150, discountValue: 5.0, emoji: "🏷️" },
  { id: "reward-5", name: "Brew & Bean Canvas Roastery Tote", points: 400, discountValue: 12.0, emoji: "🎒" },
];

export default function LoyaltyRewards() {
  const [points, setPoints] = useState(180);
  const [claimedRewardId, setClaimedRewardId] = useState<string | null>(null);
  const { applyReward, openCart } = useCart();

  const currentTier = [...tiers].reverse().find((t) => points >= t.min) ?? tiers[0];
  const nextTier = tiers.find((t) => t.min > points);
  const progress = nextTier
    ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;

  const handleRedeem = (reward: (typeof rewards)[0]) => {
    if (points < reward.points) return;

    applyReward({
      id: reward.id,
      name: reward.name,
      discount: reward.discountValue,
    });

    setPoints((prev) => prev - reward.points);
    setClaimedRewardId(reward.id);

    setTimeout(() => {
      openCart();
    }, 600);
  };

  return (
    <section
      id="rewards"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 tracking-widest uppercase mb-3 inline-block">
            Member Perks
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
            Brew Club Rewards
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Earn 10 points per dollar spent. Unlock complimentary drinks, pastries, and roastery merch.
          </p>
        </motion.div>

        {/* Member Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 border border-zinc-800 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300">
                  {currentTier.emoji} {currentTier.name} Member
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full bg-zinc-950/60">
                ID: #BB-8892-GOLD
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <div className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
                {points}
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Reward Points
              </span>
            </div>

            {nextTier && (
              <div className="mt-6 pt-5 border-t border-zinc-800">
                <div className="flex justify-between text-xs mb-2 text-zinc-400">
                  <span>
                    Current: <strong className="text-white">{currentTier.name}</strong> → Next:{" "}
                    <strong className="text-amber-400">{nextTier.name}</strong>
                  </span>
                  <span className="text-amber-400 font-mono">
                    {nextTier.min - points} pts to unlock
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tier Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {tiers.map((tier) => {
            const isUnlocked = points >= tier.min;
            return (
              <div
                key={tier.name}
                className={`rounded-2xl p-4 text-center border transition-all ${
                  isUnlocked
                    ? "bg-white dark:bg-zinc-900 border-amber-500/40 dark:border-amber-500/30 shadow-xs"
                    : "bg-white/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 opacity-50"
                }`}
              >
                <div className="text-2xl mb-1">{tier.emoji}</div>
                <div className="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  {tier.name}
                </div>
                <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                  {tier.min}+ pts
                </div>
              </div>
            );
          })}
        </div>

        {/* Claimable Perks */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-500" />
              Available Reward Perks
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              Auto-applies at checkout
            </span>
          </div>

          <div className="space-y-2.5">
            {rewards.map((reward) => {
              const canRedeem = points >= reward.points;
              const isClaimed = claimedRewardId === reward.id;

              return (
                <div
                  key={reward.id}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all ${
                    canRedeem
                      ? "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/40"
                      : "border-zinc-100 dark:border-zinc-800/50 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center text-xl border border-zinc-200 dark:border-zinc-700">
                      {reward.emoji}
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                        {reward.name}
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                        {reward.points} pts • Value ${reward.discountValue.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {canRedeem ? (
                    <button
                      onClick={() => handleRedeem(reward)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isClaimed
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-zinc-950 shadow-xs"
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Redeem</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-zinc-400 px-2 py-1">
                      {reward.points - points} pts needed
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
