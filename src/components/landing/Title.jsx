import AddItem from "../modal/AddItem";

export default function Title({ list, title, setModal, type }) {
  const collection = "titles";
  const openForm = () =>
    setModal(
      <AddItem
        setModal={setModal}
        id={undefined}
        collection={collection}
        type={type}
      />
    );

  return (
    <>
      {list.length && (
        <div>
          <h3>{title}</h3>
          <button onClick={openForm}>+ Add New</button>
          <div className="clear"></div>
          <div className="titles-list">{list}</div>
        </div>
      )}
    </>
  );
}
