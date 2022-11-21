import "./NavbarOptions.scss"
import DessinsOption from "./options/dessins/DessinsOption"
import PerformancesOption from "./options/performances/PerformancesOption"
import { useState } from "react"
import Cookies from "js-cookie";
const NavbarOptions = () => {

  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null

  const [menuOpenedDessins, setMenuOpenedDessins]= useState(false)
  const [menuOpenedPerformances, setMenuOpenedPerformances]= useState(false)
  return (
    <ul className="b-nabvar-options-list">
      {isAuthCookie === true ?
        <li className="b-navbar-option admin"><span>Admin</span></li>
        :
        <></>
      }
   
      <DessinsOption menuOpenedDessins={menuOpenedDessins} menuOpenedPerformances={menuOpenedPerformances} setMenuOpenedDessins={setMenuOpenedDessins} setMenuOpenedPerformances={setMenuOpenedPerformances} />
      <li className="b-navbar-option"><span>Performances</span></li>
      <li className="b-navbar-option"><span>Partenaires</span></li>
      <li className="b-navbar-option"><span>Contact</span></li>
    </ul>
  );
}

export default NavbarOptions