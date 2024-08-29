import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import DefaultNavigation from "../DefaultNavigation/DefaultNavigation";
import Login from "../Login/Login";

function RequireAuthenticatedUser({ children }) {
  const { isAuthenticated: isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RedirectIfUserIsAuthenticated({ children }) {
  const { isAuthenticated: isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
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
