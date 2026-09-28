import React, { useEffect } from "react";
import { BookCover } from "./BookCover";
import { StarRating } from "./StarRating";
import { X, Sparkles, Dices, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export function RandomBookModal({
  isOpen,
  book,
  onClose,
  onPickAnother,
  onSelectBook,
}) {
  useEffect(() => {
    if (isOpen && book) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"],
      });
    }
  }, [isOpen, book]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key.toLowerCase() === "r") onPickAnother();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPickAnother]);

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg liquid-glass text-[#1d1d1f] dark:text-[#f5f5f7] rounded-[28px] shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-7 liquid-glass-interactive">
        {/* Apple Optical Glow Refraction Inside Modal */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#0071e3]/20 via-[#42a5f5]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex items-center gap-2 text-[#0071e3] dark:text-[#2997ff] font-mono text-xs uppercase tracking-wider font-semibold">
            <Sparkles size={15} />
            <span>Little Nalanda Discovery</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full liquid-glass-subtle text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 book-spine-depth">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              size="md"
              className="shadow-2xl"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2.5 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              {book.publishedYear && (
                <span className="font-mono text-[#86868b]">
                  {book.publishedYear}
                </span>
              )}
              {book.genres?.[0] && (
                <span className="px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#0071e3] dark:text-[#2997ff] font-medium text-[11px] border border-[#0071e3]/20">
                  #{book.genres[0]}
                </span>
              )}
            </div>

            <h3 className="font-semibold text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-snug">
              {book.title}
            </h3>
            <p className="text-xs font-normal text-[#86868b] dark:text-[#a1a1a6]">
              by <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold">{book.author}</span>
            </p>

            <div className="pt-1 flex justify-center sm:justify-start">
              <StarRating rating={book.rating || 5} size={14} />
            </div>

            <p className="text-xs text-[#86868b] dark:text-[#a1a1a6] line-clamp-3 leading-relaxed pt-1 font-normal">
              {book.description || "A cornerstone volume in this curated personal archive."}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onPickAnother}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 border border-black/[0.06] dark:border-white/[0.08]"
          >
            <Dices size={15} className="text-[#0071e3]" />
            <span>Draw Another (R)</span>
          </button>

          <button
            onClick={() => {
              onSelectBook(book);
              onClose();
            }}
            className="w-full sm:w-auto apple-btn-primary px-5 py-2.5 rounded-full text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Reader Dossier</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
