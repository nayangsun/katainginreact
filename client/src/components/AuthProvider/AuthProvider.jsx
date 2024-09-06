import React, { useState, useEffect, useMemo } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./useAuth";
import { QUERY_KEY } from "../../lib/constants";
import { getStoredUser, setStoredUser } from "../../lib/auth";

function getUser() {
  return fetch("/api/auth", { credentials: "include" }).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  });
}

export default function AuthProvider({ children }) {
  const storedUser = useMemo(getStoredUser, []);
  const [isAuthenticated, setAuth] = useState(storedUser ? true : false);
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.auth],
    queryFn: async () => getUser(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Login
  useEffect(() => {
    if (user) {
      const convertedUser = { user: user.data };
      setStoredUser(convertedUser);
      setAuth(true);
    }
  }, [user]);

  // Logout
  useEffect(() => {
    const isUserStored = getStoredUser() ? true : false;
    if (!isUserStored && user) {
      queryClient.invalidateQueries(QUERY_KEY.user);
    } else {
      setAuth(isUserStored);
    }
  }, [user, location.pathname, queryClient]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
