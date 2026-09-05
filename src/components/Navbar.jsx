import React from 'react';
import {
  BookOpen,
  Sun,
  Moon,
  BarChart3,
  GitBranch
} from 'lucide-react';

export function Navbar({
  theme,
  onToggleTheme,
  showStats,
  onToggleStats,
  totalCount,
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/85 dark:bg-[#0c0e12]/85 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md shadow-amber-900/20">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold tracking-tight text-xl sm:text-2xl text-stone-900 dark:text-stone-50">
                Folio
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                Library
              </span>
              <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                • {totalCount} {totalCount === 1 ? 'book' : 'books'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
              Personal Reading Journal & Shelf
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toggle Stats Bar */}
          <button
            type="button"
            onClick={onToggleStats}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
              showStats
                ? 'bg-amber-500/10 dark:bg-amber-400/10 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                : 'bg-white dark:bg-[#13161f] border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
            title="Toggle Reading Stats"
          >
            <BarChart3 size={16} />
            <span className="hidden md:inline">Stats</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#13161f] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun size={17} className="text-amber-400" />
            ) : (
              <Moon size={17} className="text-stone-700" />
            )}
          </button>

          {/* GitHub Source Link */}
          <a
            href="https://github.com/deepakvasuchoudhary/Books"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#13161f] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-medium transition-colors flex items-center gap-1.5"
            title="View source on GitHub"
          >
            <GitBranch size={15} className="text-amber-700 dark:text-amber-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
