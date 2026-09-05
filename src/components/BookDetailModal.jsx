import React, { useEffect, useState } from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import {
  X,
  Heart,
  Calendar,
  Quote,
  MessageSquare,
  Share2,
  Check,
  Tag,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Save,
  BookOpen,
  BookCheck,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function BookDetailModal({
  book,
  isOpen,
  onClose,
  onNextBook,
  onPrevBook,
  hasNext = false,
  hasPrev = false,
  onToggleFavorite,
  onUpdateRating,
  onUpdateStatus,
  onUpdateNotes,
}) {
  const [copied, setCopied] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [notesInput, setNotesInput] = useState('');

  const isEditingNotes = editingBookId === book?.id;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && !isEditingNotes) onNextBook();
      if (e.key === 'ArrowLeft' && hasPrev && !isEditingNotes) onPrevBook();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNextBook, onPrevBook, hasNext, hasPrev, isEditingNotes]);


  if (!isOpen || !book) return null;

  const handleFavoriteClick = () => {
    if (!book.favorite) {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.4 },
        colors: ['#f43f5e', '#fb7185', '#e11d48'],
      });
    }
    onToggleFavorite(book.id);
  };

  const handleStartEditNotes = () => {
    setNotesInput(book.myThoughts || '');
    setEditingBookId(book.id);
  };

  const handleCancelEditNotes = () => {
    setEditingBookId(null);
  };

  const handleSaveNotes = () => {
    onUpdateNotes(book.id, notesInput);
    setEditingBookId(null);
  };

  const copyMarkdown = () => {

    const md = `# ${book.title}\n**Author:** ${book.author}\n**Published:** ${book.publishedYear}\n**Rating:** ${book.rating}/5\n**Status:** ${book.status}\n${book.dateRead ? `**Date Read:** ${book.dateRead}\n` : ''}\n## Reader's Reflections\n${book.myThoughts || 'None recorded.'}\n\n${book.favoriteQuote ? `> "${book.favoriteQuote}"\n\n` : ''}## Synopsis\n${book.description || 'No description available.'}\n`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const statusOptions = [
    { id: 'read', label: 'Finished Reading', icon: BookCheck, color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' },
    { id: 'reading', label: 'Currently Reading', icon: BookOpen, color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' },
    { id: 'want_to_read', label: 'Want to Read / Up Next', icon: Bookmark, color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800' },
  ];

  const currentStatus = statusOptions.find((s) => s.id === book.status) || statusOptions[0];
  const StatusIcon = currentStatus.icon;

  const openLibraryUrl = `https://openlibrary.org/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#faf8f5] dark:bg-[#11141c] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-stone-800/90 overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/80 dark:bg-[#151924]/80 backdrop-blur-md sticky top-0 z-20">
          {/* Navigation Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={onPrevBook}
              className={`p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-1 text-xs transition-colors ${
                hasPrev
                  ? 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer'
                  : 'opacity-40 cursor-not-allowed text-stone-400'
              }`}
              title="Previous volume (← Arrow key)"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              type="button"
              disabled={!hasNext}
              onClick={onNextBook}
              className={`p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-1 text-xs transition-colors ${
                hasNext
                  ? 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer'
                  : 'opacity-40 cursor-not-allowed text-stone-400'
              }`}
              title="Next volume (→ Arrow key)"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Favorite toggle */}
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                book.favorite
                  ? 'bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                  : 'bg-white dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-500'
              }`}
              title="Toggle Favorite"
            >
              <Heart size={14} className={book.favorite ? 'fill-rose-500' : ''} />
              <span className="hidden sm:inline">{book.favorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            {/* Copy citation */}
            <button
              type="button"
              onClick={copyMarkdown}
              className="px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl bg-white dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 border border-stone-200 dark:border-stone-700 cursor-pointer"
              title="Copy volume citation as Markdown"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span className="hidden sm:inline">Markdown</span>
                </>
              )}
            </button>

            <div className="w-[1px] h-4 bg-stone-200 dark:bg-stone-800 mx-1" />

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Close dossier (ESC)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Dossier Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8 flex-1">
          {/* Main Book Presentation Row */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: 3D Cover & Interactive Controls */}
            <div className="shrink-0 mx-auto md:mx-0 flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/15 dark:bg-amber-400/10 rounded-xl blur-2xl pointer-events-none" />
                <BookCover
                  coverUrl={book.coverUrl}
                  title={book.title}
                  author={book.author}
                  gradient={book.coverGradient}
                  size="lg"
                  ribbon={book.favorite}
                  className="shadow-2xl"
                />
              </div>

              {/* Interactive Star Rating Selector */}
              <div className="bg-white/80 dark:bg-stone-900/80 px-4 py-2.5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 flex flex-col items-center gap-1 shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                  Rate this volume
                </span>
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={book.rating}
                    size={18}
                    interactive={true}
                    onChange={(r) => onUpdateRating(book.id, r)}
                  />
                  <span className="font-mono text-xs font-bold text-stone-700 dark:text-stone-300">
                    {book.rating}.0
                  </span>
                </div>
              </div>

              {/* Interactive Status Selector */}
              <div className="w-full">
                <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1 text-center">
                  Reading Status
                </label>
                <select
                  value={book.status}
                  onChange={(e) => onUpdateStatus(book.id, e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-medium cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                >
                  <option value="read">Finished Reading</option>
                  <option value="reading">Currently Reading</option>
                  <option value="want_to_read">Want to Read / Up Next</option>
                </select>
              </div>
            </div>

            {/* Right: Detailed Literary Dossier */}
            <div className="flex-1 space-y-5 text-left min-w-0">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold flex items-center gap-1 ${currentStatus.color}`}>
                    <StatusIcon size={12} />
                    <span>{currentStatus.label}</span>
                  </span>
                  {book.publishedYear && (
                    <span className="text-stone-400 font-mono text-xs">
                      Pub. {book.publishedYear}
                    </span>
                  )}
                </div>

                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-950 dark:text-stone-50 leading-tight">
                  {book.title}
                </h1>
                <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg font-medium mt-1">
                  by <span className="font-serif text-stone-900 dark:text-stone-100 font-bold">{book.author}</span>
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-stone-200/70 dark:border-stone-800/70 text-xs">
                <div>
                  <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider block text-[10px] font-mono">Published</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm font-mono">{book.publishedYear || 'Unknown'}</span>
                </div>
                <div>
                  <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider block text-[10px] font-mono">Length</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm">{book.pages ? `${book.pages} pages` : '~280 pages (est.)'}</span>
                </div>
                <div>
                  <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider block text-[10px] font-mono">Explore</span>
                  <a
                    href={openLibraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:underline font-medium text-xs mt-1"
                  >
                    <span>Open Library</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* Reading Dates */}
              {(book.dateStarted || book.dateRead) && (
                <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400">
                  {book.dateStarted && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-stone-400" />
                      <span>Started: <strong className="text-stone-700 dark:text-stone-300">{book.dateStarted}</strong></span>
                    </div>
                  )}
                  {book.dateRead && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-stone-400" />
                      <span>Finished: <strong className="text-stone-700 dark:text-stone-300">{book.dateRead}</strong></span>
                    </div>
                  )}
                </div>
              )}

              {/* Genre Capsules */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {book.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 text-xs font-medium border border-stone-200/80 dark:border-stone-700/80 flex items-center gap-1 shadow-xs"
                    >
                      <Tag size={10} className="text-amber-600 dark:text-amber-400" />
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Reader's Reflections & Marginalia (with Inline Editor!) */}
              <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/[0.07] dark:bg-amber-400/[0.05] border border-amber-500/20 dark:border-amber-400/15 relative">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-xs uppercase tracking-wider font-mono">
                    <MessageSquare size={14} />
                    <span>Reader's Reflections & Marginalia</span>
                  </div>

                  {!isEditingNotes ? (
                    <button
                      type="button"
                      onClick={handleStartEditNotes}
                      className="text-xs text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Edit3 size={12} />
                      <span>{book.myThoughts ? 'Edit Notes' : 'Add Notes'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Save size={12} />
                      <span>Save</span>
                    </button>
                  )}
                </div>

                {isEditingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Write your personal reflections, takeaways, or marginalia for this book..."
                      rows={4}
                      className="w-full p-3 rounded-xl bg-white dark:bg-stone-900 border border-amber-400/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif leading-relaxed"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleCancelEditNotes}
                        className="px-3 py-1 rounded-lg text-xs text-stone-500 hover:text-stone-700 cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="px-3 py-1 rounded-lg bg-amber-700 text-white text-xs font-semibold"
                      >
                        Save Reflections
                      </button>
                    </div>
                  </div>
                ) : book.myThoughts ? (
                  <p className="font-serif text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                    "{book.myThoughts}"
                  </p>
                ) : (
                  <div className="py-2 text-stone-400 text-xs italic">
                    No personal reflections recorded yet. Click "Add Notes" to inscribe your takeaways.
                  </div>
                )}
              </div>

              {/* Memorable Passage / Quote */}
              {book.favoriteQuote && (
                <div className="relative pl-6 py-2 border-l-2 border-amber-600 dark:border-amber-400">
                  <Quote className="absolute -left-3 -top-1 w-6 h-6 p-1 bg-[#faf8f5] dark:bg-[#11141c] text-amber-600 dark:text-amber-400" />
                  <blockquote className="font-serif italic text-lg sm:text-xl text-stone-800 dark:text-stone-200 leading-relaxed">
                    "{book.favoriteQuote}"
                  </blockquote>
                  <span className="block mt-2 text-xs uppercase tracking-widest font-mono text-stone-400">
                    Memorable Passage • {book.author}
                  </span>
                </div>
              )}

              {/* Book Synopsis & Editorial Overview */}
              {book.description && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-stone-400 dark:text-stone-500 font-semibold flex items-center gap-1.5">
                    <BookOpen size={12} />
                    <span>Synopsis & Key Themes</span>
                  </h4>
                  <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                    {book.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer with Keyboard Navigation Shortcuts */}
        <div className="px-6 sm:px-8 py-3 bg-stone-100/80 dark:bg-[#151924]/80 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
            <span>Leaf through: <kbd className="px-1.5 py-0.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-[10px]">→</kbd></span>
            <span>Close: <kbd className="px-1.5 py-0.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-[10px]">ESC</kbd></span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-medium transition-colors cursor-pointer text-xs"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}

