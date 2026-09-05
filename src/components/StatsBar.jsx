import React, { useState } from 'react';
import { BookOpen, BookCheck, Flame, Star, Target, Edit2, Check } from 'lucide-react';

export function StatsBar({ books, readingGoal = 20, onUpdateReadingGoal }) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(readingGoal);

  // Computed metrics
  const readBooks = books.filter((b) => b.status === 'read');
  const totalPages = readBooks.reduce((sum, b) => sum + (Number(b.pages) || 0), 0);
  
  const ratedBooks = books.filter((b) => b.rating > 0);
  const avgRating = ratedBooks.length > 0
    ? (ratedBooks.reduce((sum, b) => sum + b.rating, 0) / ratedBooks.length).toFixed(1)
    : '0.0';

  // Find top genre
  const genreCounts = {};
  readBooks.forEach((b) => {
    (b.genres || []).forEach((g) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Varied';

  // Goal calculations
  const progressPercent = Math.min(100, Math.round((readBooks.length / (readingGoal || 1)) * 100));

  const handleSaveGoal = () => {
    const val = Number(goalInput);
    if (val > 0) {
      onUpdateReadingGoal(val);
    }
    setIsEditingGoal(false);
  };

  return (
    <div className="bg-white dark:bg-[#13161f] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-5 shadow-xs transition-all">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Books Read */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <BookCheck size={20} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 block leading-tight">
              {readBooks.length}
            </span>
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">Books Read</span>
          </div>
        </div>

        {/* Pages Read */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 block leading-tight">
              {totalPages > 0 ? totalPages.toLocaleString() : '—'}
            </span>
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">Pages Read</span>
          </div>
        </div>

        {/* Average Rating */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 dark:bg-yellow-400/10 flex items-center justify-center text-yellow-500 shrink-0">
            <Star size={20} className="fill-yellow-400" />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 block leading-tight">
              {avgRating} <span className="text-xs font-normal text-stone-400">/ 5.0</span>
            </span>
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">Avg Rating</span>
          </div>
        </div>

        {/* Top Genre */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Flame size={20} />
          </div>
          <div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 block leading-tight truncate max-w-[120px]">
              {topGenre}
            </span>
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">Favorite Genre</span>
          </div>
        </div>
      </div>

      {/* Reading Goal Progress Bar */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
            <Target size={14} className="text-amber-600" />
            <span>Annual Reading Goal:</span>
            {isEditingGoal ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-14 px-1 py-0.5 text-xs rounded border border-amber-400 bg-white dark:bg-stone-800 font-mono"
                />
                <button
                  type="button"
                  onClick={handleSaveGoal}
                  className="p-1 text-emerald-600 hover:text-emerald-700"
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <span className="flex items-center gap-1 font-mono font-bold text-stone-900 dark:text-stone-100">
                {readBooks.length} / {readingGoal} books
                <button
                  type="button"
                  onClick={() => {
                    setGoalInput(readingGoal);
                    setIsEditingGoal(true);
                  }}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 ml-1"
                  title="Change goal"
                >
                  <Edit2 size={11} />
                </button>
              </span>
            )}
          </div>
          <span className="font-mono text-stone-500 font-medium">{progressPercent}% Completed</span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
