import AuthModal from "../../components/AuthModal";
import "../../styles/general.scss";

const Home: React.FC = () => {
  return (
    <div className="page-wrapper">
      <AuthModal isLoginType />
    </div>
  );
};
export default Home;
