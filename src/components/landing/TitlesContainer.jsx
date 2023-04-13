import { useState } from "react";
import TitleItem from "./TitleItem";
import Title from "./Title";
import Modal from "../modal/Modal";
import NoResults from "../shared/NoResults";

export default function TitlesContainer({ movies, series, doc, query }) {
  const [modal, setModal] = useState(null);
  const filter = (item) => {
    if (query === "") {
      return item;
    } else if (item.heading.toLowerCase().includes(query.toLowerCase())) {
      return item;
    }
  };

  const Movies = movies
    .filter(filter)
    .map((item) => <TitleItem item={item} key={item.id} type="movie" />);

  const Series = series
    .filter(filter)
    .map((item) => <TitleItem item={item} key={item.id} type="series" />);

  const Docs = doc
    .filter(filter)
    .map((item) => <TitleItem item={item} key={item.id} type="documentary" />);

  return (
    <section className="titles">
      {(Movies.length == 0) & (Series.length == 0) & (Docs.length == 0) ? (
        <NoResults />
      ) : (
        <>
          <Title
            title="Movies"
            list={Movies}
            setModal={setModal}
            type="movie"
          />
          <Title
            title="Series"
            list={Series}
            setModal={setModal}
            type="series"
          />
          <Title
            title="Documentaries"
            list={Docs}
            setModal={setModal}
            type="documentary"
          />
        </>
      )}
      <Modal state={[modal, setModal]} />
    </section>
  );
}
