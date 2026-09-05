import React, { useState } from 'react';
import { Book as BookIcon } from 'lucide-react';

export function BookCover({
  coverUrl,
  title,
  author,
  gradient = 'from-indigo-900 via-slate-900 to-zinc-950',
  size = 'md',
  showEdge = true,
  className = '',
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sizeClasses = {
    xs: 'w-10 h-14 text-[9px] rounded-[4px]',
    sm: 'w-16 h-24 text-[10px] rounded-md',
    md: 'w-32 h-48 sm:w-36 sm:h-52 text-xs rounded-lg',
    lg: 'w-48 h-72 sm:w-52 sm:h-80 text-sm rounded-xl',
    xl: 'w-56 h-84 sm:w-64 sm:h-96 text-base rounded-2xl',
  };

  const showFallback = !coverUrl || hasError;

  return (
    <div
      className={`relative select-none book-shadow-modern book-spine-effect ${showEdge ? 'book-page-edge' : ''} transition-all duration-300 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {/* Container with rounded corner clip */}
      <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-slate-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10">
        {!showFallback ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
                <BookIcon className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
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
          /* Modern Minimalist Typographic Cover Fallback */
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} p-3.5 flex flex-col justify-between text-white relative overflow-hidden`}
          >
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

            {/* Header chip */}
            <div className="z-10 flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-medium">
                Vault Edition
              </span>
            </div>

            {/* Title & Author */}
            <div className="my-auto z-10 pr-1">
              <h4 className="font-semibold text-xs sm:text-sm leading-snug line-clamp-3 text-white tracking-tight">
                {title}
              </h4>
              <p className="text-[11px] text-white/70 font-sans mt-1.5 line-clamp-1 font-medium">
                {author}
              </p>
            </div>

            {/* Bottom identifier */}
            <div className="z-10 flex items-center justify-between text-[9px] text-white/50 font-mono pt-2 border-t border-white/10">
              <span>LIBRIS</span>
              <span>●</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


