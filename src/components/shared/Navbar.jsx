import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../state/UsersProvider";
import { useNavigate } from "react-router";
import InfoPopup from "../modal/InfoPopup";
import Modal from "../modal/Modal";
import logo from "../../assets/images/logo.png";
import { logoutInfo } from "../../scripts/helpers";
import userImage from "../../assets/images/Netflix-avatar.png";
import Links from "../../data/navLinks.json";

export default function Navbar() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [modal, setModal] = useState(null);
  const [scroll, setScroll] = useState(false);
  const popup = (
    <InfoPopup setModal={setModal} onClose={logoutUser} item={logoutInfo} />
  );

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

  function logoutUser() {
    setUid("");
    saveUID("");
    navigate("/");
  }

  function onChange() {
    setModal(popup);
  }

  const NavLinks = Links.map((item) => (
    <Link key={item.key} to={`/${item.link}`}>
      {item.label}
    </Link>
  ));

  return (
    <section id="Navbar" className={`${scroll ? "scrolled" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Red Netflix logo word" />
      </Link>
      <section className="page-links">{NavLinks}</section>
      <div className="login-btn">
        <img src={userImage} alt="User Icon" onClick={() => onChange()} />
      </div>
      <Modal state={[modal, setModal]} />
    </section>
  );
}
