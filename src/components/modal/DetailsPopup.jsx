import { useState } from "react";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Modal from "./Modal";

export default function DetailsPopup({ item }) {
  const { heading, background, logo, description, videoLink } = item;
  const [modal, setModal] = useState(null);

  function openVideo() {
    //setID(uid);
    setModal(<YoutubeEmbed embedId={videoLink} />);
  }

  return (
    <div className="details-modal">
      <section id="Hero">
        <div className="background"></div>
        <img src={background} alt={heading} />
        <div className="details">
          <img src={logo} alt={heading} />
          <button onClick={openVideo} className="white-btn">
            <i className="fa-solid fa-play"></i> Play
          </button>
        </div>
      </section>
      <p>{description}</p>
      {/* <YoutubeEmbed embedId={videoLink} /> */}
      <Modal state={[modal, setModal]} />
    </div>
  );
}
