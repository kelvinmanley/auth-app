import IProps from "./interfaces";
import "./style.scss";
import "../../styles/general.scss";

const LogOutModal: React.FC<IProps> = ({ handleLogOut, handleClose }) => {
  const handleLogOutClick = () => {
    handleLogOut();
    handleClose();
  };

  const handleCancelClick = () => handleClose();

  return (
    <div className="modal-backing">
      <div className="modal-screen" />
      <div className="modal-wrapper">
        <div className="logout-container">
          <h1>Log out</h1>
          <p>Are you sure you want to log out?</p>
          <div className="button-container">
            <button onClick={handleLogOutClick}>Log out</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
