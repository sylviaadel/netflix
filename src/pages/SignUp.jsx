import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../scripts/auth/createAccount";
import { useUser } from "../state/UsersProvider";
import authData from "../data/authData.json";
import InputText from "../components/form/InputText";
import InputCheckbox from "../components/form/InputCheckbox";
import InfoPopup from "../components/modal/InfoPopup";
import Modal from "../components/modal/Modal";
import AuthNavbar from "../components/shared/AuthNavbar";
import Footer from "../components/shared/Footer";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [modal, setModal] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await createAccount(form.email, form.password);
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
    navigate("/sign-up");
  }

  const FormFields = authData.map((item) => (
    <InputText key={item.id} item={item} state={[form, setForm]} />
  ));

  return (
    <div className="auth-page signup">
      <AuthNavbar />
      <div className="wrapper">
        <section className="container">
          <h1>Create a password to start your membership</h1>
          <p>Just a few more steps and you're finished!</p>
          <p>We hate paperwork, too.</p>
          <form onSubmit={(event) => onSubmit(event)}>
            {FormFields}
            <InputCheckbox
              remember={remember}
              set={() => setRemember(!remember)}
            />
            <button className="primary-btn">Sign Up</button>
          </form>
          <Link to="/login">Sign In</Link>
        </section>
      </div>
      <Footer />
      <Modal state={[modal, setModal]} />
    </div>
  );
}
