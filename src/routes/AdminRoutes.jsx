import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Navbar from "../components/shared/Navbar";

export default function AdminRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
