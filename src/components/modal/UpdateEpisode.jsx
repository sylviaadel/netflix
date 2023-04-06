import { useState, useEffect } from "react";
import { useItems } from "../../state/ItemsProvider";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { validText, validNumber } from "../../scripts/tests/addItem";
import { updateSubCollection } from "../../scripts/fireStore/updateSubCollection";
import { videoErr, episodeErr, titleErr, descErr } from "../../scripts/helpers";
import TextBox from "../form/TextBox";
import TextArea from "../form/TextArea";
import TextNumber from "../form/TextBoxNumber";
import InputImage from "../form/InputImage";
import { readDocument } from "../../scripts/fireStore/readDocument";

export default function UpdateEpisode({ setModal, id, seriesId, seasonId }) {
  const { dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [episode, setEpisode] = useState("");
  const [video, setVideo] = useState("");
  const currentEpisodeId = id;
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const chooseThumbnail = (event) =>
    onChooseImage(event, setButtonEnabled, setThumbnail, id);
  const collection = "titles";

  useEffect(() => {
    loadData(collection);
  }, [currentEpisodeId]);

  async function loadData(collection) {
    const data = await readDocument(
      `${collection}/${seriesId}/seasons/${seasonId}/episodes`,
      id
    ).catch(onFail);
    onSuccess(data);
  }

  async function onSuccess(data) {
    setHeading(data.heading);
    setDescription(data.description);
    setEpisode(data.episode);
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
      thumbnail: thumbnail,
      episode: episode,
      videoLink: video,
    };
    if (
      !validText(data.heading) ||
      !validText(data.description) ||
      !validText(data.videoLink)
    ) {
      event.preventDefault();
    } else {
      await updateSubCollection(
        `${collection}/${seriesId}/seasons/${seasonId}/episodes`,
        data
      );
      dispatch({ type: "update", payload: data });
      setModal(null);
    }
  }

  return (
    <div className="form-modal">
      <h2>Update Episode</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <TextBox
          title="Title"
          onChange={(event) => setHeading(event.target.value)}
          value={heading}
          validate={validText(heading)}
          error={titleErr}
        />
        <TextArea
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          validate={validText(description)}
          error={descErr}
        />
        <InputImage
          chooseImage={chooseThumbnail}
          image={thumbnail}
          label="Choose Thumbnail"
        />
        <TextNumber
          title="Episode Number"
          onChange={(event) => setEpisode(event.target.value)}
          value={episode}
          validate={validNumber(episode)}
          error={episodeErr}
        />
        <TextBox
          title="Video ID"
          value={video}
          onChange={(event) => setVideo(event.target.value)}
          validate={validText(video)}
          error={videoErr}
        />
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
