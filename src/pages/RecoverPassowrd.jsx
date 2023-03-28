import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recoverAccount } from "../scripts/auth/recoverAccount";
import loginData from "../data/loginData.json";
import InputText from "../components/form/InputText";
import { recoverMessage } from "../scripts/helpers";
import InfoPopup from "../components/modal/InfoPopup";
import Modal from "../components/modal/Modal";

export default function RecoverPassowrd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "" });
  const email = loginData[0];
  const [modal, setModal] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await recoverAccount(form.email);
    result.status ? onSuccess(result) : onFail(result);
  }

  function onSuccess() {
    alert(recoverMessage);
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
    <div className="auth-page">
      <h1>Recover Account</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <InputText key={email.id} item={email} state={[form, setForm]} />
        <button className="primary-btn">Recover Account</button>
      </form>
      <Link to="/login">Go back to Login</Link>
      <Modal state={[modal, setModal]} />
    </div>
  );
}
