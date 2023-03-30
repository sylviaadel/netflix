import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import Navbar from "../components/shared/Navbar";

export default function AdminRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
