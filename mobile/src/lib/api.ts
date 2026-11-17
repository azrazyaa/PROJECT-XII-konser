/**
 * api.ts — Centralized API client for Nocturne Mobile
 *
 * Automatically detects host IP from Expo Go (hostUri),
 * falls back to 10.0.2.2 for Android emulator and localhost for Web/iOS.
 */

import Constants from "expo-constants";
import { Platform } from "react-native";

function getBaseUrl(): string {
  // When running on physical device via Expo Go, hostUri contains `<laptop-ip>:<expo-port>`
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(":")[0];
    return `http://${ip}:3000`;
  }
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
  }
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
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

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
