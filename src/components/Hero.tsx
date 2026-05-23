'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useAnimate,
  stagger,
  useMotionValue,
  useSpring,
} from 'motion/react';
import MagneticButton from './MagneticButton';

const TYPING_URL = 'https://yourstore.com/products';
const TYPING_SPEED = 60; // ms per char

const SOCIAL_MOCKUPS = [
  {
    id: 'instagram-square',
    platform: 'Instagram',
    color: '#E1306C',
    bg: 'from-pink-600/20 to-purple-600/20',
    icon: '📸',
    label: 'Product Reel',
    size: 'col-span-1 row-span-2',
    delay: 0,
  },
  {
    id: 'tiktok-vertical',
    platform: 'TikTok',
    color: '#69C9D0',
    bg: 'from-cyan-500/20 to-black/40',
    icon: '🎵',
    label: 'Viral Short',
    size: 'col-span-1 row-span-1',
    delay: 0.08,
  },
  {
    id: 'linkedin-post',
    platform: 'LinkedIn',
    color: '#0A66C2',
    bg: 'from-blue-600/20 to-slate-800/40',
    icon: '💼',
    label: 'Brand Story',
    size: 'col-span-1 row-span-1',
    delay: 0.16,
  },
  {
    id: 'facebook-carousel',
    platform: 'Facebook',
    color: '#1877F2',
    bg: 'from-blue-500/20 to-indigo-800/40',
    icon: '🎠',
    label: 'Carousel Ad',
    size: 'col-span-1 row-span-1',
    delay: 0.24,
  },
  {
    id: 'twitter-post',
    platform: 'X / Twitter',
    color: '#FFFFFF',
    bg: 'from-white/10 to-zinc-800/40',
    icon: '𝕏',
    label: 'Trending Post',
    size: 'col-span-1 row-span-1',
    delay: 0.32,
  },
];

