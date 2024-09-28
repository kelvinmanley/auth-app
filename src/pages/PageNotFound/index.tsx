import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="page-wrapper">
    <div className="content-container">
      <h1>This page does not exist</h1>
      <Link to="/">
        <button>Back to home page</button>
      </Link>
    </div>
  </div>
);
export default PageNotFound;
