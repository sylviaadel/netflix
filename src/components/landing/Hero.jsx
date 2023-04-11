import { useState, useEffect } from "react";
import { useItems } from "../../state/ItemsProvider";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { readDocuments } from "../../scripts/fireStore/readDocuments";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";

export default function Hero({}) {
  const { dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const [item, setItem] = useState([]);
  const { heading, logo, background, description, videoLink } = item;
  const [modal, setModal] = useState(null);
  const collection = "titles";

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    const data = await readDocuments(collection);
    onSuccess(data);
  }

  async function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setItem(data[1]);
    setStatus(1);
  }

  function openDetails() {
    setModal(
      <DetailsPopup item={item} collection={collection} setModal={setModal} />
    );
  }

  function openVideo() {
    setModal(<YoutubeEmbed videoLink={videoLink} />);
  }

  return (
    <section id="Hero">
      <div className="background"></div>
      <img src={background} alt={heading} />
      <div className="details">
        <img src={logo} alt={heading} />
        <p>{description}</p>
        <button onClick={openVideo} className="white-btn">
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button onClick={openDetails} className="grey-btn">
          <i className="fa-solid fa-info"></i> More Info
        </button>
      </div>
      <Modal state={[modal, setModal]} />
    </section>
  );
}
