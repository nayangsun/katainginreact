import { React } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import Home from "../Home/Home";
import DefaultLayout from "./DefaultLayout";

function DefaultNavigation() {
  const { user: user } = useUser();

  return (
    <DefaultLayout currentUser={user} loaded={true}>
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
    </DefaultLayout>
  );
}

export default DefaultNavigation;
