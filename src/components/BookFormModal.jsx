import React, { useState, useEffect } from 'react';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { searchOpenLibrary, COVER_GRADIENTS } from '../services/openLibrary';
import {
  X,
  Search,
  Upload,
  Sparkles,
  Loader2,
  Check,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

function BookFormContent({ onClose, onSave, initialData }) {
  const isEditing = !!initialData;

  // Form State initialized directly
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [publishedYear, setPublishedYear] = useState(
    initialData ? initialData.publishedYear || '' : new Date().getFullYear()
  );
  const [coverUrl, setCoverUrl] = useState(initialData?.coverUrl || '');
  const [coverGradient, setCoverGradient] = useState(
    () => initialData?.coverGradient || COVER_GRADIENTS[0].value
  );
  const [description, setDescription] = useState(initialData?.description || '');
  const [myThoughts, setMyThoughts] = useState(initialData?.myThoughts || '');
  const [favoriteQuote, setFavoriteQuote] = useState(initialData?.favoriteQuote || '');
  const [rating, setRating] = useState(initialData ? initialData.rating || 0 : 5);
  const [status, setStatus] = useState(initialData?.status || 'read');
  const [dateRead, setDateRead] = useState(
    initialData ? initialData.dateRead || '' : new Date().toISOString().split('T')[0]
  );
  const [dateStarted, setDateStarted] = useState(initialData?.dateStarted || '');
  const [pages, setPages] = useState(initialData?.pages || '');
  const [genres, setGenres] = useState(initialData?.genres || ['Fiction']);
  const [genreInput, setGenreInput] = useState('');

  // Online Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Handle Online Search via Open Library
  const handleOnlineSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setShowSearchResults(true);
    const results = await searchOpenLibrary(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const applySearchResult = (res) => {
    setTitle(res.title || '');
    setAuthor(res.author || '');
    setPublishedYear(res.publishedYear || '');
    if (res.coverUrl) setCoverUrl(res.coverUrl);
    if (res.pages) setPages(res.pages);
    if (res.genres && res.genres.length > 0) setGenres(res.genres);
    setShowSearchResults(false);
  };

  // Handle local image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add genre tag
  const addGenre = () => {
    const trimmed = genreInput.trim();
    if (trimmed && !genres.includes(trimmed)) {
      setGenres([...genres, trimmed]);
      setGenreInput('');
    }
  };

  const removeGenre = (genreToRemove) => {
    setGenres(genres.filter((g) => g !== genreToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert('Please provide at least a book title and author.');
      return;
    }

    const savedBook = {
      id: initialData?.id || `book-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      publishedYear: publishedYear ? Number(publishedYear) : '',
      coverUrl: coverUrl.trim(),
      coverGradient,
      description: description.trim(),
      myThoughts: myThoughts.trim(),
      favoriteQuote: favoriteQuote.trim(),
      rating: Number(rating),
      status,
      dateRead: status === 'read' ? dateRead : '',
      dateStarted,
      pages: pages ? Number(pages) : '',
      genres: genres.length > 0 ? genres : ['General'],
      favorite: initialData?.favorite || false,
      createdAt: initialData?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    onSave(savedBook);

    // Fire celebratory confetti if marking book as read
    if (status === 'read') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    onClose();
  };

  return (
    <div className="relative w-full max-w-3xl bg-[#fdfcf9] dark:bg-[#12151d] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-[#151922]/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-amber-600 dark:text-amber-400" />
          <h2 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
            {isEditing ? 'Edit Book Entry' : 'Add Book to Library'}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-left">
        {/* Quick Auto-fill via OpenLibrary Search */}
        {!isEditing && (
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                <Sparkles size={14} />
                Auto-fill book details from Open Library
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">Optional</span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleOnlineSearch();
                    }
                  }}
                  placeholder="Search by title, author, or ISBN..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <button
                type="button"
                onClick={handleOnlineSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white transition-colors flex items-center gap-1.5 shrink-0"
              >
                {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                <span>Search</span>
              </button>
            </div>

            {/* Search Results Drawer */}
            {showSearchResults && (
              <div className="mt-3 max-h-48 overflow-y-auto space-y-1.5 p-2 bg-white/90 dark:bg-[#181c26]/90 rounded-xl border border-stone-200 dark:border-stone-700">
                {isSearching ? (
                  <div className="text-center py-4 text-xs text-stone-500">Searching global book catalog...</div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-4 text-xs text-stone-500">No books found. You can enter details manually below.</div>
                ) : (
                  searchResults.map((res, i) => (
                    <div
                      key={i}
                      onClick={() => applySearchResult(res)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-500/10 dark:hover:bg-amber-400/10 cursor-pointer transition-colors"
                    >
                      {res.coverUrl ? (
                        <img src={res.coverUrl} alt={res.title} className="w-8 h-12 object-cover rounded shadow-sm shrink-0" />
                      ) : (
                        <div className="w-8 h-12 bg-stone-200 dark:bg-stone-700 rounded flex items-center justify-center shrink-0 text-[10px]">
                          📖
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">{res.title}</p>
                        <p className="text-[11px] text-stone-500 truncate">{res.author} • {res.publishedYear}</p>
                      </div>
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium shrink-0">
                        Use This
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Book Essentials: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Cover Preview & Input */}
          <div className="md:col-span-4 flex flex-col items-center sm:items-start space-y-3">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              Cover Preview
            </label>
            <BookCover
              coverUrl={coverUrl}
              title={title || 'Book Title'}
              author={author || 'Author Name'}
              gradient={coverGradient}
              size="md"
            />

            <div className="w-full space-y-2 text-xs">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://... image URL"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="relative">
                <label className="cursor-pointer w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 hover:border-amber-500 text-stone-600 dark:text-stone-400 transition-colors">
                  <Upload size={13} />
                  <span>Upload local image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Cover Gradient selector if no image */}
              {!coverUrl && (
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Or Pick Color Theme</label>
                  <div className="flex gap-1.5">
                    {COVER_GRADIENTS.map((g, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCoverGradient(g.value)}
                        className={`w-6 h-6 rounded-full bg-gradient-to-tr ${g.value} transition-transform ${
                          coverGradient === g.value ? 'ring-2 ring-amber-500 scale-110' : 'opacity-80 hover:opacity-100'
                        }`}
                        title={g.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Fields: Title, Author, Year, Pages, Rating, Status */}
          <div className="md:col-span-8 space-y-4">
            {/* Title & Author */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Book Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Klara and the Sun"
                className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Author / Writer <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Kazuo Ishiguro"
                className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Year & Pages & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Year of Publication
                </label>
                <input
                  type="number"
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(e.target.value)}
                  placeholder="e.g. 2021"
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Total Pages
                </label>
                <input
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="e.g. 303"
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Reading Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="read">Finished Reading</option>
                  <option value="reading">Currently Reading</option>
                  <option value="want_to_read">Want to Read</option>
                </select>
              </div>
            </div>

            {/* Rating & Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Your Rating ({rating > 0 ? `${rating} of 5 Stars` : 'Not Rated'})
                </label>
                <StarRating
                  rating={rating}
                  size={20}
                  interactive={true}
                  onChange={(r) => setRating(r)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Date Started
                </label>
                <input
                  type="date"
                  value={dateStarted}
                  onChange={(e) => setDateStarted(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {status === 'read' ? 'Date Finished' : 'Target Date'}
                </label>
                <input
                  type="date"
                  value={dateRead}
                  onChange={(e) => setDateRead(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* Genres / Tags */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Genres / Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addGenre();
                    }
                  }}
                  placeholder="Add a genre (e.g. Sci-Fi, Memoir) and press Enter"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <button
                  type="button"
                  onClick={addGenre}
                  className="px-3 py-1.5 text-xs rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 font-medium"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {genres.map((g, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                  >
                    {g}
                    <button
                      type="button"
                      onClick={() => removeGenre(g)}
                      className="text-stone-400 hover:text-rose-500 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MY THOUGHTS & REFLECTIONS (Highlighted section) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} />
              What were your thoughts when you read this?
            </label>
            <span className="text-[11px] text-amber-700 dark:text-amber-400">Personal Reading Reflection</span>
          </div>
          <textarea
            rows={4}
            value={myThoughts}
            onChange={(e) => setMyThoughts(e.target.value)}
            placeholder="Write down your authentic impressions, how the book made you feel, what resonated with you, takeaways, or who you would recommend it to..."
            className="w-full px-3 py-2.5 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-amber-200 dark:border-amber-900/60 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif leading-relaxed text-stone-800 dark:text-stone-200"
          />
        </div>

        {/* Favorite Quote */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
            Favorite Quote (Optional)
          </label>
          <input
            type="text"
            value={favoriteQuote}
            onChange={(e) => setFavoriteQuote(e.target.value)}
            placeholder="e.g. 'You have power over your mind - not outside events.'"
            className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-serif italic"
          />
        </div>

        {/* Book Synopsis / Description */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
            Book Description / Synopsis
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief summary or publisher description..."
            className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-[#1a1e29] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        {/* Modal Footer / Actions */}
        <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold rounded-xl bg-amber-700 hover:bg-amber-800 text-white shadow-md transition-all flex items-center gap-1.5"
          >
            <Check size={14} />
            <span>{isEditing ? 'Save Changes' : 'Add to Collection'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export function BookFormModal({ isOpen, onClose, onSave, initialData = null }) {
  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <BookFormContent
        key={initialData ? initialData.id : 'new-book'}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
      />
    </div>
  );
}
