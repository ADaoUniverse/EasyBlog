import dayjs from "dayjs";

export default ({ author, date }) => {
  const _date = dayjs(parseInt(date) * 1000).format("DD/MM/YYYY");
  return (
    <div className="author-container">
      <img className="icon" src={`https://stamp.fyi/avatar/${author}`} />
      <span className="author">
        {author} - {_date}
      </span>
    </div>
  );
};
