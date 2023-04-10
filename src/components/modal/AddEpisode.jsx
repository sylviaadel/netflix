import { useState } from "react";
import { useItems } from "../../state/ItemsProvider";
import { v4 as uuidv4 } from "uuid";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { validText, validNum } from "../../scripts/tests/addItem";
import SeasonDDL from "../form/SeasonDDL";
import { createEpisode } from "../../scripts/fireStore/createEpisode";
import FormEpisode from "./FormEpisode";

export default function AddEpisode({ setModal, collection, id, seriesId }) {
  const { dispatch } = useItems();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [episode, setEpisode] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  id = uuidv4() + "_" + Date.now();
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const chooseThumbnail = (event) =>
    onChooseImage(event, setButtonEnabled, setThumbnail, id, 230, 130);

  async function onSubmit(event) {
    event.preventDefault();
    const data = {
      id: id,
      heading: heading,
      description: description,
      thumbnail: thumbnail,
      videoLink: video,
      episode: episode,
    };
    if (
      !validText(data.heading) ||
      !validText(data.description) ||
      !validNum(data.episode) ||
      !validText(data.videoLink)
    ) {
      event.preventDefault();
    } else {
      await createEpisode(collection, seriesId, currentSeason, id, data);
      dispatch({ type: "create", payload: data });
      setModal(null);
    }
  }

  async function changeSeason(seasonId) {
    var clonedSeason = { ...currentSeason };
    clonedSeason = seasonId;
    setCurrentSeason(clonedSeason);
  }

  function changeHeading(heading) {
    setHeading(heading);
  }

  function changeDescription(description) {
    setDescription(description);
  }

  function changeEpisode(episode) {
    setEpisode(episode);
  }

  function changeVideo(video) {
    setVideo(video);
  }

  return (
    <div className="form-modal">
      <h2>Add new Episode</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <FormEpisode
          thumbnail={thumbnail}
          changeHeading={changeHeading}
          changeDescription={changeDescription}
          chooseThumbnail={chooseThumbnail}
          changeEpisode={changeEpisode}
          changeVideo={changeVideo}
          heading={heading}
          description={description}
          episode={episode}
          video={video}
        />
        <SeasonDDL
          seriesId={seriesId}
          collection={collection}
          changeSeason={changeSeason}
        />
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
