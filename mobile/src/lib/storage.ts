/**
 * storage.ts — Persistent storage for Nocturne Mobile
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  TOKEN: "nocturne_token",
  USER: "nocturne_user",
  WISHLIST: "nocturne_wishlist",
} as const;

export const saveToken = (token: string) =>
  AsyncStorage.setItem(KEYS.TOKEN, token);

export const getToken = () => AsyncStorage.getItem(KEYS.TOKEN);

export const removeToken = () => AsyncStorage.removeItem(KEYS.TOKEN);

export type StoredUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at?: string;
};

export const saveUser = (user: StoredUser) =>
  AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));

export const getUser = async (): Promise<StoredUser | null> => {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const removeUser = () => AsyncStorage.removeItem(KEYS.USER);

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
  AsyncStorage.setItem(KEYS.WISHLIST, JSON.stringify(items));

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const raw = await AsyncStorage.getItem(KEYS.WISHLIST);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as WishlistItem[];
  } catch {
    return [];
  }
};

export const clearAllStorage = () =>
  Promise.all([removeToken(), removeUser()]);
