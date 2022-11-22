import "./NavbarOptions.scss"
import DessinsOption from "./options/dessins/DessinsOption"
import PerformancesOption from "./options/performances/PerformancesOption"
import { useState, useRef } from "react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const NavbarOptions = () => {
  const navigate = useNavigate()
  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null
  const optionEffectContact = useRef(null)
  const linebarElemContact = useRef(null)
  const optionEffectPartenaires = useRef(null)
  const linebarElemPartenaires = useRef(null)
  const optionEffectPerformances = useRef(null)
  const linebarElemPerformances = useRef(null)
  const optionEffectDessins = useRef(null)
  const linebarElemDessins = useRef(null)
  const optionEffectAdmin = useRef(null)
  const linebarElemAdmin = useRef(null)
  // dropdown
  const dropdownElemDessins = useRef(null)
  const dropdownSubmenuDessins = useRef(null)
  const dropdownSubmenuPaysages = useRef(null)
  const dropdownSubmenuCarnets = useRef(null)
  const [menuOpenedDessins, setMenuOpenedDessins]= useState(false)
  const [menuOpenedPerformances, setMenuOpenedPerformances] = useState(false)
  
  const navigateToAdmin = (e) => {
    //closeMenu(e)
    navigate('/admin')
  }

  const selectMenu = (e, tag, willOpen) => {
    e.preventDefault();
    //fontAnimationForward(e, tag)
    switch (tag) {
      case "contact":
        console.log("contact")
        fontAnimation(optionEffectContact, willOpen)
        linebarAnimation(linebarElemContact, willOpen)
        break;
      case "partenaires":
        console.log("contact")
        fontAnimation(optionEffectPartenaires, willOpen)
        linebarAnimation(linebarElemPartenaires, willOpen)
        break;
      case "performances":
        console.log("contact")
        fontAnimation(optionEffectPerformances, willOpen)
        linebarAnimation(linebarElemPerformances, willOpen)
        break;
      case "dessins":
        console.log("contact")
        fontAnimation(optionEffectDessins, willOpen)
        linebarAnimation(linebarElemDessins, willOpen)
        dropdownAnimation(dropdownElemDessins, willOpen)
        break;
      case "admin":
        console.log("contact")
        fontAnimation(optionEffectAdmin, willOpen)
        linebarAnimation(linebarElemAdmin, willOpen)
        break;
      
    }
  }

  const fontAnimation = (tag, willOpen) => {
    if (willOpen) {
      tag.current.style.transform = "translateY(calc(-0.975rem - 4px))"
    } else {
      tag.current.style.transform = "translateY(0)"
    }

  }

  const linebarAnimation = (tag, willOpen) => {
    if (willOpen) {
      tag.current.style.width = "100%"
    } else {
      tag.current.style.width = "0"
    }
  }

  const dropdownAnimation = (tag, willOpen) => {
    if (willOpen) {
      tag.current.style.height = "137px"
      tag.current.style.width = "186px"
    } else {
      tag.current.style.height = "0"
      tag.current.style.width = "0"
      // reset submenu 
      dropdownSubmenuDessins.current.style.opacity = "1"
      dropdownSubmenuPaysages.current.style.opacity = "1"
      dropdownSubmenuCarnets.current.style.opacity = "1"
    }
  }

  const selectDropdownMenu = (e, tag) => {
    e.preventDefault();

    console.log('selecte dropdown menu')
    console.log(tag)
    switch (tag) {
      case "dessins":
        console.log("1")
        dropdownSubmenuDessins.current.style.opacity = "1"
        dropdownSubmenuPaysages.current.style.opacity = ".5"
        dropdownSubmenuCarnets.current.style.opacity = ".5"
        break;
      case "paysages":
        console.log("1")
        dropdownSubmenuDessins.current.style.opacity = ".5"
        dropdownSubmenuPaysages.current.style.opacity = "1"
        dropdownSubmenuCarnets.current.style.opacity = ".5"
        break;
      case "carnets":
        console.log("1")
        dropdownSubmenuDessins.current.style.opacity = ".5"
        dropdownSubmenuPaysages.current.style.opacity = ".5"
        dropdownSubmenuCarnets.current.style.opacity = "1"
        break;

    }
  }

 

  return (
    <ul className="b-nabvar-options-list">
      {isAuthCookie === true ?
         <></>
        :
        <></>
      }
   <li className="b-navbar-option-btn-container" onMouseEnter={(e)=>selectMenu(e, "admin", true)} onMouseLeave={(e)=>selectMenu(e, "admin", false)}>
        <div className="b-navbar-option__btn">
        <span className="b-navbar-option__btn__first-span">Admin</span>
          <div className="b-navbar-option__effect" ref={optionEffectAdmin}>
       
          <span>Admin</span>
          <span>Admin</span>
          </div>
  
        </div>
        <div className="b-navbar-option__linebar_effect-container">
        <div className="b-navbar-option__linebar_effect" ref={linebarElemAdmin}>
        </div>
        </div>
        
      </li>
    <li className="b-navbar-option-btn-container" onMouseEnter={(e)=>selectMenu(e, "dessins", true)} onMouseLeave={(e)=>selectMenu(e, "dessins", false)}>
        <div className="b-navbar-option__btn">
        <span className="b-navbar-option__btn__first-span">Dessins</span>
          <div className="b-navbar-option__effect" ref={optionEffectDessins}>
       
          <span>Dessins</span>
          <span>Dessins</span>
          </div>
  
        </div>
        
        <div className="b-navbar-option__linebar_effect-container">
        <div className="b-navbar-option__linebar_effect" ref={linebarElemDessins}>
        </div>
        </div>
        <div className="b-navbar-option-dessins__dropdown" ref={dropdownElemDessins} >
          <div className="dessins__dropdown-menu" onMouseEnter={(e)=>selectDropdownMenu(e)}>
          <p  ref={dropdownSubmenuDessins} >Dessins et croquis</p>
          <p ref={dropdownSubmenuPaysages} >Paysages</p>
            <p ref={dropdownSubmenuCarnets}  >Carnets de voyage</p>
          </div>
        </div>
      </li>
      <li className="b-navbar-option-btn-container" onMouseEnter={(e)=>selectMenu(e, "performances", true)} onMouseLeave={(e)=>selectMenu(e, "performances", false)}>
        <div className="b-navbar-option__btn">
        <span className="b-navbar-option__btn__first-span">Performances</span>
          <div className="b-navbar-option__effect" ref={optionEffectPerformances}>
       
          <span>Performances</span>
          <span>Performances</span>
          </div>
  
        </div>
        <div className="b-navbar-option__linebar_effect-container">
        <div className="b-navbar-option__linebar_effect" ref={linebarElemPerformances}>
        </div>
        </div>
      </li>
      <li className="b-navbar-option-btn-container" onMouseEnter={(e)=>selectMenu(e, "partenaires", true)} onMouseLeave={(e)=>selectMenu(e, "partenaires", false)}>
        <div className="b-navbar-option__btn">
        <span className="b-navbar-option__btn__first-span">Partenaires</span>
          <div className="b-navbar-option__effect" ref={optionEffectPartenaires}>
       
          <span>Partenaires</span>
          <span>Partenaires</span>
          </div>
  
        </div>
        <div className="b-navbar-option__linebar_effect-container">
        <div className="b-navbar-option__linebar_effect" ref={linebarElemPartenaires}>
        </div>
        </div>
      </li>
      <li className="b-navbar-option-btn-container" onMouseEnter={(e)=>selectMenu(e, "contact", true)} onMouseLeave={(e)=>selectMenu(e, "contact", false)}>
        <div className="b-navbar-option__btn">
        <span className="b-navbar-option__btn__first-span">Contact</span>
          <div className="b-navbar-option__effect" ref={optionEffectContact}>
       
          <span>Contact</span>
          <span>Contact</span>
          </div>
  
        </div>
        <div className="b-navbar-option__linebar_effect-container">
        <div className="b-navbar-option__linebar_effect" ref={linebarElemContact}>
        </div>
        </div>
      </li>
    </ul>
  );
}

export default NavbarOptions