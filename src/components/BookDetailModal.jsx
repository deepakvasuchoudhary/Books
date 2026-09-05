import React, { useEffect, useState } from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import {
  X,
  Heart,
  Calendar,
  Edit3,
  Trash2,
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
  onEdit,
  onDelete,
  onToggleFavorite,
  onUpdateStatus,
  onUpdateRating
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
    read: { label: 'Read', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300' },
    reading: { label: 'Currently Reading', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300' },
    want_to_read: { label: 'Want to Read', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300' },
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
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusMap[book.status]?.color}`}>
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
              onClick={() => onToggleFavorite(book.id)}
              className={`p-2 rounded-full transition-colors ${
                book.favorite
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                  : 'text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={book.favorite ? 'Favorited' : 'Add to favorites'}
            >
              <Heart size={18} className={book.favorite ? 'fill-rose-500' : ''} />
            </button>

            <button
              onClick={copyMarkdown}
              className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
              title="Copy notes as Markdown"
            >
              {copied ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
            </button>

            <button
              onClick={() => onEdit(book)}
              className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Edit book"
            >
              <Edit3 size={18} />
            </button>

            <button
              onClick={() => onDelete(book.id)}
              className="p-2 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Delete book"
            >
              <Trash2 size={18} />
            </button>

            <div className="w-[1px] h-4 bg-stone-200 dark:bg-stone-800 mx-1" />

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Close modal"
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
                    <StarRating
                      rating={book.rating}
                      size={14}
                      interactive={true}
                      onChange={(newRating) => onUpdateRating(book.id, newRating)}
                    />
                    <span className="font-mono font-semibold text-stone-700 dark:text-stone-300 text-xs">
                      {book.rating > 0 ? `${book.rating}.0` : 'Unrated'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Switcher & Reading Dates */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-stone-400 dark:text-stone-500">Status:</span>
                  {(['read', 'reading', 'want_to_read']).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => onUpdateStatus(book.id, st)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        book.status === st
                          ? 'bg-amber-700 text-white shadow-sm'
                          : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {statusMap[st]?.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1">
                  {book.dateStarted && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-stone-400" />
                      <span>Started: <strong>{book.dateStarted}</strong></span>
                    </div>
                  )}
                  {book.dateRead && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-stone-400" />
                      <span>Finished: <strong>{book.dateRead}</strong></span>
                    </div>
                  )}
                </div>
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

          {/* MY THOUGHTS & REFLECTIONS (Primary user feature) */}
          <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 dark:border-amber-400/15">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-medium text-sm tracking-wide">
                <MessageSquare size={16} />
                <span>My Thoughts & Reflections</span>
              </div>
              <button
                type="button"
                onClick={() => onEdit(book)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <Edit3 size={12} />
                <span>Edit note</span>
              </button>
            </div>

            {book.myThoughts ? (
              <p className="font-serif text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {book.myThoughts}
              </p>
            ) : (
              <div className="text-center py-4 text-stone-400 text-sm">
                <p>You haven't added any thoughts yet for this book.</p>
                <button
                  onClick={() => onEdit(book)}
                  className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline"
                >
                  + Add what you felt or learned
                </button>
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
            onClick={() => onEdit(book)}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-medium transition-colors flex items-center gap-1.5"
          >
            <Edit3 size={14} />
            <span>Edit Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
