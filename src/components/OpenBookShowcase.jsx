import React, { useState } from "react";
import {
  Star,
  Bookmark,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function OpenBookShowcase({
  book,
  bookIndex = 1,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) {
  const [favoritesMap, setFavoritesMap] = useState({});
  const [failedCoverUrl, setFailedCoverUrl] = useState(null);
  const [loadedCovers, setLoadedCovers] = useState({});

  if (!book) return null;

  const hasImageError = Boolean(book.coverUrl && failedCoverUrl === book.coverUrl);
  const isCoverLoaded = Boolean(book.coverUrl && loadedCovers[book.coverUrl]);

  const isCurrentFavorite = Boolean(
    favoritesMap[book.id] !== undefined ? favoritesMap[book.id] : book.favorite
  );

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (book.id) {
      setFavoritesMap((prev) => ({
        ...prev,
        [book.id]: !isCurrentFavorite,
      }));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none">
      {/* 3D Perspective Stage for the Paperbook */}
      <div className="paperbook-stage w-full max-w-6xl px-2 sm:px-4 flex items-center justify-center">
        {/* The Classic Paperbook Wrapper - Permanently open, authentic library book */}
        <div className="classic-paperbook-wrapper relative w-full max-w-[880px] sm:max-w-[960px] md:max-w-[1040px] lg:max-w-[1080px] h-[440px] sm:h-[480px] md:h-[520px]">
          {/* Ambient Desk Shadow under the open book */}
          <div className="paperbook-ambient-desk-shadow" />

          {/* Center Spine Hinge connecting both halves */}
          <div className="paperbook-spine-hinge" />

          {/* ================= LEFT BOOK SLAB (Verso Page) ================= */}
          <div className="paperbook-slab-left">
            {/* 3D Stacked Page Block Edges */}
            <div className="page-stack-edge-bottom left-2 right-0 rounded-bl-xs" />
            <div className="page-stack-edge-top left-2 right-0 rounded-tl-xs" />
            <div className="page-stack-edge-outer -left-3 rounded-l-xs bg-[repeating-linear-gradient(to_right,#e5dcca_0px,#e5dcca_1px,#f4efe5_1px,#f4efe5_2px)]" />

            {/* Protective Cover Trim Lip (Back Cover Rim) */}
            <div className="absolute -inset-1 bg-[#ede6d8] rounded-l-[5px] -z-10 shadow-lg pointer-events-none" />

            {/* Verso Permanent Paper Face - Never unmounts */}
            <div
              className="paperbook-page-verso absolute inset-0 p-6 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden"
              style={{ transform: "translateZ(3px)" }}
            >
              {/* Luminous light sweep on book change */}
              <div
                key={`sheen-verso-${book.id || bookIndex}`}
                className="paper-sheen-sweep pointer-events-none"
              />

              {/* Literary Content Container - Staggered & Slow ink reveal */}
              <div
                key={`content-verso-${book.id || bookIndex}`}
                className="w-full h-full flex flex-col justify-between relative z-1"
              >
                {/* Running Header */}
                <div className="ink-header flex items-center justify-between text-[11px] font-serif text-stone-500 pb-3 border-b border-stone-300/70">
                  <div className="flex items-center gap-1.5">
                    {hasPrev && onPrev && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPrev();
                        }}
                        className="p-0.5 rounded hover:bg-stone-200/80 text-stone-600 hover:text-stone-950 cursor-pointer transition-colors"
                        title="Previous volume"
                      >
                        <ChevronLeft size={14} />
                      </button>
                    )}
                    <span className="tracking-widest uppercase font-serif text-[11px] font-semibold text-stone-700">
                      VOL. {String(bookIndex).padStart(2, "0")} • LITTLE NALANDA
                    </span>
                  </div>

                  <span className="font-serif italic text-xs text-stone-600">
                    {book.status === "reading"
                      ? "Currently Reading"
                      : book.status === "read"
                      ? "Completed"
                      : "Reading Queue"}
                  </span>
                </div>

                {/* Left Page Body: Frontispiece Bookplate & Title Details */}
                <div className="my-auto flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7 py-3">
                  {/* Frontispiece Cover Illustration */}
                  <div className="ink-cover-art shrink-0 relative">
                    <div className="w-30 h-44 sm:w-36 sm:h-52 md:w-40 md:h-58 rounded-[3px] overflow-hidden bg-stone-200/90 shadow-xl border border-stone-400/40 relative">
                      {!hasImageError ? (
                        <>
                          <img
                            key={book.coverUrl}
                            src={book.coverUrl}
                            alt={book.title}
                            onLoad={() =>
                              setLoadedCovers((prev) => ({
                                ...prev,
                                [book.coverUrl]: true,
                              }))
                            }
                            onError={() => setFailedCoverUrl(book.coverUrl)}
                            className={`w-full h-full object-cover transition-opacity duration-700 ${
                              isCoverLoaded ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {/* Paper spine hinge highlight */}
                          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/20 to-transparent pointer-events-none" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-stone-800 text-stone-100 p-3 flex flex-col justify-between text-center font-serif">
                          <span className="text-[10px] tracking-wider uppercase text-amber-200">Edition</span>
                          <span className="text-sm font-bold line-clamp-3">{book.title}</span>
                          <span className="text-xs text-stone-400 line-clamp-1">{book.author}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Classic Book Title & Writer Details */}
                  <div className="flex-1 min-w-0 text-center sm:text-left space-y-2.5">
                    <div className="ink-title-block space-y-2">
                      <div className="text-xs sm:text-sm font-serif italic text-stone-600">
                        Written by{" "}
                        <span className="font-semibold not-italic font-serif text-stone-900 text-sm sm:text-base">
                          {book.author}
                        </span>
                      </div>

                      <h1 className="font-serif text-2xl sm:text-[28px] md:text-3xl font-bold tracking-tight text-stone-900 leading-snug line-clamp-2 sm:line-clamp-3">
                        {book.title}
                      </h1>
                    </div>

                    {/* Star Rating & Metadata */}
                    <div className="ink-rating-meta space-y-2">
                      <div className="flex items-center justify-center sm:justify-start gap-1 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= (book.rating || 0)
                                ? "fill-amber-600 text-amber-600"
                                : "text-stone-300"
                            }
                          />
                        ))}
                        <span className="ml-1.5 text-xs font-serif font-bold text-stone-700">
                          {book.rating ? `${book.rating}.0` : "Unrated"}
                        </span>
                      </div>

                      {/* Literary Metadata */}
                      <div className="text-xs font-serif text-stone-600 pt-1 space-y-1">
                        <p>
                          {book.publishedYear
                            ? `First published in ${book.publishedYear}`
                            : "Classic Edition"}
                        </p>
                        {(book.genres || []).length > 0 && (
                          <p className="italic text-stone-500">
                            Genre: {book.genres.slice(0, 2).join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Running Footer */}
                <div className="ink-footer flex items-center justify-between text-[11px] font-serif text-stone-500 pt-2 border-t border-stone-300/70">
                  <span className="italic text-[10.5px]">Little Nalanda Archives</span>
                  <span className="font-serif font-bold text-stone-700">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT BOOK SLAB (Recto Page) ================= */}
          <div className="paperbook-slab-right">
            {/* 3D Stacked Page Block Edges */}
            <div className="page-stack-edge-bottom left-0 right-2 rounded-br-xs" />
            <div className="page-stack-edge-top left-0 right-2 rounded-tr-xs" />
            <div className="page-stack-edge-outer -right-3 rounded-r-xs bg-[repeating-linear-gradient(to_left,#e5dcca_0px,#e5dcca_1px,#f4efe5_1px,#f4efe5_2px)]" />

            {/* Protective Cover Trim Lip (Front Cover Rim) */}
            <div className="absolute -inset-1 bg-[#ede6d8] rounded-r-[5px] -z-10 shadow-lg pointer-events-none" />

            {/* Recto Permanent Paper Face - Never unmounts */}
            <div
              className="paperbook-page-recto absolute inset-0 p-6 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden"
              style={{ transform: "translateZ(3px)" }}
            >
              {/* Luminous light sweep on book change */}
              <div
                key={`sheen-recto-${book.id || bookIndex}`}
                className="paper-sheen-sweep pointer-events-none"
              />

              {/* Literary Content Container - Staggered & Slow ink reveal */}
              <div
                key={`content-recto-${book.id || bookIndex}`}
                className="w-full h-full flex flex-col justify-between overflow-hidden relative z-1"
              >
                {/* Running Header */}
                <div className="ink-synopsis-header flex items-center justify-between text-[11px] font-serif text-stone-500 pb-3 border-b border-stone-300/70">
                  <span className="tracking-widest uppercase font-serif text-[11px] font-semibold text-stone-700 flex items-center gap-1.5">
                    <Bookmark size={12} className="text-amber-800" />
                    SYNOPSIS & SUMMARY
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleFavorite}
                      className="p-1 rounded hover:bg-stone-200/80 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title={isCurrentFavorite ? "Remove favorite" : "Mark favorite"}
                    >
                      <Heart
                        size={14}
                        className={isCurrentFavorite ? "fill-rose-600 text-rose-600" : "text-stone-400"}
                      />
                    </button>

                    {hasNext && onNext && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNext();
                        }}
                        className="p-0.5 rounded hover:bg-stone-200/80 text-stone-600 hover:text-stone-950 cursor-pointer transition-colors"
                        title="Next volume"
                      >
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Inside Synopsis with classical drop cap */}
                <div className="my-auto flex-1 overflow-y-auto no-scrollbar py-2 space-y-3">
                  <div className="ink-synopsis-text space-y-3">
                    {book.description ? (
                      <p className="font-serif text-stone-800 text-sm sm:text-[14.5px] md:text-[15px] leading-relaxed text-justify pr-1">
                        <span className="classic-drop-cap select-none">
                          {book.description.charAt(0)}
                        </span>
                        {book.description.slice(1)}
                      </p>
                    ) : (
                      <p className="font-serif italic text-stone-500 text-sm">
                        No synopsis recorded yet for this volume.
                      </p>
                    )}
                  </div>

                  {/* Literary Quote / Reflection */}
                  {book.favoriteQuote && (
                    <div className="ink-quote-callout border-l-2 border-stone-400 pl-3.5 py-1.5 font-serif italic text-xs sm:text-[13.5px] text-stone-800 my-2.5">
                      “{book.favoriteQuote}”
                    </div>
                  )}
                  {book.myThoughts && !book.favoriteQuote && (
                    <div className="ink-quote-callout border-l-2 border-stone-400 pl-3.5 py-1.5 font-serif text-xs sm:text-[13px] text-stone-700 my-2.5">
                      <span className="font-bold block text-[10px] tracking-wider uppercase font-sans text-stone-600">
                        Reader's Reflection
                      </span>
                      <p className="italic">{book.myThoughts}</p>
                    </div>
                  )}
                </div>

                {/* Running Footer */}
                <div className="ink-footer flex items-center justify-between text-[11px] font-serif text-stone-500 pt-2.5 border-t border-stone-300/70">
                  <span className="italic text-[10.5px]">Classic Paperback Edition</span>
                  <span className="font-serif font-bold text-stone-700">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
