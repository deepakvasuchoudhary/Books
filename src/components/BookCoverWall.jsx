import React from "react";
import { BookCover } from "./BookCover";
import { StarRating } from "./StarRating";
import { Heart } from "lucide-react";

export function BookCoverWall({ books, onSelectBook }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 py-4">
      {books.map((book) => (
        <div
          key={book.id}
          onClick={() => onSelectBook(book)}
          className="group liquid-glass rounded-[22px] p-4 liquid-glass-interactive flex flex-col items-center text-center cursor-pointer active:scale-[0.98]"
        >
          {/* 3D Cover Display */}
          <div className="relative transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-105">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              size="md"
              className="shadow-xl"
            />

            {book.favorite && (
              <div className="absolute top-2 right-2 p-1.5 rounded-full liquid-glass text-[#ff2d55] shadow-md border border-white/20">
                <Heart size={12} className="fill-[#ff2d55]" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="mt-4 space-y-1 w-full px-1">
            <h4 className="font-semibold text-xs sm:text-sm text-[#1d1d1f] dark:text-[#f5f5f7] line-clamp-1 group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
              {book.title}
            </h4>
            <p className="text-[11px] text-[#86868b] dark:text-[#a1a1a6] line-clamp-1 font-normal">
              {book.author}
            </p>
            <div className="pt-1 flex justify-center">
              <StarRating rating={book.rating || 5} size={11} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
