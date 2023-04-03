import { useState } from "react";
import TitleItem from "./TitleItem";
import Title from "./Title";
import Modal from "../modal/Modal";

export default function TitlesContainer({ movies, series, doc, query }) {
  const [modal, setModal] = useState(null);

  const Movies = movies
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (item.heading.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
    })
    .map((item) => (
      <TitleItem item={item} key={item.id} heading={item.heading} />
    ));

  const Series = series
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (item.heading.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
    })
    .map((item) => (
      <TitleItem item={item} key={item.id} heading={item.heading} />
    ));

  const Docs = doc
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (item.heading.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
    })
    .map((item) => (
      <TitleItem item={item} key={item.id} heading={item.heading} />
    ));

  return (
    <section className="titles-container">
      <Title title="Movies" itemsList={Movies} setModal={setModal} />
      <Title title="Series" itemsList={Series} />
      <Title title="Documentaries" itemsList={Docs} />
      <Modal state={[modal, setModal]} />
    </section>
  );
}
