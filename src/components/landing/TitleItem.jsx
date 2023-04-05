import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import imgIcon from "../../assets/images/camera-icon.png";
import HoverCard from "./HoverCard";
import FormEpisode from "../modal/FormEpisode";
import UpdateItem from "../modal/UpdateItem";

export default function TitleItem({ item, isSeries }) {
  const { dispatch } = useItems();
  const { id, heading, thumbnail } = item;
  const [modal, setModal] = useState(null);
  const collection = "titles";

  function openDetails() {
    setModal(
      <DetailsPopup item={item} collectionName={collection} seriesId={id} />
    );
  }

  async function deleteItem() {
    await deleteDocument(collection, id);
    dispatch({ type: "delete", payload: id });
  }

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteItem} item={deleteInfo} />
    );
  }

  function addEpisode() {
    setModal(
      <FormEpisode setModal={setModal} collection={collection} seriesId={id} />
    );
  }

  async function openEditModal() {
    setModal(
      <UpdateItem id={id} setModal={setModal} collection={collection} />
    );
  }

  return (
    <>
      <article key={id}>
        <img
          onClick={openDetails}
          src={thumbnail ? thumbnail : imgIcon}
          alt={heading}
        />
        <AdminActions
          confirm={confirmDelete}
          isSeries={isSeries}
          addEpisode={addEpisode}
          openModal={openEditModal}
        />
        <HoverCard item={item} setModal={setModal} details={openDetails} />
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
