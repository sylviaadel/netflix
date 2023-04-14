import { useState, useEffect } from "react";
import { readDocuments } from "../../scripts/fireStore/readDocuments";
import { useItems } from "../../state/ItemsProvider";
import TopTenItem from "./TopTenItem";
import { useRef } from "react";

export default function Top10({ collection }) {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const topTen = data.filter((item) => item.topTen === true);
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

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

  const Items = topTen.map((item) => <TopTenItem key={item.id} item={item} />);

  return (
    <section className="top10-container">
      <h3>Top 10 TV in Sweden Today</h3>
      <ol ref={ref}>
        <i onClick={() => scroll(-100)} className="fa fa-chevron-left" />
        {Items}
        <i onClick={() => scroll(100)} className="fa fa-chevron-right" />
      </ol>
    </section>
  );
}
