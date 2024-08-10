import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { combineLatest } from "rxjs";
import { Result } from "../../src/lib/result";
import rxFetch from "../../src/lib/rx_fetch";

const handlers = [
  http.get("https://localhost:4000/api/a", ({ request, params, cookies }) => {
    return HttpResponse.json(
      { message: "Mocked a response" },
      {
        status: 202,
        statusText: "Mocked status",
      }
    );
  }),

  http.get("https://localhost:4000/api/b", ({ request, params, cookies }) => {
    return HttpResponse.json(
      {
        message: "Mocked b response",
      },
      {
        status: 202,
        statusText: "Mocked status",
      }
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("asResult", () => {
  test("should return Success result on successful fetch", (done) => {
    const results = [];

    rxFetch("https://localhost:4000/api/a", { method: "GET" })
      .asResult()
      .subscribe({
        next: (result) => results.push(result),
        complete: () => {
          expect(results).toEqual([
            Result.Loading(),
            Result.Success({ message: "Mocked a response" }),
          ]);
          done();
        },
      });
  });

  test("should return Success result on combined successful fetch", (done) => {
    const results = [];

    const api1$ = rxFetch("https://localhost:4000/api/a", { method: "GET" });
    const api2$ = rxFetch("https://localhost:4000/api/b", { method: "GET" });

    combineLatest([api1$, api2$])
      .asResult()
      .subscribe({
        next: (result) => results.push(result),
        complete: () => {
          expect(results).toEqual([
            Result.Loading(),
            Result.Success([
              { message: "Mocked a response" },
              { message: "Mocked b response" },
            ]),
          ]);
          done();
        },
      });
  });
});
