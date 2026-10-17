import React, { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export function CircularBookCarousel({
  books = [],
  activeIndex = 0,
  onSelectIndex,
}) {
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const total = books.length;

  // Safe navigation handlers
  const handlePrev = useCallback(() => {
    if (total === 0) return;
    if (activeIndex > 0) {
      onSelectIndex(activeIndex - 1);
    } else {
      onSelectIndex(total - 1); // Wrap around smoothly
    }
  }, [activeIndex, total, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    if (activeIndex < total - 1) {
      onSelectIndex(activeIndex + 1);
    } else {
      onSelectIndex(0); // Wrap around smoothly
    }
  }, [activeIndex, total, onSelectIndex]);

  // Touch and Mouse Drag Support
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 45) {
      handlePrev();
    } else if (dragOffset < -45) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Wheel horizontal navigation with throttle
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 250) return;

    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 30) {
      lastWheelTime.current = now;
      if (e.deltaX > 20 || e.deltaY > 30) {
        handleNext();
      } else if (e.deltaX < -20 || e.deltaY < -30) {
        handlePrev();
      }
    }
  };

  if (total === 0) return null;

  // Determine visible range of books around active index
  const VISIBLE_RADIUS = 7;
  const visibleItems = [];

  for (let offset = -VISIBLE_RADIUS; offset <= VISIBLE_RADIUS; offset++) {
    const index = activeIndex + offset;
    if (index >= 0 && index < total) {
      visibleItems.push({
        book: books[index],
        index,
        offset,
      });
    }
  }

  // Active book data for quick display
  const activeBook = books[activeIndex] || books[0];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      className="w-full relative flex flex-col items-center justify-end select-none pb-2 pt-1 overflow-hidden"
    >
      {/* Subtle Arc Rail Graphic on Floor */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[780px] h-[70px] rounded-[100%] border-t border-slate-300/60 pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Navigation Arrow Left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        disabled={total <= 1}
        className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Previous Book (Left Arrow)"
        aria-label="Previous Book"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Navigation Arrow Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        disabled={total <= 1}
        className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Next Book (Right Arrow)"
        aria-label="Next Book"
      >
        <ChevronRight size={20} />
      </button>

      {/* 3D Circular Carousel Stage */}
      <div className="circular-carousel-viewport relative w-full h-[170px] sm:h-[195px] md:h-[215px] flex items-center justify-center">
        <div
          className="circular-carousel-track relative w-0 h-full flex items-center justify-center"
          style={{
            transform: `translateX(${dragOffset * 0.4}px)`,
          }}
        >
          {visibleItems.map(({ book, index, offset }) => {
            const isCenter = offset === 0;

            // Circular geometry calculations
            const radius = 680; // Arc radius in px
            const angleDeg = offset * 13.5; // Angle step per book
            const angleRad = (angleDeg * Math.PI) / 180;

            const translateX = radius * Math.sin(angleRad);
            const translateZ =
              -radius * (1 - Math.cos(angleRad)) * 1.25 - Math.abs(offset) * 22;
            const rotateY = -angleDeg * 1.05;
            const scale = Math.max(0.68, 1 - Math.abs(offset) * 0.055);
            const opacity = Math.max(0.18, 1 - Math.abs(offset) * 0.14);
            const zIndex = 50 - Math.abs(offset);

            return (
              <div
                key={book.id || index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCenter) {
                    onSelectIndex(index);
                  }
                }}
                className={`circular-book-card absolute ${
                  !isCenter ? "cursor-pointer group" : ""
                } flex flex-col items-center`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                {/* CASE 1: ACTIVE BOOK -> Lifted to reading desk, NOT rendered in scroller */}
                {isCenter ? (
                  <div className="relative flex flex-col items-center justify-center">
                    {/* Empty Resting Cradle where the active book was lifted from */}
                    <div className="w-22 h-34 sm:w-26 sm:h-40 md:w-30 md:h-44 rounded-lg border-2 border-dashed border-stone-300 bg-stone-100/60 flex flex-col items-center justify-center p-2.5 text-center transition-all duration-300">
                      <div className="w-7 h-7 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-500 mb-1.5 shadow-2xs">
                        <BookOpen size={14} />
                      </div>
                      <span className="text-[9.5px] font-mono tracking-widest uppercase font-semibold text-stone-600">
                        On Desk
                      </span>
                      <span className="text-[8.5px] font-serif italic text-stone-500 mt-0.5 line-clamp-2 px-1">
                        {activeBook.title}
                      </span>
                    </div>

                    <div className="mt-1.5 text-center max-w-[120px]">
                      <p className="text-xs font-serif font-bold text-stone-800 truncate">
                        {activeBook.title}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate font-sans">
                        {activeBook.author}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* CASE 2: REMAINING BOOKS IN SCROLLER -> Show Front Cover Cards */
                  <div className="flex flex-col items-center">
                    {/* Book Card Container */}
                    <div className="relative w-22 h-34 sm:w-26 sm:h-40 md:w-30 md:h-44 rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl shadow-black/10 hover:-translate-y-1 bg-stone-100 border border-slate-200/90">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />

                      {/* Fallback spine / cover if image error */}
                      <div className="absolute inset-0 bg-stone-100 -z-10 p-2 flex flex-col justify-between text-center">
                        <span className="text-[9px] font-mono font-bold text-slate-400">
                          #{index + 1}
                        </span>
                        <span className="text-[11px] font-serif font-bold text-slate-700 line-clamp-3">
                          {book.title}
                        </span>
                        <span className="text-[9px] text-slate-500 line-clamp-1">
                          {book.author}
                        </span>
                      </div>

                      {/* 3D Spine Glare overlay */}
                      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/15 to-transparent pointer-events-none" />

                      {/* Subtle darkening on distant cards for depth */}
                      <div
                        className="absolute inset-0 bg-black/15 pointer-events-none transition-opacity group-hover:opacity-0"
                        style={{ opacity: Math.min(0.5, Math.abs(offset) * 0.08) }}
                      />
                    </div>

                    {/* Floating Title & Author tooltip on hover */}
                    <div className="mt-2 transition-all duration-200 text-center max-w-[130px] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                      <p className="text-xs font-semibold text-slate-900 truncate font-sans">
                        {book.title}
                      </p>
                      <p className="text-[10px] text-slate-600 truncate">
                        {book.author}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Scrubber & Progress Bar */}
      <div className="w-full max-w-md px-6 mt-1 flex items-center justify-between gap-4 text-xs text-slate-600">
        <span className="font-mono text-[11px] text-slate-600 shrink-0 font-medium">
          {activeIndex + 1} / {total}
        </span>

        {/* Interactive Scrub Track */}
        <div className="flex-1 relative h-1.5 bg-slate-200 rounded-full overflow-hidden cursor-pointer">
          <div
            className="absolute top-0 bottom-0 left-0 bg-stone-800 rounded-full transition-all duration-200"
            style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          />
        </div>

        <span className="text-[11px] font-sans text-slate-600 truncate max-w-[160px] font-medium hidden sm:inline">
          {activeBook.title}
        </span>
      </div>
    </div>
  );
}
