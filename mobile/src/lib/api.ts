/**
 * api.ts — Centralized API client for Nocturne Mobile
 *
 * Automatically detects host IP from Expo Go (hostUri),
 * falls back to local LAN IP for physical mobile devices,
 * and localhost for Web/emulators.
 */

import Constants from "expo-constants";
import { Platform } from "react-native";

// Current LAN IP of the development machine; override with EXPO_PUBLIC_API_URL when it changes.
const DEV_MACHINE_IP = "172.28.138.192";

export function getBaseUrl(): string {
  // 1. Environment variable if provided
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  // 2. Try to extract IP from Expo hostUri or experienceUrl
  const rawConstants = Constants as unknown as Record<string, Record<string, unknown> | string | undefined>;
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (typeof rawConstants.manifest === "object" ? (rawConstants.manifest?.debuggerHost as string | undefined) : undefined) ||
    (typeof rawConstants.manifest2 === "object" ? ((rawConstants.manifest2?.extra as Record<string, unknown> | undefined)?.expoClient as Record<string, unknown> | undefined)?.hostUri as string | undefined : undefined);

  if (typeof hostUri === "string" && hostUri.length > 0) {
    try {
      const host = new URL(
        hostUri.includes("://") ? hostUri : `http://${hostUri}`
      ).hostname;
      if (host && host !== "localhost" && host !== "127.0.0.1") {
        return `http://${host}:3000`;
      }
    } catch {
      console.warn("Unable to parse Expo host URI:", hostUri);
    }
  }

  // 3. Fallback for physical devices (iOS / Android)
  if (Platform.OS === "android" || Platform.OS === "ios") {
    return `http://${DEV_MACHINE_IP}:3000`;
  }

  // 4. Web fallback
  return "http://localhost:3000";
}

export const API_BASE_URL = getBaseUrl();

export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: unknown;
};

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> {
  const url = `${getBaseUrl()}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (err: unknown) {
    console.error(`[API Network Error] URL: ${url}`, err);
    throw new Error(
      `Gagal terhubung ke server (${getBaseUrl()}). Pastikan Backend menyala dan HP satu Wi-Fi dengan laptop.`
    );
  }

  let json: ApiResponse<T>;
  try {
    json = await response.json();
  } catch {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (!response.ok) {
    throw new Error(
      json?.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return json;
}

export const apiGet = <T = unknown>(
  endpoint: string,
  token?: string | null
) => apiFetch<T>(endpoint, { method: "GET" }, token);

export const apiPost = <T = unknown>(
  endpoint: string,
  body: unknown,
  token?: string | null
) =>
  apiFetch<T>(
    endpoint,
    { method: "POST", body: JSON.stringify(body) },
    token
  );

export const apiPut = <T = unknown>(
  endpoint: string,
  body: unknown,
  token?: string | null
) =>
  apiFetch<T>(
    endpoint,
    { method: "PUT", body: JSON.stringify(body) },
    token
  );
