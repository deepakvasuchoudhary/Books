import React from 'react';
import {
  Search,
  X,
  LayoutGrid,
  BookText,
  AlignJustify,
  Heart,
  BookCheck,
  BookOpen,
  Bookmark,
  ArrowUpDown,
  Star,
  RotateCcw,
  SlidersHorizontal
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
  filteredCount,
  onResetFilters,
  searchInputRef,
}) {
  const statusTabs = [
    { id: 'all', label: 'All Volumes', count: counts.all, icon: null },
    { id: 'reading', label: 'Currently Reading', count: counts.reading, icon: BookOpen, hasPulse: true },
    { id: 'read', label: 'Finished', count: counts.read, icon: BookCheck },
    { id: 'want_to_read', label: 'Up Next', count: counts.want_to_read, icon: Bookmark },
    { id: 'favorites', label: 'Favorites', count: counts.favorites, icon: Heart, isHeart: true },
    { id: 'five_stars', label: '5-Star Hall', count: counts.five_stars, icon: Star, isStar: true },
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    selectedGenre !== 'all' ||
    ratingFilter !== 'all';

  return (
    <div className="space-y-4 text-left">
      {/* Top Search & Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Command Search Bar */}
        <div className="relative flex-1 max-w-2xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 pointer-events-none"
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search volumes by title, author, thoughts, or synopsis..."
            className="w-full pl-11 pr-24 py-3 text-sm rounded-2xl bg-white dark:bg-[#131620] border border-stone-200/90 dark:border-stone-800/90 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 transition-all shadow-xs"
          />

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X size={15} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 rounded-md">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Controls: Rating Filter, Sort & 3-Mode View Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
          {/* Rating filter dropdown */}
          <div className="relative">
            <select
              value={ratingFilter}
              onChange={(e) => onRatingFilterChange(e.target.value)}
              className="text-xs px-3 py-2.5 rounded-xl bg-white dark:bg-[#131620] border border-stone-200/90 dark:border-stone-800/90 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer shadow-xs pr-7 font-medium appearance-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">★ 5 Stars Only</option>
              <option value="4">★ 4+ Stars</option>
              <option value="3">★ 3+ Stars</option>
            </select>
            <Star size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none fill-amber-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="text-xs pl-7 pr-3 py-2.5 rounded-xl bg-white dark:bg-[#131620] border border-stone-200/90 dark:border-stone-800/90 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer shadow-xs appearance-none font-medium"
            >
              <option value="recent_read">Recently Read</option>
              <option value="rating_high">Highest Rated</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="author_asc">Author (A-Z)</option>
              <option value="year_desc">Year (Newest)</option>
              <option value="year_asc">Year (Oldest)</option>
            </select>
            <ArrowUpDown size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle: Grid (Shelf) vs Journal vs Compact */}
          <div className="flex items-center bg-stone-100 dark:bg-[#181c28] p-1 rounded-xl border border-stone-200/70 dark:border-stone-800/70 shadow-inner">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#131620] text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="3D Shelf Gallery View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('journal')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'journal'
                  ? 'bg-white dark:bg-[#131620] text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="Editorial Journal Review View"
            >
              <BookText size={15} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('compact')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-white dark:bg-[#131620] text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title="Compact Catalog Index View"
            >
              <AlignJustify size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Status Segmented Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {statusTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = statusFilter === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onStatusFilterChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-700 dark:bg-amber-600 text-white shadow-sm shadow-amber-900/20'
                  : 'bg-white/70 dark:bg-[#131620]/70 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-stone-200/60 dark:border-stone-800/60'
              }`}
            >
              {tab.hasPulse && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
              {Icon && (
                <Icon
                  size={13}
                  className={
                    tab.isHeart && isActive
                      ? 'fill-white'
                      : tab.isStar && isActive
                      ? 'fill-white'
                      : ''
                  }
                />
              )}
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Genre Filter Carousel */}
      {availableGenres.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-mono shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal size={11} />
            <span>Theme:</span>
          </span>
          <button
            onClick={() => onGenreSelect('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-xs'
                : 'bg-white/60 dark:bg-[#131620]/60 border border-stone-200/60 dark:border-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            All Themes
          </button>
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreSelect(genre)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-[#131620]/60 border border-stone-200/60 dark:border-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Active Filters Ribbon & Result Counter */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-stone-500 dark:text-stone-400 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            Showing <strong className="font-mono text-stone-900 dark:text-stone-100">{filteredCount}</strong> of <span className="font-mono">{counts.all}</span> volumes
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 hover:underline ml-2 cursor-pointer font-medium"
            >
              <RotateCcw size={11} />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* View mode label indicator */}
        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
          View: {viewMode === 'grid' ? '3D Shelf Gallery' : viewMode === 'journal' ? 'Editorial Journal' : 'Compact Catalog'}
        </span>
      </div>
    </div>
  );
}

