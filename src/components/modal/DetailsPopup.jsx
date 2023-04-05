import { useState } from "react";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Modal from "./Modal";
import Seasons from "./Seasons";
import imgIcon from "../../assets/images/camera-icon.png";
import FormSeason from "./FormSeason";
import FormEpisode from "./FormEpisode";

export default function DetailsPopup({ item, seriesId }) {
  const { heading, background, logo, description, videoLink } = item;
  const [modal, setModal] = useState(null);
  const seriesCondition = item.type === "series";
  const collection = "titles";

  function openVideo() {
    setModal(<YoutubeEmbed embedId={videoLink} />);
  }

  function addSeason() {
    setModal(
      <FormSeason
        seriesId={seriesId}
        collection={collection}
        setModal={setModal}
      />
    );
  }

  function addEpisode() {
    setModal(
      <FormEpisode
        setModal={setModal}
        collection={collection}
        seriesId={seriesId}
      />
    );
  }

  return (
    <div className="details-modal">
      <section id="Hero">
        <div className="background"></div>
        <img src={background ? background : imgIcon} alt={heading} />
        <div className="details">
          <img src={logo ? logo : imgIcon} alt={heading} />
          <button onClick={openVideo} className="white-btn">
            <i className="fa-solid fa-play"></i> Play
          </button>
          {seriesCondition && (
            <button className="add-season" onClick={addSeason}>
              + Add New Season
            </button>
          )}
        </div>
      </section>
      <p>{description}</p>
      {seriesCondition && (
        <Seasons id={item.id} collection={collection} addEpisode={addEpisode} />
      )}
      <Modal state={[modal, setModal]} />
    </div>
  );
}
