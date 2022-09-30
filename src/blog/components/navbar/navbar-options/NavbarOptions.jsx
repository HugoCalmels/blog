import "./NavbarOptions.scss"
import DessinsOption from "./options/dessins/DessinsOption"
import PerformancesOption from "./options/performances/PerformancesOption"
import {useState} from "react"
const NavbarOptions = () => {



  const [menuOpenedDessins, setMenuOpenedDessins]= useState(false)
  const [menuOpenedPerformances, setMenuOpenedPerformances]= useState(false)
  return (
    <ul className="b-nabvar-options-list">
      <DessinsOption menuOpenedDessins={menuOpenedDessins} menuOpenedPerformances={menuOpenedPerformances} setMenuOpenedDessins={setMenuOpenedDessins} setMenuOpenedPerformances={setMenuOpenedPerformances} />
      <PerformancesOption menuOpenedDessins={menuOpenedDessins} menuOpenedPerformances={ menuOpenedPerformances} setMenuOpenedDessins={setMenuOpenedDessins} setMenuOpenedPerformances={setMenuOpenedPerformances}/>
      <li className="b-navbar-option"><span>Amis</span></li>
      <li className="b-navbar-option"><span>Contact</span></li>
    </ul>
  );
}

export default NavbarOptions