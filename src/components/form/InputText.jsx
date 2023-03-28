export default function InputText({ item, state }) {
  const [form, setForm] = state;
  const formKey = [item.key];
  const formValue = form[item.key];

  return (
    <label className="input-text">
      {item.label}
      <input
        value={item.value === "" ? formValue : item.value}
        onChange={(event) =>
          setForm({ ...form, [formKey]: event.target.value })
        }
        type={item.type}
        required={item.required}
        disabled={item.disabled}
      />
    </label>
  );
}
