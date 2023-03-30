export default function AdminActions({ openModal, confirm }) {
  return (
    <div className="actions">
      <button onClick={openModal}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <button onClick={() => confirm()}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
