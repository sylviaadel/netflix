import { useState } from "react";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Modal from "./Modal";
import imgIcon from "../../assets/images/camera-icon.png";
import AdminActions from "../landing/AdminActions";
import InfoPopup from "./InfoPopup";
import UpdateItem from "./UpdateItem";

export default function Episode({ item, deleteItem, deleteInfo }) {
  const { episode, thumbnail, heading, description, videoLink } = item;
  const [modal, setModal] = useState(null);

  function openVideo() {
    setModal(<YoutubeEmbed embedId={videoLink} />);
  }

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteItem} item={deleteInfo} />
    );
  }

  async function openEditModal() {
    setModal(<UpdateItem />);
  }

  return (
    <>
      <article>
        <label>{episode}</label>
        <img onClick={openVideo} src={thumbnail ? thumbnail : imgIcon} />
        <div>
          <h4>{heading}</h4>
          <p>{description}</p>
        </div>
        <AdminActions confirm={confirmDelete} openModal={openEditModal} />
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
