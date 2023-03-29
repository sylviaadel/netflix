export default function DetailsPopup({ item }) {
  const { heading, background, logo, description, videoLink } = item;

  return (
    <div className="details-modal">
      <section id="Hero">
        <div className="background"></div>
        <img src={background} alt={heading} />
        <div className="details">
          <img src={logo} alt={heading} />
          <a href={videoLink} className="white-btn">
            <i className="fa-solid fa-play"></i> Play
          </a>
        </div>
      </section>
      <p>{description}</p>
    </div>
  );
}
