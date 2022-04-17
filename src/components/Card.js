import { Link } from "react-router-dom";

export default ({ link, children }) => {
  return (
    <Link className="card-container-wrapper" to={link} style={{ textDecoration: "none" }}>
      <div className="card">{children}</div>
    </Link>
  );
};
