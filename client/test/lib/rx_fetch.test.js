import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import rxFetch from "../../src/lib/rx_fetch";

const handlers = [
  http.get("https://localhost:3000/api/a", ({ request, params, cookies }) => {
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
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("rxFetch", () => {
  test("should return Success result on successful fetch", (done) => {
    const results = [];

    rxFetch("https://localhost:3000/api/a", { method: "GET" }).subscribe({
      next: (result) => results.push(result),
      complete: () => {
        expect(results).toEqual([{ message: "success" }]);
        done();
      },
    });
  });
});
