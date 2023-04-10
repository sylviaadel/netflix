import { useState, useEffect } from "react";
import { useItems } from "../../state/ItemsProvider";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { validText, validNum } from "../../scripts/tests/addItem";
import { readDocument } from "../../scripts/fireStore/readDocument";
import { updateDocument } from "../../scripts/fireStore/updateDocument";
import FormEpisode from "./FormEpisode";

export default function UpdateEpisode({
  setModal,
  id,
  seriesId,
  seasonId,
  onUpdateEpisode,
}) {
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
    onChooseImage(event, setButtonEnabled, setThumbnail, id, 230, 130);
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
      !validNum(data.episode) ||
      !validText(data.videoLink)
    ) {
      event.preventDefault();
    } else {
      await updateDocument(
        `${collection}/${seriesId}/seasons/${seasonId}/episodes`,
        data
      );
      dispatch({ type: "update", payload: data });
      setModal(null);
    }

    onUpdateEpisode(seasonId);
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
      <h2>Update Episode</h2>
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
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
