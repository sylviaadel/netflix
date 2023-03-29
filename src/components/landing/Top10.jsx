import { useState, useEffect } from "react";
import { readDocuments } from "../../scripts/fireStore/readDocuments";
import { useItems } from "../../state/ItemsProvider";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";

export default function Top10() {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const [modal, setModal] = useState(null);
  const collection = "titles";
  const topTen = data.filter((item) => item.topTen === true);

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

  function openDetails() {
    setModal(<DetailsPopup item={data[0]} />);
  }

  const Items = topTen.map((item) => (
    <li key={item.id}>
      <img src={item.topTenImg} alt={item.heading} onClick={openDetails} />
    </li>
  ));

  return (
    <section className="top10-container">
      <h3>Top 10 TV in Sweden Today</h3>
      <ol>{Items}</ol>
      <Modal state={[modal, setModal]} />
    </section>
  );
}
