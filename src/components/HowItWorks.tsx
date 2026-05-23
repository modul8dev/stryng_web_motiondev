'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const STEPS = [
  {
    number: '01',
    icon: '🔗',
    title: 'Drop your store URL',
    body: 'Paste your product page or homepage. Stryng crawls your brand in minutes — colors, tone, products, everything.',
    color: 'from-brand-600 to-brand-800',
    accent: 'text-brand-300',
    glow: 'shadow-brand-600/20',
  },
  {
    number: '02',
    icon: '⚡',
    title: 'One click, full content calendar',
    body: 'Your AI agent drafts photos, carousels, reels, and ads for every platform. An entire month of content — built overnight.',
    color: 'from-violet-600 to-purple-800',
    accent: 'text-violet-300',
    glow: 'shadow-violet-600/20',
  },
  {
    number: '03',
    icon: '✏️',
    title: 'Tweak, refine, approve',
    body: 'Don&rsquo;t like a caption? Tell Stryng. Revisions happen in seconds, not days. You stay in creative control without the grind.',
    color: 'from-fuchsia-600 to-pink-800',
    accent: 'text-fuchsia-300',
    glow: 'shadow-fuchsia-600/20',
  },
  {
    number: '04',
    icon: '🚀',
    title: 'Approve once. Post everywhere.',
    body: 'Hit approve and Stryng handles scheduling, publishing, and cross-platform formatting automatically — 24/7.',
    color: 'from-emerald-600 to-teal-800',
    accent: 'text-emerald-300',
    glow: 'shadow-emerald-600/20',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            The Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            From product page to{' '}
            <span className="gradient-text">viral post</span> in 4 steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            No creative briefs. No Slack threads. No agency invoices.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className={`group relative rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xl ${step.glow} overflow-hidden cursor-default`}
            >
              {/* Number */}
              <div className={`absolute -top-4 -right-2 text-7xl font-black opacity-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent select-none`}>
                {step.number}
              </div>

              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}
              >
                {step.icon}
              </motion.div>

              {/* Connector line for desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-[46px] right-0 w-6 border-t border-dashed border-white/10 translate-x-full z-10" />
              )}

              <div className={`text-xs font-bold uppercase tracking-widest ${step.accent} mb-2`}>
                Step {step.number}
              </div>
              <h3 className="text-white font-bold text-base mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: step.title }} />
              <p className="text-white/50 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.body }} />
            </motion.div>
          ))}
        </div>

        {/* Arrow flow connector (mobile) */}
        <div className="flex lg:hidden justify-center mt-8">
          <div className="flex items-center gap-2 text-white/20 text-sm">
            {STEPS.map((_, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-600" />
                {i < STEPS.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
