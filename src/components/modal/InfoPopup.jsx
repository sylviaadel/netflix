export default function InfoPopup({ setModal, onClose, item }) {
  const { title, message, btnTitle } = item;
  function confirmClose() {
    onClose();
    setModal(null);
  }

  return (
    <div className="info-modal">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="modal-footer">
        <button className="primary-btn" onClick={confirmClose}>
          {btnTitle}
        </button>
      </div>
    </div>
  );
}
