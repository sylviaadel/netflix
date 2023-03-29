import { useState } from "react";
import DetailsPopup from "../modal/DetailsPopup";
import Modal from "../modal/Modal";
import { useItems } from "../../state/ItemsProvider";

export default function TopTenItem({ item }) {
  const { topTenImg, heading } = item;
  const { uid } = useItems();
  const [id, setID] = useState("");
  const [modal, setModal] = useState(null);

  function openDetails() {
    setID(uid);
    setModal(<DetailsPopup item={item} />);
  }

  return (
    <>
      <li>
        <img src={topTenImg} alt={heading} onClick={openDetails} />
      </li>
      <Modal state={[modal, setModal]} />
    </>
  );
}
