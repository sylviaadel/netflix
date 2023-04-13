import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import { useItems } from "../../state/ItemsProvider";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import icon from "../../assets/images/camera-icon.png";
import HoverCard from "./HoverCard";
import UpdateItem from "../modal/UpdateItem";
import Modal from "../modal/Modal";

export default function TitleItem({ item, type }) {
  const { dispatch } = useItems();
  const { id, heading, thumbnail } = item;
  const [modal, setModal] = useState(null);
  const name = "titles";

  function details() {
    setModal(<DetailsPopup item={item} series={id} setModal={setModal} />);
  }

  async function deleteItem() {
    await deleteDocument(name, id);
    dispatch({ type: "delete", payload: id });
  }

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteItem} item={deleteInfo} />
    );
  }

  async function openEditModal() {
    setModal(
      <UpdateItem id={id} setModal={setModal} collection={name} type={type} />
    );
  }

  return (
    <article key={id}>
      <img onClick={details} src={thumbnail ? thumbnail : icon} alt={heading} />
      <AdminActions confirm={confirmDelete} openModal={openEditModal} />
      <HoverCard item={item} setModal={setModal} details={details} />
      <Modal state={[modal, setModal]} />
    </article>
  );
}
