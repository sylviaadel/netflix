import FormPopup from "../modal/FormPopup";

export default function Title({ list, title, setModal, type }) {
  const collection = "titles";
  const openForm = () =>
    setModal(
      <FormPopup
        setModal={setModal}
        id={undefined}
        collection={collection}
        type={type}
      />
    );

  return (
    <>
      <h3>{title}</h3>
      <button onClick={openForm}>+ Add New</button>
      <div className="clear"></div>
      <div className="titles-list">{list}</div>
    </>
  );
}
