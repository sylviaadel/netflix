export default function DetailsPopup({ item }) {
  const { background, logo, description, videoLink } = item;

  return (
    <div className="details-modal">
      <section id="Hero">
        <div className="background"></div>
        <img src={background} />
        <div className="details">
          <img src={logo} />
          <a href={videoLink} className="white-btn">
            <i className="fa-solid fa-play"></i> Play
          </a>
        </div>
      </section>
      <p>{description}</p>
    </div>
  );
}
