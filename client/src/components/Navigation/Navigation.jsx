import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import DefaultNavigation from "../DefaultNavigation/DefaultNavigation";
import Login from "../Login/Login";

function RequireAuthenticatedUser({ children }) {
  const { user: user } = useUser();
  return user ? children : <Navigate to="/login" replace />;
}

function RedirectIfUserIsAuthenticated({ children }) {
  const { user: user } = useUser();
  return user ? <Navigate to="/" replace /> : children;
}

function Navigation() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RedirectIfUserIsAuthenticated>
            <Login />
          </RedirectIfUserIsAuthenticated>
        }
      />
      <Route
        path="/*"
        element={
          <RequireAuthenticatedUser>
            <DefaultNavigation />
          </RequireAuthenticatedUser>
        }
      />
    </Routes>
  );
}

export default Navigation;
