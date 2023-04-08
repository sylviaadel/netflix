export default function MoreDetails({ item }) {
  const { matches, year, description, cast, genres } = item;

  return (
    <section className="more-details">
      <div>
        <span className="matches">{matches}% Match</span>
        <span>{year}</span>
        <p>{description}</p>
      </div>
      <div>
        <span>
          <small>Cast:</small> {cast}
        </span>
        <span>
          <small>This film is:</small> {genres}
        </span>
      </div>
    </section>
  );
}
