import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Spinner() {
  return (
    <div id="Spinner">
      <FontAwesomeIcon icon={solid("spinner")} />
    </div>
  );
}
