import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../state/UsersProvider";
import { useNavigate } from "react-router";
import InfoPopup from "../modal/InfoPopup";
import Modal from "../modal/Modal";
import logo from "../../assets/images/logo.png";
import { logoutInfo } from "../../scripts/helpers";
import userImage from "../../assets/images/Netflix-avatar.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { uid, setUid, saveUID } = useUser();
  const [modal, setModal] = useState(null);
  const [scroll, setScroll] = useState(false);

  function changeScroll() {
    if (window.scrollY >= 1) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  useEffect(() => {
    changeScroll();
    window.addEventListener("scroll", changeScroll);
  });

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
    <section id="Navbar" className={`${scroll ? "scrolled" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Red Netflix logo word" />
      </Link>
      <div>
        <img src={userImage} className="login-btn" onClick={() => onChange()} />
      </div>
      <Modal state={[modal, setModal]} />
    </section>
  );
}
