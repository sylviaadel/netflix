import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";

export default function TitleItem({ item }) {
  const { uid, data } = useItems();
  const { heading, thumbnail } = item;
  const [id, setID] = useState("");
  const [modal, setModal] = useState(null);

  function openDetails() {
    setID(uid);
    setModal(<DetailsPopup item={data[0]} />);
  }
  console.log(uid);

  return (
    <>
      <article key={id}>
        <img onClick={openDetails} src={thumbnail} alt={heading} />
      </article>
      <Modal state={[modal, setModal]} />
    </>
  );
}
