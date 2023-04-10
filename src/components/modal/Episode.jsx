import { useState } from "react";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Modal from "./Modal";
import imgIcon from "../../assets/images/camera-icon.png";
import AdminActions from "../landing/AdminActions";
import InfoPopup from "./InfoPopup";
import { deleteInfo } from "../../scripts/helpers";
import { deleteEpisode } from "../../scripts/fireStore/deleteEpisode";
import { useItems } from "../../state/ItemsProvider";
import UpdateEpisode from "./UpdateEpisode";

export default function Episode({
  item,
  currentSeason,
  seriesId,
  onUpdateEpisode,
  onDeleteEpisode,
}) {
  const { dispatch } = useItems();
  const { id, episode, thumbnail, heading, description, videoLink } = item;
  const [modal, setModal] = useState(null);
  const collection = "titles";

  function openVideo() {
    setModal(<YoutubeEmbed videoLink={videoLink} />);
  }

  async function deleteItem() {
    await deleteEpisode(collection, seriesId, currentSeason, id);
    dispatch({ type: "delete", payload: id });
    onDeleteEpisode(currentSeason);
  }

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteItem} item={deleteInfo} />
    );
  }

  async function openEditModal() {
    setModal(
      <UpdateEpisode
        id={id}
        setModal={setModal}
        seriesId={seriesId}
        onUpdateEpisode={onUpdateEpisode}
        seasonId={currentSeason}
      />
    );
  }

  return (
    <article>
      <label>{episode}</label>
      <img onClick={openVideo} src={thumbnail ? thumbnail : imgIcon} />
      <div>
        <h4>{heading}</h4>
        <p>{description}</p>
      </div>
      <AdminActions
        UpdateEpisode={UpdateEpisode}
        confirm={confirmDelete}
        openModal={openEditModal}
      />
      <Modal state={[modal, setModal]} />
    </article>
  );
}
