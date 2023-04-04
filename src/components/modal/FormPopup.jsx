import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useItems } from "../../state/ItemsProvider";
import { v4 as uuidv4 } from "uuid";
import InputImage from "../form/InputImage";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import TextBox from "../form/TextBox";
import { validText } from "../../scripts/tests/addItem";
import { headingError, descError, videoError } from "../../scripts/helpers";
import TextArea from "../form/TextArea";

export default function FormPopup({ setModal, collection, id, type }) {
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
      type: type,
    };
    if (!validText(data.heading) || !validText(data.description)) {
      event.preventDefault();
    } else {
      await createDocumentWithManualId(collection, id, data);
      dispatch({ type: "create", payload: data });
      setModal(null);
    }
  }

  return (
    <div className="form-modal">
      <h2>Add new Item</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <TextBox
          title="Title"
          onChange={(event) => setHeading(event.target.value)}
          value={heading}
          validate={validText(heading)}
          error={headingError}
        />
        <TextArea
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          validate={validText(description)}
          error={descError}
        />
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
        <TextBox
          title="Video ID"
          value={video}
          onChange={(event) => setVideo(event.target.value)}
          validate={validText(video)}
          error={videoError}
        />
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
