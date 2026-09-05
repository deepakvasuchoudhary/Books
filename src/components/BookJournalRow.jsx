import React from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { Heart, Calendar, Quote, MessageSquare, ChevronRight, BookOpen } from 'lucide-react';

export function BookJournalRow({ book, onSelect, onToggleFavorite }) {
  const statusLabels = {
    read: { text: 'Read', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80' },
    reading: { text: 'Reading', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80' },
    want_to_read: { text: 'Up Next', bg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/80' },
  };

  const statusInfo = statusLabels[book.status] || statusLabels.read;

  return (
    <article
      onClick={() => onSelect(book)}
      className="group relative bg-white/80 dark:bg-[#131620]/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800/80 rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:border-amber-400/50 dark:hover:border-amber-500/40 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60 cursor-pointer text-left overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-7 items-start">
        {/* Book Cover with 3D Effect & Ambient Glow */}
        <div className="shrink-0 self-center sm:self-start relative">
          <div className="book-hover-lift">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              gradient={book.coverGradient}
              size="md"
              ribbon={book.favorite}
            />
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 w-full space-y-3.5">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide ${statusInfo.bg}`}>
                  {statusInfo.text}
                </span>

                {book.publishedYear && (
                  <span className="text-stone-400 dark:text-stone-500 font-mono text-xs">
                    Pub. {book.publishedYear}
                  </span>
                )}

                {book.dateRead && (
                  <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400 text-xs">
                    <Calendar size={12} />
                    <span>Finished {book.dateRead}</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-stone-950 dark:text-stone-50 text-xl sm:text-2xl group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-tight">
                {book.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm font-medium mt-0.5">
                by <span className="text-stone-800 dark:text-stone-200 font-serif font-semibold">{book.author}</span>
                {book.pages ? ` • ${book.pages} pages` : ''}
              </p>
            </div>

            {/* Favorite & Rating */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(book.id);
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
                  book.favorite
                    ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/70 scale-105'
                    : 'text-stone-300 dark:text-stone-600 hover:text-rose-400 bg-stone-100/80 dark:bg-stone-800/80 hover:scale-110'
                }`}
                title={book.favorite ? 'Remove from favorites' : 'Mark as favorite'}
              >
                <Heart size={16} className={book.favorite ? 'fill-rose-500' : ''} />
              </button>

              <div className="flex items-center gap-1.5">
                <StarRating rating={book.rating} size={14} />
                {book.rating > 0 && (
                  <span className="text-xs font-mono font-semibold text-stone-700 dark:text-stone-300">
                    {book.rating}.0
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User's Thoughts & Reflections or Editorial Synopsis */}
          {book.myThoughts ? (
            <div className="p-4 rounded-2xl bg-amber-500/[0.07] dark:bg-amber-500/[0.05] border border-amber-500/20 dark:border-amber-400/15">
              <div className="flex items-center gap-2 mb-1.5 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider font-mono">
                <MessageSquare size={13} />
                <span>Reader's Reflections</span>
              </div>
              <p className="font-serif text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
                "{book.myThoughts}"
              </p>
            </div>
          ) : book.description ? (
            <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-[#181c28]/80 border border-stone-200/60 dark:border-stone-800/60">
              <div className="flex items-center gap-1.5 mb-1 text-stone-400 dark:text-stone-500 text-[10px] font-mono uppercase tracking-wider">
                <BookOpen size={11} />
                <span>Editorial Overview</span>
              </div>
              <p className="font-serif italic text-stone-700 dark:text-stone-300 text-sm leading-relaxed line-clamp-3">
                "{book.description}"
              </p>
            </div>
          ) : null}

          {/* Favorite Quote */}
          {book.favoriteQuote && (
            <div className="pl-4 py-1 border-l-2 border-amber-600 dark:border-amber-400 flex items-start gap-2 text-stone-700 dark:text-stone-300 text-sm italic font-serif">
              <Quote size={14} className="shrink-0 mt-0.5 text-amber-600/70 dark:text-amber-400/70" />
              <span>"{book.favoriteQuote}"</span>
            </div>
          )}

          {/* Description & Genres footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {book.genres?.map((genre, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 font-medium text-[11px]"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform text-xs">
              <span>Open Dossier</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

