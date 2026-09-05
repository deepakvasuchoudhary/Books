import React from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { Heart, ChevronRight, BookCheck, BookOpen, Bookmark } from 'lucide-react';

export function BookCompactRow({ book, index, onSelect, onToggleFavorite }) {
  const statusLabels = {
    read: { text: 'Read', icon: BookCheck, color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/80' },
    reading: { text: 'Reading', icon: BookOpen, color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/80' },
    want_to_read: { text: 'Up Next', icon: Bookmark, color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800/80' },
  };

  const status = statusLabels[book.status] || statusLabels.read;
  const StatusIcon = status.icon;

  return (
    <div
      onClick={() => onSelect(book)}
      className="group flex items-center justify-between gap-3 px-4 py-3 bg-white/70 dark:bg-[#13161f]/70 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 border border-stone-200/70 dark:border-stone-800/70 rounded-xl transition-all duration-200 cursor-pointer text-left"
    >
      {/* Index & Cover & Main Title */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <span className="font-mono text-xs text-stone-400 dark:text-stone-600 w-6 shrink-0 text-right">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
          <BookCover
            coverUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            gradient={book.coverGradient}
            size="xs"
            showEdge={false}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {book.title}
            </h4>
            {book.favorite && (
              <Heart size={12} className="shrink-0 text-rose-500 fill-rose-500" />
            )}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
            {book.author}
          </p>
        </div>
      </div>

      {/* Center Metadata: Year & Genres (Hidden on tiny screens) */}
      <div className="hidden md:flex items-center gap-3 shrink-0 text-xs">
        {book.genres?.[0] && (
          <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[11px] font-medium">
            {book.genres[0]}
          </span>
        )}

        {book.publishedYear && (
          <span className="font-mono text-stone-400 dark:text-stone-500 text-xs">
            {book.publishedYear}
          </span>
        )}
      </div>

      {/* Rating & Status */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:block">
          <StarRating rating={book.rating} size={13} />
        </div>

        <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium flex items-center gap-1 ${status.color}`}>
          <StatusIcon size={11} />
          <span className="hidden sm:inline">{status.text}</span>
        </span>

        {/* Favorite toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            book.favorite
              ? 'text-rose-500 hover:text-rose-600'
              : 'text-stone-300 dark:text-stone-600 hover:text-rose-400'
          }`}
          title={book.favorite ? 'Remove from favorites' : 'Mark as favorite'}
        >
          <Heart size={14} className={book.favorite ? 'fill-rose-500' : ''} />
        </button>

        <ChevronRight size={15} className="text-stone-300 dark:text-stone-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}
