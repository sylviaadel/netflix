import { useState, useEffect } from "react";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";
import Episode from "./Episode";

export default function Seasons({ id, collection }) {
  const [seasons, setSeasons] = useState([]);
  const [status, setStatus] = useState(0);
  const [currentSeason, setCurrentSeason] = useState("CB2T7OR2ibPCUKHVAiUa");
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    const data = await readSubCollection(`${collection}/${id}/seasons`);
    const currentEpisodes = await readSubCollection(
      `${collection}/${id}/seasons/${currentSeason}/episodes`
    );
    setEpisodes(currentEpisodes);
    onSuccess(data);
  }

  function onSuccess(data) {
    setSeasons(data);
    setStatus(1);
  }

  function handleChangeSeason(e) {
    setCurrentSeason(e.target.value);
    console.log(currentSeason);
  }

  const Seasons = seasons.map((data) => (
    <option key={data.id} value={data.id}>
      {data.title}
    </option>
  ));

  const Episodes = episodes.map((item) => (
    <Episode key={item.id} item={item} />
  ));

  return (
    <section className="seasons">
      <h3>Episodes</h3>
      <span className="select-wrapper">
        <select onChange={(e) => handleChangeSeason(e)}>{Seasons}</select>
      </span>
      <div className="episodes">{Episodes}</div>
    </section>
  );
}
