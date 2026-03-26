'use client';

import { Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

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

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  }, [onToggle]);

  if (!mounted) {
    return (
      <button className="p-1 opacity-0" disabled>
        <Star className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="p-1 hover:bg-muted/60 rounded transition-colors cursor-pointer"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={`h-4 w-4 transition-colors ${
          isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'
        }`}
      />
    </button>
  );
}
