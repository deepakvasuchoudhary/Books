import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';


export function ConfirmModal({ isOpen, title, message, confirmText = 'Delete', onConfirm, onCancel, isDanger = true }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onCancel} />
      <div className="relative w-full max-w-md bg-white dark:bg-[#141822] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 z-10 text-left">
        <div className="flex items-start gap-3.5 mb-4">
          <div className={`p-2.5 rounded-xl shrink-0 ${isDanger ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg leading-snug">{title}</h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-white transition-colors ${
              isDanger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
