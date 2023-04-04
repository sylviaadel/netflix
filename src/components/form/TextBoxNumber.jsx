export default function TextNumber({
  title,
  value,
  onChange,
  validate,
  error,
}) {
  return (
    <label className={`${validate ? "" : "is-error"}`}>
      {title}
      <input value={value} onChange={onChange} type="number" step="1" min="1" />
      {validate ? "" : error}
    </label>
  );
}
