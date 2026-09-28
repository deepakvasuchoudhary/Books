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
  Sun,
  Moon,
} from "lucide-react";

export function TopHeader({
  onOpenMobileMenu,
  theme,
  onToggleTheme,
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
    <header className="sticky top-0 z-30 liquid-glass border-b border-black/[0.06] dark:border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Mobile Toggle & View Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-1 rounded-xl text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] lg:hidden transition-colors cursor-pointer"
            aria-label="Open sidebar navigation"
          >
            <Menu size={20} className="stroke-[1.75]" />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
                {selectedGenre !== "all" ? `#${selectedGenre}` : activeShelfLabel}
              </h1>
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#86868b] dark:text-[#a1a1a6]">
                {totalResults} {totalResults === 1 ? "Volume" : "Volumes"}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Search, Layout Switcher & Sort */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Apple-style Search Input */}
          <div className="relative flex-1 sm:w-64 md:w-72">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#a1a1a6] pointer-events-none stroke-[2]"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search library..."
              className="w-full pl-9 pr-8 py-1.5 liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-[#18181c] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-[#86868b] dark:placeholder-[#6e6e73] text-xs rounded-full border border-black/[0.08] dark:border-white/[0.1] focus:border-[#0071e3] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all font-normal"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08] text-[#86868b] dark:text-[#a1a1a6] pointer-events-none border border-black/[0.04] dark:border-white/[0.06]">
                /
              </kbd>
            )}
          </div>

          {/* Apple Segmented View Mode Switcher */}
          <div className="apple-segmented-group flex items-center">
            <button
              onClick={() => onViewModeChange("bento")}
              title="Bento Grid"
              className={`p-1.5 rounded-[9px] transition-all cursor-pointer ${
                viewMode === "bento"
                  ? "apple-segmented-active text-[#1d1d1f] dark:text-white"
                  : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              <LayoutGrid size={14} className="stroke-[2]" />
            </button>
            <button
              onClick={() => onViewModeChange("cover")}
              title="Gallery Wall"
              className={`p-1.5 rounded-[9px] transition-all cursor-pointer ${
                viewMode === "cover"
                  ? "apple-segmented-active text-[#1d1d1f] dark:text-white"
                  : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              <Sparkles size={14} className="stroke-[2]" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              title="Catalog Table"
              className={`p-1.5 rounded-[9px] transition-all cursor-pointer ${
                viewMode === "table"
                  ? "apple-segmented-active text-[#1d1d1f] dark:text-white"
                  : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              <TableIcon size={14} className="stroke-[2]" />
            </button>
          </div>

          {/* Sort Selector in Liquid Glass */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] text-xs font-medium rounded-full border border-black/[0.08] dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 cursor-pointer"
            >
              <option value="recent_read">Sort: Default</option>
              <option value="rating_high">Sort: Highest Rated</option>
              <option value="title_asc">Sort: Title (A to Z)</option>
              <option value="author_asc">Sort: Author (A to Z)</option>
              <option value="year_desc">Sort: Year (Newest)</option>
              <option value="year_asc">Sort: Year (Oldest)</option>
            </select>
            <ArrowUpDown
              size={11}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#a1a1a6] pointer-events-none"
            />
          </div>

          {/* Quick Theme Toggle (Apple Glass Capsule) */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full liquid-glass-subtle hover:bg-white/90 dark:hover:bg-white/[0.12] text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/[0.08] dark:border-white/[0.1] transition-all cursor-pointer active:scale-95 shadow-xs"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? (
                <Sun size={14} className="text-[#ff9f0a] stroke-[2]" />
              ) : (
                <Moon size={14} className="text-[#0071e3] stroke-[2]" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Pill Bar */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 pt-3 mt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] text-xs">
          <span className="text-[#86868b] dark:text-[#a1a1a6] text-[11px] font-medium">
            Active filters:
          </span>

          {selectedGenre !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass text-[#0071e3] dark:text-[#2997ff] font-medium text-[11px] border border-[#0071e3]/30">
              Genre: #{selectedGenre}
              <button
                onClick={() => onSelectGenre("all")}
                className="hover:opacity-70 cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {ratingFilter !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass text-[#ff9f0a] dark:text-[#ffb340] font-medium text-[11px] border border-[#ff9f0a]/30">
              Rating: {ratingFilter}★
              <button
                onClick={() => onRatingFilterChange("all")}
                className="hover:opacity-70 cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass text-[#1d1d1f] dark:text-[#f5f5f7] font-medium text-[11px] border border-black/[0.08] dark:border-white/[0.12]">
              "{searchQuery}"
              <button
                onClick={() => onSearchChange("")}
                className="hover:opacity-70 cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="text-[11px] font-medium text-[#86868b] hover:text-[#0071e3] dark:text-[#a1a1a6] dark:hover:text-[#2997ff] flex items-center gap-1 ml-auto cursor-pointer transition-colors"
          >
            <FilterX size={12} />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </header>
  );
}
