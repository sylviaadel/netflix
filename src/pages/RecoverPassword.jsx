import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recoverAccount } from "../scripts/auth/recoverAccount";
import authData from "../data/authData.json";
import InputText from "../components/form/InputText";
import { recoverMessage, googleMsg } from "../scripts/helpers";
import InfoPopup from "../components/modal/InfoPopup";
import Modal from "../components/modal/Modal";
import AuthNavbar from "../components/shared/AuthNavbar";
import Footer from "../components/shared/Footer";

export default function RecoverPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "" });
  const email = authData[0];
  const [modal, setModal] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await recoverAccount(form.email);
    result.status ? onSuccess() : onFail(result);
  }

  function onSuccess() {
    const item = {
      title: "Error",
      message: recoverMessage,
      btnTitle: "Close",
    };
    setModal(
      <InfoPopup setModal={setModal} onClose={closeModal} item={item} />
    );
  }

  function onFail(result) {
    const item = {
      title: "Error",
      message: result.message,
      btnTitle: "Close",
    };
    setModal(
      <InfoPopup setModal={setModal} onClose={closeModal} item={item} />
    );
  }

  function closeModal() {
    navigate("/recover-password");
  }

  return (
    <div className="auth-page recover-account">
      <AuthNavbar />
      <div className="wrapper">
        <section className="container">
          <h1>Recover Account</h1>
          <form onSubmit={(event) => onSubmit(event)}>
            <InputText key={email.id} item={email} state={[form, setForm]} />
            <button className="primary-btn">Email Me</button>
          </form>
          <Link to="/login">Sign In</Link>
          <p>{googleMsg}</p>
        </section>
      </div>
      <Footer />
      <Modal state={[modal, setModal]} />
    </div>
  );
}
