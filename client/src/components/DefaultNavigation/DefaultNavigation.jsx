import { React } from "react";
import { Routes, Route } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import Home from "../Home/Home";
import About from "../About/About";
import DefaultLayout from "./DefaultLayout";

function DefaultNavigation() {
  const { user: user } = useAuth();

  return (
    <DefaultLayout currentUser={user} loaded={true}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </DefaultLayout>
  );
}

export default DefaultNavigation;
