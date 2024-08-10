const { Observable, of } = require("rxjs");
const { catchError, map, startWith } = require("rxjs/operators");

// Define Result type
export class Result {
  static Success(data) {
    return { type: "Success", data };
  }

  static Error(error) {
    return { type: "Error", error };
  }

  static Loading() {
    return { type: "Loading" };
  }
}

export function asResult(observable) {
  return observable.pipe(
    map((data) => Result.Success(data)),
    startWith(Result.Loading()),
    catchError((error) => of(Result.Error(error)))
  );
}

Observable.prototype.asResult = function () {
  return asResult(this);
};
