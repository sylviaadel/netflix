export default function Hero({ item }) {
  const { heading, logo, background, description } = item;

  return (
    <section id="Hero">
      <div className="background"></div>
      <img src={background} alt={heading} />
    </section>
  );
}
