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
  Clock,
  Bookmark,
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
      {/* Apple Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside className="w-screen max-w-xl liquid-glass text-[#1d1d1f] dark:text-[#f5f5f7] border-l border-black/[0.06] dark:border-white/[0.08] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* Drawer Top Navigation Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] liquid-glass-subtle">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold flex items-center gap-1.5">
                <BookOpen size={13} className="text-[#0071e3]" />
                <span>Reading Dossier</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Apple Segmented Previous / Next Controls */}
              <div className="apple-segmented-group flex items-center">
                <button
                  onClick={onPrevBook}
                  disabled={!hasPrev}
                  className="p-1 rounded-[8px] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Previous Volume (Left Arrow)"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={onNextBook}
                  disabled={!hasNext}
                  className="p-1 rounded-[8px] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Next Volume (Right Arrow)"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full liquid-glass-subtle text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="shrink-0 book-spine-depth">
                <BookCover
                  coverUrl={book.coverUrl}
                  title={book.title}
                  author={book.author}
                  size="lg"
                  className="shadow-2xl"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {book.status === "reading" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#34c759]/10 text-[#34c759] text-xs font-medium border border-[#34c759]/20 font-mono">
                      <Clock size={12} className="animate-pulse text-[#34c759]" />
                      <span>Currently Reading</span>
                    </span>
                  ) : book.status === "want_to_read" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff9f0a]/10 text-[#ff9f0a] text-xs font-medium border border-[#ff9f0a]/20 font-mono">
                      <Bookmark size={12} />
                      <span>Reading Queue</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-medium border border-[#0071e3]/20 font-mono">
                      <CheckCircle2 size={12} />
                      <span>Completed Archive</span>
                    </span>
                  )}

                  {book.pages && (
                    <span className="px-3 py-0.5 rounded-full liquid-glass-subtle text-[#0071e3] dark:text-[#2997ff] text-xs font-mono font-medium border border-[#0071e3]/20">
                      {book.pages} pages
                    </span>
                  )}

                  {book.publishedYear && (
                    <span className="px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#86868b] text-xs font-mono font-medium">
                      {book.publishedYear}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                  {book.title}
                </h2>

                <p className="text-sm font-medium text-[#86868b] dark:text-[#a1a1a6]">
                  by <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold">{book.author}</span>
                </p>

                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                  <StarRating rating={book.rating || 5} size={15} />
                  <span className="text-xs font-mono font-bold text-[#ff9f0a]">
                    ★ {book.rating || 5}.0
                  </span>
                </div>

                {book.genres && book.genres.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                    {book.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#0071e3] dark:text-[#2997ff] text-[11px] font-medium border border-[#0071e3]/20"
                      >
                        #{g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {book.favoriteQuote && (
              <div className="p-5 rounded-[22px] liquid-glass-subtle border border-[#af52de]/20 space-y-2 apple-gloss-sheen">
                <div className="flex items-center gap-1.5 text-[#af52de] dark:text-[#bf5af2] text-xs font-mono uppercase tracking-wider font-semibold">
                  <Quote size={13} />
                  <span>Key Quote</span>
                </div>
                <p className="text-xs sm:text-sm italic text-[#1d1d1f]/90 dark:text-[#f5f5f7]/90 leading-relaxed font-serif">
                  "{book.favoriteQuote}"
                </p>
              </div>
            )}

            {book.myThoughts && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold">
                  <Sparkles size={13} className="text-[#ff9f0a]" />
                  <span>Reader's Impressions & Reflections</span>
                </div>
                <div className="p-5 rounded-[22px] liquid-glass-subtle text-xs sm:text-sm text-[#1d1d1f]/90 dark:text-[#f5f5f7]/90 leading-relaxed space-y-2 font-normal">
                  <p>{book.myThoughts}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold">
                <Layers size={13} className="text-[#0071e3]" />
                <span>Synopsis & Overview</span>
              </div>
              <div className="p-5 rounded-[22px] liquid-glass-subtle text-xs sm:text-sm text-[#1d1d1f]/90 dark:text-[#f5f5f7]/90 leading-relaxed font-normal">
                <p className="whitespace-pre-line">
                  {book.description || "Detailed literary overview is currently cataloged in the personal vault archive."}
                </p>
              </div>
            </div>

            {/* Apple Spec Metatiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-[18px] liquid-glass-subtle">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block">
                  Catalog ID
                </span>
                <span className="text-xs font-mono text-[#1d1d1f] dark:text-[#f5f5f7] font-medium truncate block mt-0.5">
                  {book.id}
                </span>
              </div>

              <div className="p-3.5 rounded-[18px] liquid-glass-subtle">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block">
                  Status
                </span>
                <span className="text-xs font-medium flex items-center gap-1 mt-0.5">
                  {book.status === "reading" ? (
                    <span className="text-[#34c759] flex items-center gap-1">
                      <Clock size={12} className="animate-pulse" />
                      <span>Reading</span>
                    </span>
                  ) : book.status === "want_to_read" ? (
                    <span className="text-[#ff9f0a] flex items-center gap-1">
                      <Bookmark size={12} />
                      <span>In Queue</span>
                    </span>
                  ) : (
                    <span className="text-[#0071e3] flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>Completed</span>
                    </span>
                  )}
                </span>
              </div>

              <div className="p-3.5 rounded-[18px] liquid-glass-subtle col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block">
                  Page Length
                </span>
                <span className="text-xs font-mono text-[#1d1d1f] dark:text-[#f5f5f7] font-medium mt-0.5 block">
                  {book.pages ? `${book.pages} pages` : "Unspecified"}
                </span>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 sm:p-5 border-t border-black/[0.04] dark:border-white/[0.06] liquid-glass-subtle flex items-center justify-between text-xs">
            <span className="text-[#86868b] font-mono text-[11px]">
              Press <kbd className="px-1.5 py-0.5 rounded-md bg-black/[0.06] dark:bg-white/[0.1] text-[#1d1d1f] dark:text-[#f5f5f7]">Esc</kbd> to close
            </span>

            <button
              onClick={onClose}
              className="apple-btn-primary px-5 py-2 rounded-full text-xs font-medium cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
