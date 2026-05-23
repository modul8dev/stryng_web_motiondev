'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    bg: 'from-pink-500/30 via-purple-600/20 to-orange-500/20',
    border: 'border-pink-500/30',
    aspectClass: 'aspect-square',
    format: 'Square Post',
    tags: ['#reels', '#fyp', '#brand'],
    engagementIcon: '❤️',
    engagementCount: '12.4K',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#69C9D0',
    bg: 'from-cyan-500/30 via-black/40 to-pink-500/20',
    border: 'border-cyan-500/30',
    aspectClass: 'aspect-[9/16] max-h-72',
    format: 'Vertical Reel',
    tags: ['#viral', '#trending', '#product'],
    engagementIcon: '🎵',
    engagementCount: '84.2K',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    bg: 'from-blue-600/30 via-slate-700/30 to-blue-900/20',
    border: 'border-blue-500/30',
    aspectClass: 'aspect-[4/3]',
    format: 'Brand Story',
    tags: ['#ecommerce', '#growth', '#marketing'],
    engagementIcon: '👍',
    engagementCount: '3.1K',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    bg: 'from-blue-500/30 via-indigo-700/20 to-slate-900/30',
    border: 'border-blue-400/30',
    aspectClass: 'aspect-[16/9]',
    format: 'Carousel Ad',
    tags: ['#shopnow', '#ad', '#limited'],
    engagementIcon: '🔥',
    engagementCount: '5.7K',
  },
];

const PRODUCT = {
  name: 'Premium Leather Tote',
  price: '$89',
  desc: 'Handcrafted. Sustainable. Built to last.',
};

function ProductRawCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 w-full">
      <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 relative">
        <Image
          src="/images/products/bag.jpg"
          alt={PRODUCT.name}
          fill
          className="object-cover"
          sizes="200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="text-white font-semibold text-sm">{PRODUCT.name}</div>
      <div className="text-white/40 text-xs mt-0.5">{PRODUCT.desc}</div>
      <div className="text-brand-400 font-bold text-sm mt-2">{PRODUCT.price}</div>
    </div>
  );
}

function PlatformFrame({ platform, isActive }: { platform: typeof PLATFORMS[0]; isActive: boolean }) {
  return (
    <motion.div
      layoutId={`frame-${platform.id}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`relative rounded-2xl border ${platform.border} bg-gradient-to-br ${platform.bg} backdrop-blur-sm overflow-hidden shadow-2xl`}
    >
      {/* Platform header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold" style={{ color: platform.color }}>
          {platform.name[0]}
        </div>
        <span className="text-white/70 text-xs font-semibold">{platform.name}</span>
        <span className="ml-auto text-[10px] text-white/30 font-medium border border-white/10 px-2 py-0.5 rounded-full">
          {platform.format}
        </span>
      </div>

      {/* Content */}
      <div className={`w-full ${platform.aspectClass} relative overflow-hidden`}>
        {/* Real product image */}
        <Image
          src="/images/products/bag.jpg"
          alt="Product"
          fill
          className="object-cover"
          sizes="400px"
        />

        {/* Branded overlay strip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
        >
          <div className="text-white font-bold text-sm">{PRODUCT.name}</div>
          <div className="text-white/60 text-xs">{PRODUCT.desc}</div>
        </motion.div>

        {/* Stryng watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-3 right-3 bg-brand-600/80 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-md"
        >
          ⚡ by Stryng
        </motion.div>
      </div>

      {/* Post actions row */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">{platform.engagementIcon}</span>
            <span className="text-white/60 text-xs font-semibold">{platform.engagementCount}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[10px] font-bold text-white px-3 py-1.5 rounded-lg"
            style={{ background: platform.color + '33', border: `1px solid ${platform.color}55`, color: platform.color }}
          >
            Shop Now ↗
          </motion.button>
        </div>
        <div className="flex gap-1 flex-wrap">
          {platform.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-white/30 font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ContentShowcase() {
  const [activePlatform, setActivePlatform] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-brand-950/30 via-transparent to-transparent pointer-events-none" />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Content Generation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            One product.{' '}
            <span className="gradient-text">Every platform.</span>
            <br />Perfectly formatted.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Watch your product morph into platform-native content — aspect ratios, captions, and ad copy included.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Product card + arrow */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0 w-full lg:w-52">
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 text-center">Raw Product</div>
              <ProductRawCard />
            </motion.div>

            {/* Arrow */}
            <motion.div
              style={{ y: y2 }}
              className="hidden lg:flex flex-col items-center gap-2"
            >
              <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-brand-400 text-2xl"
              >
                →
              </motion.div>
              <div className="text-brand-400 text-xs font-bold">AI Transform</div>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.15 }}
                className="text-brand-400 text-2xl"
              >
                →
              </motion.div>
            </motion.div>
          </div>

          {/* Center: Platform selector tabs */}
          <div className="flex flex-col items-center gap-6 flex-1 w-full">
            {/* Tab pills */}
            <div className="flex gap-2 flex-wrap justify-center">
              {PLATFORMS.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => setActivePlatform(i)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activePlatform === i ? 'text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {activePlatform === i && (
                    <motion.div
                      layoutId="platform-tab-bg"
                      className="absolute inset-0 rounded-xl border"
                      style={{
                        background: `${p.color}22`,
                        borderColor: `${p.color}44`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{p.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Platform frame with layout animation */}
            <div className="w-full max-w-sm">
              <AnimatePresence mode="wait">
                <PlatformFrame
                  key={PLATFORMS[activePlatform].id}
                  platform={PLATFORMS[activePlatform]}
                  isActive={true}
                />
              </AnimatePresence>
            </div>

            {/* Auto-cycle indicator */}
            <div className="flex gap-2">
              {PLATFORMS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActivePlatform(i)}
                  animate={{ width: activePlatform === i ? 24 : 8, backgroundColor: activePlatform === i ? '#5b63f5' : '#ffffff22' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Right: Feature callouts */}
          <motion.div
            style={{ y: y1 }}
            className="flex flex-col gap-4 flex-shrink-0 w-full lg:w-56"
          >
            {[
              { icon: '🎨', title: 'Brand-matched colors', desc: 'Auto-extracts your palette from your site.' },
              { icon: '✍️', title: 'Platform-native copy', desc: 'Short captions for TikTok, long-form for LinkedIn.' },
              { icon: '📐', title: 'Perfect dimensions', desc: '9:16, 1:1, 16:9 — all auto-resized.' },
              { icon: '📅', title: 'Calendar-ready', desc: 'Posts drop straight into your scheduler.' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-card border border-surface-border"
              >
                <span className="text-lg flex-shrink-0 mt-0.5">{feat.icon}</span>
                <div>
                  <div className="text-white text-xs font-semibold mb-0.5">{feat.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{feat.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
