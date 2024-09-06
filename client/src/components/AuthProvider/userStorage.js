import { LOCAL_STORAGE_KEY } from "../../lib/constants";

export function getStoredUser() {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY.user);
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  localStorage.setItem(LOCAL_STORAGE_KEY.user, JSON.stringify(user));
}

export function removeStoredUser() {
  localStorage.removeItem(LOCAL_STORAGE_KEY.user);
}
