import { from } from "rxjs";
import { switchMap } from "rxjs/operators";

export default function rxFetch(url, options) {
  return from(fetch(url, options)).pipe(
    switchMap((response) => {
      if (!response.ok) {
        // handle the case where the response is not ok
        throw new Error("Network response was not ok");
      }
      return from(response.json());
    })
  );
}
