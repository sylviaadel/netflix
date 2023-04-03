import data from "../../data/footerData.json";

export default function Footer() {
  const FooterData = data.map((item) => (
    <li key={item.id}>
      <a href={item.link}>{item.title}</a>
    </li>
  ));

  return (
    <section id="Footer">
      <p>
        Questions? Call <a href="tel:0201 604 328"></a>0201 604 328
      </p>
      <ul>{FooterData}</ul>
    </section>
  );
}
