import YoutubeEmbed from "../../scripts/YoutubeEmbed";
import imgIcon from "../../assets/images/camera-icon.png";

export default function EpisodeDetails({ item, setModal }) {
  const { episode, thumbnail, heading, description, videoLink } = item;

  function openVideo() {
    setModal(<YoutubeEmbed videoLink={videoLink} />);
  }

  return (
    <>
      <label>{episode}</label>
      <img
        onClick={openVideo}
        src={thumbnail ? thumbnail : imgIcon}
        alt={heading}
      />
      <div>
        <h4>{heading}</h4>
        <p>{description}</p>
      </div>
    </>
  );
}
