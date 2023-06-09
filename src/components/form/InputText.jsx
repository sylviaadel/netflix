export default function InputText({ item, state }) {
  const [form, setForm] = state;
  const formKey = [item.key];
  const formValue = form[item.key];

  return (
    <label className="input-text">
      <input
        className={`${formValue != "" ? "has-value" : ""}`}
        value={formValue}
        onChange={(event) =>
          setForm({ ...form, [formKey]: event.target.value })
        }
        type={item.type}
        required={item.required}
        disabled={item.disabled}
      />
      <span>{item.label}</span>
    </label>
  );
}
