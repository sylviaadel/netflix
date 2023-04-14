import { useState } from "react";
import Modal from "./Modal";
import AdminActions from "../landing/AdminActions";
import InfoPopup from "./InfoPopup";
import { deleteInfo } from "../../scripts/helpers";
import { deleteEpisode } from "../../scripts/fireStore/deleteEpisode";
import { useItems } from "../../state/ItemsProvider";
import UpdateEpisode from "./UpdateEpisode";
import EpisodeDetails from "./EpisodeDetails";

export default function Episode({
  item,
  currentSeason,
  seriesId,
  onUpdateEpisode,
  onDeleteEpisode,
}) {
  const { dispatch } = useItems();
  const { id } = item;
  const [modal, setModal] = useState(null);
  const collection = "titles";

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
      <EpisodeDetails item={item} setModal={setModal} />
      <AdminActions
        UpdateEpisode={UpdateEpisode}
        confirm={confirmDelete}
        openModal={openEditModal}
      />
      <Modal state={[modal, setModal]} />
    </article>
  );
}
