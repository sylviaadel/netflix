export default function Title({ title, heading }) {
  return (
    <>
      <h3>{heading}</h3>
      <button>+ Add New</button>
      <div className="clear"></div>
      <div className="titles-list">{title}</div>
    </>
  );
}
