
import { NavLink } from "react-router-dom";
import Headers from "./TitleandLogo";
import './navbar.css';

function NavBar() {
    return (
      

        <div className="navbar bg-gray-100">
  <div className="flex-1">
                    <NavLink to="/" className="nav-button">
    <button className="btn btn-ghost text-black ">NC News</button>
                     </NavLink>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
           <NavLink to="/articles" className="btn btn-ghost text-black">
                Articles
            </NavLink>
               
           
      
    </ul>
  </div>
</div>
    );
}

export default NavBar;
