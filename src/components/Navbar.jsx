import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Sun,
  Moon,
  BarChart3,
  Download,
  Upload,
  RotateCcw,
  MoreVertical
} from 'lucide-react';

export function Navbar({
  theme,
  onToggleTheme,
  showStats,
  onToggleStats,
  onAddBook,
  onExportData,
  onImportData,
  onResetData,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportData(file);
      e.target.value = '';
      setMenuOpen(false);
    }
  };

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

          {/* Add Book Button (Hero CTA) */}
          <button
            type="button"
            onClick={onAddBook}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-amber-900/20 hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus size={16} />
            <span>Add Book</span>
          </button>

          {/* Backup / More Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-white dark:bg-[#13161f] border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              title="More options (Export, Import, Reset)"
            >
              <MoreVertical size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#141822] rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 py-1.5 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-stone-100 dark:border-stone-800 text-[11px] font-mono uppercase text-stone-400">
                  Data & Backup
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onExportData();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/80 flex items-center gap-2.5"
                >
                  <Download size={14} className="text-stone-400" />
                  <span>Export Library (JSON)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/80 flex items-center gap-2.5"
                >
                  <Upload size={14} className="text-stone-400" />
                  <span>Import Library (JSON)</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="border-t border-stone-100 dark:border-stone-800 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    onResetData();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5"
                >
                  <RotateCcw size={14} />
                  <span>Reset to Sample Books</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
