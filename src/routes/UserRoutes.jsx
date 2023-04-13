import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/Movies";
import SeriesPage from "../pages/Series";
import DocPage from "../pages/Documentaries";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/documentaries" element={<DocPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
