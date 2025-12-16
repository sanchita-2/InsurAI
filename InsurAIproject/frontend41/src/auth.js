// src/auth.js

const STORAGE_KEY = "insurai_auth";

/**
 * Save auth data after login
 * @param {{token: string, user: object}} data
 */
export function saveAuth(data) {
  if (!data) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Get full auth object
 */
export function getAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Get JWT token only
 */
export function getToken() {
  return getAuth()?.token || null;
}

/**
 * Get logged-in user object
 */
export function getCurrentUser() {
  return getAuth()?.user || null;
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "/login";
}
