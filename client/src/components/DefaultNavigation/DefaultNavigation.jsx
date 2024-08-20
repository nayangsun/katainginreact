import { React } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import Home from "../Home/Home";
import Login from "../Login/Login";

const PrivateRoute = ({ children }) => {
  const user = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function DefaultNavigation() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default DefaultNavigation;
