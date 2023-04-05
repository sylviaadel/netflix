import { useState, useEffect } from "react";
import { useItems } from "../../state/ItemsProvider";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { validText } from "../../scripts/tests/addItem";
import FormItems from "./FormItems";
import { readDocument } from "../../scripts/fireStore/readDocument";
import { updateDocument } from "../../scripts/fireStore/updateDocument";

export default function UpdateItem({ setModal, collection, id, type }) {
  const { dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [background, setBackground] = useState("");
  const [video, setVideo] = useState("");
  const currentItemId = id;
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const chooseLogo = (event) =>
    onChooseImage(event, setButtonEnabled, setLogo, id);
  const chooseThumbnail = (event) =>
    onChooseImage(event, setButtonEnabled, setThumbnail, id);
  const chooseBackground = (event) =>
    onChooseImage(event, setButtonEnabled, setBackground, id);

  useEffect(() => {
    loadData(collection);
  }, [currentItemId]);

  async function loadData(collection) {
    const data = await readDocument(collection, id).catch(onFail);
    onSuccess(data);
  }

  async function onSuccess(data) {
    setHeading(data.heading);
    setDescription(data.description);
    setBackground(data.background);
    setLogo(data.logo);
    setThumbnail(data.thumbnail);
    setVideo(data.videoLink);
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

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
    if (
      !validText(data.heading) ||
      !validText(data.description) ||
      !validText(data.videoLink)
    ) {
      event.preventDefault();
    } else {
      await updateDocument(collection, data);
      dispatch({ type: "update", payload: data });
      setModal(null);
    }
  }

  function changeHeading(heading) {
    setHeading(heading);
  }

  function changeDescription(description) {
    setDescription(description);
  }

  function changeVideo(video) {
    setVideo(video);
  }

  return (
    <div className="form-modal">
      <h2>Update Item</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <FormItems
          bg={background}
          logo={logo}
          thumbnail={thumbnail}
          changeHeading={changeHeading}
          changeDescription={changeDescription}
          chooseBg={chooseBackground}
          chooseLogo={chooseLogo}
          chooseThumbnail={chooseThumbnail}
          changeVideo={changeVideo}
          heading={heading}
          description={description}
          video={video}
        />
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}