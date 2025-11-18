'use client';

import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite, type FavoriteKey } from '@/lib/favorites';

interface FavoriteButtonProps {
  sport: string;
  league: string;
  eventId: string;
  onToggle?: () => void;
}

export function FavoriteButton({ sport, league, eventId, onToggle }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const key: FavoriteKey = { sport, league, eventId };
    setFavorited(isFavorite(key));
  }, [sport, league, eventId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const key: FavoriteKey = { sport, league, eventId };
    const newState = toggleFavorite(key);
    setFavorited(newState);
    
    if (onToggle) {
      onToggle();
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="p-1 opacity-0" disabled>
        <Star className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="p-1 hover:bg-gray-100 rounded transition-colors"
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={`h-4 w-4 transition-colors ${
          favorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        }`}
      />
    </button>
  );
}
