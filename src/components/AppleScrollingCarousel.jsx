import React, { useState, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

function SquareBookCard({ book, onSelectBook }) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Gradient fallbacks for missing/error images
  const gradients = [
    "from-blue-600 via-indigo-600 to-slate-900",
    "from-purple-600 via-pink-600 to-rose-950",
    "from-emerald-600 via-teal-700 to-slate-900",
    "from-amber-500 via-orange-600 to-zinc-900",
    "from-cyan-600 via-blue-700 to-indigo-950",
  ];
  const gradient = gradients[(book.title?.length || 0) % gradients.length];

  return (
    <div
      onClick={() => onSelectBook(book)}
      className="w-40 sm:w-44 md:w-48 shrink-0 select-none group/card cursor-pointer transition-all active:scale-[0.98]"
    >
      {/* Square Cover Container - matching user's reference image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md group-hover/card:shadow-2xl group-hover/card:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-slate-100 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.12]">
        {!imgError && book.coverUrl ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-slate-400 dark:text-zinc-600" />
              </div>
            )}
            <img
              src={book.coverUrl}
              alt={book.title}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setImgError(true);
                setIsLoading(false);
              }}
              className={`w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />
            {/* Apple Gloss Sheen & Subtle Ambient Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none opacity-40 group-hover/card:opacity-20 transition-opacity" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 dark:ring-white/10 pointer-events-none rounded-[inherit]" />
          </>
        ) : (
          /* Typographic Fallback with Apple Gradient */
          <div className={`w-full h-full bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between text-white relative`}>
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase opacity-80">
              <span>{book.genres?.[0] || "Volume"}</span>
              <span>★ {book.rating || 5}.0</span>
            </div>
            <div className="my-auto">
              <h4 className="font-bold text-sm leading-snug line-clamp-3 text-white tracking-tight drop-shadow-sm">
                {book.title}
              </h4>
              <p className="text-xs text-white/80 mt-1 line-clamp-1 font-medium">
                {book.author}
              </p>
            </div>
            <div className="text-[9px] font-mono opacity-60 tracking-widest uppercase">
              Little Nalanda
            </div>
          </div>
        )}

        {/* Status Pill overlay for Reading */}
        {book.status === "reading" && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full liquid-glass text-[#34c759] text-[10px] font-mono font-semibold flex items-center gap-1 shadow-md border border-[#34c759]/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
            <span>Reading</span>
          </div>
        )}

        {/* 5-Star Hall of Fame Pill */}
        {book.rating === 5 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full liquid-glass text-[#ff9f0a] text-[10px] font-mono font-bold shadow-md border border-[#ff9f0a]/30 backdrop-blur-md">
            ★ 5.0
          </div>
        )}
      </div>

      {/* Title & Subtitle Below - exactly as in the user's reference image */}
      <div className="mt-2.5 px-0.5">
        <h4 className="font-semibold text-xs sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7] line-clamp-1 tracking-tight group-hover/card:text-[#0071e3] dark:group-hover/card:text-[#2997ff] transition-colors">
          {book.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#86868b] dark:text-[#a1a1a6] line-clamp-1 mt-0.5 font-normal">
          {book.author}
        </p>
      </div>
    </div>
  );
}

export function AppleScrollingCarousel({
  books = [],
  onSelectBook,
  title = "Now Trending & Featured",
  subtitle = "Continuous auto-scrolling shelf • Inspired by Apple Podcasts & Books",
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState("normal"); // "slow" | "normal" | "fast"
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "reading" | "five_stars" | "philosophy"

  const scrollContainerRef = useRef(null);

  // Filter books for the carousel
  const carouselBooks = useMemo(() => {
    let list = books;
    if (activeFilter === "reading") {
      list = books.filter((b) => b.status === "reading");
    } else if (activeFilter === "five_stars") {
      list = books.filter((b) => b.rating === 5);
    } else if (activeFilter === "philosophy") {
      list = books.filter((b) => b.genres?.includes("Philosophy"));
    }
    // If filtered list is small, fallback to top books so marquee flows richly
    if (list.length < 8) {
      return books.slice(0, 24);
    }
    return list.slice(0, 30);
  }, [books, activeFilter]);

  // Speed mapping in animation duration seconds
  const speedDurations = {
    slow: "60s",
    normal: "38s",
    fast: "20s",
  };

  // Manual scroll buttons
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  if (!books || books.length === 0) return null;

  return (
    <section className="w-full py-4 select-none relative">
      {/* Carousel Header with Apple Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071e3]"></span>
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight flex items-center gap-2">
              <span>{title}</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full liquid-glass-subtle text-[#86868b] dark:text-[#a1a1a6]">
              {carouselBooks.length} Selected
            </span>
          </div>
          <p className="text-xs text-[#86868b] dark:text-[#a1a1a6] mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Carousel Control Toolbar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Filter Pills */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full liquid-glass-subtle text-[11px]">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium ${
                activeFilter === "all"
                  ? "bg-white dark:bg-white/20 text-[#0071e3] dark:text-white shadow-xs"
                  : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("reading")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium ${
                activeFilter === "reading"
                  ? "bg-white dark:bg-white/20 text-[#34c759] shadow-xs"
                  : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              }`}
            >
              Reading
            </button>
            <button
              onClick={() => setActiveFilter("five_stars")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium ${
                activeFilter === "five_stars"
                  ? "bg-white dark:bg-white/20 text-[#ff9f0a] shadow-xs"
                  : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              }`}
            >
              5★ Gems
            </button>
          </div>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              setSpeed((prev) => (prev === "normal" ? "slow" : prev === "slow" ? "fast" : "normal"));
            }}
            className="p-1.5 px-2.5 rounded-full liquid-glass-subtle text-xs font-mono text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-all cursor-pointer"
            title="Toggle scrolling speed"
          >
            {speed.toUpperCase()}
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full liquid-glass hover:bg-white dark:hover:bg-white/10 text-[#1d1d1f] dark:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
            title={isPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
            aria-label={isPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
          >
            {isPlaying ? <Pause size={14} className="stroke-[2.2]" /> : <Play size={14} className="stroke-[2.2] ml-0.5" />}
          </button>

          {/* Manual Scroll Arrows */}
          <button
            onClick={handleScrollLeft}
            className="p-1.5 rounded-full liquid-glass hover:bg-white dark:hover:bg-white/10 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-all cursor-pointer active:scale-95"
            title="Scroll backward"
            aria-label="Scroll backward"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleScrollRight}
            className="p-1.5 rounded-full liquid-glass hover:bg-white dark:hover:bg-white/10 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-all cursor-pointer active:scale-95"
            title="Scroll forward"
            aria-label="Scroll forward"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Carousel Ribbon Container */}
      <div
        ref={scrollContainerRef}
        className="relative overflow-x-hidden group py-2 [mask-image:linear-gradient(90deg,transparent,black_3%,black_97%,transparent)]"
      >
        <div
          className="flex items-start gap-4 sm:gap-6 py-2 px-4 w-max"
          style={{
            animation: `apple-marquee-slide ${speedDurations[speed]} linear infinite`,
            animationPlayState: isPlaying ? "running" : "paused",
          }}
          onMouseEnter={(e) => {
            if (isPlaying) e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            if (isPlaying) e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {/* Double list concatenation for truly seamless loop */}
          {[...carouselBooks, ...carouselBooks].map((book, idx) => (
            <SquareBookCard
              key={`${book.id}-carousel-${idx}`}
              book={book}
              onSelectBook={onSelectBook}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
