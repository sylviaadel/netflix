export default function TextBox({ title, value, onChange, validate, error }) {
  return (
    <label className={`${validate ? "" : "is-error"}`}>
      {title}
      <input value={value} onChange={onChange} type="text" />
      {validate ? "" : error}
    </label>
  );
}
