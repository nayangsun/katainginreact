export class ResponseError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}

export default function fetchJson(url, options = {}) {
  return fetch(url, { ...options, credentials: "include" }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new ResponseError(response.statusText, data.message);
      });
    }
    return response.json();
  });
}
