import { useState, useEffect } from "react";
import Top10 from "../components/landing/Top10";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { useItems } from "../state/ItemsProvider";
import Spinner from "../components/shared/Spinner";
import NotFound from "./NotFound";
import Hero from "../components/landing/Hero";
import TitleItem from "../components/landing/TitleItem";

export default function Landing() {
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

  const Movies = movies.map((item) => <TitleItem key={item.id} item={item} />);
  const Series = series.map((item) => <TitleItem key={item.id} item={item} />);
  const Documentaries = documentaries.map((item) => (
    <TitleItem key={item.id} item={item} />
  ));

  return (
    <div id="LandingPage">
      {/* <Hero item={data[0]} /> */}
      {status === 0 && <Spinner />}
      {status === 1 && (
        <section className="titles-container">
          <h3>Movies</h3>
          <div className="titles-list">{Movies}</div>
          <h3>Series</h3>
          <div className="titles-list">{Series}</div>
          <h3>Documentaries</h3>
          <div className="titles-list">{Documentaries}</div>
        </section>
      )}
      {status === 2 && <NotFound />}
      <Top10 />
    </div>
  );
}
