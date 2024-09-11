import { React } from "react";
import { Routes, Route } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import Home from "../Home/Home";
import About from "../About/About";
import DefaultLayout from "./DefaultLayout";
import InterestsList from "../Interests/InterestsList";
import InterestsDetail from "../Interests/InterestsDetail";

function DefaultNavigation() {
  const { user: user } = useAuth();
  return (
    <DefaultLayout currentUser={user} loaded={true}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/interests" element={<InterestsList />} />
        <Route path="/interests/:topicId" element={<InterestsDetail />} />
      </Routes>
    </DefaultLayout>
  );
}
export default DefaultNavigation;
