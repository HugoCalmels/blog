import "./Navbar.scss";
import NavbarHomeButton from "./navbar-home-btn/NavbarHomeButton";
import NavbarOptions from "./navbar-options/NavbarOptions";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useRef, useEffect } from "react";
import BurgerMenuNavbarOptionsBtn from "./burger-menu/BurgerMenuNavbarOptionsBtn";
import BurgerModal from "./burger-menu/BurgerModal.jsx";
import { useState } from "react";
const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isAuthCookie = Cookies.get("cie-lutin-isAuth")
    ? JSON.parse(Cookies.get("cie-lutin-isAuth"))
    : null;

  const burgerModalElem = useRef(null);
  const navbarContainerElem = useRef(null);
  const navbarWrapperElem = useRef(null);

  useEffect(() => {
    if (isAuthCookie) {
      navbarContainerElem.current.classList.add("alert");
      navbarWrapperElem.current.classList.add("alert");
    }
  }, []);

  const { pathname } = useLocation();

  return (
    <header>
      <nav className="b-navbar" alt="blog navbar" ref={navbarContainerElem}>
        <div className="b-navbar-wrapper" ref={navbarWrapperElem}>
          <div className="b-navbar-overlay"></div>

          <NavbarHomeButton
            pathname={pathname}
            burgerModalElem={burgerModalElem}
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
          />

          <NavbarOptions pathname={pathname} />
          <BurgerMenuNavbarOptionsBtn
            burgerModalElem={burgerModalElem}
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
          />
        </div>
        <BurgerModal
          burgerModalElem={burgerModalElem}
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
        />
      </nav>
    </header>
  );
};

export default Navbar;
