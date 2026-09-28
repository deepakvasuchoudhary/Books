import React from "react";
import { BookCover } from "./BookCover";
import { StarRating } from "./StarRating";
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Bookmark,
  Quote,
} from "lucide-react";

export function BentoHero({
  spotlightBook,
  onSelectBook,
  counts,
  availableGenres,
}) {
  if (!spotlightBook) return null;

  return (
    <section className="p-4 sm:p-6 lg:p-8 pb-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Spotlight Feature Volume Card */}
        <div className="lg:col-span-7 rounded-[28px] p-6 sm:p-8 liquid-glass liquid-glass-interactive relative overflow-hidden flex flex-col justify-between group">
          {/* Optical Glow Refraction Inside Glass */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-[#0071e3]/20 via-[#42a5f5]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside Card */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071e3]"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0071e3] dark:text-[#2997ff] font-semibold">
                Spotlight Selection
              </span>
            </div>

            {spotlightBook.genres?.[0] && (
              <span className="px-3 py-0.5 rounded-full liquid-glass-subtle text-[#0071e3] dark:text-[#2997ff] text-[11px] font-medium border border-[#0071e3]/20">
                #{spotlightBook.genres[0]}
              </span>
            )}
          </div>

          {/* Center Book Content */}
          <div className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div
              onClick={() => onSelectBook(spotlightBook)}
              className="shrink-0 cursor-pointer group-hover:scale-105 transition-transform duration-300 book-spine-depth"
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

        {/* Right Stack: Apple Metrics Grid & Literary Maxim */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3.5 p-4 sm:p-5 rounded-[28px] liquid-glass">
            <div className="p-3.5 rounded-[18px] liquid-glass-subtle liquid-glass-interactive">
              <div className="flex items-center gap-1.5 text-[#86868b] dark:text-[#a1a1a6] text-[11px] font-medium">
                <BookOpen size={13} className="text-[#0071e3]" />
                <span>Total Volumes</span>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                {counts.all}
              </div>
              <div className="text-[10px] text-[#34c759] font-medium mt-0.5">
                100% Curated
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] liquid-glass-subtle liquid-glass-interactive">
              <div className="flex items-center gap-1.5 text-[#86868b] dark:text-[#a1a1a6] text-[11px] font-medium">
                <Award size={13} className="text-[#ff9f0a]" />
                <span>5-Star Classics</span>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                {counts.five_stars}
              </div>
              <div className="text-[10px] text-[#86868b] dark:text-[#a1a1a6] font-medium mt-0.5">
                Hall of fame
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] liquid-glass-subtle liquid-glass-interactive">
              <div className="flex items-center gap-1.5 text-[#86868b] dark:text-[#a1a1a6] text-[11px] font-medium">
                <TrendingUp size={13} className="text-[#34c759]" />
                <span>Est. Pages</span>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                25.4k
              </div>
              <div className="text-[10px] text-[#86868b] dark:text-[#a1a1a6] font-medium mt-0.5">
                Across 81 books
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] liquid-glass-subtle liquid-glass-interactive">
              <div className="flex items-center gap-1.5 text-[#86868b] dark:text-[#a1a1a6] text-[11px] font-medium">
                <Bookmark size={13} className="text-[#af52de]" />
                <span>Curated Topics</span>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                {availableGenres.length}
              </div>
              <div className="text-[10px] text-[#86868b] dark:text-[#a1a1a6] font-medium mt-0.5">
                Indexed shelves
              </div>
            </div>
          </div>

          {/* Literary Maxim Glass Card */}
          <div className="p-5 sm:p-6 rounded-[24px] liquid-glass liquid-glass-interactive apple-gloss-sheen relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#af52de] dark:text-[#bf5af2] text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Quote size={13} />
              <span>Literary Maxim</span>
            </div>

            <p className="text-xs sm:text-sm italic text-[#1d1d1f]/90 dark:text-[#f5f5f7]/90 leading-relaxed font-serif my-3">
              "The courage to be disliked is the courage to live one's authentic freedom without seeking validation."
            </p>

            <div className="flex items-center justify-between text-[11px] text-[#86868b] dark:text-[#a1a1a6] font-medium pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
              <span>The Courage to be Disliked</span>
              <span className="font-mono text-[#af52de] dark:text-[#bf5af2] font-semibold">
                Ichiro Kishimi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
