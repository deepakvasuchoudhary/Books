import React from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Heart,
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
    {
      id: "favorites",
      label: "Curator's Favorites",
      icon: Heart,
      count: counts.favorites,
      color: "text-rose-500",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/95 dark:bg-[#0c0e14]/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-white/[0.08] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Layers size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">
                  Libris
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Synced
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                Deepak's Reading Vault
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Search Shortcut Bar */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => {
              onOpenSearch();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-400 dark:text-zinc-400 bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] rounded-xl border border-slate-200/60 dark:border-white/[0.06] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Compass size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <span className="font-medium text-slate-600 dark:text-zinc-300">Quick Search...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700 shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main Shelves */}
          <div>
            <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-400 font-semibold">
              Library Shelves
            </div>
            <nav className="space-y-0.5">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold"
                        : "text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        size={15}
                        className={`${isActive ? "text-white" : item.color} shrink-0`}
                      />
                      <span className="truncate">{item.label}</span>
                      {item.pulse && !isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-slate-400 dark:text-zinc-400 bg-slate-100 dark:bg-white/[0.04]"
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
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-400 font-semibold">
                Curated Topics
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-400">
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
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/60 dark:border-indigo-800/60"
                        : "text-slate-500 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="truncate pr-2">#{genre}</span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-400 shrink-0">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reading Milestone Bento Display (Pure Read-Only, No Edit Buttons) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#131622] dark:to-[#0f111a] border border-slate-200/70 dark:border-white/[0.06] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold">
                Annual Target
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                100%
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {counts.read} <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">/ 20</span>
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Goal Exceeded 🎉
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 pt-0.5">
                <span>Total Explored</span>
                <span className="font-mono font-medium text-slate-700 dark:text-zinc-300">
                  81 Volumes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
          {/* Surprise Me Button */}
          <button
            onClick={() => {
              onOpenRandom();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-zinc-200 text-xs font-semibold border border-slate-200/60 dark:border-white/[0.06] transition-all cursor-pointer group shadow-xs"
          >
            <Dices size={15} className="group-hover:rotate-45 transition-transform duration-300 text-indigo-500" />
            <span>Discover Random Book</span>
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between px-2 pt-1">
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
              {theme === "dark" ? <Moon size={13} className="text-indigo-400" /> : <Sun size={13} className="text-amber-500" />}
              <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
            </span>

            <button
              onClick={onToggleTheme}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
            >
              Switch to {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
