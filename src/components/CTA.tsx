'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Radial glow bg */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-800/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/8 blur-[100px] rounded-full pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-950/80 border border-brand-800/60 backdrop-blur-sm mb-6"
        >
          <span className="text-brand-300 text-sm font-medium">🚀 Join 2,400+ founders already growing</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
        >
          Stryng is your AI social media agency.
          <br />
          <span className="gradient-text">Put your product in the spotlight.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/50 text-lg max-w-xl mx-auto mb-10"
        >
          Ready to take your social content to the next level? Start free — no credit card, no commitment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href="https://app.stryng.io/accounts/register/"
            className="group relative bg-brand-600 hover:bg-brand-500 text-white font-bold px-10 py-4 rounded-2xl text-base shadow-2xl shadow-brand-600/40 border border-brand-500/30 transition-all overflow-hidden"
          >
            <span className="relative z-10">Get Started Free →</span>
            <motion.div
              className="absolute inset-0 bg-white/10 translate-x-[-100%] skew-x-12"
              animate={{ x: ['−100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
          </MagneticButton>
          <MagneticButton
            href="https://stryng.io/featured-work/"
            className="text-white/60 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
          >
            See Featured Work
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex items-center justify-center flex-wrap gap-6 mt-12 text-white/25 text-xs font-medium"
        >
          {['No credit card', 'Cancel anytime', 'GDPR compliant', 'SOC 2 ready'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
