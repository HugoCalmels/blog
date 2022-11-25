import "./Navbar.scss"
import NavbarHomeButton from "./navbar-home-btn/NavbarHomeButton"
import NavbarOptions from "./navbar-options/NavbarOptions"

import Cookies from "js-cookie";
import {useRef, useEffect} from "react"
const Navbar = () => {

  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null


  const navbarContainerElem = useRef(null)




  
  return (
    <nav className="b-navbar" alt="blog navbar" ref={navbarContainerElem}>

      <div className="b-navbar-overlay" ></div>

  
      

      <NavbarHomeButton />

      <NavbarOptions />

  
    </nav>
  )
}

export default Navbar