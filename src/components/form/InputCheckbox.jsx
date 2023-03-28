export default function InputCheckbox({ remember, set }) {
  return (
    <span className="remember-me">
      <input type="checkbox" checked={remember} onChange={set} />
      Remember Me
    </span>
  );
}
