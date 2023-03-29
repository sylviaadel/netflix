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

  const Items = data.map((item) => <TitleItem id={item.id} item={item} />);

  return (
    <div id="LandingPage">
      {/* <Hero item={data[0]} /> */}
      {status === 0 && <Spinner />}
      {status === 1 && (
        <section className="titles-container">
          <h3>Movies</h3>
          <div className="titles-list">{Items}</div>
        </section>
      )}
      {status === 2 && <NotFound />}
      <Top10 />
    </div>
  );
}
