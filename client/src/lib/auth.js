import { LOCAL_STORAGE_KEY } from "./constants";

export function getStoredUser() {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY.user);
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  localStorage.setItem(LOCAL_STORAGE_KEY.user, JSON.stringify(user));
}

export function removeStoredUser() {
  console.log("removeStoredUser");
  localStorage.removeItem(LOCAL_STORAGE_KEY.user);
}

export function logout() {
  return fetch("/api/users/log_out", { method: "DELETE" }).then((response) =>
    response.json()
  );
}

export function login({ email, password }) {
  return fetch("/api/users/log_in", {
    method: "POST",
    body: JSON.stringify({
      user: { email: email, password: password },
    }),
    headers: { "Content-Type": "application/json" },
  }).then((response) =>
    response.json().then((data) => ({
      status: response.ok ? "ok" : "error",
      data,
    }))
  );
}
