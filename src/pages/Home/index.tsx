import AuthModal from "../../components/AuthModal";
import "../../styles/general.scss";

const Home = () => {
  return (
    <div className="page-wrapper">
      <AuthModal isLoginType />
    </div>
  );
};
export default Home;
