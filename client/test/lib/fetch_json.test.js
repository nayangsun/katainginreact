import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import fetchJson from "../../src/lib/fetch_json";

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
  http.post("https://localhost:3000/api/c", () => {
    return HttpResponse.json(
      {
        errors: {
          email: ["can't be blank"],
          password: ["can't be blank"],
        },
      },
      {
        status: 422,
        statusText: "Unprocessable Entity",
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

  test("should throw Error on failed fetch", async () => {
    await expect(fetchJson("https://localhost:3000/api/b", { method: "GET" }))
      .rejects
      .toThrow(Error);

    await expect(fetchJson("https://localhost:3000/api/b", { method: "GET" }))
      .rejects
      .toMatchObject({ message: "Unauthorized" });
  });

  test("should throw Error with error messages on failed fetch", async () => {
    await expect(fetchJson("https://localhost:3000/api/c", { method: "POST" }))
      .rejects
      .toThrow(Error);

    await expect(fetchJson("https://localhost:3000/api/c", { method: "POST" }))
      .rejects
      .toMatchObject({
        message: "Unprocessable Entity",
        data: {
          errors: {
            email: ["can't be blank"],
            password: ["can't be blank"],
          }
        },
      });
  });
});
