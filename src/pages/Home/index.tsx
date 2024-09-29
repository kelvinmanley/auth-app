import AuthModal from "../../components/AuthModal";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import "../../styles/general.scss";

const Home: React.FC = () => {
  useAuthRedirect("/");

  return (
    <div className="page-wrapper">
      <AuthModal />
    </div>
  );
};

export default Home;
