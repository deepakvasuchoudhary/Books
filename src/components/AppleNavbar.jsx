import React, { useState } from "react";
import {
  Search,
  X,
  LayoutGrid,
  Sparkles,
  Table as TableIcon,
  ArrowUpDown,
  FilterX,
  Sun,
  Moon,
  Dices,
  BookOpen,
  Clock,
  CheckCircle2,
  Bookmark,
  Layers,
  Menu,
  ChevronDown,
} from "lucide-react";

export function AppleNavbar({
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  searchInputRef,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
  activeShelf,
  onSelectShelf,
  counts,
  activeShelfLabel,
  totalResults,
  selectedGenre,
  onSelectGenre,
  availableGenres = [],
  genreCounts = {},
  ratingFilter,
  onRatingFilterChange,
  onResetFilters,
  isFiltered,
  onOpenRandom,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  const shelfTabs = [
    { id: "all", label: "All Volumes", count: counts?.all, icon: BookOpen },
    { id: "reading", label: "Reading Now", count: counts?.reading, live: true, icon: Clock },
    { id: "five_stars", label: "5-Star Gems", count: counts?.five_stars, star: true, icon: Sparkles },
    { id: "read", label: "Completed", count: counts?.read, icon: CheckCircle2 },
    { id: "want_to_read", label: "In Queue", count: counts?.want_to_read, icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-40 w-full liquid-glass border-b border-black/[0.08] dark:border-white/[0.08] transition-all">
      {/* 1. Global Apple Header (Brand, Shelves, Search, Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3 sm:gap-6">
          {/* Left: Apple Books Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectShelf("all");
                onSelectGenre("all");
                onResetFilters();
              }}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
              title="Return to library home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[11px] bg-gradient-to-tr from-[#0071e3] via-[#0077ed] to-[#42a5f5] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Layers size={18} className="stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm sm:text-base tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                    Little Nalanda
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] dark:text-[#2997ff] border border-[#0071e3]/20 font-medium">
                    {totalResults} · {activeShelfLabel}
                  </span>
                </div>
                <p className="text-[10px] text-[#86868b] dark:text-[#a1a1a6] hidden sm:block">
                  Curated Archive by Deepak Choudhary
                </p>
              </div>
            </button>
          </div>

          {/* Center: Apple Search Bar */}
          <div className="flex-1 max-w-md mx-auto hidden md:block">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#a1a1a6] pointer-events-none stroke-[2]"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by title, author, topic, quote..."
                className="w-full pl-9 pr-10 py-1.5 sm:py-2 liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-[#18181c] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-[#86868b] dark:placeholder-[#6e6e73] text-xs rounded-full border border-black/[0.08] dark:border-white/[0.1] focus:border-[#0071e3] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 transition-all font-normal"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              ) : (
                <kbd className="hidden lg:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08] text-[#86868b] dark:text-[#a1a1a6] pointer-events-none border border-black/[0.04] dark:border-white/[0.06]">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          {/* Right: Quick Actions (Random, Theme Toggle, Mobile Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Surprise Me / Random Picker */}
            {onOpenRandom && (
              <button
                onClick={onOpenRandom}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.1] text-xs font-medium text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/[0.08] dark:border-white/[0.1] transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Pick a random book from the archive"
              >
                <Dices size={14} className="text-[#af52de] stroke-[2]" />
                <span>Surprise Me</span>
              </button>
            )}

            {/* Quick Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full liquid-glass-subtle hover:bg-white/90 dark:hover:bg-white/[0.12] text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/[0.08] dark:border-white/[0.1] transition-all cursor-pointer active:scale-95 shadow-xs"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? (
                  <Sun size={15} className="text-[#ff9f0a] stroke-[2]" />
                ) : (
                  <Moon size={15} className="text-[#0071e3] stroke-[2]" />
                )}
              </button>
            )}

            {/* Mobile Search & Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] md:hidden transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only shown on small screens) */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#a1a1a6] pointer-events-none stroke-[2]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search books, authors, topics..."
              className="w-full pl-9 pr-9 py-1.5 liquid-glass-subtle text-xs rounded-full border border-black/[0.08] dark:border-white/[0.1] focus:border-[#0071e3] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868b] p-0.5"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Apple Shelf Navigation & Controls Strip */}
      <div className="border-t border-black/[0.05] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Left: Shelf Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2">
            {shelfTabs.map((tab) => {
              const isActive = activeShelf === tab.id && selectedGenre === "all";

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (onSelectShelf) onSelectShelf(tab.id);
                    if (onSelectGenre) onSelectGenre("all");
                  }}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    isActive
                      ? "liquid-glass text-[#0071e3] dark:text-[#2997ff] shadow-sm font-semibold border border-[#0071e3]/30 dark:border-[#2997ff]/40"
                      : "text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {/* Wave bar indicator for Currently Reading */}
                  {tab.live && (
                    <div className="flex items-end gap-0.5 h-3 w-3 pb-0.5">
                      <span className="w-0.5 h-full rounded-full bg-[#34c759] apple-wave-bar" style={{ animationDelay: "0.1s" }} />
                      <span className="w-0.5 h-full rounded-full bg-[#34c759] apple-wave-bar" style={{ animationDelay: "0.35s" }} />
                      <span className="w-0.5 h-full rounded-full bg-[#34c759] apple-wave-bar" style={{ animationDelay: "0.2s" }} />
                    </div>
                  )}

                  {tab.star && <span className="text-[#ff9f0a] text-xs">★</span>}

                  <span>{tab.label}</span>

                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-[#0071e3]/10 dark:bg-[#0071e3]/30 text-[#0071e3] dark:text-[#2997ff]"
                          : "bg-black/[0.04] dark:bg-white/[0.06] text-[#86868b] dark:text-[#a1a1a6]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Genre Selector, View Mode Switcher, Sort */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 shrink-0">
            {/* Genre Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                className={`px-3 py-1.5 liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] text-xs font-medium rounded-full border border-black/[0.08] dark:border-white/[0.1] flex items-center gap-1.5 cursor-pointer ${
                  selectedGenre !== "all"
                    ? "text-[#0071e3] dark:text-[#2997ff] border-[#0071e3]/30"
                    : "text-[#1d1d1f] dark:text-[#f5f5f7]"
                }`}
              >
                <span>{selectedGenre !== "all" ? `#${selectedGenre}` : "All Genres"}</span>
                <ChevronDown size={12} className="text-[#86868b]" />
              </button>

              {/* Genre Popup Dropdown */}
              {isGenreDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-50"
                    onClick={() => setIsGenreDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 max-h-72 overflow-y-auto rounded-2xl liquid-glass shadow-2xl p-1.5 z-50 border border-black/[0.08] dark:border-white/[0.1]">
                    <button
                      onClick={() => {
                        onSelectGenre("all");
                        setIsGenreDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                        selectedGenre === "all"
                          ? "bg-[#0071e3] text-white font-medium"
                          : "text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>All Genres</span>
                      <span className="font-mono text-[10px] opacity-75">{counts?.all}</span>
                    </button>
                    {availableGenres.map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          onSelectGenre(g);
                          setIsGenreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                          selectedGenre === g
                            ? "bg-[#0071e3] text-white font-medium"
                            : "text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="truncate">#{g}</span>
                        <span className="font-mono text-[10px] opacity-75 ml-2">
                          {genreCounts[g] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
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
                <LayoutGrid size={13} className="stroke-[2]" />
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
                <Sparkles size={13} className="stroke-[2]" />
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
                <TableIcon size={13} className="stroke-[2]" />
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] text-xs font-medium rounded-full border border-black/[0.08] dark:border-white/[0.1] focus:outline-none cursor-pointer"
              >
                <option value="recent_read">Sort: Default</option>
                <option value="rating_high">Sort: Highest Rated</option>
                <option value="title_asc">Sort: Title (A-Z)</option>
                <option value="author_asc">Sort: Author (A-Z)</option>
                <option value="year_desc">Sort: Year (Newest)</option>
                <option value="year_asc">Sort: Year (Oldest)</option>
              </select>
              <ArrowUpDown
                size={11}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#a1a1a6] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Active Filters Strip (If Any Filter is Active) */}
        {isFiltered && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t border-black/[0.04] dark:border-white/[0.04] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#86868b] dark:text-[#a1a1a6] text-[11px] font-medium">
              Active filters:
            </span>

            {selectedGenre !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full liquid-glass text-[#0071e3] dark:text-[#2997ff] font-medium text-[11px] border border-[#0071e3]/30">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full liquid-glass text-[#ff9f0a] dark:text-[#ffb340] font-medium text-[11px] border border-[#ff9f0a]/30">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full liquid-glass text-[#1d1d1f] dark:text-[#f5f5f7] font-medium text-[11px] border border-black/[0.08] dark:border-white/[0.12]">
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
      </div>

      {/* 4. Mobile Navigation Drawer Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.08] p-4 space-y-4 liquid-glass">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold mb-2">
              Library Shelves
            </div>
            <div className="grid grid-cols-2 gap-2">
              {shelfTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectShelf(tab.id);
                    onSelectGenre("all");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between cursor-pointer ${
                    activeShelf === tab.id && selectedGenre === "all"
                      ? "bg-[#0071e3] text-white"
                      : "liquid-glass-subtle text-[#1d1d1f] dark:text-[#f5f5f7]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="font-mono text-[10px] opacity-75">{tab.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold mb-2">
              Popular Genres
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableGenres.slice(0, 10).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    onSelectGenre(g);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    selectedGenre === g
                      ? "bg-[#0071e3] text-white"
                      : "liquid-glass-subtle text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                >
                  #{g} ({genreCounts[g] || 0})
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            <button
              onClick={() => {
                if (onOpenRandom) onOpenRandom();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl apple-btn-primary text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <Dices size={15} />
              <span>Surprise Me With a Random Volume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
