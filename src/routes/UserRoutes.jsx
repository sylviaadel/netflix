import { Routes, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
