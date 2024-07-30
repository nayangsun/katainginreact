import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";

function DefaultNavigation() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default DefaultNavigation;
