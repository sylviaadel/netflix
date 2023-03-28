import Movie1 from "../assets/images/movie1.webp";
import Movie2 from "../assets/images/movie2.webp";
import Top10 from "../components/landing/Top10";

export default function Landing() {
  return (
    <div id="LandingPage">
      <section className="items-container">
        <h3>Movies</h3>
        <div className="items-list">
          <article>
            <img src={Movie1} alt="movie" />
          </article>
          <article>
            <img src={Movie2} alt="movie" />
          </article>
        </div>
      </section>
      <Top10 />
    </div>
  );
}
