import "./NavbarHomeButton.scss"
import { useNavigate } from "react-router-dom";
const NavbarHomeButton = () => {
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/gaelle-boucherit')
  }
  return (
    <div className="b-navbar-home-button-wrapper">
      <div className="b-navbar-main-home-button" onClick={navigateToHome}>Gaelle Boucherit</div>
      <div className="b-navbar-router-switch">+</div>
    </div>
  )
}

export default NavbarHomeButton