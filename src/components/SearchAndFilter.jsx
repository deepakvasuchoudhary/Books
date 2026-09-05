import React from 'react';
import {
  Search,
  X,
  LayoutGrid,
  List,
  Heart,
  BookCheck,
  BookOpen,
  Bookmark,
  ArrowUpDown
} from 'lucide-react';

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedGenre,
  onGenreSelect,
  availableGenres,
  ratingFilter,
  onRatingFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  counts,
}) {
  const statusTabs = [
    { id: 'all', label: 'All Books', count: counts.all, icon: null },
    { id: 'read', label: 'Finished', count: counts.read, icon: BookCheck },
    { id: 'reading', label: 'Reading', count: counts.reading, icon: BookOpen },
    { id: 'want_to_read', label: 'Want to Read', count: counts.want_to_read, icon: Bookmark },
    { id: 'favorites', label: 'Favorites', count: counts.favorites, icon: Heart },
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Search Bar + View Toggle + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-xl">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, author, thoughts, quotes, or keywords..."
            className="w-full pl-10 pr-9 py-2.5 text-sm rounded-2xl bg-white dark:bg-[#13161f] border border-stone-200/90 dark:border-stone-800/90 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Controls: Sort & View Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Rating filter dropdown */}
          <select
            value={ratingFilter}
            onChange={(e) => onRatingFilterChange(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#13161f] border border-stone-200/90 dark:border-stone-800/90 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <option value="all">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
            <option value="4">⭐ 4+ stars</option>
            <option value="3">⭐ 3+ stars</option>
          </select>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="text-xs pl-7 pr-3 py-2 rounded-xl bg-white dark:bg-[#13161f] border border-stone-200/90 dark:border-stone-800/90 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer appearance-none"
            >
              <option value="recent_read">Recently Read</option>
              <option value="rating_high">Highest Rated</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="author_asc">Author (A-Z)</option>
              <option value="year_desc">Year (Newest)</option>
              <option value="year_asc">Year (Oldest)</option>
            </select>
            <ArrowUpDown size={13} className="absolute left-2.5 text-stone-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle: Grid vs Journal */}
          <div className="flex items-center bg-stone-100 dark:bg-[#181c26] p-1 rounded-xl border border-stone-200/70 dark:border-stone-800/70">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#13161f] text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="Grid View (Covers)"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('journal')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'journal'
                  ? 'bg-white dark:bg-[#13161f] text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="Journal View (Thoughts & Reviews)"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-200/80 dark:border-stone-800/80 pb-3">
        {statusTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = statusFilter === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onStatusFilterChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {Icon && <Icon size={13} className={tab.id === 'favorites' && isActive ? 'fill-white' : ''} />}
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Genre Filter Pills (dynamically generated from books) */}
      {availableGenres.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono shrink-0 mr-1">
            Genre:
          </span>
          <button
            onClick={() => onGenreSelect('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              selectedGenre === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            All Genres
          </button>
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreSelect(genre)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
