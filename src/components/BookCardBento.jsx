import React from "react";
import { BookCover } from "./BookCover";
import { ArrowUpRight, Heart } from "lucide-react";

export function BookCardBento({ book, onSelectBook }) {
  return (
    <div
      onClick={() => onSelectBook(book)}
      className="group relative rounded-2xl p-4 bg-white dark:bg-[#11131a] hover:bg-slate-50 dark:hover:bg-[#151822] border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between pb-3 text-xs">
          <div className="flex items-center gap-1.5">
            {book.genres?.[0] ? (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-zinc-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                {book.genres[0]}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-400">Archive</span>
            )}
            {book.status === "reading" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Reading</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-mono text-[10px] font-bold border border-amber-200/50 dark:border-amber-800/50">
              ★ {book.rating || 5}.0
            </span>
          </div>
        </div>

        <div className="py-2 flex justify-center">
          <div className="group-hover:scale-105 transition-transform duration-300">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              size="md"
              className="shadow-md"
            />
          </div>
        </div>

        <div className="pt-3 space-y-1">
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {book.title}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 dark:text-zinc-500 shrink-0">
              {book.pages && <span>{book.pages}p</span>}
              {book.pages && book.publishedYear && <span>·</span>}
              {book.publishedYear && <span>{book.publishedYear}</span>}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 font-medium">
            {book.author}
          </p>

          <p className="text-[11px] text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed pt-1">
            {book.description || "Curated literary volume in personal library archive."}
          </p>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
          <span>Read dossier</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        {book.favorite && (
          <span className="inline-flex items-center gap-1 text-[11px] text-rose-500 font-medium">
            <Heart size={12} className="fill-rose-500" />
            <span>Fav</span>
          </span>
        )}
      </div>
    </div>
  );
}
