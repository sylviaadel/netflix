import imgIcon from "../../assets/images/camera-icon.png";
import YoutubeEmbed from "../../scripts/YoutubeEmbed";

export default function HoverCard({ item, details, setModal }) {
  const { heading, background, logo, videoLink, matches, year, genres } = item;

  function openVideo() {
    setModal(<YoutubeEmbed videoLink={videoLink} />);
  }

  return (
    <div className="hover-card">
      <img src={background ? background : imgIcon} />
      <img src={logo ? logo : imgIcon} alt={heading} />
      <div className="card-details">
        <button onClick={openVideo} className="play-btn">
          <i className="fa-solid fa-play"></i>
        </button>
        <button onClick={details} className="info-btn">
          <i className="fa-solid fa-chevron-down"></i>
        </button>
        <section className="card-more-details">
          <span>{matches}% Match</span>
          <span>{year}</span>
          <p>{genres}</p>
        </section>
      </div>
    </div>
  );
}
