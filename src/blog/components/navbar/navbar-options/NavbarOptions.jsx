import "./NavbarOptions.scss"
import DessinsOption from "./options/dessins/DessinsOption"
const NavbarOptions = () => {
  return (
    <ul className="b-nabvar-options-list">
      <DessinsOption/>
      <li className="b-navbar-option"><span>Performances</span></li>
      <li className="b-navbar-option"><span>Amis</span></li>
      <li className="b-navbar-option"><span>Contact</span></li>
    </ul>
  );
}

export default NavbarOptions