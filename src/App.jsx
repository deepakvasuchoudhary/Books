import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { BOOKS } from './data/books';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Navbar } from './components/Navbar';
import { HeroSpotlight } from './components/HeroSpotlight';
import { StatsBar } from './components/StatsBar';
import { SearchAndFilter } from './components/SearchAndFilter';
import { BookCard } from './components/BookCard';
import { BookJournalRow } from './components/BookJournalRow';
import { BookCompactRow } from './components/BookCompactRow';
import { BookDetailModal } from './components/BookDetailModal';
import { RandomBookModal } from './components/RandomBookModal';
import { BookOpen, FilterX, BookMarked } from 'lucide-react';


export default function App() {
  // User overrides stored persistently in localStorage (favorites, ratings, notes, status)
  const [userOverrides, setUserOverrides] = useLocalStorage('folio_user_book_overrides_v2', {});

  // Merge static curated books with user live overrides
  const books = useMemo(() => {
    return BOOKS.map((b) => {
      const override = userOverrides[b.id];
      if (!override) return b;
      return { ...b, ...override };
    });
  }, [userOverrides]);

  // Reading Goal & Preferences
  const [readingGoal, setReadingGoal] = useLocalStorage('folio_reading_goal_v2', 20);
  const [viewMode, setViewMode] = useLocalStorage('folio_view_mode_v2', 'grid');
  const [showStats, setShowStats] = useLocalStorage('folio_show_stats_v2', true);

  // Theme Management (Light / Dark)
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('folio_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.localStorage.setItem('folio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent_read');

  // Modal States
  const [detailBookId, setDetailBookId] = useState(null);
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [randomBook, setRandomBook] = useState(null);

  // Search input ref for keyboard shortcut '/'
  const searchInputRef = useRef(null);

  // User Curation Handlers
  const handleToggleFavorite = useCallback((bookId) => {
    setUserOverrides((prev) => {
      const book = books.find((b) => b.id === bookId);
      const isFav = !!book?.favorite;
      return {
        ...prev,
        [bookId]: {
          ...(prev[bookId] || {}),
          favorite: !isFav,
        },
      };
    });
  }, [books, setUserOverrides]);

  const handleUpdateRating = useCallback((bookId, rating) => {
    setUserOverrides((prev) => ({
      ...prev,
      [bookId]: {
        ...(prev[bookId] || {}),
        rating,
      },
    }));
  }, [setUserOverrides]);

  const handleUpdateStatus = useCallback((bookId, status) => {
    setUserOverrides((prev) => ({
      ...prev,
      [bookId]: {
        ...(prev[bookId] || {}),
        status,
      },
    }));
  }, [setUserOverrides]);

  const handleUpdateNotes = useCallback((bookId, myThoughts) => {
    setUserOverrides((prev) => ({
      ...prev,
      [bookId]: {
        ...(prev[bookId] || {}),
        myThoughts,
      },
    }));
  }, [setUserOverrides]);

  // Available unique genres
  const availableGenres = useMemo(() => {
    const set = new Set();
    books.forEach((b) => {
      (b.genres || []).forEach((g) => {
        if (g && g.trim()) set.add(g.trim());
      });
    });
    return Array.from(set).sort();
  }, [books]);

  // Status counts
  const counts = useMemo(() => {
    return {
      all: books.length,
      read: books.filter((b) => b.status === 'read').length,
      reading: books.filter((b) => b.status === 'reading').length,
      want_to_read: books.filter((b) => b.status === 'want_to_read').length,
      favorites: books.filter((b) => b.favorite).length,
      five_stars: books.filter((b) => b.rating === 5).length,
    };
  }, [books]);

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Status filter
        if (statusFilter === 'favorites' && !book.favorite) return false;
        if (statusFilter === 'five_stars' && book.rating !== 5) return false;
        if (
          statusFilter !== 'all' &&
          statusFilter !== 'favorites' &&
          statusFilter !== 'five_stars' &&
          book.status !== statusFilter
        ) {
          return false;
        }

        // Genre filter
        if (selectedGenre !== 'all') {
          if (!book.genres || !book.genres.includes(selectedGenre)) return false;
        }

        // Rating filter
        if (ratingFilter !== 'all') {
          const minRating = Number(ratingFilter);
          if (ratingFilter === '5' && book.rating !== 5) return false;
          if (book.rating < minRating) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = book.title?.toLowerCase().includes(q);
          const matchAuthor = book.author?.toLowerCase().includes(q);
          const matchThoughts = book.myThoughts?.toLowerCase().includes(q);
          const matchDesc = book.description?.toLowerCase().includes(q);
          const matchQuote = book.favoriteQuote?.toLowerCase().includes(q);
          const matchYear = String(book.publishedYear || '').includes(q);
          const matchGenre = book.genres?.some((g) => g.toLowerCase().includes(q));

          if (!matchTitle && !matchAuthor && !matchThoughts && !matchDesc && !matchQuote && !matchYear && !matchGenre) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating_high') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'title_asc') {
          return (a.title || '').localeCompare(b.title || '');
        }
        if (sortBy === 'author_asc') {
          return (a.author || '').localeCompare(b.author || '');
        }
        if (sortBy === 'year_desc') {
          return (Number(b.publishedYear) || 0) - (Number(a.publishedYear) || 0);
        }
        if (sortBy === 'year_asc') {
          return (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0);
        }
        // Default: recent_read
        const dateA = a.dateRead || a.dateStarted || '1970-01-01';
        const dateB = b.dateRead || b.dateStarted || '1970-01-01';
        return dateB.localeCompare(dateA);
      });
  }, [books, statusFilter, selectedGenre, ratingFilter, searchQuery, sortBy]);

  // Detail Modal Book & Leaf-through Navigation
  const currentDetailIndex = useMemo(() => {
    if (!detailBookId) return -1;
    return filteredBooks.findIndex((b) => b.id === detailBookId);
  }, [detailBookId, filteredBooks]);

  const detailBook = useMemo(() => {
    if (!detailBookId) return null;
    return filteredBooks[currentDetailIndex] || books.find((b) => b.id === detailBookId) || null;
  }, [detailBookId, currentDetailIndex, filteredBooks, books]);

  const handleNextBook = useCallback(() => {
    if (currentDetailIndex >= 0 && currentDetailIndex < filteredBooks.length - 1) {
      setDetailBookId(filteredBooks[currentDetailIndex + 1].id);
    }
  }, [currentDetailIndex, filteredBooks]);

  const handlePrevBook = useCallback(() => {
    if (currentDetailIndex > 0) {
      setDetailBookId(filteredBooks[currentDetailIndex - 1].id);
    }
  }, [currentDetailIndex, filteredBooks]);

  // Random Discovery Trigger
  const handleOpenRandomDiscovery = useCallback(() => {
    const pool = filteredBooks.length > 0 ? filteredBooks : books;
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setRandomBook(pool[randomIndex]);
    setIsRandomModalOpen(true);
  }, [filteredBooks, books]);

  const handlePickAnotherRandom = useCallback(() => {
    const pool = filteredBooks.length > 0 ? filteredBooks : books;
    if (pool.length === 0) return;
    let nextIndex = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && pool[nextIndex]?.id === randomBook?.id) {
      nextIndex = (nextIndex + 1) % pool.length;
    }
    setRandomBook(pool[nextIndex]);
  }, [filteredBooks, books, randomBook]);

  // Keyboard Shortcuts: '/' to focus search, 'R' for random discovery
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const target = e.target;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (!isInput) {
        if (e.key === '/') {
          e.preventDefault();
          searchInputRef.current?.focus();
        } else if (e.key.toLowerCase() === 'r' && !detailBookId && !isRandomModalOpen) {
          e.preventDefault();
          handleOpenRandomDiscovery();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [detailBookId, isRandomModalOpen, handleOpenRandomDiscovery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedGenre('all');
    setRatingFilter('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#0b0d13] text-stone-900 dark:text-stone-100 transition-colors duration-200 selection:bg-amber-500/25 selection:text-amber-900 dark:selection:text-amber-200">
      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        totalCount={books.length}
        onOpenRandom={handleOpenRandomDiscovery}
        onFocusSearch={() => searchInputRef.current?.focus()}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Atmospheric Literary Header & Featured Spotlight */}
        <HeroSpotlight
          books={books}
          onSelectBook={(b) => setDetailBookId(b.id)}
          onOpenRandomModal={handleOpenRandomDiscovery}
          totalBooksCount={books.length}
          finishedCount={counts.read}
        />

        {/* Reading Journey Dossier / Stats Bar (Collapsible) */}
        {showStats && (
          <StatsBar
            books={books}
            readingGoal={readingGoal}
            onUpdateReadingGoal={(goal) => setReadingGoal(goal)}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
            onSelectStatus={(status) => setStatusFilter(status)}
          />
        )}

        {/* Search, Filter & 3-Mode View Controls */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
          availableGenres={availableGenres}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          counts={counts}
          filteredCount={filteredBooks.length}
          onResetFilters={handleResetFilters}
          searchInputRef={searchInputRef}
        />

        {/* Books Presentation by Selected View Mode */}
        {filteredBooks.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-3xl p-8 bg-white/50 dark:bg-[#131620]/50">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-700 dark:text-amber-400 mx-auto mb-4">
              <BookMarked size={32} />
            </div>
            <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">
              No Matching Volumes Found
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto font-sans leading-relaxed">
              We couldn't find any works matching your criteria. Try adjusting keywords or clearing active filters.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-amber-700 hover:bg-amber-800 text-white shadow-sm shadow-amber-900/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FilterX size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* 1. Visual 3D Hardcover Shelf Gallery */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={(b) => setDetailBookId(b.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : viewMode === 'journal' ? (
          /* 2. Editorial Reading Journal Review Spread */
          <div className="space-y-5">
            {filteredBooks.map((book) => (
              <BookJournalRow
                key={book.id}
                book={book}
                onSelect={(b) => setDetailBookId(b.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* 3. Compact Catalog Index View */
          <div className="space-y-2">
            {filteredBooks.map((book, index) => (
              <BookCompactRow
                key={book.id}
                book={book}
                index={index}
                onSelect={(b) => setDetailBookId(b.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {/* Literary Editorial Footer */}
      <footer className="mt-20 border-t border-stone-200/80 dark:border-stone-800/80 py-10 bg-white/50 dark:bg-[#0e1119]/50 backdrop-blur-sm text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-700 text-white flex items-center justify-center">
              <BookOpen size={14} />
            </div>
            <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
              Folio Atelier
            </span>
            <span className="text-stone-400">— Personal Reading Sanctuary & Journal</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-stone-400">
            <span>{books.length} Curated Volumes</span>
            <span>•</span>
            <span>Static Git Archive</span>
            <span>•</span>
            <a
              href="https://github.com/deepakvasuchoudhary/Books"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 dark:text-amber-400 hover:underline"
            >
              Source Repository
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Volume Dossier Modal */}
      <BookDetailModal
        book={detailBook}
        isOpen={!!detailBook}
        onClose={() => setDetailBookId(null)}
        onNextBook={handleNextBook}
        onPrevBook={handlePrevBook}
        hasNext={currentDetailIndex >= 0 && currentDetailIndex < filteredBooks.length - 1}
        hasPrev={currentDetailIndex > 0}
        onToggleFavorite={handleToggleFavorite}
        onUpdateRating={handleUpdateRating}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
      />

      {/* Random Book Discovery Modal with Confetti */}
      <RandomBookModal
        isOpen={isRandomModalOpen}
        book={randomBook}
        onClose={() => setIsRandomModalOpen(false)}
        onPickAnother={handlePickAnotherRandom}
        onSelectBook={(b) => {
          setIsRandomModalOpen(false);
          setDetailBookId(b.id);
        }}
      />
    </div>
  );
}

