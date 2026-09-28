import React from "react";
import { BookCover } from "./BookCover";
import { StarRating } from "./StarRating";
import {
  ArrowRight,
  Quote,
  Activity,
  Sparkles,
  Zap,
} from "lucide-react";

export function BentoHero({
  spotlightBook,
  onSelectBook,
  counts,
  allBooks = [],
}) {
  if (!spotlightBook) return null;

  // Curated sample of books for the flowing marquee ribbon
  const marqueeBooks = allBooks.slice(0, 16);

  return (
    <section className="p-4 sm:p-6 lg:p-8 pb-4 space-y-5">
      {/* Top Bento Row: Spotlight (with Flowing Border) + Metrics & Live Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tile 1: Spotlight Masterpiece with Flowing Prismatic Liquid Border */}
        <div className="lg:col-span-7 apple-flowing-border-wrap shadow-xl">
          {/* Continuous Flowing Iridescent Border Beam */}
          <div className="apple-flowing-border-glow" />

          {/* Inner Liquid Glass Card */}
          <div className="apple-flowing-border-inner liquid-glass p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative">
            {/* Flowing Living Aurora Blobs Inside Glass */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-[#0071e3]/30 via-[#af52de]/20 to-transparent rounded-full blur-3xl pointer-events-none apple-aurora-1" />
            <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-gradient-to-tr from-[#ff2d55]/20 via-[#ff9f0a]/20 to-transparent rounded-full blur-3xl pointer-events-none apple-aurora-2" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.06] relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071e3]"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0071e3] dark:text-[#2997ff] font-semibold flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Spotlight Masterpiece</span>
                </span>
              </div>

              {spotlightBook.genres?.[0] && (
                <span className="px-3 py-0.5 rounded-full liquid-glass-subtle text-[#0071e3] dark:text-[#2997ff] text-[11px] font-medium border border-[#0071e3]/20">
                  #{spotlightBook.genres[0]}
                </span>
              )}
            </div>

            {/* Center Book Content */}
            <div className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              <div
                onClick={() => onSelectBook(spotlightBook)}
                className="shrink-0 cursor-pointer group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] book-spine-depth"
              >
                <BookCover
                  coverUrl={spotlightBook.coverUrl}
                  title={spotlightBook.title}
                  author={spotlightBook.author}
                  size="md"
                  className="shadow-2xl"
                />
              </div>

              <div className="flex-1 space-y-2.5 text-center sm:text-left min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <StarRating rating={spotlightBook.rating || 5} size={14} />
                  <span className="text-xs font-mono font-medium text-[#ff9f0a]">
                    5.0 / 5.0
                  </span>
                  {spotlightBook.publishedYear && (
                    <span className="text-xs text-[#86868b] dark:text-[#a1a1a6] font-mono">
                      • {spotlightBook.publishedYear}
                    </span>
                  )}
                </div>

                <h2
                  onClick={() => onSelectBook(spotlightBook)}
                  className="text-xl sm:text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight leading-snug cursor-pointer hover:text-[#0071e3] dark:hover:text-[#2997ff] transition-colors line-clamp-2"
                >
                  {spotlightBook.title}
                </h2>

                <p className="text-xs sm:text-sm font-medium text-[#86868b] dark:text-[#a1a1a6]">
                  by <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold">{spotlightBook.author}</span>
                </p>

                <p className="text-xs text-[#86868b] dark:text-[#a1a1a6] line-clamp-3 leading-relaxed pt-1">
                  {spotlightBook.description || "A cornerstone volume in this curated personal archive."}
                </p>

                <div className="pt-3 flex justify-center sm:justify-start">
                  <button
                    onClick={() => onSelectBook(spotlightBook)}
                    className="apple-btn-primary px-5 py-2.5 rounded-full text-xs font-medium inline-flex items-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Explore Dossier</span>
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Stack: Flowing Equalizer Tile & Orbital Activity Tile */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Tile 2: Flowing "Live Reading Flow" Soundwave Tile */}
          <div className="p-5 rounded-[26px] liquid-glass liquid-glass-interactive relative overflow-hidden flex flex-col justify-between group">
            {/* Ambient Flow Glow */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-gradient-to-tr from-[#34c759]/20 via-[#0071e3]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06] relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#34c759] font-semibold">
                  Live Reading Flow
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full liquid-glass-subtle text-[#86868b] dark:text-[#a1a1a6]">
                45 p/hr Velocity
              </span>
            </div>

            {/* Harmonic Flowing Frequency Bars */}
            <div className="py-4 flex items-end justify-between gap-1.5 h-16 px-1 relative z-10">
              {[
                { delay: "0.1s", color: "from-[#34c759] to-[#30d158]" },
                { delay: "0.35s", color: "from-[#30d158] to-[#0071e3]" },
                { delay: "0.2s", color: "from-[#0071e3] to-[#42a5f5]" },
                { delay: "0.5s", color: "from-[#42a5f5] to-[#af52de]" },
                { delay: "0.15s", color: "from-[#af52de] to-[#bf5af2]" },
                { delay: "0.45s", color: "from-[#bf5af2] to-[#ff2d55]" },
                { delay: "0.25s", color: "from-[#ff2d55] to-[#ff9f0a]" },
                { delay: "0.6s", color: "from-[#ff9f0a] to-[#34c759]" },
                { delay: "0.3s", color: "from-[#34c759] to-[#0071e3]" },
                { delay: "0.15s", color: "from-[#0071e3] to-[#42a5f5]" },
                { delay: "0.4s", color: "from-[#42a5f5] to-[#af52de]" },
                { delay: "0.2s", color: "from-[#af52de] to-[#34c759]" },
              ].map((bar, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-full bg-gradient-to-t ${bar.color} apple-wave-bar shadow-sm`}
                  style={{ animationDelay: bar.delay }}
                />
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#86868b] dark:text-[#a1a1a6] relative z-10 border-t border-black/[0.04] dark:border-white/[0.06]">
              <span className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Continuous Momentum</span>
              <span className="font-mono text-[11px] text-[#34c759] font-medium flex items-center gap-1">
                <Zap size={11} className="fill-[#34c759]" />
                <span>Synchronized</span>
              </span>
            </div>
          </div>

          {/* Tile 3: Orbital Activity Rings & Metrics Tile */}
          <div className="p-5 rounded-[26px] liquid-glass liquid-glass-interactive relative overflow-hidden flex items-center justify-between gap-4">
            {/* Ambient Optical Halo */}
            <div className="absolute -left-10 -top-10 w-44 h-44 bg-gradient-to-br from-[#af52de]/20 via-[#0071e3]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Left: Concentric Orbit Rings */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full apple-orbit-ring" viewBox="0 0 100 100">
                {/* Outer Ring: Volumes */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray="210"
                  strokeDashoffset="35"
                  strokeLinecap="round"
                  className="text-[#0071e3] opacity-90 drop-shadow-[0_0_8px_rgba(0,113,227,0.5)]"
                />
                {/* Middle Ring: Pages */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray="150"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  className="text-[#34c759] opacity-90 drop-shadow-[0_0_8px_rgba(52,199,89,0.5)]"
                />
                {/* Inner Ring: 5-Stars */}
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray="90"
                  strokeDashoffset="15"
                  strokeLinecap="round"
                  className="text-[#ff9f0a] opacity-90 drop-shadow-[0_0_8px_rgba(255,159,10,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                81v
              </div>
            </div>

            {/* Right: Metrics Stack */}
            <div className="flex-1 space-y-2 relative z-10 min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#86868b] dark:text-[#a1a1a6] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
                  <span>Volumes</span>
                </span>
                <span className="font-mono font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{counts.all}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#86868b] dark:text-[#a1a1a6] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34c759]" />
                  <span>Pages Read</span>
                </span>
                <span className="font-mono font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">25.4k</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#86868b] dark:text-[#a1a1a6] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff9f0a]" />
                  <span>5★ Classics</span>
                </span>
                <span className="font-mono font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{counts.five_stars}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bento Row: Infinite Flowing Marquee Ribbon + Flowing Maxim Prism */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tile 4: Infinite Flowing Horizon Book Ribbon */}
        <div className="lg:col-span-8 p-4 sm:p-5 rounded-[26px] liquid-glass liquid-glass-interactive relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.04] dark:border-white/[0.06] text-xs">
            <div className="flex items-center gap-2 text-[#0071e3] dark:text-[#2997ff] font-mono text-[11px] uppercase tracking-wider font-semibold">
              <Activity size={13} className="animate-pulse" />
              <span>Flowing Horizon Stream</span>
            </div>
            <span className="text-[10px] font-mono text-[#86868b]">Continuous Stream • Hover to Pause</span>
          </div>

          {/* Marquee Track Channel with Fading Edge Masks */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="apple-marquee-track flex items-center gap-4 py-1">
              {[...marqueeBooks, ...marqueeBooks].map((book, idx) => (
                <div
                  key={`${book.id}-${idx}`}
                  onClick={() => onSelectBook(book)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-2xl liquid-glass-subtle hover:bg-white dark:hover:bg-white/[0.12] transition-all duration-300 cursor-pointer group active:scale-95 shrink-0 border border-black/[0.04] dark:border-white/[0.06] shadow-xs"
                >
                  <BookCover
                    coverUrl={book.coverUrl}
                    title={book.title}
                    author={book.author}
                    size="xs"
                    className="shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="max-w-[130px] min-w-[100px] text-left">
                    <h5 className="font-semibold text-xs text-[#1d1d1f] dark:text-[#f5f5f7] truncate group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                      {book.title}
                    </h5>
                    <p className="text-[10px] text-[#86868b] dark:text-[#a1a1a6] truncate">
                      {book.author}
                    </p>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-[#ff9f0a] font-semibold mt-0.5">
                      <span>★</span>
                      <span>{book.rating || 5}.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tile 5: Flowing Literary Maxim Glass Prism with Specular Light Ray */}
        <div className="lg:col-span-4 p-5 rounded-[26px] liquid-glass liquid-glass-interactive relative overflow-hidden flex flex-col justify-between">
          {/* Flowing Diagonal Specular Sweep Ray */}
          <div className="apple-shimmer-ray" />

          {/* Ambient Liquid Rose/Purple Mesh Inside */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-[#af52de]/20 via-[#ff2d55]/15 to-transparent rounded-full blur-3xl pointer-events-none apple-aurora-3" />

          <div className="flex items-center gap-2 text-[#af52de] dark:text-[#bf5af2] text-[11px] font-mono uppercase tracking-wider font-semibold relative z-10">
            <Quote size={13} />
            <span>Curated Maxim</span>
          </div>

          <p className="text-xs sm:text-sm italic text-[#1d1d1f]/90 dark:text-[#f5f5f7]/90 leading-relaxed font-serif my-3 relative z-10">
            "The courage to be disliked is the courage to live one's authentic freedom without seeking validation."
          </p>

          <div className="flex items-center justify-between text-[11px] text-[#86868b] dark:text-[#a1a1a6] font-medium pt-2 border-t border-black/[0.04] dark:border-white/[0.06] relative z-10">
            <span>The Courage to be Disliked</span>
            <span className="font-mono text-[#af52de] dark:text-[#bf5af2] font-semibold">
              Ichiro Kishimi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
