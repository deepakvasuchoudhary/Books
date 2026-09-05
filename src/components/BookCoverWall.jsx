import React from "react";
import { BookCover } from "./BookCover";
import { StarRating } from "./StarRating";
import { Heart } from "lucide-react";

export function BookCoverWall({ books, onSelectBook }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 py-4">
      {books.map((book) => (
        <div
          key={book.id}
          onClick={() => onSelectBook(book)}
          className="group flex flex-col items-center text-center cursor-pointer"
        >
          {/* 3D Cover Display */}
          <div className="relative transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105">
            <BookCover
              coverUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              size="md"
              className="shadow-md group-hover:shadow-2xl transition-shadow"
            />

            {book.favorite && (
              <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 backdrop-blur-md text-rose-500 shadow-sm">
                <Heart size={12} className="fill-rose-500" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="mt-3.5 space-y-1 w-full px-1">
            <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {book.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1">
              {book.author}
            </p>
            <div className="pt-0.5 flex justify-center">
              <StarRating rating={book.rating || 5} size={11} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
