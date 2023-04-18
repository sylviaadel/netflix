import { useState, useEffect } from "react";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { useItems } from "../state/ItemsProvider";
import Spinner from "../components/shared/Spinner";
import NotFound from "./NotFound";
import TitlesContainer from "../components/landing/TitlesContainer";
import Search from "../components/shared/Search";
import Footer from "../components/shared/Footer";

export default function Admin() {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const [query, setQuery] = useState("");
  const movies = data.filter((item) => item.type === "movie");
  const series = data.filter((item) => item.type === "series");
  const documentaries = data.filter((item) => item.type === "documentary");
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
    <div id="AdminPage">
      <Search onChange={onChange} />
      {status === 0 && <Spinner />}
      {/* notice how complex is this, why dont combine the series, movies, and docs into a single array */}
      {/* that should be done on the database, but at least can be done here via JS to merge the 3 arrays */}
      {status === 1 && (
        <TitlesContainer
          query={query}
          series={series}
          movies={movies}
          doc={documentaries}
        />
      )}
      {status === 2 && <NotFound />}
      <Footer />
    </div>
  );
}
