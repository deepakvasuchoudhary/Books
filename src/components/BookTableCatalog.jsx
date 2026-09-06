import React from "react";
import { BookCover } from "./BookCover";
import { ArrowUpRight } from "lucide-react";

export function BookTableCatalog({ books, onSelectBook }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#10121a] shadow-xs">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 dark:bg-white/[0.03] text-slate-400 dark:text-zinc-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200/80 dark:border-white/[0.08]">
          <tr>
            <th className="py-3 px-4 w-12 text-center">#</th>
            <th className="py-3 px-4 w-14">Cover</th>
            <th className="py-3 px-4 font-semibold">Title</th>
            <th className="py-3 px-4 font-semibold">Author</th>
            <th className="py-3 px-4 hidden sm:table-cell">Year</th>
            <th className="py-3 px-4 hidden md:table-cell">Topic</th>
            <th className="py-3 px-4 text-center">Rating</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
          {books.map((book, idx) => (
            <tr
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="hover:bg-indigo-50/50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <td className="py-3 px-4 font-mono text-[11px] text-slate-400 dark:text-zinc-600 text-center">
                {String(idx + 1).padStart(2, "0")}
              </td>
              <td className="py-2.5 px-4">
                <BookCover
                  coverUrl={book.coverUrl}
                  title={book.title}
                  author={book.author}
                  size="xs"
                  className="shrink-0"
                />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {book.title}
                  </div>
                  {book.status === "reading" && (
                    <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-semibold border border-emerald-500/20">
                      Reading
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-slate-600 dark:text-zinc-400 font-medium">
                {book.author}
              </td>
              <td className="py-3 px-4 hidden sm:table-cell font-mono text-slate-400 dark:text-zinc-500">
                {book.publishedYear || "—"}{book.pages ? ` · ${book.pages}p` : ""}
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                {book.genres?.[0] ? (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-400 font-mono text-[10px]">
                    #{book.genres[0]}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="inline-flex items-center gap-1 font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  <span>★</span>
                  <span>{book.rating || 5}.0</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
