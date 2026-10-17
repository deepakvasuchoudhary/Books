import React, { useState, useEffect, useCallback } from "react";
import { BOOKS } from "./data/books";
import { OpenBookShowcase } from "./components/OpenBookShowcase";
import { CircularBookCarousel } from "./components/CircularBookCarousel";

export default function App() {
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  const total = BOOKS.length;
  const safeActiveIndex = total > 0 ? Math.min(activeBookIndex, total - 1) : 0;
  const activeBook = BOOKS[safeActiveIndex] || BOOKS[0] || null;

  // Immediate, snappy selection
  const handleSelectBook = useCallback(
    (newIndex) => {
      if (newIndex === safeActiveIndex) return;
      setActiveBookIndex(newIndex);
    },
    [safeActiveIndex]
  );

  const handleNextBook = useCallback(() => {
    if (total <= 1) return;
    const nextIdx = safeActiveIndex < total - 1 ? safeActiveIndex + 1 : 0;
    handleSelectBook(nextIdx);
  }, [total, safeActiveIndex, handleSelectBook]);

  const handlePrevBook = useCallback(() => {
    if (total <= 1) return;
    const prevIdx = safeActiveIndex > 0 ? safeActiveIndex - 1 : total - 1;
    handleSelectBook(prevIdx);
  }, [total, safeActiveIndex, handleSelectBook]);

  // Global Keyboard Shortcuts (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevBook();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextBook();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevBook, handleNextBook]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-slate-900 flex flex-col justify-between select-none relative">
      {/* Main Interactive Stage: Non-Scrolling Viewport Canvas */}
      <main className="flex-1 w-full flex flex-col justify-between overflow-hidden px-3 sm:px-6 py-2 relative">
        {activeBook && (
          <>
            {/* Top Stage: Permanently Open Book Showpiece (Content updates directly) */}
            <div className="w-full flex-1 flex items-center justify-center min-h-0 py-0.5">
              <OpenBookShowcase
                book={activeBook}
                bookIndex={safeActiveIndex + 1}
                onNext={handleNextBook}
                onPrev={handlePrevBook}
                hasNext={BOOKS.length > 1}
                hasPrev={BOOKS.length > 1}
              />
            </div>

            {/* Bottom Stage: Circular Stack Carousel of Books */}
            <div className="w-full shrink-0 pb-1">
              <CircularBookCarousel
                books={BOOKS}
                activeIndex={safeActiveIndex}
                onSelectIndex={(index) => {
                  handleSelectBook(index);
                }}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
