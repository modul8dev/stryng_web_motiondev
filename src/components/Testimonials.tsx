'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { assetPath } from '@/lib/assetPath';

const TESTIMONIALS = [
  {
    quote: "Stryng turned our products into photos, carousels, and videos that actually fit our brand. It feels like having a full creative team without the overhead.",
    author: 'Kara Lucas',
    role: 'E-commerce Brand Owner',
    avatar: 'KL',
    color: 'from-pink-500 to-rose-600',
    platform: 'Instagram',
    metric: '3x engagement',
  },
  {
    quote: "What I like most is the simplicity. No briefs, no planning, no back-and-forth. It just works — and the content is actually good.",
    author: 'Alexander Gerard',
    role: 'Social Media Manager',
    avatar: 'AG',
    color: 'from-brand-500 to-violet-600',
    platform: 'TikTok',
    metric: '80K views/mo',
  },
  {
    quote: "Stryng feels like having a full-time social media team, but without the headaches. Our engagement has doubled in just a few weeks.",
    author: 'Emily Carter',
    role: 'Marketing Manager, BrightWave Co.',
    avatar: 'EC',
    color: 'from-emerald-500 to-teal-600',
    platform: 'LinkedIn',
    metric: '2x engagement',
  },
  {
    quote: "I was skeptical at first, but Stryng completely transformed our social presence. Posts go out like clockwork at a fraction of hiring a team.",
    author: 'Rajesh Patel',
    role: 'Founder, Urban Eats',
    avatar: 'RP',
    color: 'from-orange-500 to-amber-600',
    platform: 'Facebook',
    metric: '60% cost saved',
  },
  {
    quote: "Finally, a solution that works around the clock. No sick days, no delays, just results. Our audience keeps growing every week!",
    author: 'Sofia Martinez',
    role: 'Social Media Lead, Trendify',
    avatar: 'SM',
    color: 'from-cyan-500 to-blue-600',
    platform: 'All platforms',
    metric: '+40% followers',
  },
];

function TestimonialCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
      className="group relative rounded-2xl border border-surface-border bg-surface-card p-6 flex flex-col gap-4 cursor-default"
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Stars */}
      <div className="flex gap-1">
        {Array(5).fill(0).map((_, s) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08 + s * 0.05, type: 'spring', stiffness: 400, damping: 15 }}
            className="text-amber-400 text-sm"
          >★</motion.span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/70 text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}>
          {t.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm">{t.author}</div>
          <div className="text-white/40 text-xs truncate">{t.role}</div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-xs font-bold text-emerald-400">{t.metric}</div>
          <div className="text-[10px] text-white/30">{t.platform}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const leftColY  = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const rightColY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const bgSkew    = useTransform(scrollYProgress, [0, 1], ['-2deg', '2deg']);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Parallax product image columns in background */}
      <motion.div
        style={{ y: leftColY, skewY: bgSkew }}
        className="absolute -left-8 top-0 bottom-0 flex flex-col gap-4 opacity-[0.06] pointer-events-none"
      >
        {['/images/products/bag.jpg', '/images/products/watch.jpg', '/images/products/jewelry.jpg'].map((src, i) => (
          <div key={i} className="relative w-32 h-40 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={assetPath(src)} alt="" fill className="object-cover" sizes="128px" />
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{ y: rightColY, skewY: bgSkew }}
        className="absolute -right-8 top-0 bottom-0 flex flex-col gap-4 opacity-[0.06] pointer-events-none"
      >
        {['/images/products/sneakers.jpg', '/images/products/candle.jpg', '/images/products/skincare.jpg'].map((src, i) => (
          <div key={i} className="relative w-32 h-40 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={assetPath(src)} alt="" fill className="object-cover" sizes="128px" />
          </div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Trusted by Professionals
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            Founders love Stryng.
            <br />
            <span className="gradient-text">Results speak louder.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.author} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
