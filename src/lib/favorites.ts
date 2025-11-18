// Client-side only favorites management using localStorage

const FAVORITES_STORAGE_KEY = 'watchability-favorites';

export interface FavoriteKey {
  sport: string;
  league: string;
  eventId: string;
}

// Get all favorites from localStorage
export function getFavorites(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }
  
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error('Error loading favorites:', error);
    return new Set();
  }
}

// Generate a unique key for an event
export function getFavoriteKey(key: FavoriteKey): string {
  return `${key.sport}:${key.league}:${key.eventId}`;
}

// Check if an event is favorited
export function isFavorite(key: FavoriteKey): boolean {
  const favorites = getFavorites();
  return favorites.has(getFavoriteKey(key));
}

// Toggle favorite status for an event
export function toggleFavorite(key: FavoriteKey): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const favorites = getFavorites();
  const favoriteKey = getFavoriteKey(key);
  
  if (favorites.has(favoriteKey)) {
    favorites.delete(favoriteKey);
  } else {
    favorites.add(favoriteKey);
  }
  
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
    return favorites.has(favoriteKey);
  } catch (error) {
    console.error('Error saving favorites:', error);
    return false;
  }
}
