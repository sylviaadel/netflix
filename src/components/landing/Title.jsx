import FormPopup from "../modal/FormPopup";

export default function Title({ itemsList, title, setModal, itemType }) {
  const collection = "titles";
  const openForm = () =>
    setModal(
      <FormPopup
        setModal={setModal}
        id={undefined}
        collection={collection}
        itemType={itemType}
      />
    );

  return (
    <>
      <h3>{title}</h3>
      <button onClick={openForm}>+ Add New</button>
      <div className="clear"></div>
      <div className="titles-list">{itemsList}</div>
    </>
  );
}
