import { useState, useEffect } from "react";
import Footer from "../components/shared/Footer";
import TitlesContainer from "../components/landing/TitlesContainer";
import NotFound from "./NotFound";
import Search from "../components/shared/Search";
import Spinner from "../components/shared/Spinner";
import { useItems } from "../state/ItemsProvider";
import { readDocuments } from "../scripts/fireStore/readDocuments";

export default function DocPage() {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
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
    <div id="DocPage">
      <Search onChange={onChange} />
      {status === 0 && <Spinner />}
      {status === 1 && <TitlesContainer query={query} doc={documentaries} />}
      {status === 2 && <NotFound />}
      <Footer />
    </div>
  );
}
