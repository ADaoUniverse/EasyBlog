import { Link } from "react-router-dom";

export default ({ link, children, blog }) => {
  return (
    <Link className="card-container-margin" to={{ pathname: link, b: blog }} style={{ textDecoration: "none" }}>
      <div className="card">{children}</div>
    </Link>
  );
};
