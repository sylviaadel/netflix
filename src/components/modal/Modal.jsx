import ReactDOM from "react-dom";

export default function Modal({ state, header }) {
  const [modal, setModal] = state;

  const portal = document.getElementById("portal");

  if (modal === null) return null;

  return ReactDOM.createPortal(
    <div id="Modal">
      <div className="modal-overlay" onClick={() => setModal(null)}></div>
      <div className="modal-content">
        <button className="close" onClick={() => setModal(null)}>
          &times;
        </button>
        {modal}
      </div>
    </div>,
    portal
  );
}
