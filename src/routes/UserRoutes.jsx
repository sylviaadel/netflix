import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Footer from "../components/shared/Footer";

export default function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
