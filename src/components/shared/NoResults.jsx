import NoResultsImg from "../../assets/images/no-results.png";

export default function NoResults() {
  return (
    <section className="no-results">
      <div className="clear"></div>
      <img src={NoResultsImg} alt="No Results" />
      <p>No Results Found</p>
    </section>
  );
}
