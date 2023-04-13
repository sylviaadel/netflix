import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Seasons from "./Seasons";
import imgIcon from "../../assets/images/camera-icon.png";
import FormSeason from "./FormSeason";
import AddEpisode from "./AddEpisode";
import MoreDetails from "./MoreDetails";

export default function DetailsPopup({ item, series, setModal }) {
  const { heading, background, logo, videoLink } = item;
  const seriesCondition = item.type === "series";
  const name = "titles";

  function openVideo() {
    setModal(<YoutubeEmbed videoLink={videoLink} />);
  }

  function addSeason() {
    setModal(
      <FormSeason series={series} collection={name} setModal={setModal} />
    );
  }

  function addEpisode() {
    setModal(
      <AddEpisode setModal={setModal} collection={name} seriesId={series} />
    );
  }

  return (
    <div className="details-modal">
      <section id="Hero">
        <div className="background"></div>
        <img src={background ? background : imgIcon} alt={heading} />
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
      </section>
      <MoreDetails item={item} />
      {seriesCondition && (
        <Seasons
          id={item.id}
          collection={name}
          addEpisode={addEpisode}
          seriesId={series}
        />
      )}
    </div>
  );
}
