import { NavLink } from "react-router-dom";
import { UserContext } from "../../../Context/userContext";
import { useContext } from "react";
import "./navbar.css";

function NavBar() {
  const { loggedUser, logout } = useContext(UserContext);

  return (
    <div className="navbar bg-gray-100 shadow-md">
      <div className="flex-1 flex items-center">
        <NavLink to="/" className="nav-button">
          <button className="btn btn-ghost normal-case text-xl text-black">
            NC News
          </button>
        </NavLink>

        <NavLink to="/articles" className="btn btn-ghost text-black ml-4">
          Articles
        </NavLink>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/userProfile" className="btn btn-ghost text-black">
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
