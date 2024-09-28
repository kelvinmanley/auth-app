import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/welcome">Welcome</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
