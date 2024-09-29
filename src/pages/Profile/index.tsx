import UpdateModal from "../../components/UpdateModal";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import "../../styles/general.scss";

const Home: React.FC = () => {
  useAuthRedirect("/profile");

  return (
    <div className="page-wrapper">
      <div className="content-container mobile-slim-container">
        <UpdateModal />
      </div>
    </div>
  );
};
export default Home;
