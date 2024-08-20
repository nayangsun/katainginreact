import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEY } from "../lib/query_key";

const USER_LOCAL_STORAGE_KEY = "user";

function getStoredUser() {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

function setStoredUser(user) {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

function removeStoredUser() {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

function getUser() {
  return fetch("/api/me", { credentials: "include" }).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  });
}

export function useUser() {
  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: async () => getUser(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: getStoredUser(),
  });

  useEffect(() => {
    if (!user) removeStoredUser();
    else setStoredUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
}
