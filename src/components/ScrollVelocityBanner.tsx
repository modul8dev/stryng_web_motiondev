'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';

// Manual modulo wrap — no external dep needed
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface VelocityTrackProps {
  items: string[];
  baseVelocity?: number;
}

function VelocityTrack({ items, baseVelocity = 5 }: VelocityTrackProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  /**
   * `x` translates the track. We use `wrap` to create a seamless loop.
   * The range -20 → -45 keeps two copies of the content in frame at all times.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<1 | -1>(baseVelocity > 0 ? 1 : -1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);

    // Flip direction when scrolling backwards, amplify when scrolling forward
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = baseVelocity > 0 ? 1 : -1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Repeat content 4× so the loop is always seamless
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden relative">
      <motion.div style={{ x }} className="flex gap-4 whitespace-nowrap will-change-transform">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-semibold text-white/40 shrink-0 select-none">
            {item}
            <span className="text-brand-600/60 text-[10px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const TOP_ROW = [
  '🛍️ Leather Tote Bag', '👟 Limited Sneakers', '⌚ Minimalist Watch',
  '🕶️ Premium Sunglasses', '💍 Gold Jewelry', '🕯️ Artisan Candle',
  '🧴 Skincare Collection', '🌸 Eau de Parfum', '👜 Crossbody Bag',
  '💎 Diamond Ring', '🎒 Urban Backpack', '🧣 Cashmere Scarf',
];

const BOTTOM_ROW = [
  '📸 Instagram Post', '🎵 TikTok Reel', '🎠 Facebook Carousel',
  '💼 LinkedIn Story', '𝕏 X / Twitter', '▶️ YouTube Short',
  '✦ Auto-scheduled', '⚡ AI-generated', '🎨 Brand-matched',
  '📊 Analytics-ready', '🚀 Publish-ready', '🔁 Auto-repeating',
];

export default function ScrollVelocityBanner() {
  return (
    <section className="relative py-10 overflow-hidden border-y border-surface-border bg-surface-card/50">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-card/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-card/50 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-3">
        {/* Top row — scrolls right */}
        <VelocityTrack items={TOP_ROW} baseVelocity={4} />
        {/* Bottom row — scrolls left */}
        <VelocityTrack items={BOTTOM_ROW} baseVelocity={-3.5} />
      </div>
    </section>
  );
}
