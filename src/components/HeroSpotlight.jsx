import React, { useState, useMemo } from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import {
  Quote,
  Dices,
  ArrowRight,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const NOTABLE_LITERARY_QUOTES = [
  {
    quote: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
    work: "A Dance with Dragons",
  },
  {
    quote: "Pain is inevitable. Suffering is optional.",
    author: "Haruki Murakami",
    work: "What I Talk About When I Talk About Running",
  },
  {
    quote: "It takes something more than intelligence to act intelligently.",
    author: "Fyodor Dostoevsky",
    work: "Crime and Punishment",
  },
  {
    quote: "Happiness is not something you postpone for the future; it is something you design for the present.",
    author: "Jim Rohn",
    work: "Reflections",
  },
  {
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    work: "Meditations",
  },
  {
    quote: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    work: "Dialogues",
  },
];

export function HeroSpotlight({
  books,
  onSelectBook,
  onOpenRandomModal,
  totalBooksCount,
  finishedCount,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Time-aware greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning, reader';
    if (hour < 17) return 'Good afternoon, reader';
    if (hour < 22) return 'Good evening, reader';
    return 'Good night, reader';
  }, []);

  // Spotlight candidates: currently reading, or favorites, or books with rich descriptions
  const spotlightCandidates = useMemo(() => {
    if (!books || books.length === 0) return [];
    const favorites = books.filter((b) => b.favorite);
    if (favorites.length > 0) return favorites;
    const reading = books.filter((b) => b.status === 'reading');
    if (reading.length > 0) return reading;
    // Default to top rated or first few
    return books.slice(0, 10);
  }, [books]);

  const spotlightBook = spotlightCandidates[spotlightIndex % (spotlightCandidates.length || 1)] || books[0];
  const activeQuote = NOTABLE_LITERARY_QUOTES[quoteIndex % NOTABLE_LITERARY_QUOTES.length];

  const handleNextSpotlight = (e) => {
    e.stopPropagation();
    setSpotlightIndex((prev) => prev + 1);
  };

  const handleNextQuote = (e) => {
    e.stopPropagation();
    setQuoteIndex((prev) => prev + 1);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/[0.07] via-stone-100/60 to-amber-900/[0.04] dark:from-amber-500/[0.04] dark:via-[#131620] dark:to-stone-900/40 border border-amber-900/10 dark:border-amber-400/10 p-6 sm:p-8 transition-all duration-300">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-700/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Top Banner Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/70 dark:border-stone-800/70 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-300/90 font-semibold">
              {greeting} • Personal Atelier
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 tracking-tight">
            The Reading Sanctuary
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl font-serif italic">
            A curated sanctuary of {totalBooksCount} philosophical inquiries, timeless classics, and transformative volumes.
          </p>
        </div>

        {/* Quick Actions & Collapse */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={onOpenRandomModal}
            className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-amber-900/20 transition-all cursor-pointer"
            title="Discover a random volume (R)"
          >
            <Dices size={15} />
            <span>Surprise Me</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand atelier spotlight' : 'Collapse atelier spotlight'}
          >
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Expandable Spotlight Body */}
      {!isCollapsed && (
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Curator's Featured Volume Spotlight (7 cols) */}
          {spotlightBook && (
            <div
              onClick={() => onSelectBook(spotlightBook)}
              className="lg:col-span-7 group relative bg-white/80 dark:bg-[#151924]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-stone-200/80 dark:border-stone-800/80 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all duration-300 cursor-pointer text-left shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                {/* 3D Book Cover with Ambient Colored Halo */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-amber-500/20 dark:bg-amber-400/15 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative group-hover:-translate-y-1.5 group-hover:scale-[1.03] transition-all duration-300">
                    <BookCover
                      coverUrl={spotlightBook.coverUrl}
                      title={spotlightBook.title}
                      author={spotlightBook.author}
                      gradient={spotlightBook.coverGradient}
                      size="md"
                      ribbon={spotlightBook.favorite}
                    />
                  </div>
                </div>

                {/* Spotlight Info */}
                <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                      Curator's Spotlight
                    </span>
                    {spotlightBook.publishedYear && (
                      <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                        Pub. {spotlightBook.publishedYear}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-950 dark:text-stone-50 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                    {spotlightBook.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 line-clamp-1">
                    by <span className="text-stone-800 dark:text-stone-200 font-serif font-semibold">{spotlightBook.author}</span>
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                    <StarRating rating={spotlightBook.rating} size={14} />
                    <span className="font-mono text-xs text-stone-400">
                      {spotlightBook.rating}.0
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 sm:line-clamp-3 leading-relaxed font-sans pt-1">
                    {spotlightBook.description || spotlightBook.myThoughts || 'A centerpiece of this personal collection.'}
                  </p>

                  {/* Actions row */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Examine Volume Dossier</span>
                      <ArrowRight size={13} />
                    </span>

                    <button
                      type="button"
                      onClick={handleNextSpotlight}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs flex items-center gap-1 transition-colors"
                      title="Next spotlight volume"
                    >
                      <RefreshCw size={13} />
                      <span className="hidden sm:inline text-[11px] font-mono">Shuffle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Literary Inspiration Quote + Sanctuary Stats (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Literary Quote Card */}
            <div className="relative bg-white/70 dark:bg-[#151924]/70 backdrop-blur-md rounded-2xl p-5 border border-stone-200/80 dark:border-stone-800/80 flex-1 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-medium">
                  <Quote size={14} />
                  <span className="font-mono uppercase tracking-wider text-[11px]">Literary Inspiration</span>
                </div>
                <button
                  type="button"
                  onClick={handleNextQuote}
                  className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  title="Next quote"
                >
                  <RefreshCw size={12} />
                </button>
              </div>

              <blockquote className="font-serif italic text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed my-auto">
                "{activeQuote.quote}"
              </blockquote>

              <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span className="font-medium text-stone-700 dark:text-stone-300">— {activeQuote.author}</span>
                <span className="font-mono text-[10px] text-stone-400">{activeQuote.work}</span>
              </div>
            </div>

            {/* Quick Micro-Stats Bar */}
            <div className="grid grid-cols-3 gap-2 text-left">
              <div className="bg-white/60 dark:bg-[#151924]/60 backdrop-blur-md rounded-xl p-3 border border-stone-200/70 dark:border-stone-800/70">
                <span className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider">Catalog</span>
                <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 leading-tight">
                  {totalBooksCount}
                </span>
                <span className="text-[10px] text-stone-500 block">Volumes</span>
              </div>

              <div className="bg-white/60 dark:bg-[#151924]/60 backdrop-blur-md rounded-xl p-3 border border-stone-200/70 dark:border-stone-800/70">
                <span className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider">Finished</span>
                <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 leading-tight">
                  {finishedCount}
                </span>
                <span className="text-[10px] text-stone-500 block">Read to end</span>
              </div>

              <div className="bg-white/60 dark:bg-[#151924]/60 backdrop-blur-md rounded-xl p-3 border border-stone-200/70 dark:border-stone-800/70">
                <span className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider">Quality</span>
                <span className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 leading-tight">
                  5.0★
                </span>
                <span className="text-[10px] text-stone-500 block">Avg score</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
