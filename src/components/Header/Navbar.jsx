
import { NavLink } from "react-router-dom";
import Headers from "./TitleandLogo";
import './navbar.css';

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to="/" className="nav-button">
                <Headers />
            </NavLink>
            <NavLink to="/articles" className="nav-button">
                Articles
            </NavLink>
        </div>
    );
}

export default NavBar;
