export default function TextArea({ value, onChange, validate, error }) {
  return (
    <label className={`${validate ? "" : "is-error"}`}>
      Description
      <textarea value={value} onChange={onChange}></textarea>
      {validate ? "" : error}
    </label>
  );
}
