import { Outlet, Link } from "react-router-dom";
import "../../styles/general.scss";
import "./style.scss";
import LogOutModal from "../../components/LogOutModal";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { logOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, updateUserData } from "../../redux/userSlice";
import { RootState } from "../../redux/store";

const Layout: React.FC = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const loggedIn = user !== null;

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleLogoutToggle = () => setLogout(!logout);

  // Update user state when auth state changes
  auth.onAuthStateChanged((user) => {
    const loggedOut = user === null || user.email === null;
    const dispatchAction = loggedOut
      ? clearUserData()
      : updateUserData(user.email);
    dispatch(dispatchAction);
  });

  return (
    <>
      {/* Navbar with routes */}
      <nav>
        {!loggedIn ? (
          <Link to="/">
            <p className="nav-text">Home</p>
          </Link>
        ) : (
          <>
            <Link to="/welcome">
              <p className="nav-text">Welcome</p>
            </Link>

            <Link to="/profile">
              <p className="nav-text">Profile</p>
            </Link>

            <div className="anchor" onClick={handleLogoutToggle}>
              <p className="nav-text">Log out</p>
            </div>
          </>
        )}
      </nav>

      {/* Element/Page content */}
      <Outlet />

      {/* Log out modal */}
      {logout && (
        <LogOutModal
          handleLogOut={handleLogOut}
          handleClose={handleLogoutToggle}
        />
      )}
    </>
  );
};

export default Layout;
