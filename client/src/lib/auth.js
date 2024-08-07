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
  }).then((response) => {
    const code = response.status;
    return response.json().then((json) => {
      return { code, json };
    });
  });
}
