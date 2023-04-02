import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";

export default function TitleItem({ item }) {
  const { dispatch } = useItems();
  const { id, heading, thumbnail } = item;
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

  return (
    <>
      <article key={id}>
        <img onClick={openDetails} src={thumbnail} alt={heading} />
        <AdminActions confirm={confirmDelete} />
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
