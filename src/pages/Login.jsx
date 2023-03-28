import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../state/UsersProvider";
import { login } from "../scripts/auth/login";
import loginData from "../data/loginData.json";
import InputText from "../components/form/InputText";
import InputCheckbox from "../components/form/InputCheckbox";
import InfoPopup from "../components/modal/InfoPopup";
import Modal from "../components/modal/Modal";
import AuthNavbar from "../components/shared/AuthNavbar";

export default function Login() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [modal, setModal] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await login(form.email, form.password);
    result.status ? onSuccess(result) : onFail(result);
  }

  function onSuccess(result) {
    if (remember) {
      saveUID(result.payload);
    }
    setUid(result.payload);
    navigate("/");
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
    navigate("/login");
  }

  const FormFields = loginData.map((item) => (
    <InputText key={item.id} item={item} state={[form, setForm]} />
  ));

  return (
    <div className="auth-page">
      <AuthNavbar />
      <section className="container">
        <h1>Sign In</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          {FormFields}
          <button className="primary-btn">Sign In</button>
          <div>
            <InputCheckbox
              remember={remember}
              set={() => setRemember(!remember)}
            />
            <Link to="/recover-password">Forgot you password?</Link>
          </div>
        </form>
        <div className="links-container">
          New to Netflix?
          <Link to="/sign-up"> Sign up now</Link>.
        </div>
        <p>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </section>
      <Modal state={[modal, setModal]} />
    </div>
  );
}
