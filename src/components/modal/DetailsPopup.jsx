export default function DetailsPopup({ item }) {
  const { background, logo, description } = item;

  return (
    <div className="details-modal">
      <section id="Hero">
        <div className="background"></div>
        <img src={background} />
        <div className="details">
          <img src={logo} />
          <button className="white-btn">
            <i className="fa-solid fa-play"></i> Play
          </button>
        </div>
      </section>
      <p>{description}</p>
    </div>
  );
}
