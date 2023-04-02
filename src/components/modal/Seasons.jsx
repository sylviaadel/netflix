import { useState, useEffect } from "react";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";

export default function Seasons({ id, collection }) {
  const [seasons, setSeasons] = useState([]);
  const [status, setStatus] = useState(0);

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

  const Seasons = seasons.map((data) => (
    <option key={data.id} value={data.id}>
      {data.title}
    </option>
  ));

  return (
    <section className="seasons">
      <h3>Episodes</h3>
      <span className="select-wrapper">
        <select>{Seasons}</select>
      </span>
    </section>
  );
}
