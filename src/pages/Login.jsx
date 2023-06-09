import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../state/UsersProvider";
import { login } from "../scripts/auth/login";
import authData from "../data/authData.json";
import InputText from "../components/form/InputText";
import InputCheckbox from "../components/form/InputCheckbox";
import InfoPopup from "../components/modal/InfoPopup";
import Modal from "../components/modal/Modal";
import AuthNavbar from "../components/shared/AuthNavbar";
import Footer from "../components/shared/Footer";
import LoginFooter from "../components/shared/LoginFooter";

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

  const FormFields = authData.map((item) => (
    <InputText key={item.id} item={item} state={[form, setForm]} />
  ));

  return (
    <div className="auth-page">
      <AuthNavbar />
      <div className="wrapper">
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
          <LoginFooter />
        </section>
      </div>
      <Footer />
      <Modal state={[modal, setModal]} />
    </div>
  );
}
