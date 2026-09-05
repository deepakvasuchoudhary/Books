import React from "react";
import {
  Menu,
  Search,
  X,
  LayoutGrid,
  Sparkles,
  Table as TableIcon,
  ArrowUpDown,
  FilterX,
} from "lucide-react";

export function TopHeader({
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  searchInputRef,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
  activeShelfLabel,
  totalResults,
  selectedGenre,
  onSelectGenre,
  ratingFilter,
  onRatingFilterChange,
  onResetFilters,
  isFiltered,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#090a0f]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] px-4 sm:px-6 py-3.5 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Mobile Toggle & View Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-1 rounded-xl text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] lg:hidden transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {selectedGenre !== "all" ? `#${selectedGenre}` : activeShelfLabel}
              </h1>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-zinc-300">
                {totalResults} {totalResults === 1 ? "Book" : "Books"}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Search, Layout Switcher & Sort */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Modern Search Input */}
          <div className="relative flex-1 sm:w-64 md:w-72">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title, author, themes..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-xs rounded-xl border border-slate-200/70 dark:border-white/[0.08] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-0.5"
                title="Clear search"
              >
                <X size={14} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 border border-slate-200 dark:border-zinc-700 shadow-xs pointer-events-none">
                /
              </kbd>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-white/[0.05] rounded-xl border border-slate-200/70 dark:border-white/[0.08]">
            <button
              onClick={() => onViewModeChange("bento")}
              title="Bento Grid View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "bento"
                  ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => onViewModeChange("cover")}
              title="Apple Books Cover Wall"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "cover"
                  ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
              }`}
            >
              <Sparkles size={15} />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              title="Linear Catalog Table"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
              }`}
            >
              <TableIcon size={15} />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200/60 dark:hover:bg-white/[0.08] text-slate-700 dark:text-zinc-300 text-xs font-medium rounded-xl border border-slate-200/70 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="recent_read">Sort: Default</option>
              <option value="rating_high">Sort: Highest Rated</option>
              <option value="title_asc">Sort: Title (A to Z)</option>
              <option value="author_asc">Sort: Author (A to Z)</option>
              <option value="year_desc">Sort: Year (Newest)</option>
              <option value="year_asc">Sort: Year (Oldest)</option>
            </select>
            <ArrowUpDown
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Pill Bar */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.06] text-xs">
          <span className="text-slate-400 dark:text-zinc-500 text-[11px] font-medium">
            Active filters:
          </span>

          {selectedGenre !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium text-[11px] border border-indigo-200 dark:border-indigo-800">
              Genre: #{selectedGenre}
              <button
                onClick={() => onSelectGenre("all")}
                className="hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {ratingFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-medium text-[11px] border border-amber-200 dark:border-amber-800">
              Rating: {ratingFilter}★
              <button
                onClick={() => onRatingFilterChange("all")}
                className="hover:text-amber-900 dark:hover:text-amber-100"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-zinc-300 font-medium text-[11px]">
              Query: "{searchQuery}"
              <button
                onClick={() => onSearchChange("")}
                className="hover:text-slate-900 dark:hover:text-white"
              >
                <X size={12} />
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 flex items-center gap-1 ml-auto cursor-pointer"
          >
            <FilterX size={12} />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </header>
  );
}
