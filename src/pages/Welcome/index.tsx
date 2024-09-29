import { Link, useNavigate } from "react-router-dom";
import "../../styles/general.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

const Welcome: React.FC = () => {
  const email = useSelector((state: RootState) => state.user.value);
  const name = email?.split("@")[0];
  const navigate = useNavigate();

  useEffect(() => {
    if (email === null) {
      navigate("/");
    }
  }, [email]);

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
