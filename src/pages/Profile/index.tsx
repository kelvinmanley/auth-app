import { useSelector } from "react-redux";
import UpdateModal from "../../components/UpdateModal";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../styles/general.scss";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="page-wrapper">
      <div className="content-container mobile-slim-container">
        <UpdateModal />
      </div>
    </div>
  );
};
export default Home;
