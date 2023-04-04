export default function AdminActions({
  openModal,
  confirm,
  isSeries,
  addEpisode,
}) {
  return (
    <div className="actions">
      {isSeries && (
        <button onClick={addEpisode}>
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
      <button onClick={openModal}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <button onClick={() => confirm()}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
