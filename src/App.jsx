import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_BOOKS } from './data/initialBooks';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Navbar } from './components/Navbar';
import { StatsBar } from './components/StatsBar';
import { SearchAndFilter } from './components/SearchAndFilter';
import { BookCard } from './components/BookCard';
import { BookJournalRow } from './components/BookJournalRow';
import { BookDetailModal } from './components/BookDetailModal';
import { BookFormModal } from './components/BookFormModal';
import { ConfirmModal } from './components/ConfirmModal';
import { BookOpen, Plus, FilterX, BookMarked, Check } from 'lucide-react';

export default function App() {
  // Local storage state
  const [books, setBooks] = useLocalStorage('folio_books_v1', INITIAL_BOOKS);
  const [readingGoal, setReadingGoal] = useLocalStorage('folio_reading_goal_v1', 20);
  const [viewMode, setViewMode] = useLocalStorage('folio_view_mode_v1', 'grid');
  const [showStats, setShowStats] = useLocalStorage('folio_show_stats_v1', true);

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

  // Modals & Drawers
  const [detailBook, setDetailBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

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
    };
  }, [books]);

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Status filter
        if (statusFilter === 'favorites' && !book.favorite) return false;
        if (statusFilter !== 'all' && statusFilter !== 'favorites' && book.status !== statusFilter) return false;

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

        // Search query (fuzzy match across title, author, thoughts, description, quote, genres)
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

  // Book Actions
  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks((prev) => prev.map((b) => (b.id === bookData.id ? bookData : b)));
      if (detailBook && detailBook.id === bookData.id) {
        setDetailBook(bookData);
      }
      showToast('Book updated successfully');
    } else {
      setBooks((prev) => [bookData, ...prev]);
      showToast('New book added to library');
    }
  };

  const handleToggleFavorite = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, favorite: !b.favorite } : b))
    );
    if (detailBook && detailBook.id === id) {
      setDetailBook((prev) => ({ ...prev, favorite: !prev.favorite }));
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (detailBook && detailBook.id === id) {
      setDetailBook((prev) => ({ ...prev, status: newStatus }));
    }
    showToast(`Status updated to ${newStatus}`);
  };

  const handleUpdateRating = (id, newRating) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, rating: newRating } : b))
    );
    if (detailBook && detailBook.id === id) {
      setDetailBook((prev) => ({ ...prev, rating: newRating }));
    }
  };

  const handleDeleteBook = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Remove Book from Library?',
      message: 'This will permanently remove this book and your personal thoughts/reflections from your library.',
      confirmText: 'Delete Book',
      onConfirm: () => {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        if (detailBook?.id === id) setDetailBook(null);
        setConfirmState({ isOpen: false });
        showToast('Book removed from library');
      },
    });
  };

  const handleResetData = () => {
    setConfirmState({
      isOpen: true,
      title: 'Reset to Curated Sample Library?',
      message: 'This will replace your current books with the curated sample library.',
      confirmText: 'Reset Library',
      onConfirm: () => {
        setBooks(INITIAL_BOOKS);
        setConfirmState({ isOpen: false });
        showToast('Library reset to curated collection');
      },
    });
  };

  // Export JSON
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(books, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `folio-reading-journal-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Library exported successfully');
  };

  // Import JSON
  const handleImportData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setBooks(imported);
          showToast(`Imported ${imported.length} books successfully`);
        } else {
          alert('Invalid JSON format: expected an array of books.');
        }
      } catch (err) {
        console.error('Import error:', err);
        alert('Could not parse JSON file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#0c0e12] text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check size={16} className="text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
        onAddBook={() => {
          setEditingBook(null);
          setIsFormOpen(true);
        }}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetData={handleResetData}
        totalCount={books.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Editorial Literary Quote Header */}
        <section className="relative py-4 text-left border-b border-stone-200/80 dark:border-stone-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-1">
                Personal Reading Journal & Shelf
              </p>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 tracking-tight">
                Reading Chronicles
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl font-serif italic">
                "A reader lives a thousand lives before he dies. The man who never reads lives only one."
                <span className="not-italic text-stone-400 text-xs ml-2">— George R.R. Martin</span>
              </p>
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base">{counts.read}</span> of <span className="font-bold text-stone-900 dark:text-stone-100 text-base">{counts.all}</span> books finished
            </div>
          </div>
        </section>

        {/* Stats Bar (Collapsible) */}
        {showStats && (
          <StatsBar
            books={books}
            readingGoal={readingGoal}
            onUpdateReadingGoal={(goal) => setReadingGoal(goal)}
          />
        )}

        {/* Search, Filter & View Mode Controls */}
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
        />

        {/* Books List / Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-3xl p-8 bg-white/50 dark:bg-[#13161f]/50">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mx-auto mb-3">
              <BookMarked size={28} />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              No books found
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-md mx-auto">
              {searchQuery || statusFilter !== 'all' || selectedGenre !== 'all' || ratingFilter !== 'all'
                ? 'Try adjusting your search keywords or clearing some filters.'
                : 'Your library is empty. Start by logging the first book you have read!'}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              {(searchQuery || statusFilter !== 'all' || selectedGenre !== 'all' || ratingFilter !== 'all') ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setSelectedGenre('all');
                    setRatingFilter('all');
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5"
                >
                  <FilterX size={14} />
                  <span>Reset All Filters</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingBook(null);
                    setIsFormOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-700 hover:bg-amber-800 text-white transition-colors flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add First Book</span>
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Visual Grid View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={(b) => setDetailBook(b)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Editorial Reading Journal View */
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <BookJournalRow
                key={book.id}
                book={book}
                onSelect={(b) => setDetailBook(b)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200/80 dark:border-stone-800/80 py-8 text-center text-xs text-stone-500 dark:text-stone-400 bg-white/40 dark:bg-[#0e1017]/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-amber-700 dark:text-amber-400" />
            <span className="font-serif font-bold text-stone-800 dark:text-stone-200">Folio</span>
            <span>— Your sanctuary for books, memories & reflections</span>
          </div>
          <div className="font-mono text-[11px] text-stone-400">
            {books.length} Books in Collection • Stored locally in your browser
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <BookDetailModal
        book={detailBook}
        isOpen={!!detailBook}
        onClose={() => setDetailBook(null)}
        onEdit={(b) => {
          setEditingBook(b);
          setIsFormOpen(true);
        }}
        onDelete={(id) => handleDeleteBook(id)}
        onToggleFavorite={handleToggleFavorite}
        onUpdateStatus={handleUpdateStatus}
        onUpdateRating={handleUpdateRating}
      />

      {/* Add / Edit Form Modal */}
      <BookFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBook(null);
        }}
        onSave={handleSaveBook}
        initialData={editingBook}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState({ isOpen: false })}
      />
    </div>
  );
}
