import { Link } from "react-router-dom";
import "../../styles/general.scss";

const Welcome: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="content-container">
        <h1>Welcome</h1>
        <p>View your profile or update your password by clicking below</p>
        <Link to="/profile">
          <button>View profile</button>
        </Link>
      </div>
    </div>
  );
};
export default Welcome;
