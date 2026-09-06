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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-[#11131c] text-slate-900 dark:text-white rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/[0.1] overflow-hidden z-10 my-8 p-6 sm:p-7">
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Sparkles size={15} />
            <span>Little Nalanda Discovery</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="shrink-0">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              size="md"
              className="shadow-xl"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              {book.publishedYear && (
                <span className="font-mono text-slate-400 dark:text-zinc-500">
                  {book.publishedYear}
                </span>
              )}
              {book.genres?.[0] && (
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium text-[11px] border border-indigo-200/50 dark:border-indigo-800/50">
                  #{book.genres[0]}
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
              {book.title}
            </h3>
            <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">
              by <span className="text-slate-900 dark:text-zinc-200 font-semibold">{book.author}</span>
            </p>

            <div className="pt-1 flex justify-center sm:justify-start">
              <StarRating rating={book.rating || 5} size={14} />
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed pt-1">
              {book.description || "A cornerstone volume in this curated personal archive."}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onPickAnother}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Dices size={15} className="text-indigo-500" />
            <span>Draw Another (R)</span>
          </button>

          <button
            onClick={() => {
              onSelectBook(book);
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
          >
            <span>Open Reader Dossier</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
