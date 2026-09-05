import React, { useState } from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating = 0, max = 5, onChange = null, size = 15, interactive = false, className = '' }) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div 
      className={`inline-flex items-center gap-0.5 ${className}`}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            className={`p-0.5 rounded-sm transition-all duration-150 ${
              interactive 
                ? 'cursor-pointer hover:scale-125 focus:outline-none focus:ring-1 focus:ring-amber-500' 
                : 'cursor-default'
            }`}
            title={interactive ? `Rate ${starValue} star${starValue > 1 ? 's' : ''}` : `${rating} stars`}
            aria-label={`${starValue} of ${max} stars`}
          >
            <Star
              size={size}
              className={`transition-colors duration-200 ${
                isFilled
                  ? 'fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400 drop-shadow-[0_1px_2px_rgba(217,119,6,0.3)]'
                  : 'fill-transparent text-stone-300 dark:text-stone-700'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

