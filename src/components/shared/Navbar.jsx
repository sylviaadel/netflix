import { useState } from "react";
import { useUser } from "../../state/UsersProvider";
import { useNavigate } from "react-router";
import InfoPopup from "../modal/InfoPopup";
import Modal from "../modal/Modal";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { logoutInfo } from "../../scripts/helpers";

export default function Navbar() {
  const navigate = useNavigate();
  const { uid, setUid, saveUID } = useUser();
  const [modal, setModal] = useState(null);
  const popup = (
    <InfoPopup setModal={setModal} onClose={logoutUser} item={logoutInfo} />
  );

  function logoutUser() {
    setUid("");
    saveUID("");
    navigate("/");
  }
  function onChange() {
    if (uid) {
      setModal(popup);
    } else {
      navigate("/login");
    }
  }
  return (
    <section id="Navbar">
      <img src={logo} alt="Red Netflix logo word" />
      <div>
        <FontAwesomeIcon
          className="search-icon"
          icon={icon({ name: "magnifying-glass" })}
        />
        <FontAwesomeIcon
          className="login-btn"
          onClick={() => onChange()}
          icon={icon({ name: "user-circle" })}
        />
      </div>
      <Modal state={[modal, setModal]} />
    </section>
  );
}
