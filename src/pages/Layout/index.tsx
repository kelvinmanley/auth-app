import { Outlet, Link } from "react-router-dom";
import "../../styles/general.scss";
import "./style.scss";

const Layout = () => {
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

        <div className="anchor">
          <p className="nav-text">Log out</p>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
