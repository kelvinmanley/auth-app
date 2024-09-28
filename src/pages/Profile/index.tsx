import UpdateModal from "../../components/UpdateModal";
import "../../styles/general.scss";

const Home: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="content-container mobile-slim-container">
        <UpdateModal />
      </div>
    </div>
  );
};
export default Home;
