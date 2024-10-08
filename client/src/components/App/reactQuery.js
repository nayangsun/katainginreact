import { QueryCache, QueryClient } from "@tanstack/react-query";
import { removeStoredUser } from "../AuthProvider/userStorage";
import { isUnauthorizedError } from "../../lib/errors";

// I'm not sure if handling this with an API Interceptor is the right approach.
const queryCache = new QueryCache({
  onError: (error) => {
    if (isUnauthorizedError(error)) {
      removeStoredUser();
    }
  },
});

export const queryClient = new QueryClient({
  queryCache: queryCache,
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isUnauthorizedError(error)) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
