import React, { useEffect, useState } from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import {
  X,
  Heart,
  Calendar,
  Quote,
  MessageSquare,
  Share2,
  Check,
  Tag,
  Clock
} from 'lucide-react';

export function BookDetailModal({
  book,
  isOpen,
  onClose,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const copyMarkdown = () => {
    const md = `# ${book.title}\n**Author:** ${book.author}\n**Published:** ${book.publishedYear}\n**Rating:** ${book.rating}/5\n**Status:** ${book.status}\n${book.dateRead ? `**Date Read:** ${book.dateRead}\n` : ''}\n## My Thoughts & Reflections\n${book.myThoughts || 'None'}\n\n${book.favoriteQuote ? `> "${book.favoriteQuote}"\n\n` : ''}## Description\n${book.description || 'No description'}\n`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusMap = {
    read: { label: 'Finished Reading', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' },
    reading: { label: 'Currently Reading', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800' },
    want_to_read: { label: 'Want to Read', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#fdfcf9] dark:bg-[#12151d] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-[#151922]/70 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusMap[book.status]?.color}`}>
              {statusMap[book.status]?.label}
            </span>
            {book.favorite && (
              <span className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full">
                <Heart size={12} className="fill-rose-500" />
                Favorite
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMarkdown}
              className="px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 border border-stone-200 dark:border-stone-800"
              title="Copy notes as Markdown"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <div className="w-[1px] h-4 bg-stone-200 dark:bg-stone-800 mx-1" />

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Close modal (ESC)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8 flex-1">
          {/* Main Book Presentation Row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="shrink-0 mx-auto sm:mx-0">
              <BookCover
                coverUrl={book.coverUrl}
                title={book.title}
                author={book.author}
                gradient={book.coverGradient}
                size="lg"
                className="shadow-2xl"
              />
            </div>

            <div className="flex-1 space-y-4 text-left">
              <div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-950 dark:text-white leading-tight">
                  {book.title}
                </h1>
                <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg font-medium mt-1">
                  by <span className="font-serif text-stone-900 dark:text-stone-100 font-semibold">{book.author}</span>
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-stone-200/70 dark:border-stone-800/70 text-xs">
                <div>
                  <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider block text-[10px] font-mono">Published</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm font-mono">{book.publishedYear || 'Unknown'}</span>
                </div>
                <div>
                  <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider block text-[10px] font-mono">Length</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm">{book.pages ? `${book.pages} pages` : '—'}</span>
                </div>
                <div>
                  <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider block text-[10px] font-mono">Rating</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StarRating rating={book.rating} size={14} interactive={false} />
                    <span className="font-mono font-semibold text-stone-700 dark:text-stone-300 text-xs">
                      {book.rating > 0 ? `${book.rating}.0` : 'Unrated'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reading Dates */}
              <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1">
                {book.dateStarted && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-stone-400" />
                    <span>Started: <strong className="text-stone-700 dark:text-stone-300">{book.dateStarted}</strong></span>
                  </div>
                )}
                {book.dateRead && (
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-stone-400" />
                    <span>Finished: <strong className="text-stone-700 dark:text-stone-300">{book.dateRead}</strong></span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {book.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 text-xs font-medium border border-stone-200/50 dark:border-stone-700/50 flex items-center gap-1"
                    >
                      <Tag size={10} className="opacity-60" />
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MY THOUGHTS & REFLECTIONS */}
          <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 dark:border-amber-400/15">
            <div className="flex items-center gap-2 mb-3 text-amber-800 dark:text-amber-300 font-medium text-sm tracking-wide">
              <MessageSquare size={16} />
              <span>My Thoughts & Reflections</span>
            </div>

            {book.myThoughts ? (
              <p className="font-serif text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {book.myThoughts}
              </p>
            ) : (
              <div className="text-center py-4 text-stone-400 text-sm">
                <p>No personal reflections added for this book.</p>
              </div>
            )}
          </div>

          {/* FAVORITE QUOTE */}
          {book.favoriteQuote && (
            <div className="relative pl-6 py-2 border-l-2 border-amber-600 dark:border-amber-400">
              <Quote className="absolute -left-3 -top-1 w-6 h-6 p-1 bg-[#fdfcf9] dark:bg-[#12151d] text-amber-600 dark:text-amber-400" />
              <blockquote className="font-serif italic text-lg sm:text-xl text-stone-800 dark:text-stone-200 leading-relaxed">
                "{book.favoriteQuote}"
              </blockquote>
              <span className="block mt-2 text-xs uppercase tracking-widest font-mono text-stone-400">
                Memorable Quote • {book.author}
              </span>
            </div>
          )}

          {/* BOOK DESCRIPTION */}
          {book.description && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-mono text-stone-400 dark:text-stone-500 font-semibold">
                About the Book
              </h4>
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                {book.description}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-[#161a24] border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
          <span>Press <kbd className="px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded font-mono text-[10px]">ESC</kbd> to close</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
