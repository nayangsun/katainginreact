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

export function register({ email, password }) {
  return fetch("/api/users/register", {
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
