import { errorToMessage, isUnauthorizedError } from "../../src/lib/errors";

describe("isUnauthorizedError", () => {
  test("returns false if the given error is null", () => {
    expect(isUnauthorizedError(null)).toEqual(false);
  });

  test("returns false if the given error is not an Unauthorized error", () => {
    const error = { message: "Not Found" };
    expect(isUnauthorizedError(error)).toEqual(false);
  })

  test("returns true if the given error is an Unauthorized error", () => {
    const error = { message: "Unauthorized" };
    expect(isUnauthorizedError(error)).toEqual(true);
  });
});

describe("errorToMessage", () => {
  test("returns a default message if the given error is null", () => {
    expect(errorToMessage(null)).toEqual("Something went wrong.");
  });

  test("returns a default message if there are no errors", () => {
    const error = { errors: {} };
    expect(errorToMessage(error)).toEqual("Something went wrong.");
  });

  test("returns the error if there is one, transforming it into a sentence", () => {
    const error = { errors: { message: "there is no more tea" } };
    expect(errorToMessage(error)).toEqual("There is no more tea.");
  });

  test("returns all the errors if there are many, transforming them into a sentence", () => {
    const error = {
      errors: {
        email: ["can't be blank"],
        password: ["can't be blank"],
      }
    };
    expect(errorToMessage(error)).toEqual(
      "email: Can't be blank. password: Can't be blank."
    );
  });
});
