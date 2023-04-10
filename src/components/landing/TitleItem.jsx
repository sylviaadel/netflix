import DetailsPopup from "../modal/DetailsPopup";
import { useItems } from "../../state/ItemsProvider";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import imgIcon from "../../assets/images/camera-icon.png";
import HoverCard from "./HoverCard";
import UpdateItem from "../modal/UpdateItem";

export default function TitleItem({ item, type, setModal }) {
  const { dispatch } = useItems();
  const { id, heading, thumbnail } = item;
  const name = "titles";

  function openDetails() {
    setModal(
      <DetailsPopup
        item={item}
        series={id}
        collection={name}
        setModal={setModal}
      />
    );
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
      <img
        onClick={openDetails}
        src={thumbnail ? thumbnail : imgIcon}
        alt={heading}
      />
      <AdminActions confirm={confirmDelete} openModal={openEditModal} />
      <HoverCard item={item} setModal={setModal} details={openDetails} />
    </article>
  );
}
