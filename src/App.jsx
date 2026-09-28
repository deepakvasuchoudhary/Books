import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { BOOKS } from "./data/books";
import { Sidebar } from "./components/Sidebar";
import { TopHeader } from "./components/TopHeader";
import { BentoHero } from "./components/BentoHero";
import { BookCardBento } from "./components/BookCardBento";
import { BookCoverWall } from "./components/BookCoverWall";
import { BookTableCatalog } from "./components/BookTableCatalog";
import { BookReaderDrawer } from "./components/BookReaderDrawer";
import { RandomBookModal } from "./components/RandomBookModal";
import { SearchX } from "lucide-react";

export default function App() {
  // Theme Management (Light / Dark)
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("libris_theme") || window.localStorage.getItem("folio_theme");
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("libris_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // View Mode: "bento" | "cover" | "table"
  const [viewMode, setViewMode] = useState(() => {
    return window.localStorage.getItem("libris_view_mode") || "bento";
  });

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    window.localStorage.setItem("libris_view_mode", mode);
  };

  // Navigation & Filtering State
  const [activeShelf, setActiveShelf] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent_read");

  // Mobile Sidebar State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Selected Book for Drawer
  const [selectedBook, setSelectedBook] = useState(null);

  // Random Recommendation State
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [randomBook, setRandomBook] = useState(null);

  // Search input ref for keyboard shortcut "/"
  const searchInputRef = useRef(null);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search with "/" or "⌘K" / "Ctrl+K"
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Shelf Counts
  const counts = useMemo(() => {
    return {
      all: BOOKS.length,
      reading: BOOKS.filter((b) => b.status === "reading").length,
      read: BOOKS.filter((b) => b.status === "read").length,
      want_to_read: BOOKS.filter((b) => b.status === "want_to_read").length,
      five_stars: BOOKS.filter((b) => b.rating === 5).length,
      favorites: BOOKS.filter((b) => b.favorite).length,
    };
  }, []);

  // Available unique genres & genre counts
  const { availableGenres, genreCounts } = useMemo(() => {
    const countsMap = {};
    const set = new Set();

    BOOKS.forEach((b) => {
      (b.genres || []).forEach((g) => {
        if (g && g.trim()) {
          const trimmed = g.trim();
          set.add(trimmed);
          countsMap[trimmed] = (countsMap[trimmed] || 0) + 1;
        }
      });
    });

    return {
      availableGenres: Array.from(set).sort(),
      genreCounts: countsMap,
    };
  }, []);

  // Filtered and Sorted Books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // Shelf Filter
      if (activeShelf === "reading" && book.status !== "reading") return false;
      if (activeShelf === "read" && book.status !== "read") return false;
      if (activeShelf === "want_to_read" && book.status !== "want_to_read") return false;
      if (activeShelf === "five_stars" && book.rating !== 5) return false;

      // Genre Filter
      if (selectedGenre !== "all") {
        if (!book.genres || !book.genres.includes(selectedGenre)) return false;
      }

      // Rating Filter
      if (ratingFilter !== "all") {
        const minRating = Number(ratingFilter);
        if (book.rating < minRating) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = book.title?.toLowerCase().includes(q);
        const matchAuthor = book.author?.toLowerCase().includes(q);
        const matchDesc = book.description?.toLowerCase().includes(q);
        const matchThoughts = book.myThoughts?.toLowerCase().includes(q);
        const matchQuote = book.favoriteQuote?.toLowerCase().includes(q);
        const matchYear = String(book.publishedYear || "").includes(q);
        const matchGenre = book.genres?.some((g) => g.toLowerCase().includes(q));

        if (!matchTitle && !matchAuthor && !matchDesc && !matchThoughts && !matchQuote && !matchYear && !matchGenre) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating_high") {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === "title_asc") {
        return (a.title || "").localeCompare(b.title || "");
      }
      if (sortBy === "author_asc") {
        return (a.author || "").localeCompare(b.author || "");
      }
      if (sortBy === "year_desc") {
        return (Number(b.publishedYear) || 0) - (Number(a.publishedYear) || 0);
      }
      if (sortBy === "year_asc") {
        return (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0);
      }
      // Default: preserve catalog order
      return 0;
    });
  }, [activeShelf, selectedGenre, ratingFilter, searchQuery, sortBy]);

  // Featured Spotlight Volume for Bento Hero
  const spotlightBook = useMemo(() => {
    return BOOKS.find((b) => b.id === "the-courage-to-be-disliked") || BOOKS[0];
  }, []);

  // Shelf Labels
  const activeShelfLabel = useMemo(() => {
    switch (activeShelf) {
      case "reading":
        return "Currently Reading";
      case "read":
        return "Completed Archive";
      case "want_to_read":
        return "Reading Queue";
      case "five_stars":
        return "5-Star Hall of Fame";
      default:
        return "All Library Volumes";
    }
  }, [activeShelf]);

  // Drawer Next / Prev Navigation
  const currentBookIndex = useMemo(() => {
    if (!selectedBook) return -1;
    return filteredBooks.findIndex((b) => b.id === selectedBook.id);
  }, [selectedBook, filteredBooks]);

  const hasNext = currentBookIndex >= 0 && currentBookIndex < filteredBooks.length - 1;
  const hasPrev = currentBookIndex > 0;

  const handleNextBook = useCallback(() => {
    if (hasNext) {
      setSelectedBook(filteredBooks[currentBookIndex + 1]);
    }
  }, [hasNext, currentBookIndex, filteredBooks]);

  const handlePrevBook = useCallback(() => {
    if (hasPrev) {
      setSelectedBook(filteredBooks[currentBookIndex - 1]);
    }
  }, [hasPrev, currentBookIndex, filteredBooks]);

  // Random Book Picker Handler
  const handleOpenRandom = () => {
    const pool = filteredBooks.length > 0 ? filteredBooks : BOOKS;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setRandomBook(pool[randomIndex]);
    setIsRandomModalOpen(true);
  };

  const handlePickAnotherRandom = () => {
    const pool = filteredBooks.length > 0 ? filteredBooks : BOOKS;
    let nextIndex = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && pool[nextIndex].id === randomBook?.id) {
      nextIndex = (nextIndex + 1) % pool.length;
    }
    setRandomBook(pool[nextIndex]);
  };

  const isFiltered = activeShelf !== "all" || selectedGenre !== "all" || ratingFilter !== "all" || searchQuery !== "";

  const handleResetFilters = () => {
    setActiveShelf("all");
    setSelectedGenre("all");
    setRatingFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] flex transition-colors duration-300 relative overflow-x-hidden selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Background Optical Refraction Atmosphere (Apple Liquid Glass Glow) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-500/15 to-transparent blur-[120px] dark:from-blue-600/20 dark:via-indigo-600/10" />
        <div className="absolute top-[35%] -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-purple-400/15 via-rose-400/10 to-transparent blur-[120px] dark:from-purple-900/25 dark:via-pink-900/15" />
        <div className="absolute -bottom-32 left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-400/15 via-teal-400/10 to-transparent blur-[120px] dark:from-cyan-900/15 dark:via-teal-900/10" />
      </div>

      {/* 1. Sleek Modern Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeShelf={activeShelf}
        onSelectShelf={setActiveShelf}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        availableGenres={availableGenres}
        counts={counts}
        genreCounts={genreCounts}
        onOpenRandom={handleOpenRandom}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => searchInputRef.current?.focus()}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen relative z-10">
        {/* Apple Liquid Glass Sticky Header */}
        <TopHeader
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchInputRef={searchInputRef}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          activeShelfLabel={activeShelfLabel}
          totalResults={filteredBooks.length}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* Bento Hero Section (Shown when no active search query or genre filter) */}
        {!isFiltered && (
          <BentoHero
            spotlightBook={spotlightBook}
            onSelectBook={setSelectedBook}
            counts={counts}
            availableGenres={availableGenres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        )}

        {/* Main Books Presentation Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {filteredBooks.length > 0 ? (
            <>
              {/* Layout 1: Bento Grid View */}
              {viewMode === "bento" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredBooks.map((book) => (
                    <BookCardBento
                      key={book.id}
                      book={book}
                      onSelectBook={setSelectedBook}
                    />
                  ))}
                </div>
              )}

              {/* Layout 2: Apple Books Cover Gallery Wall */}
              {viewMode === "cover" && (
                <BookCoverWall
                  books={filteredBooks}
                  onSelectBook={setSelectedBook}
                />
              )}

              {/* Layout 3: Linear Table Catalog */}
              {viewMode === "table" && (
                <BookTableCatalog
                  books={filteredBooks}
                  onSelectBook={setSelectedBook}
                />
              )}
            </>
          ) : (
            /* Apple Glass Empty State */
            <div className="py-24 text-center space-y-5 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-[22px] liquid-glass flex items-center justify-center mx-auto text-[#86868b] dark:text-[#a1a1a6] shadow-sm">
                <SearchX size={28} className="stroke-[1.75]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  No matching books found
                </h3>
                <p className="text-xs text-[#86868b] dark:text-[#a1a1a6] leading-relaxed">
                  We couldn't find any volume matching your current search criteria or active filters.
                </p>
              </div>

              <button
                onClick={handleResetFilters}
                className="apple-btn-primary px-5 py-2.5 rounded-full text-xs font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>

        {/* Apple Style Liquid Glass Minimalist Footer */}
        <footer className="mt-auto px-6 lg:px-8 py-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-[#86868b] dark:text-[#a1a1a6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">Little Nalanda</span>
            <span>•</span>
            <span>Personal Library by Deepak Choudhary</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>81 Volumes Indexed</span>
            <span>•</span>
            <span>Designed in Cupertino Aesthetic</span>
          </div>
        </footer>
      </div>

      {/* 3. Slide-Over Reader Drawer (NO edit/add/delete options) */}
      <BookReaderDrawer
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onNextBook={handleNextBook}
        onPrevBook={handlePrevBook}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />

      {/* 4. Random Discovery Modal */}
      <RandomBookModal
        isOpen={isRandomModalOpen}
        book={randomBook}
        onClose={() => setIsRandomModalOpen(false)}
        onPickAnother={handlePickAnotherRandom}
        onSelectBook={setSelectedBook}
      />
    </div>
  );
}
