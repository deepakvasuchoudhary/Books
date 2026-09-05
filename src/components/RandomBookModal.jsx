import React, { useEffect } from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { X, Sparkles, Dices, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RandomBookModal({
  isOpen,
  book,
  onClose,
  onPickAnother,
  onSelectBook,
}) {
  useEffect(() => {
    if (isOpen && book) {
      // Fire literary celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d97706', '#f59e0b', '#b45309', '#eab308', '#78350f'],
      });
    }
  }, [isOpen, book]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key.toLowerCase() === 'r') onPickAnother();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPickAnother]);

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#12151d] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-amber-500/20 dark:border-amber-400/15 overflow-hidden z-10 my-8 p-6 sm:p-8">
        {/* Glow ambient spot */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Sparkles size={15} />
            <span>Curator's Random Selection</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Center Presentation */}
        <div className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              gradient={book.coverGradient}
              size="md"
              ribbon={book.favorite}
              className="hover:scale-105 transition-transform duration-300 shadow-xl"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2.5 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              {book.publishedYear && (
                <span className="font-mono text-stone-400 dark:text-stone-500">
                  {book.publishedYear}
                </span>
              )}
              {book.genres?.[0] && (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium text-[11px]">
                  {book.genres[0]}
                </span>
              )}
              {book.favorite && (
                <span className="flex items-center gap-1 text-rose-500 text-xs">
                  <Heart size={12} className="fill-rose-500" /> Favorite
                </span>
              )}
            </div>

            <h3 className="font-serif font-bold text-2xl text-stone-950 dark:text-stone-50 leading-tight">
              {book.title}
            </h3>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
              by <span className="text-stone-900 dark:text-stone-200 font-serif">{book.author}</span>
            </p>

            <div className="pt-1 flex justify-center sm:justify-start">
              <StarRating rating={book.rating} size={15} />
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed font-sans pt-1">
              {book.description || book.myThoughts || 'A profound literary work awaiting your inspection.'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onPickAnother}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Dices size={15} />
            <span>Draw Another Volume (R)</span>
          </button>

          <button
            onClick={() => {
              onSelectBook(book);
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-amber-900/20 transition-colors cursor-pointer"
          >
            <span>Inspect Full Dossier</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
