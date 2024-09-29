import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import "../../styles/general.scss";

const Welcome: React.FC = () => {
  const email = useSelector((state: RootState) => state.user.value);
  const name = email?.split("@")[0];

  useAuthRedirect("/welcome");

  return (
    <div className="page-wrapper">
      <div className="content-container">
        <h1>Welcome {name}</h1>
        <p>View your profile or update your password by clicking below</p>
        <Link to="/profile">
          <button>View profile</button>
        </Link>
      </div>
    </div>
  );
};
export default Welcome;
