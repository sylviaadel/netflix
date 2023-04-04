import { useState } from "react";
import { useItems } from "../../state/ItemsProvider";
import { v4 as uuidv4 } from "uuid";
import InputImage from "../form/InputImage";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import TextBox from "../form/TextBox";
import { validText, validNumber } from "../../scripts/tests/addItem";
import { titleErr, descErr, videoErr, episodeErr } from "../../scripts/helpers";
import TextArea from "../form/TextArea";
import TextNumber from "../form/TextBoxNumber";
import SeasonDDL from "../form/SeasonDDL";
import { createEpisode } from "../../scripts/fireStore/createEpisode";

export default function FormEpisode({ setModal, collection, id, seriesId }) {
  const { dispatch } = useItems();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [episodeNum, setEpisodeNum] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  id = uuidv4() + "_" + Date.now();
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const chooseThumbnail = (event) =>
    onChooseImage(event, setButtonEnabled, setThumbnail, id);

  async function onSubmit(event) {
    event.preventDefault();
    const data = {
      id: id,
      heading: heading,
      description: description,
      thumbnail: thumbnail,
      videoLink: video,
      episode: episodeNum,
    };
    if (!validText(data.heading) || !validText(data.description)) {
      event.preventDefault();
    } else {
      await createEpisode(collection, seriesId, currentSeason, data);
      dispatch({ type: "create", payload: data });
      setModal(null);
    }
  }

  async function changeSeason(e) {
    var clonedSeason = { ...currentSeason };
    clonedSeason = e.target.value;
    setCurrentSeason(clonedSeason);
  }

  return (
    <div className="form-modal">
      <h2>Add new Episode</h2>
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
        <SeasonDDL
          seriesId={seriesId}
          collection={collection}
          changeSeason={changeSeason}
        />
        <InputImage
          chooseImage={chooseThumbnail}
          image={thumbnail}
          label="Choose Thumbnail"
        />
        <TextNumber
          title="Episode Number"
          onChange={(event) => setEpisodeNum(event.target.value)}
          value={episodeNum}
          validate={validNumber(episodeNum)}
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
