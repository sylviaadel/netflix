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
import UpdateItem from "../modal/UpdateItem";

export default function TitleItem({ item, type, onHover }) {
  const { dispatch } = useItems();
  const { id, heading, thumbnail } = item;
  const [modal, setModal] = useState(null);
  const collection = "titles";

  function openDetails() {
    setModal(<DetailsPopup item={item} seriesId={id} />);
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

  async function openEditModal() {
    setModal(
      <UpdateItem
        id={id}
        setModal={setModal}
        collection={collection}
        type={type}
      />
    );
  }

  return (
    <>
      <article key={id} onMouseEnter={onHover}>
        <img
          onClick={openDetails}
          src={thumbnail ? thumbnail : imgIcon}
          alt={heading}
        />
        <AdminActions confirm={confirmDelete} openModal={openEditModal} />
        <HoverCard item={item} setModal={setModal} details={openDetails} />
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
