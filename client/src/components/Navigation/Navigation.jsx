import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import DefaultNavigation from "../DefaultNavigation/DefaultNavigation";
import Login from "../Login/Login";
import Register from "../Register/Register";

function AccessWrapper({ accessType, children }) {
  const { isAuthenticated: isAuthenticated } = useAuth();

  switch (accessType) {
    case "require_authenticated_user":
      return isAuthenticated ? children : <Navigate to="/login" replace />;
    case "redirect_if_user_is_authenticated":
      return isAuthenticated ? <Navigate to="/" replace /> : children;
    default:
      return <div>Invalid Access Type.</div>;
  }
}

function ProtectedRoute({ element: children }) {
  return (
    <AccessWrapper accessType={"require_authenticated_user"}>
      {children}
    </AccessWrapper>
  );
}

function PublicRoute({ element: children }) {
  return (
    <AccessWrapper accessType={"redirect_if_user_is_authenticated"}>
      {children}
    </AccessWrapper>
  );
}

function Navigation() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route
        path="/users/register"
        element={<PublicRoute element={<Register />} />}
      />
      <Route
        path="/*"
        element={<ProtectedRoute element={<DefaultNavigation />} />}
      />
    </Routes>
  );
}

export default Navigation;
