

const STORAGE_KEY = "insurai_auth";

/**
 * Saves authentication data to local storage.
 * @param {{token: string, user: object}} data
 */
export function saveAuth(data) {
  if (!data) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


export function getAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getToken() {
  return getAuth()?.token || null;
}


export function getCurrentUser() {
  return getAuth()?.user || null;
}


export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "/login";
}
