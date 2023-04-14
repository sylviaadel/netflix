import AddItem from "../modal/AddItem";
import { useRef } from "react";

export default function Title({ list, title, setModal, type }) {
  const collection = "titles";
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  function openForm() {
    setModal(
      <AddItem
        setModal={setModal}
        id={undefined}
        collection={collection}
        type={type}
      />
    );
  }

  return (
    <>
      {list.length && (
        <div>
          <h3>{title}</h3>
          <button onClick={openForm}>+ Add New</button>
          <div className="clear"></div>
          <div className="titles-list" ref={ref}>
            <i onClick={() => scroll(-100)} className="fa fa-chevron-left" />
            {list}
            <i onClick={() => scroll(100)} className="fa fa-chevron-right" />
          </div>
        </div>
      )}
    </>
  );
}
