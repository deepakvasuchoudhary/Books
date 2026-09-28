import React from "react";
import { BookCover } from "./BookCover";
import { ArrowUpRight, Heart } from "lucide-react";

export function BookCardBento({ book, onSelectBook }) {
  return (
    <div
      onClick={() => onSelectBook(book)}
      className="group relative rounded-[24px] p-5 liquid-glass liquid-glass-interactive flex flex-col justify-between cursor-pointer active:scale-[0.98]"
    >
      <div>
        {/* Top Chips Row */}
        <div className="flex items-center justify-between pb-3.5 text-xs">
          <div className="flex items-center gap-1.5">
            {book.genres?.[0] ? (
              <span className="px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#86868b] dark:text-[#a1a1a6] font-mono text-[10px] uppercase tracking-wider font-semibold">
                {book.genres[0]}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-[#86868b]">Vault</span>
            )}
            {book.status === "reading" && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#34c759]/10 text-[#34c759] font-mono text-[10px] font-semibold border border-[#34c759]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34c759] animate-pulse"></span>
                <span>Reading</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#ff9f0a] font-mono text-[10px] font-bold border border-[#ff9f0a]/20">
              ★ {book.rating || 5}.0
            </span>
          </div>
        </div>

        {/* 3D Book Presentation */}
        <div className="py-3 flex justify-center">
          <div className="group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] book-spine-depth">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              size="md"
              className="shadow-xl"
            />
          </div>
        </div>

        {/* Book Typography & Details */}
        <div className="pt-3 space-y-1">
          <div className="flex items-baseline justify-between gap-1.5">
            <h3 className="font-semibold text-sm text-[#1d1d1f] dark:text-[#f5f5f7] line-clamp-1 group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
              {book.title}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#86868b] dark:text-[#a1a1a6] shrink-0">
              {book.pages && <span>{book.pages}p</span>}
              {book.pages && book.publishedYear && <span>·</span>}
              {book.publishedYear && <span>{book.publishedYear}</span>}
            </div>
          </div>

          <p className="text-xs text-[#86868b] dark:text-[#a1a1a6] line-clamp-1 font-normal">
            {book.author}
          </p>

          <p className="text-[11px] text-[#86868b] dark:text-[#a1a1a6] line-clamp-2 leading-relaxed pt-1 font-normal">
            {book.description || "Curated literary volume in personal library archive."}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-3.5 mt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#86868b] dark:text-[#a1a1a6] font-medium group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors flex items-center gap-1">
          <span>Read dossier</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        {book.favorite && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#ff2d55] font-medium">
            <Heart size={12} className="fill-[#ff2d55]" />
            <span>Fav</span>
          </span>
        )}
      </div>
    </div>
  );
}
