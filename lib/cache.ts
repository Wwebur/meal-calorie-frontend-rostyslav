interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 1 hour)
  maxSize?: number; // Maximum number of entries (default: 100)
}

class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly ttl: number;
  private readonly maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.ttl = options.ttl || 60 * 60 * 1000; // 1 hour default
    this.maxSize = options.maxSize || 100;
  }

  set(key: string, data: T, customTtl?: number): void {
    // Clean expired entries first
    this.cleanup();

    // If cache is full, remove least recently used entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: customTtl || this.ttl,
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    this.cleanup();
    return this.cache.size;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    this.cleanup();
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl,
    };
  }
}

// Create a global cache instance for calorie data
export const calorieCache = new LRUCache<any>({
  ttl: 30 * 60 * 1000, // 30 minutes for calorie data
  maxSize: 200, // Store up to 200 different dishes
});

// Create a cache for meal history
export const historyCache = new LRUCache<any[]>({
  ttl: 5 * 60 * 1000, // 5 minutes for history data
  maxSize: 10, // Store up to 10 different user histories
});

// Utility function to generate cache keys
export const generateCacheKey = (dishName: string, servings: number, userId?: string): string => {
  const normalizedDishName = dishName.toLowerCase().trim();
  const key = `${normalizedDishName}:${servings}`;
  return userId ? `${userId}:${key}` : key;
};

// Utility function to generate history cache key
export const generateHistoryCacheKey = (userId: string): string => {
  return `history:${userId}`;
}; 