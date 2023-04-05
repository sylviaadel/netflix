import { useState, useEffect } from "react";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";
import ComingSoon from "../shared/ComingSoon";
import Episode from "./Episode";

export default function Seasons({ id, collection }) {
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

  function onSuccess(data) {
    setSeasons(data);
    setStatus(1);
  }

  async function changeSeason(e) {
    var clonedSeason = { ...currentSeason };
    clonedSeason = e.target.value;
    setCurrentSeason(clonedSeason);
    const currentEpisodes = await readSubCollection(
      `${collection}/${id}/seasons/${e.target.value}/episodes`
    );
    setEpisodes(currentEpisodes);
  }
  const sortedSeasons = seasons?.sort((a, b) => (a.title > b.title ? 1 : -1));
  const Seasons = sortedSeasons.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
    </option>
  ));

  const Episodes = episodes.map((item) => (
    <Episode key={item.id} item={item} />
  ));

  return (
    <section className="seasons">
      <h3>Episodes</h3>
      <span className="select-wrapper">
        <select onChange={(e) => changeSeason(e)} defaultValue={currentSeason}>
          {Seasons}
        </select>
      </span>
      {Episodes.length > 0 ? (
        <div className="episodes">{Episodes}</div>
      ) : (
        <ComingSoon />
      )}
    </section>
  );
}
