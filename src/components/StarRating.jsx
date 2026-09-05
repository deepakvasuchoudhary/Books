import React, { useState } from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating = 0, max = 5, onChange = null, size = 16, interactive = false }) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div 
      className="inline-flex items-center gap-1"
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
            className={`transition-transform ${interactive ? 'cursor-pointer hover:scale-115' : 'cursor-default'}`}
            title={interactive ? `Rate ${starValue} star${starValue > 1 ? 's' : ''}` : `${rating} stars`}
          >
            <Star
              size={size}
              className={`transition-colors duration-150 ${
                isFilled
                  ? 'fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400'
                  : 'fill-transparent text-stone-300 dark:text-stone-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
