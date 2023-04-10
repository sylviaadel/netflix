import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useItems } from "../../state/ItemsProvider";
import { v4 as uuidv4 } from "uuid";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { validNum, validText } from "../../scripts/tests/addItem";
import FormItems from "./FormItems";

export default function AddItem({ setModal, collection, id, type }) {
  const { dispatch } = useItems();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [background, setBackground] = useState("");
  const [video, setVideo] = useState("");
  const [matches, setMatches] = useState("");
  const [year, setYear] = useState("");
  const [cast, setCast] = useState("");
  const [genres, setGenres] = useState("");
  id = uuidv4() + "_" + Date.now();
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const chooseLogo = (event) =>
    onChooseImage(event, setButtonEnabled, setLogo, id, 300, 65);
  const chooseThumbnail = (event) =>
    onChooseImage(event, setButtonEnabled, setThumbnail, id, 230, 130);
  const choosebackground = (event) =>
    onChooseImage(event, setButtonEnabled, setBackground, id, 1145, 600);

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
      matches: matches,
      year: year,
      cast: cast,
      genres: genres,
    };
    if (
      !validText(data.heading) ||
      !validText(data.description) ||
      !validText(data.videoLink) ||
      !validNum(data.matches) ||
      !validNum(data.year) ||
      !validText(data.cast) ||
      !validText(data.genres)
    ) {
      event.preventDefault();
    } else {
      await createDocumentWithManualId(collection, id, data);
      dispatch({ type: "create", payload: data });
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

  function changeMatches(matches) {
    setMatches(matches);
  }

  function changeYear(year) {
    setYear(year);
  }

  function changeCast(cast) {
    setCast(cast);
  }

  function changeGenres(genres) {
    setGenres(genres);
  }

  return (
    <div className="form-modal">
      <h2>Add new Item</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <FormItems
          background={background}
          logo={logo}
          thumbnail={thumbnail}
          changeHeading={changeHeading}
          changeDescription={changeDescription}
          chooseBg={choosebackground}
          chooseLogo={chooseLogo}
          chooseThumbnail={chooseThumbnail}
          changeVideo={changeVideo}
          changeMatches={changeMatches}
          changeYear={changeYear}
          changeCast={changeCast}
          changeGenres={changeGenres}
          heading={""}
          description={""}
          video={""}
          matches={""}
          year={""}
          cast={""}
          genres={""}
        />
        <button disabled={!buttonEnabled} className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
