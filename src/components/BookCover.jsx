import React, { useState } from 'react';
import { Book as BookIcon } from 'lucide-react';

export function BookCover({
  coverUrl,
  title,
  author,
  gradient = 'from-amber-950 via-stone-900 to-black',
  size = 'md',
  ribbon = false,
  showEdge = true,
  className = '',
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Size styles
  const sizeClasses = {
    xs: 'w-12 h-16 text-[10px] rounded-[3px]',
    sm: 'w-20 h-28 text-xs rounded-[4px]',
    md: 'w-36 h-52 sm:w-40 sm:h-56 text-sm rounded-md',
    lg: 'w-52 h-76 sm:w-60 sm:h-88 text-base rounded-lg',
    xl: 'w-64 h-96 sm:w-72 sm:h-[430px] text-lg rounded-xl',
  };

  const showFallback = !coverUrl || hasError;

  return (
    <div
      className={`relative select-none book-shadow-3d book-spine-effect ${showEdge ? 'book-page-edge' : ''} transition-all duration-300 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {/* Optional Ribbon Bookmark */}
      {ribbon && <div className="ribbon-bookmark" title="Bookmarked" />}

      {/* Book Cover Container */}
      <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-stone-100 dark:bg-stone-900">
        {!showFallback ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
                <BookIcon className="w-6 h-6 text-stone-400/50 animate-pulse" />
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
          /* Luxury Typographic Hardcover Fallback */
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between text-amber-50 shadow-inner relative overflow-hidden`}
          >
            {/* Subtle linen/woven cloth background texture */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
            
            {/* Foil stamped inner frame border */}
            <div className="absolute inset-2 border border-amber-400/30 rounded-[3px] pointer-events-none" />

            {/* Top literary crest & ornament */}
            <div className="pt-2 z-10 flex items-center justify-between">
              <span className="text-amber-400/80 font-serif text-xs">✦</span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-amber-300/60">Edition</span>
            </div>

            {/* Center Book title in Newsreader serif typography */}
            <div className="my-auto z-10 pr-2 pl-1">
              <h4 className="font-serif font-bold text-sm sm:text-base leading-snug line-clamp-3 text-amber-50 drop-shadow-sm tracking-tight">
                {title}
              </h4>
              <p className="text-[11px] text-amber-200/80 font-sans mt-2 line-clamp-2 tracking-wider uppercase font-medium">
                {author}
              </p>
            </div>

            {/* Bottom atelier badge */}
            <div className="pb-1 z-10 flex items-center justify-between text-[9px] text-amber-300/70 font-mono border-t border-amber-400/20 pt-1.5">
              <span>FOLIO</span>
              <span className="text-amber-400/80">❦</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

