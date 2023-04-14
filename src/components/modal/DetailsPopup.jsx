import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import Seasons from "./Seasons";
import imgIcon from "../../assets/images/camera-icon.png";
import FormSeason from "./FormSeason";
import AddEpisode from "./AddEpisode";
import MoreDetails from "./MoreDetails";
import ItemModalDetails from "./ItemModalDetails";

export default function DetailsPopup({ item, series, setModal }) {
  const { heading, background, videoLink } = item;
  const seriesCondition = item.type === "series";
  const name = "titles";

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
        <ItemModalDetails
          item={item}
          series={series}
          setModal={setModal}
          seriesCondition={seriesCondition}
        />
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
