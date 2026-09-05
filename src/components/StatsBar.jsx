import React, { useState } from 'react';
import {
  BookCheck,
  BookOpen,
  Star,
  Target,
  Edit2,
  Check,
  Trophy,
  Layers
} from 'lucide-react';

export function StatsBar({
  books,
  readingGoal = 20,
  onUpdateReadingGoal,
  onSelectGenre,
  onSelectStatus,
}) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(readingGoal);

  // Computed metrics
  const readBooks = books.filter((b) => b.status === 'read');

  // Calculate actual pages or reasonable estimate (~280 pages per volume)
  const totalPages = readBooks.reduce((sum, b) => {
    const p = Number(b.pages);
    return sum + (p > 0 ? p : 280);
  }, 0);

  const ratedBooks = books.filter((b) => b.rating > 0);
  const avgRating = ratedBooks.length > 0
    ? (ratedBooks.reduce((sum, b) => sum + b.rating, 0) / ratedBooks.length).toFixed(1)
    : '5.0';

  // Genre distribution calculation
  const genreCounts = {};
  books.forEach((b) => {
    (b.genres || []).forEach((g) => {
      const trimmed = g.trim();
      if (trimmed) {
        genreCounts[trimmed] = (genreCounts[trimmed] || 0) + 1;
      }
    });
  });

  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const totalGenreMentions = sortedGenres.reduce((sum, g) => sum + g[1], 0) || 1;

  // Goal calculations
  const progressPercent = Math.min(100, Math.round((readBooks.length / (readingGoal || 1)) * 100));

  const handleSaveGoal = () => {
    const val = Number(goalInput);
    if (val > 0) {
      onUpdateReadingGoal(val);
    }
    setIsEditingGoal(false);
  };

  const genreColors = [
    'bg-amber-600',
    'bg-emerald-600',
    'bg-indigo-600',
    'bg-rose-600',
  ];

  return (
    <section className="bg-white/80 dark:bg-[#131722]/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800/80 rounded-3xl p-5 sm:p-7 shadow-sm transition-all duration-300 text-left">
      {/* Header with Goal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200/70 dark:border-stone-800/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <Trophy size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-950 dark:text-stone-50 leading-tight">
              Reading Journey & Milestones
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Personal progress across your curated volumes
            </p>
          </div>
        </div>

        {/* Goal Editor & Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800/70 px-3.5 py-1.5 rounded-2xl border border-stone-200/60 dark:border-stone-700/60 text-xs">
            <Target size={14} className="text-amber-600 dark:text-amber-400" />
            <span className="text-stone-600 dark:text-stone-400">Annual Target:</span>

            {isEditingGoal ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-14 px-1.5 py-0.5 text-xs rounded border border-amber-500 bg-white dark:bg-stone-900 font-mono focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveGoal}
                  className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                >
                  <Check size={12} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  {readBooks.length} / {readingGoal}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setGoalInput(readingGoal);
                    setIsEditingGoal(true);
                  }}
                  className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                  title="Edit annual reading goal"
                >
                  <Edit2 size={11} />
                </button>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">
            <span>{progressPercent}% Complete</span>
          </div>
        </div>
      </div>

      {/* Goal Progress Bar */}
      <div className="pt-4 pb-6">
        <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800/80 overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-1.5">
          <span>Pace: {readBooks.length >= readingGoal ? '🎯 Goal Achieved!' : `${readingGoal - readBooks.length} volumes remaining`}</span>
          <span>{books.length} Total Cataloged</span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Books Finished */}
        <div
          onClick={() => onSelectStatus && onSelectStatus('read')}
          className="group p-4 rounded-2xl bg-stone-50/80 dark:bg-[#181c28]/80 hover:bg-emerald-500/[0.08] dark:hover:bg-emerald-500/[0.12] border border-stone-200/60 dark:border-stone-800/80 hover:border-emerald-500/30 transition-all cursor-pointer"
          title="Click to view finished books"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">
              Volumes Read
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookCheck size={15} />
            </div>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-none">
            {readBooks.length}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 block">
            {Math.round((readBooks.length / (books.length || 1)) * 100)}% of library finished
          </span>
        </div>

        {/* Estimated Pages Inscribed */}
        <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-[#181c28]/80 border border-stone-200/60 dark:border-stone-800/80 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">
              Pages Consumed
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookOpen size={15} />
            </div>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-none">
            {totalPages.toLocaleString()}
          </div>
          <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium mt-1 block">
            Estimated ~280 pages / vol
          </span>
        </div>

        {/* Average Rating */}
        <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-[#181c28]/80 border border-stone-200/60 dark:border-stone-800/80 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">
              Critical Score
            </span>
            <div className="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
              <Star size={15} className="fill-yellow-400" />
            </div>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-none">
            {avgRating} <span className="text-xs text-stone-400 font-normal">/ 5.0</span>
          </div>
          <span className="text-[11px] text-yellow-600 dark:text-yellow-400 font-medium mt-1 block">
            Curated excellence
          </span>
        </div>

        {/* Top Genre & Distribution */}
        <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-[#181c28]/80 border border-stone-200/60 dark:border-stone-800/80 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">
              Top Focus
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Layers size={15} />
            </div>
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 leading-none truncate">
            {sortedGenres[0]?.[0] || 'Varied'}
          </div>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-1 block">
            {sortedGenres[0]?.[1] || 0} volumes cataloged
          </span>
        </div>
      </div>

      {/* Literary Spectrum / Genre Proportions */}
      {sortedGenres.length > 0 && (
        <div className="mt-5 pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400">
              Literary Category Breakdown:
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              Top 4 Themes
            </span>
          </div>

          {/* Segmented spectrum bar */}
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-stone-100 dark:bg-stone-800">
            {sortedGenres.map(([genre, count], idx) => {
              const widthPct = Math.max(8, Math.round((count / totalGenreMentions) * 100));
              return (
                <div
                  key={genre}
                  className={`${genreColors[idx % genreColors.length]} h-full transition-all`}
                  style={{ width: `${widthPct}%` }}
                  title={`${genre}: ${count} books (${widthPct}%)`}
                />
              );
            })}
          </div>

          {/* Clickable genre pill legends */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {sortedGenres.map(([genre, count], idx) => (
              <button
                key={genre}
                type="button"
                onClick={() => onSelectGenre && onSelectGenre(genre)}
                className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer group"
              >
                <span className={`w-2 h-2 rounded-full ${genreColors[idx % genreColors.length]}`} />
                <span className="font-medium">{genre}</span>
                <span className="text-stone-400 text-[10px] font-mono group-hover:text-stone-600 dark:group-hover:text-stone-200">
                  ({count})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

