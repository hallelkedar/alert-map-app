import { Link } from "react-router-dom";

export const NavBar = ({
  username,
  userRole,
  isAdmin = false,
  onLogout,
}) => {
  return (
    <div>
      <h2>Alerts Map</h2>
      <div>
        <span>{username}</span>
        <span>{userRole}</span>
      </div>
      {isAdmin && <Link to={'/admin'}>Admin manager</Link>}
      
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  );
};
