'use client';

import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-1 opacity-0" disabled>
        <Star className="h-4 w-4" />
      </button>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={`h-4 w-4 transition-colors ${
          isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        }`}
      />
    </button>
  );
}
