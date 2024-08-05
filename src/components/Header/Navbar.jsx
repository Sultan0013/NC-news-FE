import { NavLink } from "react-router-dom";
import Headers from "./TitleandLogo";
function NavBar() {
    return (<div>
        <button> <NavLink to="/"> <Headers /></NavLink></button>
         <button> <NavLink to="/articles"> Articles </NavLink></button>
    </div>)
}

export default NavBar;