import React from 'react';
import {
  BookOpen,
  Sun,
  Moon,
  BarChart3,
  GitBranch,
  Search,
  Dices
} from 'lucide-react';

export function Navbar({
  theme,
  onToggleTheme,
  showStats,
  onToggleStats,
  totalCount,
  onOpenRandom,
  onFocusSearch,
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/85 dark:bg-[#0b0d13]/85 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white flex items-center justify-center shadow-lg shadow-amber-900/25 border border-amber-500/30">
            <BookOpen size={22} className="drop-shadow-xs" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold tracking-tight text-xl sm:text-2xl text-stone-950 dark:text-stone-50">
                Folio
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-200/60 dark:border-amber-800/50">
                Atelier
              </span>
              <span className="hidden md:inline-block text-xs font-mono text-stone-400 dark:text-stone-500">
                • {totalCount} Works
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
              Personal Reading Journal & Library
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search trigger */}
          <button
            type="button"
            onClick={onFocusSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-[#131620]/70 border border-stone-200/80 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:border-amber-400/50 transition-colors shadow-xs cursor-pointer"
            title="Search library (/)"
          >
            <Search size={14} />
            <span className="font-sans">Search</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60">
              /
            </kbd>
          </button>

          {/* Surprise Me / Random Book */}
          <button
            type="button"
            onClick={onOpenRandom}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-400/10 border-amber-300/80 dark:border-amber-700/80 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 cursor-pointer"
            title="Discover a Random Volume (R)"
          >
            <Dices size={15} />
            <span className="hidden lg:inline">Discover</span>
          </button>

          {/* Toggle Reading Stats */}
          <button
            type="button"
            onClick={onToggleStats}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              showStats
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-xs'
                : 'bg-white dark:bg-[#131620] border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
            title="Toggle Reading Stats & Milestones"
          >
            <BarChart3 size={15} />
            <span className="hidden md:inline">Insights</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#131620] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
            ) : (
              <Moon size={16} className="text-stone-700 transition-transform rotate-0 hover:-rotate-12 duration-300" />
            )}
          </button>

          {/* GitHub Source Link */}
          <a
            href="https://github.com/deepakvasuchoudhary/Books"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#131620] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
            title="View source on GitHub"
          >
            <GitBranch size={14} className="text-amber-700 dark:text-amber-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

