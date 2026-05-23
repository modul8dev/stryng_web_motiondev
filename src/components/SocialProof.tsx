'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const MANUAL_STEPS = [
  { icon: '😫', text: 'Brief a designer — wait 3 days' },
  { icon: '✏️', text: 'Write caption copy yourself' },
  { icon: '🔁', text: 'Review round #1, #2, #3…' },
  { icon: '📅', text: 'Manually schedule each post' },
  { icon: '🤯', text: 'Repeat for every product, every week' },
];

const AUTO_STEPS = [
  { icon: '🔗', text: 'Paste your store URL' },
  { icon: '✨', text: 'AI builds your full content calendar' },
  { icon: '👀', text: 'You approve in one click' },
  { icon: '🚀', text: 'Posts go live — automatically' },
  { icon: '📈', text: 'Analytics feed back into next cycle' },
];

const LOGOS = [
  { name: 'Shopify', abbr: 'SF' },
  { name: 'WooCommerce', abbr: 'WC' },
  { name: 'BigCommerce', abbr: 'BC' },
  { name: 'Magento', abbr: 'MG' },
  { name: 'PrestaShop', abbr: 'PS' },
  { name: 'Squarespace', abbr: 'SS' },
];

function ComparisonCol({
  title,
  steps,
  type,
  delay = 0,
}: {
  title: string;
  steps: { icon: string; text: string }[];
  type: 'manual' | 'auto';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isAuto = type === 'auto';

  return (
    <div ref={ref} className={`flex-1 rounded-2xl border p-6 ${isAuto ? 'border-brand-500/40 bg-brand-950/40 shadow-2xl shadow-brand-600/10' : 'border-surface-border bg-surface-card'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isAuto ? 'bg-brand-600 text-white' : 'bg-red-500/20 text-red-400'}`}>
          {isAuto ? '⚡' : '⏳'}
        </div>
        <h3 className={`font-bold text-base ${isAuto ? 'text-brand-300' : 'text-red-400'}`}>{title}</h3>
        {isAuto && (
          <span className="ml-auto px-2 py-0.5 rounded-full bg-brand-600/20 text-brand-300 text-xs font-semibold border border-brand-500/30">Stryng</span>
        )}
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isAuto ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.45,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex items-center gap-3 p-3 rounded-xl ${isAuto ? 'bg-brand-900/30' : 'bg-white/3'}`}
          >
            <span className="text-xl flex-shrink-0">{step.icon}</span>
            <span className={`text-sm font-medium ${isAuto ? 'text-white/80' : 'text-white/50 line-through decoration-red-500/60'}`}>
              {step.text}
            </span>
            {isAuto && (
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: delay + i * 0.07 + 0.25, type: 'spring', stiffness: 400, damping: 15 }}
                className="ml-auto w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {!isAuto && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-xs font-medium text-center">⏱ ~12 hrs/week in manual effort</p>
        </div>
      )}
      {isAuto && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-emerald-400 text-xs font-medium text-center">⚡ Done in under 5 minutes</p>
        </div>
      )}
    </div>
  );
}

export default function SocialProof() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Why Founders Choose Stryng
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            Stop <span className="text-red-400">wasting weekends</span> on content.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Your competitors are posting daily. You&rsquo;re still stuck in Canva at midnight. Let Stryng handle the entire pipeline.
          </motion.p>
        </div>

        {/* Comparison grid */}
        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
          <ComparisonCol title="Old Way (DIY / Agency)" steps={MANUAL_STEPS} type="manual" delay={0.1} />

          {/* VS divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
            className="self-center flex-shrink-0 w-12 h-12 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-white/40 font-bold text-sm"
          >
            VS
          </motion.div>

          <ComparisonCol title="Stryng (Autonomous AI)" steps={AUTO_STEPS} type="auto" delay={0.2} />
        </div>

        {/* Logo marquee */}
        <div className="mt-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            Works with your existing store
          </motion.p>
          <div className="flex items-center justify-center flex-wrap gap-6">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border hover:border-brand-700/50 transition-all"
              >
                <div className="w-6 h-6 rounded-md bg-brand-900/60 flex items-center justify-center text-[10px] font-bold text-brand-400">
                  {logo.abbr}
                </div>
                <span className="text-sm font-medium text-white/50">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
