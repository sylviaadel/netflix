export default function HeroDetails({ video, details, item }) {
  const { logo, heading, description } = item;

  return (
    <div className="details">
      <img src={logo} alt={heading} />
      <p>{description}</p>
      <button onClick={video} className="white-btn">
        <i className="fa-solid fa-play"></i> Play
      </button>
      <button onClick={details} className="grey-btn">
        <i className="fa-solid fa-info"></i> More Info
      </button>
    </div>
  );
}
