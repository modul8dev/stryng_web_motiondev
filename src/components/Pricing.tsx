'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MagneticButton from './MagneticButton';

const PLANS = [
  {
    id: 'start',
    name: 'Start',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'Perfect for solo founders launching their brand.',
    credits: 50,
    profiles: 1,
    features: [
      '50 content credits / mo',
      '1 brand profile',
      'Instagram, TikTok, Facebook',
      'Auto-scheduling',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaHref: 'https://app.stryng.io/accounts/register/',
    highlight: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'For growing brands running multiple products.',
    credits: 300,
    profiles: 3,
    features: [
      '300 content credits / mo',
      '3 brand profiles',
      'All platforms + LinkedIn',
      'Priority auto-scheduling',
      'Advanced analytics & insights',
      'A/B ad testing',
      'Priority support',
    ],
    cta: 'Get Pro',
    ctaHref: 'https://app.stryng.io/accounts/register/?plan=pro',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'Custom solutions for agencies and large stores.',
    credits: null,
    profiles: null,
    features: [
      'Unlimited credits',
      'Unlimited brand profiles',
      'White-label option',
      'Custom integrations',
      'Dedicated account manager',
      'SLA + 24/7 support',
    ],
    cta: 'Talk to Sales',
    ctaHref: 'mailto:info@stryng.io',
    highlight: false,
    badge: null,
  },
];

// Animated price number
function AnimatedPrice({ price, prefix = '$', suffix = '/mo' }: { price: number | null; prefix?: string; suffix?: string }) {
  const [displayPrice, setDisplayPrice] = useState(price ?? 0);
  const [prevPrice, setPrevPrice] = useState(price ?? 0);

  useEffect(() => {
    if (price === null) return;
    const start = prevPrice;
    const end = price;
    const diff = end - start;
    if (diff === 0) return;

    const steps = 20;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayPrice(Math.round(start + diff * eased));
      if (step >= steps) {
        clearInterval(id);
        setDisplayPrice(end);
        setPrevPrice(end);
      }
    }, 20);

    return () => clearInterval(id);
  }, [price]); // eslint-disable-line

  if (price === null) {
    return (
      <span className="text-4xl font-extrabold text-white">Custom</span>
    );
  }

  return (
    <span className="text-4xl font-extrabold text-white">
      {prefix}
      <motion.span
        key={displayPrice}
        className="inline-block tabular-nums"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        {displayPrice}
      </motion.span>
      <span className="text-lg font-medium text-white/40">{suffix}</span>
    </span>
  );
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (plan: typeof PLANS[0]) => {
    if (plan.monthlyPrice === null) return null;
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            All-inclusive. No surprises.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-white/50 text-lg max-w-xl mx-auto mb-10"
          >
            Cancel anytime. Start free — no credit card required.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-4"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-white' : 'text-white/40'}`}
            >
              Monthly
            </button>

            {/* Animated switch */}
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-surface-card border border-surface-border flex items-center px-1"
            >
              <motion.div
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="w-5 h-5 rounded-full bg-brand-500 shadow-lg shadow-brand-500/40"
              />
            </button>

            <button
              onClick={() => setIsAnnual(true)}
              className={`text-sm font-semibold transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-white/40'}`}
            >
              Annual
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30"
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => {
            const price = getPrice(plan);
            const isPro = plan.highlight;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: isPro ? -8 : -4,
                  transition: { type: 'spring', stiffness: 380, damping: 22 },
                }}
                className={`relative rounded-2xl border p-7 flex flex-col ${
                  isPro
                    ? 'border-brand-500/60 bg-gradient-to-b from-brand-950/80 to-surface-card shadow-2xl shadow-brand-600/20'
                    : 'border-surface-border bg-surface-card'
                }`}
              >
                {/* Pro glow ring */}
                {isPro && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none" />
                )}

                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    whileInView={{ scale: 1, rotate: -6 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i * 0.1 + 0.3 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-lg shadow-brand-600/40 whitespace-nowrap"
                  >
                    ⭐ {plan.badge}
                  </motion.div>
                )}

                {/* Plan name */}
                <div className="mb-4">
                  <h3 className={`text-lg font-bold ${isPro ? 'text-brand-300' : 'text-white'}`}>{plan.name}</h3>
                  <p className="text-white/40 text-sm mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-surface-border">
                  <AnimatedPrice price={price} />
                  {isAnnual && price !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 text-sm text-white/40"
                    >
                      <span className="line-through text-white/25">${plan.monthlyPrice}/mo</span>{' '}
                      <span className="text-emerald-400 font-semibold">save ${(plan.monthlyPrice! - price!) * 12}/yr</span>
                    </motion.div>
                  )}
                  {plan.credits && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-xs font-medium border border-white/8">
                        {plan.credits} credits
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/50 text-xs font-medium border border-white/8">
                        {plan.profiles} {plan.profiles === 1 ? 'profile' : 'profiles'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07 + fi * 0.04 }}
                      className="flex items-start gap-2.5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 + fi * 0.04 + 0.15, type: 'spring', stiffness: 500, damping: 18 }}
                        className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${isPro ? 'bg-brand-600' : 'bg-white/10'}`}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                      <span className="text-sm text-white/60">{f}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <MagneticButton
                  href={plan.ctaHref}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all ${
                    isPro
                      ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
                      : 'bg-white/8 hover:bg-white/12 text-white border border-white/10'
                  }`}
                >
                  {plan.cta} →
                </MagneticButton>
              </motion.div>
            );
          })}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          ✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ GDPR compliant
        </motion.p>
      </div>
    </section>
  );
}
