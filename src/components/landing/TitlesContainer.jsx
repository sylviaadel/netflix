import { useState } from "react";
import TitleItem from "./TitleItem";
import Title from "./Title";
import Modal from "../modal/Modal";
import NoResults from "../shared/NoResults";

export default function TitlesContainer({ movies, series, doc, query }) {
  const [modal, setModal] = useState(null);
  const filteredItems = (item) => {
    if (query === "") {
      return item;
    } else if (item.heading.toLowerCase().includes(query.toLowerCase())) {
      return item;
    }
  };

  const Movies = movies
    ? movies.filter(filteredItems).length > 0
      ? movies
          .filter(filteredItems)
          .map((item) => <TitleItem item={item} key={item.id} type="movie" />)
      : undefined
    : undefined;

  const Series = series
    ? series.filter(filteredItems).length > 0
      ? series
          .filter(filteredItems)
          .map((item) => <TitleItem item={item} key={item.id} type="series" />)
      : undefined
    : undefined;

  const Docs = doc
    ? doc.filter(filteredItems).length > 0
      ? doc
          .filter(filteredItems)
          .map((item) => (
            <TitleItem item={item} key={item.id} type="documentary" />
          ))
      : undefined
    : undefined;

  return (
    <section className="titles">
      {(Movies == undefined) & (Series == undefined) & (Docs == undefined) ? (
        <NoResults />
      ) : (
        <>
          {Movies != undefined && (
            <Title
              title="Movies"
              list={Movies}
              setModal={setModal}
              type="movie"
            />
          )}
          {Series != undefined && (
            <Title
              title="Series"
              list={Series}
              setModal={setModal}
              type="series"
            />
          )}
          {Docs != undefined && (
            <Title
              title="Documentaries"
              list={Docs}
              setModal={setModal}
              type="documentary"
            />
          )}
        </>
      )}
      <Modal state={[modal, setModal]} />
    </section>
  );
}
