export default function Title({ itemsList, title }) {
  return (
    <>
      <h3>{title}</h3>
      <button>+ Add New</button>
      <div className="clear"></div>
      <div className="titles-list">{itemsList}</div>
    </>
  );
}
