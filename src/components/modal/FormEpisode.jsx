import { useState, useEffect } from "react";
import { validText, validNumber } from "../../scripts/tests/addItem";
import { videoErr, titleErr, descErr, episodeErr } from "../../scripts/helpers";
import TextBox from "../form/TextBox";
import TextArea from "../form/TextArea";
import TextNumber from "../form/TextBoxNumber";
import InputImage from "../form/InputImage";

export default function FormEpisode({
  heading,
  description,
  thumbnail,
  episode,
  video,
  changeHeading,
  changeDescription,
  chooseThumbnail,
  changeEpisode,
  changeVideo,
}) {
  const [itemHeading, setItemHeading] = useState(heading);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemEpisode, setItemEpisode] = useState(episode);
  const [itemVideo, setItemVideo] = useState(video);

  function onHeadingChange(event) {
    setItemHeading(event.target.value);
    changeHeading(event.target.value);
  }

  function onDescriptionChange(event) {
    setItemDescription(event.target.value);
    changeDescription(event.target.value);
  }

  function onEpisodeChange(event) {
    setItemEpisode(event.target.value);
    changeEpisode(event.target.value);
  }

  function onVideoChange(event) {
    setItemVideo(event.target.value);
    changeVideo(event.target.value);
  }

  useEffect(() => {
    setItemHeading(heading);
  }, [heading]);

  useEffect(() => {
    setItemDescription(description);
  }, [description]);

  useEffect(() => {
    setItemEpisode(episode);
  }, [episode]);

  useEffect(() => {
    setItemVideo(video);
  }, [video]);

  return (
    <>
      <TextBox
        title="Title"
        onChange={(event) => onHeadingChange(event)}
        value={itemHeading}
        validate={validText(itemHeading)}
        error={titleErr}
      />
      <TextArea
        onChange={(event) => onDescriptionChange(event)}
        value={itemDescription}
        validate={validText(itemDescription)}
        error={descErr}
      />
      <InputImage
        chooseImage={chooseThumbnail}
        image={thumbnail}
        label="Choose Thumbnail"
      />
      <TextNumber
        title="Episode Number"
        onChange={(event) => onEpisodeChange(event)}
        value={itemEpisode}
        validate={validNumber(itemEpisode)}
        error={episodeErr}
      />
      <TextBox
        title="Video ID"
        value={itemVideo}
        onChange={(event) => onVideoChange(event)}
        validate={validText(itemVideo)}
        error={videoErr}
      />
    </>
  );
}
