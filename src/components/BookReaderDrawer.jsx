import React, { useEffect } from "react";
import { BookCover } from "./BookCover";
import { StarRating } from "./StarRating";
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  Quote,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function BookReaderDrawer({
  book,
  isOpen,
  onClose,
  onNextBook,
  onPrevBook,
  hasNext,
  hasPrev,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNextBook();
      if (e.key === "ArrowLeft" && hasPrev) onPrevBook();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNextBook, onPrevBook, hasNext, hasPrev]);

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-xl bg-white dark:bg-[#0e1017] text-slate-900 dark:text-white border-l border-slate-200/80 dark:border-white/[0.08] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
                <BookOpen size={13} className="text-indigo-500" />
                <span>Reading Dossier</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center border border-slate-200 dark:border-white/[0.08] rounded-lg p-0.5 bg-white dark:bg-zinc-800">
                <button
                  onClick={onPrevBook}
                  disabled={!hasPrev}
                  className="p-1 rounded text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous Volume (Left Arrow)"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={onNextBook}
                  disabled={!hasNext}
                  className="p-1 rounded text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next Volume (Right Arrow)"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors ml-1"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="shrink-0">
                <BookCover
                  coverUrl={book.coverUrl}
                  title={book.title}
                  author={book.author}
                  size="lg"
                  className="shadow-xl"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    <CheckCircle2 size={12} />
                    <span>Completed</span>
                  </span>

                  {book.publishedYear && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-zinc-400 text-xs font-mono font-medium">
                      {book.publishedYear}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {book.title}
                </h2>

                <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                  by <span className="text-slate-900 dark:text-zinc-200 font-semibold">{book.author}</span>
                </p>

                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                  <StarRating rating={book.rating || 5} size={16} />
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    ★ {book.rating || 5}.0
                  </span>
                </div>

                {book.genres && book.genres.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                    {book.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium border border-indigo-200/50 dark:border-indigo-800/50"
                      >
                        #{g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {book.favoriteQuote && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider font-semibold">
                  <Quote size={13} />
                  <span>Key Quote</span>
                </div>
                <p className="text-xs sm:text-sm italic text-slate-800 dark:text-zinc-200 leading-relaxed font-serif">
                  "{book.favoriteQuote}"
                </p>
              </div>
            )}

            {book.myThoughts && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-400 font-semibold">
                  <Sparkles size={13} className="text-amber-500" />
                  <span>Reader's Impressions & Reflections</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed space-y-2">
                  <p>{book.myThoughts}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-400 font-semibold">
                <Layers size={13} className="text-indigo-500" />
                <span>Synopsis & Overview</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                <p className="whitespace-pre-line">
                  {book.description || "Detailed literary overview is currently cataloged in the personal vault archive."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                  Catalog ID
                </span>
                <span className="text-xs font-mono text-slate-700 dark:text-zinc-300 font-medium">
                  {book.id}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                  Status
                </span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={12} />
                  <span>Archived in Library</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-zinc-500 font-mono text-[11px]">
              Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">Esc</kbd> to close
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-slate-900 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
