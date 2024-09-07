export default function fetchJson(url, options = {}) {
  return fetch(url, { ...options, credentials: "include" }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        const error = new Error(response.statusText);
        error.data = data;
        throw error;
      });
    }
    return response.json();
  });
}
