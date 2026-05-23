'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useInView,
} from 'motion/react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

// ── Velocity wrap helper ─────────────────────────────────────────────────────
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// ── Product data with real images ────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'bag',
    name: 'Premium Leather Tote',
    category: 'Bags & Accessories',
    price: '$89',
    originalPrice: '$129',
    image: '/images/products/bag.jpg',
    platform: 'Instagram',
    platformColor: '#E1306C',
    reach: '24K reach',
    badge: 'Best Seller',
    badgeColor: 'bg-amber-500',
  },
  {
    id: 'sneakers',
    name: 'Limited Edition Sneakers',
    category: 'Footwear',
    price: '$159',
    originalPrice: '$199',
    image: '/images/products/sneakers.jpg',
    platform: 'TikTok',
    platformColor: '#69C9D0',
    reach: '84K reach',
    badge: 'Trending',
    badgeColor: 'bg-cyan-500',
  },
  {
    id: 'watch',
    name: 'Minimalist Field Watch',
    category: 'Watches',
    price: '$249',
    originalPrice: '$349',
    image: '/images/products/watch.jpg',
    platform: 'LinkedIn',
    platformColor: '#0A66C2',
    reach: '8K reach',
    badge: 'New',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 'sunglasses',
    name: 'Retro Acetate Frames',
    category: 'Eyewear',
    price: '$95',
    originalPrice: '$140',
    image: '/images/products/sunglasses.jpg',
    platform: 'Instagram',
    platformColor: '#E1306C',
    reach: '31K reach',
    badge: 'Limited',
    badgeColor: 'bg-rose-500',
  },
  {
    id: 'jewelry',
    name: 'Gold Stacking Rings',
    category: 'Jewelry',
    price: '$45',
    originalPrice: '$65',
    image: '/images/products/jewelry.jpg',
    platform: 'Pinterest',
    platformColor: '#E60023',
    reach: '18K reach',
    badge: 'Popular',
    badgeColor: 'bg-pink-500',
  },
  {
    id: 'candle',
    name: 'Artisan Soy Candle',
    category: 'Home & Living',
    price: '$38',
    originalPrice: '$52',
    image: '/images/products/candle.jpg',
    platform: 'Facebook',
    platformColor: '#1877F2',
    reach: '12K reach',
    badge: 'Eco-friendly',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 'skincare',
    name: 'Vitamin C Serum',
    category: 'Skincare',
    price: '$62',
    originalPrice: '$85',
    image: '/images/products/skincare.jpg',
    platform: 'TikTok',
    platformColor: '#69C9D0',
    reach: '63K reach',
    badge: 'Viral',
    badgeColor: 'bg-violet-500',
  },
  {
    id: 'perfume',
    name: 'Signature Eau de Parfum',
    category: 'Fragrance',
    price: '$120',
    originalPrice: '$165',
    image: '/images/products/perfume.jpg',
    platform: 'Instagram',
    platformColor: '#E1306C',
    reach: '19K reach',
    badge: 'Luxury',
    badgeColor: 'bg-amber-400',
  },
];

// ── 3D Tilt card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250, damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250, damping: 28,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['-30%', '130%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['-30%', '130%']);
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    scale.set(1.04);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-surface-border bg-surface-card overflow-hidden cursor-pointer"
    >
      {/* Glare layer */}
      <motion.div
        className="absolute inset-0 z-20 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle 150px at var(--gx) var(--gy), rgba(255,255,255,0.08) 0%, transparent 70%)',
          // @ts-ignore
          '--gx': glareX,
          '--gy': glareY,
        }}
      />

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card/80 via-transparent to-transparent" />

        {/* Badge */}
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: (index % 4) * 0.09 + 0.3, type: 'spring', stiffness: 400, damping: 15 }}
          className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg`}
        >
          {product.badge}
        </motion.span>

        {/* Platform pill */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{
            background: product.platformColor + '22',
            color: product.platformColor,
            border: `1px solid ${product.platformColor}44`,
          }}
        >
          {product.platform}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-white font-bold text-sm mb-2 leading-snug">{product.name}</h3>

        {/* Price row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold text-base">{product.price}</span>
            <span className="text-white/25 text-xs line-through">{product.originalPrice}</span>
          </div>
          <span className="text-emerald-400 text-[10px] font-bold">{product.reach}</span>
        </div>

        {/* Generate CTA */}
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ height: 'auto' }}
        >
          <button className="w-full py-2 rounded-xl bg-brand-600/20 hover:bg-brand-600/40 border border-brand-500/30 text-brand-300 text-xs font-semibold transition-all group-hover:border-brand-500/60">
            ⚡ Generate Social Posts
          </button>
        </motion.div>
      </div>

      {/* Stryng "generating" overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-surface-card/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30 rounded-2xl pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent"
        />
        <span className="text-brand-300 text-sm font-bold">Generating content…</span>
        <div className="flex gap-1">
          {['📸', '🎵', '🎠'].map((icon, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
              className="text-lg"
            >
              {icon}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Velocity scroll marquee (product names, repurposed here) ─────────────────
function ProductMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * 3 * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const items = PRODUCTS.map((p) => p.name);
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-3 border-t border-surface-border">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      <motion.div style={{ x }} className="flex gap-8 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="text-xs font-semibold text-white/20 shrink-0 select-none flex items-center gap-3">
            {item}
            <span className="text-brand-700 text-[8px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function ProductShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Parallax for section bg text
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden">
      {/* Giant background watermark */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="text-[18vw] font-black text-white/[0.015] whitespace-nowrap leading-none tracking-tighter">
          PRODUCTS
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Store-to-Social
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-extrabold"
            >
              Every product.
              <br />
              <span className="gradient-text">Every platform.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <MagneticButton
              href="https://app.stryng.io/accounts/register/"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-600/25"
            >
              Try with your store →
            </MagneticButton>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Velocity marquee beneath */}
        <div className="mt-10 relative overflow-hidden">
          <ProductMarquee />
        </div>
      </div>
    </section>
  );
}
