import React from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { Heart, Calendar, Quote, MessageSquare, ChevronRight } from 'lucide-react';

export function BookJournalRow({ book, onSelect, onToggleFavorite }) {
  const statusLabels = {
    read: { text: 'Read', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    reading: { text: 'Reading', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
    want_to_read: { text: 'To Read', bg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  };

  const statusInfo = statusLabels[book.status] || statusLabels.read;

  return (
    <article
      onClick={() => onSelect(book)}
      className="group relative bg-white dark:bg-[#13161f] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/50 cursor-pointer text-left"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Book Cover */}
        <div className="shrink-0 self-center sm:self-start">
          <BookCover
            coverUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            gradient={book.coverGradient}
            size="md"
            className="group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 w-full">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-medium tracking-wide ${statusInfo.bg}`}>
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

              <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-xl sm:text-2xl group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm font-medium mt-0.5">
                by <span className="text-stone-800 dark:text-stone-200 font-semibold">{book.author}</span>
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
                className={`p-2 rounded-full transition-all duration-200 ${
                  book.favorite
                    ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/60'
                    : 'text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
                title={book.favorite ? 'Favorited' : 'Add to favorites'}
              >
                <Heart size={18} className={book.favorite ? 'fill-rose-500' : ''} />
              </button>

              <div className="flex items-center gap-1.5">
                <StarRating rating={book.rating} size={15} />
                {book.rating > 0 && (
                  <span className="text-xs font-mono font-semibold text-stone-700 dark:text-stone-300">
                    {book.rating}.0
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User's Thoughts & Reflections Section (Featured prominently) */}
          {book.myThoughts ? (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <div className="flex items-center gap-2 mb-1.5 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <MessageSquare size={13} />
                <span>My Thoughts & Reflections</span>
              </div>
              <p className="font-serif text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
                "{book.myThoughts}"
              </p>
            </div>
          ) : (
            <div className="mt-3 text-stone-400 text-xs italic">
              No personal thoughts recorded yet. Click to add your notes.
            </div>
          )}

          {/* Favorite Quote (if any) */}
          {book.favoriteQuote && (
            <div className="mt-3 flex items-start gap-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm italic font-serif">
              <Quote size={14} className="shrink-0 mt-1 text-stone-400 dark:text-stone-500" />
              <span>"{book.favoriteQuote}"</span>
            </div>
          )}

          {/* Description & Genres footer */}
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {book.genres?.map((genre, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center text-amber-700 dark:text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
              <span>View full details</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
