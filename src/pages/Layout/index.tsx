import { Outlet, Link } from "react-router-dom";
import "../../styles/general.scss";
import "./style.scss";
import LogOutModal from "../../components/LogOutModal";
import { useState } from "react";

const Layout = () => {
  const [logout, setLogout] = useState(false);

  const handleLogoutToggle = () => setLogout(!logout);

  return (
    <>
      <nav>
        <Link to="/">
          <p className="nav-text">Home</p>
        </Link>

        <Link to="/welcome">
          <p className="nav-text">Welcome</p>
        </Link>

        <Link to="/profile">
          <p className="nav-text">Profile</p>
        </Link>

        <div className="anchor" onClick={handleLogoutToggle}>
          <p className="nav-text">Log out</p>
        </div>
      </nav>

      <Outlet />

      {logout && <LogOutModal handleClose={handleLogoutToggle} />}
    </>
  );
};

export default Layout;
