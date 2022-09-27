import "./Navbar.scss"
import NavbarHomeButton from "./navbar-home-btn/NavbarHomeButton"
import NavbarOptions from "./navbar-options/NavbarOptions"
const Navbar = () => {


  
  return (
    <nav className="b-navbar" alt="blog navbar">

      <div className="b-navbar-overlay" ></div>

      <NavbarHomeButton />
      
      <NavbarOptions />

  
    </nav>
  )
}

export default Navbar