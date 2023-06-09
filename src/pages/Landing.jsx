import { useState, useEffect } from "react";
import Top10 from "../components/landing/Top10";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { useItems } from "../state/ItemsProvider";
import Spinner from "../components/shared/Spinner";
import NotFound from "./NotFound";
import Hero from "../components/landing/Hero";
import TitlesContainer from "../components/landing/TitlesContainer";
import Search from "../components/shared/Search";
import Footer from "../components/shared/Footer";

export default function Landing() {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const movies = data.filter((item) => item.type === "movie");
  const series = data.filter((item) => item.type === "series");
  const documentaries = data.filter((item) => item.type === "documentary");
  const [query, setQuery] = useState("");
  const collection = "titles";

  useEffect(() => {
    loadData(collection);
  }, []);
  async function loadData(collection) {
    const data = await readDocuments(collection).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }
  function onChange(query) {
    setQuery(query);
  }

  return (
    <div id="LandingPage">
      <Hero />
      <Search onChange={onChange} />
      {status === 0 && <Spinner />}
      {status === 1 && (
        <TitlesContainer
          query={query}
          series={series}
          movies={movies}
          doc={documentaries}
        />
      )}
      {status === 2 && <NotFound />}
      <Top10 collection={collection} />
      <Footer />
    </div>
  );
}
