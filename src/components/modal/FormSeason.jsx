import { useState } from "react";
import { useItems } from "../../state/ItemsProvider";
import TextBox from "../form/TextBox";
import { validText } from "../../scripts/tests/addItem";
import { titleErr } from "../../scripts/helpers";
import { createSeason } from "../../scripts/fireStore/createSeason";

export default function FormSeason({ setModal, collection, seriesId }) {
  const { dispatch } = useItems();
  const [heading, setHeading] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const data = {
      title: heading,
    };
    if (!validText(data.title)) {
      event.preventDefault();
    } else {
      const documentId = await createSeason(collection, seriesId, data);
      dispatch({ type: "create", payload: { id: documentId, ...data } });
      setModal(null);
    }
  }

  return (
    <div className="form-modal">
      <h2>Add new Season</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <TextBox
          title="Title of Season"
          onChange={(event) => setHeading(event.target.value)}
          value={heading}
          validate={validText(heading)}
          error={titleErr}
        />
        <button className="primary-btn">Submit</button>
      </form>
    </div>
  );
}
