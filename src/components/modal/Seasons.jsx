import { useState, useEffect } from "react";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";
import ComingSoon from "../shared/ComingSoon";
import Episode from "./Episode";

export default function Seasons({ id, collection, addEpisode, seriesId }) {
  const [seasons, setSeasons] = useState([]);
  const [status, setStatus] = useState(0);
  const [currentSeason, setCurrentSeason] = useState("");
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    const data = await readSubCollection(`${collection}/${id}/seasons`);
    onSuccess(data);
  }

  async function setSeason(seasonId) {
    setCurrentSeason(seasonId);
    const currentEpisodes = await readSubCollection(
      `${collection}/${id}/seasons/${seasonId}/episodes`
    );
    setEpisodes(currentEpisodes);
  }

  async function onSuccess(data) {
    setSeasons(data);
    setStatus(1);
    var seasonId = data.sort((a, b) => (a.title > b.title ? 1 : -1))[0].id;
    setSeason(seasonId);
  }

  async function changeSeason(e) {
    var clonedSeason = { ...currentSeason };
    clonedSeason = e.target.value;
    setSeason(clonedSeason);
  }

  function onUpdateEpisode(seasonId) {
    setSeason(seasonId);
  }

  function onDeleteEpisode(seasonId) {
    setSeason(seasonId);
  }

  const sortedSeasons = seasons?.sort((a, b) => (a.title > b.title ? 1 : -1));
  const Seasons = sortedSeasons.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
    </option>
  ));

  const sorted = episodes?.sort((a, b) => (a.episode > b.episode ? 1 : -1));
  const Episodes = sorted.map((item) => (
    <Episode
      key={item.id}
      onUpdateEpisode={onUpdateEpisode}
      item={item}
      currentSeason={currentSeason}
      seriesId={seriesId}
      onDeleteEpisode={onDeleteEpisode}
    />
  ));

  return (
    <section className="seasons">
      <h3>Episodes</h3>
      <button onClick={addEpisode}>
        <i className="fa-solid fa-plus"></i>
      </button>
      <span className="select-wrapper">
        <select onChange={(e) => changeSeason(e)}>{Seasons}</select>
      </span>
      {Episodes.length > 0 ? (
        <div className="episodes">{Episodes}</div>
      ) : (
        <ComingSoon />
      )}
    </section>
  );
}
