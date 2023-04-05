import { useState, useEffect } from "react";
import { validText } from "../../scripts/tests/addItem";
import { videoErr, titleErr, descErr } from "../../scripts/helpers";
import TextBox from "../form/TextBox";
import TextArea from "../form/TextArea";
import InputImage from "../form/InputImage";

export default function FormItems({
  heading,
  description,
  bg,
  thumbnail,
  logo,
  video,
  changeHeading,
  changeDescription,
  chooseThumbnail,
  chooseLogo,
  chooseBg,
  changeVideo,
}) {
  const [itemHeading, setItemHeading] = useState(heading);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemVideo, setItemVideo] = useState(video);

  function onHeadingChange(event) {
    setItemHeading(event.target.value);
    changeHeading(event.target.value);
  }

  function onDescriptionChange(event) {
    setItemDescription(event.target.value);
    changeDescription(event.target.value);
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
      <InputImage chooseImage={chooseLogo} image={logo} label="Choose Logo" />
      <InputImage
        chooseImage={chooseThumbnail}
        image={thumbnail}
        label="Choose Thumbnail"
      />
      <InputImage chooseImage={chooseBg} image={bg} label="Choose Background" />
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
