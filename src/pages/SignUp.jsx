import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../scripts/auth/createAccount";
import { useUser } from "../state/UsersProvider";
import signupData from "../data/signupData.json";
import InputText from "../components/form/InputText";
import InputCheckbox from "../components/form/InputCheckbox";
import InfoPopup from "../components/modal/InfoPopup";
import Modal from "../components/modal/Modal";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [modal, setModal] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await createAccount(form.name, form.email, form.password);
    result.status ? onSuccess(result) : onFail(result);
  }

  function onSuccess(result) {
    if (remember) {
      saveUID(result.payload);
    }
    setUid(result.payload);
    navigate("/courses");
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

  const FormFields = signupData.map((item) => (
    <InputText key={item.id} item={item} state={[form, setForm]} />
  ));

  return (
    <div className="auth-page">
      <h1>Create a new Account</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        {FormFields}
        <InputCheckbox remember={remember} set={() => setRemember(!remember)} />
        <button className="primary-btn">Sign Up</button>
      </form>
      <Link to="/login">Already have an account</Link>
      <Modal state={[modal, setModal]} />
    </div>
  );
}
