import React, { useState } from 'react';
import { Book as BookIcon } from 'lucide-react';

export function BookCover({
  coverUrl,
  title,
  author,
  gradient = 'from-stone-700 via-stone-800 to-stone-900',
  size = 'md',
  className = '',
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Size styles
  const sizeClasses = {
    sm: 'w-16 h-24 text-xs rounded-sm',
    md: 'w-32 h-48 sm:w-36 sm:h-52 text-sm rounded-md',
    lg: 'w-48 h-72 sm:w-56 sm:h-84 text-base rounded-lg',
    xl: 'w-60 h-88 sm:w-72 sm:h-[420px] text-lg rounded-xl',
  };

  const showFallback = !coverUrl || hasError;

  return (
    <div
      className={`relative select-none overflow-hidden book-shadow book-spine-effect transition-all duration-300 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {!showFallback ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
              <BookIcon className="w-6 h-6 text-stone-400 opacity-40 animate-spin" />
            </div>
          )}
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
          />
        </>
      ) : (
        /* Typographic fallback cover */
        <div
          className={`w-full h-full bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between text-stone-100 shadow-inner relative overflow-hidden`}
        >
          {/* Subtle geometric/linen background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/20 pointer-events-none" />

          {/* Top minimal header ornament */}
          <div className="pt-2 z-10">
            <span className="inline-block w-6 h-[1.5px] bg-amber-400/80 mb-2" />
          </div>

          {/* Book title in serif typography */}
          <div className="my-auto z-10 pr-2">
            <h4 className="font-serif font-bold text-sm sm:text-base leading-snug line-clamp-3 text-stone-50 drop-shadow-sm tracking-tight">
              {title}
            </h4>
            <p className="text-[11px] sm:text-xs text-stone-300/90 font-sans mt-2 line-clamp-2 tracking-wide uppercase">
              {author}
            </p>
          </div>

          {/* Bottom badge */}
          <div className="pb-1 z-10 flex items-center justify-between text-[10px] text-stone-400 font-mono border-t border-white/10 pt-2">
            <span>FOLIO</span>
            <BookIcon size={12} className="opacity-70" />
          </div>
        </div>
      )}
    </div>
  );
}
