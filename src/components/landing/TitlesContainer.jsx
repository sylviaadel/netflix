import TitleItem from "./TitleItem";
import Title from "./Title";

export default function TitlesContainer({ movies, series, doc }) {
  const Movies = movies.map((item) => <TitleItem key={item.id} item={item} />);
  const Series = series.map((item) => <TitleItem key={item.id} item={item} />);
  const Doc = doc.map((item) => <TitleItem key={item.id} item={item} />);

  return (
    <section className="titles-container">
      <Title heading="Movies" title={Movies} />
      <Title heading="Series" title={Series} />
      <Title heading="Documentaries" title={Doc} />
    </section>
  );
}
