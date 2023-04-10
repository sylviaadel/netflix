import { useState, useEffect } from "react";
import { validMatch, validText } from "../../scripts/tests/addItem";
import { videoErr, titleErr, descErr, matchesErr } from "../../scripts/helpers";
import { yearErr, castErr, genresErr } from "../../scripts/helpers";
import TextBox from "../form/TextBox";
import TextArea from "../form/TextArea";
import InputImage from "../form/InputImage";
import TextNumber from "../form/TextBoxNumber";

export default function FormItems({
  heading,
  description,
  bg,
  thumbnail,
  logo,
  video,
  matches,
  year,
  cast,
  genres,
  changeHeading,
  changeDescription,
  chooseThumbnail,
  chooseLogo,
  chooseBg,
  changeVideo,
  changeMatches,
  changeYear,
  changeCast,
  changeGenres,
}) {
  const [itemHeading, setItemHeading] = useState(heading);
  const [itemDescription, setItemDescription] = useState(description);
  const [itemVideo, setItemVideo] = useState(video);
  const [itemMatches, setItemMatches] = useState(matches);
  const [itemYear, setItemYear] = useState(year);
  const [itemCast, setItemCast] = useState(cast);
  const [itemGenres, setItemGenres] = useState(genres);

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

  function onMatchesChange(event) {
    setItemMatches(event.target.value);
    changeMatches(event.target.value);
  }

  function onYearChange(event) {
    setItemYear(event.target.value);
    changeYear(event.target.value);
  }

  function onCastChange(event) {
    setItemCast(event.target.value);
    changeCast(event.target.value);
  }

  function onGenresChange(event) {
    setItemGenres(event.target.value);
    changeGenres(event.target.value);
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

  useEffect(() => {
    setItemMatches(matches);
  }, [matches]);

  useEffect(() => {
    setItemYear(year);
  }, [year]);

  useEffect(() => {
    setItemCast(cast);
  }, [cast]);

  useEffect(() => {
    setItemGenres(genres);
  }, [genres]);

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
        title="Video Link"
        value={itemVideo}
        onChange={(event) => onVideoChange(event)}
        validate={validText(itemVideo)}
        error={videoErr}
      />
      <TextNumber
        title="Matches Pencentage"
        onChange={(event) => onMatchesChange(event)}
        value={itemMatches}
        validate={validMatch(itemMatches)}
        error={matchesErr}
      />
      <TextNumber
        title="Year"
        onChange={(event) => onYearChange(event)}
        value={itemYear}
        validate={validText(itemYear)}
        error={yearErr}
      />
      <TextBox
        title="Cast"
        onChange={(event) => onCastChange(event)}
        value={itemCast}
        validate={validText(itemCast)}
        error={castErr}
      />
      <TextBox
        title="Genres"
        onChange={(event) => onGenresChange(event)}
        value={itemGenres}
        validate={validText(itemGenres)}
        error={genresErr}
      />
    </>
  );
}
