import { Link } from "react-router-dom";
import { googleMsg } from "../../scripts/helpers";

export default function LoginFooter() {
  return (
    <>
      <div className="links-container">
        New to Netflix?
        <Link to="/sign-up"> Sign up now</Link>.
      </div>
      <p>{googleMsg}</p>
    </>
  );
}
