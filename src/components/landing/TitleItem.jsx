import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";

export default function TitleItem({ item }) {
  const { uid, dispatch } = useItems();
  const { heading, thumbnail } = item;
  const [id, setID] = useState("");
  const [modal, setModal] = useState(null);
  const collectionName = "titles";

  function openDetails() {
    setID(uid);
    setModal(<DetailsPopup item={item} />);
  }

  async function deleteCourse() {
    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteCourse} item={deleteInfo} />
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
