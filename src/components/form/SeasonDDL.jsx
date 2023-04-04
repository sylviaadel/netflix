import { useState, useEffect } from "react";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";

export default function SeasonDDL({ seriesId, collection, changeSeason }) {
  const [seasons, setSeasons] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    const data = await readSubCollection(`${collection}/${seriesId}/seasons`);
    onSuccess(data);
  }

  function onSuccess(data) {
    setSeasons(data);
    setStatus(1);
  }

  const sortedSeasons = seasons?.sort((a, b) => (a.title > b.title ? 1 : -1));
  const Seasons = sortedSeasons.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
    </option>
  ));

  return (
    <label>
      Choose Season
      <select onChange={(e) => changeSeason(e)}>{Seasons}</select>
    </label>
  );
}
