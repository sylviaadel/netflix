import Movie from "../../assets/images/movie1.webp";
export default function Top10() {
  return (
    <section className="top10-container">
      <h3>Top 10 TV in Sweden Today</h3>
      <ol>
        <li>
          <img src={Movie} alt="movie" />
        </li>
        <li>
          <img src={Movie} alt="movie" />
        </li>
        <li>
          <img src={Movie} alt="movie" />
        </li>
        <li>
          <img src={Movie} alt="movie" />
        </li>
        <li>
          <img src={Movie} alt="movie" />
        </li>
      </ol>
    </section>
  );
}
