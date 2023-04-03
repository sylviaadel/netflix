export default function TextBox({ title, value, onChange }) {
  return (
    <label>
      {title}
      <input value={value} onChange={onChange} type="text" required />
    </label>
  );
}
