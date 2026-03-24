import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/userContext";
import { useContext } from "react";
import "./navbar.css";

function NavBar() {
  const { loggedUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-gray-100 shadow-md">
      <div className="flex-1 flex items-center">
        <NavLink to="/" className="nav-button">
          <button className="btn btn-ghost normal-case text-xl text-black">
            NC News
          </button>
        </NavLink>

        {loggedUser && (
          <NavLink to="/articles" className="btn btn-ghost text-black ml-4">
            Articles
          </NavLink>
        )}
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          {loggedUser ? (
            <>
              <li>
                <NavLink to="/userProfile" className="btn btn-ghost text-black">
                  {loggedUser.username}
                </NavLink>
              </li>
              <li>
                <button
                  className="btn btn-outline btn-error btn-sm self-center"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="btn btn-ghost text-black">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="btn btn-primary btn-sm self-center">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
