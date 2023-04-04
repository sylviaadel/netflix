import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import imgIcon from "../../assets/images/camera-icon.png";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";

export default function TitleItem({ item }) {
  const { dispatch } = useItems();
  const { id, heading, thumbnail, background, videoLink, logo } = item;
  const [modal, setModal] = useState(null);
  const collectionName = "titles";

  function openDetails() {
    setModal(<DetailsPopup item={item} collectionName={collectionName} />);
  }

  async function deleteItem() {
    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteItem} item={deleteInfo} />
    );
  }

  function openVideo() {
    setModal(<YoutubeEmbed embedId={videoLink} />);
  }

  return (
    <>
      <article key={id}>
        <img
          onClick={openDetails}
          src={thumbnail ? thumbnail : imgIcon}
          alt={heading}
        />
        <AdminActions confirm={confirmDelete} />
        <div className="hover-card">
          <img src={background ? background : imgIcon} />
          <img src={logo ? logo : imgIcon} alt={heading} />
          <div className="card-details">
            <button onClick={openVideo} className="play-btn">
              <i className="fa-solid fa-play"></i>
            </button>
            <button onClick={openDetails} className="info-btn">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
