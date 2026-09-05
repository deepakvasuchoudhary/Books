import React from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { Heart, MessageSquare } from 'lucide-react';


export function BookCard({ book, onSelect, onToggleFavorite }) {
  const statusLabels = {
    read: { text: 'Read', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    reading: { text: 'Reading', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
    want_to_read: { text: 'To Read', bg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  };

  const statusInfo = statusLabels[book.status] || statusLabels.read;

  return (
    <div
      onClick={() => onSelect(book)}
      className="group relative flex flex-col bg-white dark:bg-[#13161f] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-4 transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60 cursor-pointer overflow-hidden text-left"
    >
      {/* Top Cover area */}
      <div className="relative mx-auto mb-4 flex justify-center items-center py-2">
        <div className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
          <BookCover
            coverUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            gradient={book.coverGradient}
            size="md"
          />
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className={`absolute top-0 right-0 p-2 rounded-full transition-all duration-200 backdrop-blur-sm ${
            book.favorite
              ? 'text-rose-500 bg-rose-50/90 dark:bg-rose-950/70'
              : 'text-stone-400 hover:text-rose-500 bg-stone-100/80 dark:bg-stone-800/80 opacity-0 group-hover:opacity-100'
          }`}
          title={book.favorite ? 'Favorited' : 'Add to favorites'}
        >
          <Heart size={16} className={book.favorite ? 'fill-rose-500' : ''} />
        </button>
      </div>

      {/* Book Metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Status & Year Badge */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium tracking-wide ${statusInfo.bg}`}>
              {statusInfo.text}
            </span>
            {book.publishedYear && (
              <span className="text-stone-400 dark:text-stone-500 font-mono text-[11px]">
                {book.publishedYear}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg leading-snug line-clamp-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-stone-600 dark:text-stone-400 text-xs font-medium tracking-wide mt-1 line-clamp-1">
            {book.author}
          </p>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <StarRating rating={book.rating} size={14} />
            {book.rating > 0 && (
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                {book.rating}.0
              </span>
            )}
          </div>
        </div>

        {/* My Thoughts Excerpt / Highlight */}
        {book.myThoughts && (
          <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800/80">
            <div className="flex items-start gap-1.5 text-stone-600 dark:text-stone-300 text-xs">
              <MessageSquare size={13} className="shrink-0 mt-0.5 text-amber-600/80 dark:text-amber-400/80" />
              <p className="line-clamp-2 italic font-serif leading-relaxed text-stone-600 dark:text-stone-300">
                "{book.myThoughts}"
              </p>
            </div>
          </div>
        )}

        {/* Genres */}
        {book.genres && book.genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {book.genres.slice(0, 2).map((genre, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400"
              >
                {genre}
              </span>
            ))}
            {book.genres.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800/60 text-stone-500 dark:text-stone-400">
                +{book.genres.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
