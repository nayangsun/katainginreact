import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import fetchJson, { ResponseError } from "../../src/lib/fetch_json";

const handlers = [
  http.get("https://localhost:3000/api/a", () => {
    return HttpResponse.json(
      {
        message: "success",
      },
      {
        status: 200,
        statusText: "Mocked status",
      }
    );
  }),
  http.get("https://localhost:3000/api/b", () => {
    return HttpResponse.json(
      {},
      {
        status: 401,
        statusText: "Unauthorized",
      }
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("fetchJson", () => {
  test("should return Success result on successful fetch", () => {
    return new Promise((done) => {
      fetchJson("https://localhost:3000/api/a", { method: "GET" }).then((result) => {
        expect(result).toEqual({ message: "success" });
        done();
      })
    });
  });

  test("should throw ResponseError on failed fetch", async () => {
    await expect(fetchJson("https://localhost:3000/api/b", { method: "GET" }))
      .rejects
      .toThrow(ResponseError);

    await expect(fetchJson("https://localhost:3000/api/b", { method: "GET" }))
      .rejects
      .toHaveProperty("name", "Unauthorized");

    await expect(fetchJson("https://localhost:3000/api/b", { method: "GET" }))
      .rejects
      .toHaveProperty("message", "");
  });
});
