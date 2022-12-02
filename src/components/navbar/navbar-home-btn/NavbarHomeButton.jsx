import "./NavbarHomeButton.scss"
import {useRef, useState} from "react"
import { useNavigate, Link } from "react-router-dom";
const NavbarHomeButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const indexListModalElem = useRef(null)
  const plusElem = useRef(null)
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/gaelle-boucherit')
  }
  const toggleIndexListModal = () => {
   //
    if (modalIsOpen === false) {
      openModal()
      setModalIsOpen(true)
    } else {
      closeModal()
      setModalIsOpen(false)
    }
  }

  const openModal = () => {
    //indexListModalElem.current.classList.add("active")
    indexListModalElem.current.style.transform = "translateX(0px)"
    plusElem.current.style.transform = "rotate(360deg)"
  }
  const closeModal = () => {
    //indexListModalElem.current.classList.remove("active")
    indexListModalElem.current.style.transform = "translateX(-350px)"
    plusElem.current.style.transform = "rotate(0deg)"
  }
  return (
    <div className="b-navbar-home-button-wrapper">
      <div className="b-navbar-main-home-button">
        <Link className="b-navbar-index-link" to={"/gaelle-boucherit"}>Gaelle Boucherit</Link>
        <span onClick={toggleIndexListModal} ref={plusElem}>+</span>
        <div className="b-navbar-index-list-modal" ref={indexListModalElem}>
          <div className="b-navbar-triangle"></div>
          <div className="b-navbar-container">
            <h5>site blog</h5>
            <h5>site cie</h5>
          </div>
        </div>
      </div>
  
    </div>
  )
}

export default NavbarHomeButton