import { useState } from "react";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Modal from "./Modal";
import imgIcon from "../../assets/images/camera-icon.png";

export default function Episode({ item }) {
  const { episode, thumbnail, heading, description, videoLink } = item;
  const [modal, setModal] = useState(null);

  function openVideo() {
    setModal(<YoutubeEmbed embedId={videoLink} />);
  }

  return (
    <>
      <article onClick={openVideo}>
        <label>{episode}</label>
        <img src={thumbnail ? thumbnail : imgIcon} />
        <div>
          <h4>{heading}</h4>
          <p>{description}</p>
        </div>
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
