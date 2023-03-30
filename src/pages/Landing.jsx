import { useState, useEffect } from "react";
import Top10 from "../components/landing/Top10";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { useItems } from "../state/ItemsProvider";
import Spinner from "../components/shared/Spinner";
import NotFound from "./NotFound";
import Hero from "../components/landing/Hero";
import TitlesContainer from "../components/landing/TitlesContainer";

export default function Landing(adminClass) {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
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

  return (
    <div id="LandingPage" className="admin">
      {/* <Hero item={data[0]} /> */}
      {status === 0 && <Spinner />}
      {status === 1 && (
        <TitlesContainer series={series} movies={movies} doc={documentaries} />
      )}
      {status === 2 && <NotFound />}
      <Top10 />
    </div>
  );
}
