import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import FormSeason from "./FormSeason";
import imgIcon from "../../assets/images/camera-icon.png";

export default function ItemModalDetails({
  item,
  series,
  setModal,
  seriesCondition,
}) {
  const { logo, heading, videoLink } = item;
  const collection = "titles";

  function openVideo() {
    setModal(<YoutubeEmbed videoLink={videoLink} />);
  }

  function addSeason() {
    setModal(
      <FormSeason series={series} collection={collection} setModal={setModal} />
    );
  }

  return (
    <div className="details">
      <img src={logo ? logo : imgIcon} alt={heading} />
      <button onClick={openVideo} className="white-btn">
        <i className="fa-solid fa-play"></i> Play
      </button>
      {seriesCondition && (
        <button className="add-season" onClick={addSeason}>
          + Add New Season
        </button>
      )}
    </div>
  );
}
