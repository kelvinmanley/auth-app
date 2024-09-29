import { useSelector } from "react-redux";
import AuthModal from "../../components/AuthModal";
import "../../styles/general.scss";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/welcome");
    }
  }, [user]);

  return (
    <div className="page-wrapper">
      <AuthModal />
    </div>
  );
};

export default Home;
