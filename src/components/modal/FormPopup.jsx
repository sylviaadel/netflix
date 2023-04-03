import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useItems } from "../../state/ItemsProvider";
import { v4 as uuidv4 } from "uuid";
import InputImage from "../form/InputImage";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";

export default function FormPopup({ setModal, collection, id }) {
  const { dispatch } = useItems();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [background, setBackground] = useState("");
  const [video, setVideo] = useState("");
  id = uuidv4() + "_" + Date.now();
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const chooseLogo = (event) =>
    onChooseImage(event, setButtonEnabled, setLogo, id);
  const chooseThumbnail = (event) =>
    onChooseImage(event, setButtonEnabled, setThumbnail, id);
  const choosebackground = (event) =>
    onChooseImage(event, setButtonEnabled, setBackground, id);

  async function onSubmit(event) {
    event.preventDefault();
    const data = {
      id: id,
      heading: heading,
      description: description,
      logo: logo,
      thumbnail: thumbnail,
      background: background,
      videoLink: video,
      type: "movie",
    };
    await createDocumentWithManualId(collection, id, data);
    dispatch({ type: "create", payload: data });
    setModal(null);
  }

  return (
    <div className="form-modal">
      <h2>Add new Item</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <label>
          Title
          <input
            value={heading}
            onChange={(event) => setHeading(event.target.value)}
            type="text"
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>
        </label>
        <InputImage chooseImage={chooseLogo} image={logo} label="Choose Logo" />
        <InputImage
          chooseImage={chooseThumbnail}
          image={thumbnail}
          label="Choose Thumbnail"
        />
        <InputImage
          chooseImage={choosebackground}
          image={background}
          label="Choose Background"
        />
        <label>
          VideoLink
          <input
            value={video}
            onChange={(event) => setVideo(event.target.value)}
            type="text"
            required
          />
        </label>
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}