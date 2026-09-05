import React from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { Heart, ChevronRight } from 'lucide-react';

export function BookCard({ book, onSelect, onToggleFavorite }) {
  const statusLabels = {
    read: { text: 'Read', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80' },
    reading: { text: 'Reading', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80' },
    want_to_read: { text: 'Up Next', bg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/80' },
  };

  const statusInfo = statusLabels[book.status] || statusLabels.read;

  // Text excerpt to show: thoughts if available, otherwise description
  const excerpt = book.myThoughts || book.description || '';

  return (
    <div
      onClick={() => onSelect(book)}
      className="group relative flex flex-col bg-white/80 dark:bg-[#131620]/80 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800/80 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:border-amber-400/50 dark:hover:border-amber-500/40 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/60 cursor-pointer overflow-hidden text-left"
    >
      {/* 3D Cover Display Area with Shelf Floor Line */}
      <div className="relative mx-auto mb-4 flex justify-center items-center py-3 w-full">
        {/* Soft background ambient glow */}
        <div className="absolute inset-x-8 top-10 bottom-4 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-xl group-hover:bg-amber-500/15 dark:group-hover:bg-amber-400/10 transition-all duration-300" />

        {/* 3D Book Cover with Lift Physics */}
        <div className="book-hover-lift z-10">
          <BookCover
            coverUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            gradient={book.coverGradient}
            size="md"
            ribbon={book.favorite}
          />
        </div>

        {/* Shelf shadow line beneath book */}
        <div className="absolute bottom-1 w-32 h-1.5 bg-black/10 dark:bg-black/40 rounded-full blur-xs pointer-events-none group-hover:w-28 group-hover:opacity-40 transition-all duration-300" />

        {/* Interactive Favorite Heart Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className={`absolute top-0 right-0 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-20 cursor-pointer ${
            book.favorite
              ? 'text-rose-500 bg-rose-50/90 dark:bg-rose-950/80 scale-105'
              : 'text-stone-300 dark:text-stone-600 hover:text-rose-400 bg-white/70 dark:bg-stone-900/70 hover:scale-110'
          }`}
          title={book.favorite ? 'Remove from favorites' : 'Mark as favorite'}
        >
          <Heart size={15} className={book.favorite ? 'fill-rose-500' : ''} />
        </button>
      </div>

      {/* Book Metadata */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Status & Year Row */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide ${statusInfo.bg}`}>
              {statusInfo.text}
            </span>
            {book.publishedYear && (
              <span className="text-stone-400 dark:text-stone-500 font-mono text-[11px]">
                {book.publishedYear}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-stone-950 dark:text-stone-50 text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-stone-500 dark:text-stone-400 text-xs font-medium tracking-wide mt-0.5 line-clamp-1">
            {book.author}
          </p>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1.5">
            <StarRating rating={book.rating} size={13} />
            <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400">
              {book.rating > 0 ? `${book.rating}.0` : '—'}
            </span>
          </div>
        </div>

        {/* Excerpt / Synopsis Snippet */}
        {excerpt && (
          <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800/80">
            <p className="line-clamp-2 text-xs text-stone-600 dark:text-stone-400 font-serif italic leading-relaxed">
              {book.myThoughts ? `"${book.myThoughts}"` : excerpt}
            </p>
          </div>
        )}

        {/* Genres & Quick Action */}
        <div className="pt-1 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {book.genres?.slice(0, 2).map((genre, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/70 text-stone-600 dark:text-stone-400 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <ChevronRight size={15} />
          </span>
        </div>
      </div>
    </div>
  );
}

