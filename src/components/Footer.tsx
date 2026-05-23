'use client';

import { motion } from 'motion/react';

const LINKS = {
  Product: ['How it Works', 'Features', 'Pricing', 'Featured Work', 'Blog'],
  Company: ['About', 'Contact Us', 'FAQ', 'Terms of Service', 'Privacy Policy'],
  Connect: ['X / Twitter', 'LinkedIn', 'YouTube', 'Instagram'],
};

const SOCIAL_LINKS = [
  { name: 'Twitter/X', href: 'https://x.com/stryngio', icon: '𝕏' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/stryngai/', icon: 'in' },
  { name: 'YouTube', href: 'https://www.youtube.com/@StryngAi', icon: '▶' },
  { name: 'Instagram', href: 'https://www.instagram.com/stryng.ai/', icon: '◎' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-surface overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8C3 5.24 5.24 3 8 3s5 2.24 5 5-2.24 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 6v4M6 8h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">stryng</span>
            </motion.div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Your AI-powered social media agency. We handle your content so you can focus on building your business.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="w-9 h-9 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center text-white/40 hover:text-white hover:border-brand-600/50 transition-colors text-xs font-bold"
                  aria-label={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.06 }}
            >
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={`https://stryng.io/${item.toLowerCase().replace(/ /g, '-').replace('/', '').replace('twitter', 'x')}/`}
                      className="text-white/40 hover:text-white/80 text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/25 text-sm"
          >
            © 2026 STRYNG. All rights reserved. &nbsp;·&nbsp; STRYNG DIGITAL j.d.o.o.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/20 text-xs"
          >
            Made with <span className="text-brand-400">⚡</span> for founders who move fast
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
