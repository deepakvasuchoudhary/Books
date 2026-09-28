import React from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Dices,
  Sun,
  Moon,
  X,
  Compass,
  Layers,
} from "lucide-react";

export function Sidebar({
  isOpen,
  onClose,
  activeShelf,
  onSelectShelf,
  selectedGenre,
  onSelectGenre,
  availableGenres,
  counts,
  genreCounts,
  onOpenRandom,
  theme,
  onToggleTheme,
  onOpenSearch,
}) {
  const navItems = [
    {
      id: "all",
      label: "All Volumes",
      icon: BookOpen,
      count: counts.all,
      color: "text-indigo-500",
    },
    {
      id: "reading",
      label: "Currently Reading",
      icon: Clock,
      count: counts.reading,
      color: "text-emerald-500",
      pulse: true,
    },
    {
      id: "read",
      label: "Completed Archive",
      icon: CheckCircle2,
      count: counts.read,
      color: "text-blue-500",
    },
    {
      id: "want_to_read",
      label: "Reading Queue",
      icon: Bookmark,
      count: counts.want_to_read,
      color: "text-amber-500",
    },
    {
      id: "five_stars",
      label: "5-Star Hall of Fame",
      icon: Sparkles,
      count: counts.five_stars,
      color: "text-amber-400",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Apple Liquid Glass Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 liquid-glass border-r border-black/[0.06] dark:border-white/[0.08] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] bg-gradient-to-tr from-[#0071e3] via-[#0077ed] to-[#42a5f5] flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Layers size={18} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Little Nalanda
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#34c759]/10 text-[#34c759] border border-[#34c759]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
                  Synced
                </span>
              </div>
              <p className="text-[11px] text-[#86868b] dark:text-[#a1a1a6] font-normal">
                Curated by Deepak Choudhary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Search Apple Glass Bar */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => {
              onOpenSearch();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-[#86868b] dark:text-[#a1a1a6] liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] rounded-xl border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <Compass size={14} className="text-[#86868b] group-hover:text-[#0071e3] transition-colors" />
              <span className="font-normal text-[#1d1d1f] dark:text-[#f5f5f7]">Quick Search...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08] text-[#86868b] dark:text-[#a1a1a6] border border-black/[0.04] dark:border-white/[0.06]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-6">
          {/* Main Shelves */}
          <div>
            <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold">
              Library Shelves
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeShelf === item.id && selectedGenre === "all";

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectShelf(item.id);
                      onSelectGenre("all");
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer group active:scale-[0.98] ${
                      isActive
                        ? "bg-[#0071e3] text-white shadow-md shadow-blue-500/25 font-medium apple-gloss-sheen"
                        : "text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        size={15}
                        className={`${isActive ? "text-white" : item.color} shrink-0 stroke-[2]`}
                      />
                      <span className="truncate">{item.label}</span>
                      {item.pulse && !isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-[#86868b] dark:text-[#a1a1a6] bg-black/[0.04] dark:bg-white/[0.05]"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Curated Categories / Genres */}
          <div>
            <div className="px-2 pb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1a6] font-semibold">
                Curated Topics
              </span>
              <span className="text-[10px] font-mono text-[#86868b] dark:text-[#a1a1a6]">
                {availableGenres.length} Topics
              </span>
            </div>
            <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
              {availableGenres.map((genre) => {
                const isSelected = selectedGenre === genre;
                const count = genreCounts[genre] || 0;

                return (
                  <button
                    key={genre}
                    onClick={() => {
                      onSelectGenre(isSelected ? "all" : genre);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0071e3]/10 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#2997ff] font-medium border border-[#0071e3]/25"
                        : "text-[#86868b] dark:text-[#a1a1a6] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="truncate pr-2">#{genre}</span>
                    <span className="text-[10px] font-mono opacity-60 shrink-0">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t border-black/[0.04] dark:border-white/[0.06] space-y-2.5">
          {/* Surprise Me Apple Button */}
          <button
            onClick={() => {
              onOpenRandom();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl liquid-glass-subtle hover:bg-white/80 dark:hover:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] text-xs font-medium border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer group active:scale-[0.98] shadow-xs"
          >
            <Dices size={15} className="group-hover:rotate-45 transition-transform duration-300 text-[#0071e3]" />
            <span>Discover Random Volume</span>
          </button>

          {/* Theme Switcher Capsule */}
          <div className="flex items-center justify-between px-2 pt-1">
            <span className="text-xs text-[#86868b] dark:text-[#a1a1a6] font-normal flex items-center gap-1.5">
              {theme === "dark" ? <Moon size={13} className="text-[#0071e3]" /> : <Sun size={13} className="text-[#ff9f0a]" />}
              <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
            </span>

            <button
              onClick={onToggleTheme}
              className="px-2.5 py-1 text-xs rounded-full liquid-glass-subtle hover:bg-white/90 dark:hover:bg-white/[0.1] text-[#1d1d1f] dark:text-[#f5f5f7] font-medium border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer active:scale-95"
            >
              Switch
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
