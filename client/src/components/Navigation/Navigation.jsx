import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";

function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default Navigation;
