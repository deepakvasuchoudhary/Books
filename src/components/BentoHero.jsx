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
    <section className="p-4 sm:p-6 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50/50 dark:from-[#131726] dark:via-[#0e111a] dark:to-[#0a0c12] border border-indigo-100 dark:border-white/[0.08] shadow-sm relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-indigo-100/70 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-700 dark:text-indigo-400 font-bold">
                Featured Selection
              </span>
            </div>

            {spotlightBook.genres?.[0] && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-100/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium border border-indigo-200/50 dark:border-indigo-800/50">
                #{spotlightBook.genres[0]}
              </span>
            )}
          </div>

          <div className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div
              onClick={() => onSelectBook(spotlightBook)}
              className="shrink-0 cursor-pointer group-hover:scale-105 transition-transform duration-300"
            >
              <BookCover
                coverUrl={spotlightBook.coverUrl}
                title={spotlightBook.title}
                author={spotlightBook.author}
                size="md"
                className="shadow-xl"
              />
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <StarRating rating={spotlightBook.rating || 5} size={14} />
                <span className="text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
                  5.0 / 5.0
                </span>
                {spotlightBook.publishedYear && (
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
                    • {spotlightBook.publishedYear}
                  </span>
                )}
              </div>

              <h2
                onClick={() => onSelectBook(spotlightBook)}
                className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
              >
                {spotlightBook.title}
              </h2>

              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400">
                by <span className="text-slate-900 dark:text-zinc-200 font-semibold">{spotlightBook.author}</span>
              </p>

              <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed pt-1">
                {spotlightBook.description || "A cornerstone volume in this curated personal archive."}
              </p>

              <div className="pt-2 flex justify-center sm:justify-start">
                <button
                  onClick={() => onSelectBook(spotlightBook)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer group/btn"
                >
                  <span>Open Dossier & Notes</span>
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-[#11131c] border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
            <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-400 text-[11px] font-medium">
                <BookOpen size={14} className="text-indigo-500" />
                <span>Total Volumes</span>
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {counts.all}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                100% Cataloged
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-400 text-[11px] font-medium">
                <Award size={14} className="text-amber-500" />
                <span>5-Star Gems</span>
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {counts.five_stars}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                Masterpiece status
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-400 text-[11px] font-medium">
                <TrendingUp size={14} className="text-emerald-500" />
                <span>Est. Pages</span>
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                25.4k
              </div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                Across 81 books
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.05]">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-400 text-[11px] font-medium">
                <Bookmark size={14} className="text-violet-500" />
                <span>Topics</span>
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {availableGenres.length}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
                Curated shelves
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-violet-500/10 via-indigo-500/5 to-transparent dark:bg-gradient-to-r dark:from-violet-950/30 dark:via-indigo-950/20 dark:to-transparent border border-violet-200/60 dark:border-white/[0.08] relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Quote size={13} />
              <span>Literary Maxim</span>
            </div>

            <p className="text-xs sm:text-sm italic text-slate-700 dark:text-zinc-300 leading-relaxed font-serif my-2">
              "The courage to be disliked is the courage to live one's authentic freedom without seeking validation."
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 font-medium pt-1 border-t border-slate-200/50 dark:border-white/[0.05]">
              <span>The Courage to be Disliked</span>
              <span className="font-mono text-violet-600 dark:text-violet-400 font-semibold">
                Ichiro Kishimi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
