import { useState } from "react";
import TitleItem from "./TitleItem";
import Title from "./Title";
import Modal from "../modal/Modal";

export default function TitlesContainer({ movies, series, doc, query }) {
  const [modal, setModal] = useState(null);
  const [hover, setHover] = useState(false);
  const DOC = "Documentaries";
  const filter = (item) => {
    if (query === "") {
      return item;
    } else if (item.heading.toLowerCase().includes(query.toLowerCase())) {
      return item;
    }
  };

  function onHover() {
    debugger;
    setHover(!hover);
  }

  const Movies = movies
    .filter(filter)
    .map((item) => (
      <TitleItem
        item={item}
        key={item.id}
        heading={item.heading}
        type="movie"
        onHover={onHover}
      />
    ));

  const Series = series
    .filter(filter)
    .map((item) => (
      <TitleItem
        item={item}
        key={item.id}
        heading={item.heading}
        type="series"
        onHover={onHover}
      />
    ));

  const Docs = doc
    .filter(filter)
    .map((item) => (
      <TitleItem
        item={item}
        key={item.id}
        heading={item.heading}
        type="documentary"
        onHover={onHover}
      />
    ));

  return (
    <section
      className={`${
        hover ? "is-hovered titles-container" : "titles-container"
      }`}
    >
      <Title title="Movies" list={Movies} setModal={setModal} type="movie" />
      <Title title="Series" list={Series} setModal={setModal} type="series" />
      <Title title={DOC} list={Docs} setModal={setModal} type="documentary" />
      <Modal state={[modal, setModal]} />
    </section>
  );
}
