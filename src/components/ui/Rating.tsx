"use client";

import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number;
  size?: number;
}

export default function Rating({ rating = 0 }: RatingProps) {
  const renderStar = (index: number) => {
    const starPosition = index + 1;

    if (rating >= starPosition) {
      return <Star size={14} fill="currentColor" className="text-amber-400" />;
    } else if (rating >= starPosition - 0.5) {
      return (
        <StarHalf size={14} fill="currentColor" className="text-amber-400" />
      );
    } else {
      return <Star size={14} fill="none" className="text-gray-300" />;
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index}>{renderStar(index)}</div>
      ))}
    </div>
  );
}
