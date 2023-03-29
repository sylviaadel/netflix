import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";

export default function Hero({ item }) {
  const { heading, logo, background, description, videoLink } = item;
  const { data } = useItems();
  const [modal, setModal] = useState(null);
  function openDetails() {
    setModal(<DetailsPopup item={item} />);
  }

  return (
    <section id="Hero">
      <div className="background"></div>
      <img src={background} alt={heading} />
      <div className="details">
        <img src={logo} alt={heading} />
        <p>{description}</p>
        <a href={videoLink} className="white-btn">
          <i className="fa-solid fa-play"></i> Play
        </a>
        <button onClick={openDetails} className="grey-btn">
          <i className="fa-solid fa-info"></i> More Info
        </button>
      </div>
      <Modal state={[modal, setModal]} />
    </section>
  );
}
