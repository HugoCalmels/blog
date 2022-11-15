import "./Navbar.scss"
import NavbarHomeButton from "./navbar-home-btn/NavbarHomeButton"
import NavbarOptions from "./navbar-options/NavbarOptions"
import NavbarAdminMode from "./navbar-admin-mode/NavbarAdminMode"
import Cookies from "js-cookie";
const Navbar = () => {

  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null

  console.log("from navbar")
  console.log(isAuthCookie)
  console.log("from navbar")
  
  return (
    <nav className="b-navbar" alt="blog navbar">

      <div className="b-navbar-overlay" ></div>

  
      

      <NavbarHomeButton />
      {isAuthCookie === true ? <NavbarAdminMode /> : <></>}
      <NavbarOptions />

  
    </nav>
  )
}

export default Navbar