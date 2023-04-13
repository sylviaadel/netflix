import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/Movies";
import SeriesPage from "../pages/Series";
import DocPage from "../pages/Documentaries";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/documentaries" element={<DocPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