// Floating particle component
function Particle({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{ left: '50%', top: '50%', backgroundColor: color }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{
        opacity: 0,
        x: x,
        y: y,
        scale: [1, 1.5, 0],
      }}
      transition={{ duration: 0.8 + Math.random() * 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

// Animated count-up for stat numbers
function AnimatedStat({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const steps = 40;
    const inc = value / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= value) { setDisplay(value); clearInterval(id); return; }
      setDisplay(Math.floor(cur));
    }, 35);
    return () => clearInterval(id);
  }, [started, value]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {display}{suffix}
    </motion.span>
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showMockups, setShowMockups] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);
  const [scope, animate] = useAnimate();
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const PARTICLE_COLORS = ['#5b63f5', '#7b8fff', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];

  const triggerExplosion = () => {
    const newParticles = Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const dist = 60 + Math.random() * 100;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        delay: i * 0.02,
      };
    });
    setParticles(newParticles);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 1500);
  };

  const runLoop = () => {
    // Reset
    setTypedText('');
    setIsTyping(true);
    setSubmitted(false);
    setShowMockups(false);

    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTypedText(TYPING_URL.slice(0, i));
      if (i >= TYPING_URL.length) {
        clearInterval(intervalRef.current!);
        setIsTyping(false);
        // Submit after brief pause
        setTimeout(() => {
          setSubmitted(true);
          triggerExplosion();
          setTimeout(() => setShowMockups(true), 200);
        }, 600);
      }
    }, TYPING_SPEED);
  };

  useEffect(() => {
    // Initial delay then start loop
    const startTimer = setTimeout(() => {
      runLoop();
    }, 800);

    return () => {
      clearTimeout(startTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, []); // eslint-disable-line

  // Restart loop when mockups finish displaying
  useEffect(() => {
    if (showMockups) {
      loopRef.current = setTimeout(() => {
        runLoop();
      }, 5000);
    }
    return () => { if (loopRef.current) clearTimeout(loopRef.current); };
  }, [showMockups]); // eslint-disable-line

  const stats = [
    { value: 10, suffix: 'x', label: 'faster content' },
    { value: 80, suffix: '%', label: 'less overhead' },
    { value: 3, suffix: 'x', label: 'engagement lift' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 grid-bg">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-600/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center gap-8 py-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-950/80 border border-brand-800/60 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-slow" />
          <span className="text-brand-300 text-sm font-medium">AI-Powered Social Media Agency</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl"
        >
          Stryng turns your store links into{' '}
          <span className="gradient-text">scroll-stopping social posts</span>{' '}
          while you sleep.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
        >
          No complex prompts. Just paste your link, approve your calendar, and watch your brand grow.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton
            href="https://app.stryng.io/accounts/register/"
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-2xl shadow-brand-600/30 border border-brand-500/30"
          >
            Start Free — No Card Required
          </MagneticButton>
          <MagneticButton
            href="#how-it-works"
            className="text-white/70 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
          >
            See How It Works ↓
          </MagneticButton>
        </motion.div>

        {/* ===== BROWSER DEMO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl mt-4"
          ref={scope}
        >
          {/* Browser shell */}
          <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            {/* Browser chrome */}
            <div className="bg-[#141420] border-b border-surface-border px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              {/* URL bar with typing */}
              <div className="flex-1 relative">
                <div className="bg-[#0d0d1a] border border-surface-border rounded-lg px-3 py-1.5 flex items-center gap-2 overflow-hidden">
                  <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-mono text-white/60 truncate flex-1">
                    {typedText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.5 h-3 bg-brand-400 ml-px align-middle"
                      />
                    )}
                  </span>
                  {/* Submit button */}
                  <AnimatePresence>
                    {!isTyping && !submitted && (
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                        onClick={() => {
                          setSubmitted(true);
                          triggerExplosion();
                          setTimeout(() => setShowMockups(true), 200);
                        }}
                        className="flex-shrink-0 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded-md"
                      >
                        Generate →
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="relative min-h-[280px] p-6 overflow-hidden">
              {/* Idle / loading state */}
              <AnimatePresence mode="wait">
                {!submitted && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-brand-950 border border-brand-800/40 flex items-center justify-center">
                        <svg className="w-7 h-7 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <p className="text-white/40 text-sm font-medium">
                        {isTyping ? 'Analyzing your store…' : 'Ready to generate content'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Particle burst */}
              {showParticles && particles.map((p) => (
                <Particle key={p.id} x={p.x} y={p.y} color={p.color} delay={p.delay} />
              ))}

              {/* Social mockup grid */}
              <AnimatePresence>
                {showMockups && (
                  <motion.div
                    key="mockups"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-3 gap-3 h-full"
                  >
                    {SOCIAL_MOCKUPS.map((mock) => (
                      <motion.div
                        key={mock.id}
                        initial={{ opacity: 0, scale: 0.5, rotate: -8 + Math.random() * 16 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 18,
                          delay: mock.delay,
                        }}
                        className={`${mock.size} rounded-xl bg-gradient-to-br ${mock.bg} border border-white/10 backdrop-blur-sm p-4 flex flex-col justify-between min-h-[100px] relative overflow-hidden`}
                      >
                        {/* Shimmer */}
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.5, delay: mock.delay + 0.3, ease: 'easeInOut' }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent skew-x-12"
                        />
                        <div className="flex items-start justify-between">
                          <span className="text-2xl">{mock.icon}</span>
                          <span
                            className="platform-pill text-[10px]"
                            style={{
                              background: `${mock.color}22`,
                              color: mock.color,
                              border: `1px solid ${mock.color}44`,
                            }}
                          >
                            {mock.platform}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white/80 mb-1">{mock.label}</div>
                          {/* Fake content lines */}
                          <div className="space-y-1">
                            <div className="h-1.5 bg-white/10 rounded-full w-3/4" />
                            <div className="h-1.5 bg-white/10 rounded-full w-1/2" />
                          </div>
                        </div>
                        {/* Ready badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: mock.delay + 0.5, type: 'spring', stiffness: 400, damping: 15 }}
                          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating "approved" badge */}
          <AnimatePresence>
            {showMockups && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-emerald-500 text-white font-bold text-sm px-4 py-2 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center gap-2"
              >
                <span>✓</span> 5 posts ready
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glow reflection */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/20 via-transparent to-purple-600/10 pointer-events-none" />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-8 sm:gap-16 pt-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold gradient-text">
                <AnimatedStat value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
