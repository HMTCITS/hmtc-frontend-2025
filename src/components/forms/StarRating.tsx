/**
 * Usage:
 * <StarRating totalStars={5} onRatingChange={handleRatingSubmit} initialRating={3} />
 * totalStars: default set to 5, optional
 * initialRating: default set to 0, optional
 */

import { Star } from 'lucide-react';
import React, { useEffect,useState } from 'react';

export default function StarRating({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
}: {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}) {
  // Save current rating in state
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (starValue: number) => {
    setRating(starValue);
    if (onRatingChange) onRatingChange(starValue);
  };

  return (
    <div className='flex items-center gap-5'>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hover || rating);

        return (
          <Star
            key={starValue}
            className={`h-8 w-8 cursor-pointer transition-colors ${
              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
}
