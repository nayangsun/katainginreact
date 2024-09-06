import { QueryCache, QueryClient } from "@tanstack/react-query";
import { removeStoredUser } from "../AuthProvider/userStorage";

// I'm not sure if handling this with an API Interceptor is the right approach.
const queryCache = new QueryCache({
  onError: (error) => {
    if (error?.name === "Unauthorized") {
      removeStoredUser();
    }
  },
});

export const queryClient = new QueryClient({
  queryCache: queryCache,
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.name === "Unauthorized") {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
