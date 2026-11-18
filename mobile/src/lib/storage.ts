/**
 * storage.ts — Persistent & Safe storage for Nocturne Mobile
 *
 * Implements defensive storage with in-memory fallback to avoid crashes
 * if AsyncStorage native module is unavailable in Expo Go or unlinked.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  TOKEN: "nocturne_token",
  USER: "nocturne_user",
  WISHLIST: "nocturne_wishlist",
} as const;

// In-memory cache fallback to ensure the app never crashes
const memoryCache = new Map<string, string>();
let isAsyncStorageFunctional = true;

async function safeGetItem(key: string): Promise<string | null> {
  if (isAsyncStorageFunctional) {
    try {
      const val = await AsyncStorage.getItem(key);
      if (val !== null && val !== undefined) {
        memoryCache.set(key, val);
        return val;
      }
    } catch (err) {
      console.warn(`[Storage] AsyncStorage.getItem failed for "${key}", using memory fallback:`, err);
      isAsyncStorageFunctional = false;
    }
  }
  return memoryCache.get(key) ?? null;
}

async function safeSetItem(key: string, value: string): Promise<void> {
  memoryCache.set(key, value);
  if (isAsyncStorageFunctional) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.warn(`[Storage] AsyncStorage.setItem failed for "${key}", using memory fallback:`, err);
      isAsyncStorageFunctional = false;
    }
  }
}

async function safeRemoveItem(key: string): Promise<void> {
  memoryCache.delete(key);
  if (isAsyncStorageFunctional) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.warn(`[Storage] AsyncStorage.removeItem failed for "${key}", using memory fallback:`, err);
      isAsyncStorageFunctional = false;
    }
  }
}

export const saveToken = (token: string) => safeSetItem(KEYS.TOKEN, token);

export const getToken = () => safeGetItem(KEYS.TOKEN);

export const removeToken = () => safeRemoveItem(KEYS.TOKEN);

export type StoredUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at?: string;
};

export const saveUser = (user: StoredUser) =>
  safeSetItem(KEYS.USER, JSON.stringify(user));

export const getUser = async (): Promise<StoredUser | null> => {
  const raw = await safeGetItem(KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const removeUser = () => safeRemoveItem(KEYS.USER);

export type WishlistItem = {
  id: string;
  title: string;
  artist: string;
  date: string;
  venue: string;
  price: number;
  image: string;
  category: string;
  savedAt: number;
};

export const saveWishlist = (items: WishlistItem[]) =>
  safeSetItem(KEYS.WISHLIST, JSON.stringify(items));

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const raw = await safeGetItem(KEYS.WISHLIST);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as WishlistItem[];
  } catch {
    return [];
  }
};

export const clearAllStorage = () =>
  Promise.all([removeToken(), removeUser()]);
