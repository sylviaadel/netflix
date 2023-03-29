export default function Hero({ item }) {
  const { heading, logo, background, description, videoLink } = item;

  return (
    <section id="Hero">
      <div className="background"></div>
      <img src={background} alt={heading} />
      <div className="details">
        <img src={logo} />
        <p>{description}</p>
        <button className="white-btn">
          <i class="fa-solid fa-play"></i> Play
        </button>
        <a href={videoLink} className="grey-btn">
          <i class="fa-solid fa-info"></i> More Info
        </a>
      </div>
    </section>
  );
}
