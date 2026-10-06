import { Link } from "react-router-dom";

export const NavBar = ({
  username,
  userRole,
  isAdmin = false,
  onLogout,
  inAdminManager = false,
}) => {
  return (
    <div className="nav-bar">
      <h2>Alerts Map</h2>
      <div>
        <span>{username}</span>
        <span>{userRole}</span>
      </div>
      {!inAdminManager && isAdmin && <Link to={"/admin"}>Admin manager</Link>}
      {inAdminManager && <Link to={"/"}>Back to dashboard</Link>}

      <button onClick={() => onLogout()}>Logout</button>
    </div>
  );
};
