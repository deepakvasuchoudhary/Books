import React from "react";
import { BookCover } from "./BookCover";
import { ArrowUpRight } from "lucide-react";

export function BookTableCatalog({ books, onSelectBook }) {
  return (
    <div className="w-full overflow-x-auto rounded-[24px] liquid-glass shadow-xs">
      <table className="w-full text-left text-xs">
        <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#86868b] dark:text-[#a1a1a6] font-mono text-[11px] uppercase tracking-wider border-b border-black/[0.06] dark:border-white/[0.08]">
          <tr>
            <th className="py-3.5 px-4 w-12 text-center">#</th>
            <th className="py-3.5 px-4 w-14">Cover</th>
            <th className="py-3.5 px-4 font-semibold">Title</th>
            <th className="py-3.5 px-4 font-semibold">Author</th>
            <th className="py-3.5 px-4 hidden sm:table-cell">Year</th>
            <th className="py-3.5 px-4 hidden md:table-cell">Topic</th>
            <th className="py-3.5 px-4 text-center">Rating</th>
            <th className="py-3.5 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {books.map((book, idx) => (
            <tr
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="hover:bg-[#0071e3]/[0.05] dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
            >
              <td className="py-3.5 px-4 font-mono text-[11px] text-[#86868b] text-center">
                {String(idx + 1).padStart(2, "0")}
              </td>
              <td className="py-2.5 px-4">
                <BookCover
                  coverUrl={book.coverUrl}
                  title={book.title}
                  author={book.author}
                  size="xs"
                  className="shrink-0 shadow-sm"
                />
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors line-clamp-1">
                    {book.title}
                  </div>
                  {book.status === "reading" && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#34c759]/10 text-[#34c759] font-mono text-[9px] font-semibold border border-[#34c759]/20">
                      Reading
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3.5 px-4 text-[#86868b] dark:text-[#a1a1a6] font-normal">
                {book.author}
              </td>
              <td className="py-3.5 px-4 hidden sm:table-cell font-mono text-[#86868b]">
                {book.publishedYear || "—"}{book.pages ? ` · ${book.pages}p` : ""}
              </td>
              <td className="py-3.5 px-4 hidden md:table-cell">
                {book.genres?.[0] ? (
                  <span className="px-2.5 py-0.5 rounded-full liquid-glass-subtle text-[#86868b] dark:text-[#a1a1a6] font-mono text-[10px]">
                    #{book.genres[0]}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="py-3.5 px-4 text-center">
                <div className="inline-flex items-center gap-1 font-mono text-[#ff9f0a] font-semibold">
                  <span>★</span>
                  <span>{book.rating || 5}.0</span>
                </div>
              </td>
              <td className="py-3.5 px-4 text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#86868b] group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors">
                  <span>Inspect</span>
                  <ArrowUpRight size={12} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
