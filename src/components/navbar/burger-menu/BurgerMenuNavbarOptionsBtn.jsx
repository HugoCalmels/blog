import "./BurgerMenuNavbarOptionsBtn.scss"
import {useState} from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { GrClose } from "react-icons/gr"
const BurgerMenuNavbarOptionsBtn = (props) => {
  const [btnCurrentColor, setBtnCurrentColor] = useState("#424242")
  const btnStyle = { color: { btnCurrentColor }, width: "26px", height: "26px" }
  const [modalIsOpen, setModalIsOpen] = useState(false)
  
  const disableHoverStyle = () => {
    console.log("leave")
    setBtnCurrentColor("#424242")
  }
  const enableHoverStyle = () => {
    console.log("enter")
    setBtnCurrentColor("#3598D8")
  }

  const toggleModal = () => {
    if (modalIsOpen === false) {
      props.burgerModalElem.current.style.transform = "translateY(0px)"
    } else {
      props.burgerModalElem.current.style.transform = "translateY(-275px)"
    }
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <div className="b-navbar-burger-menu-btn-container">
      {modalIsOpen ?
        <GrClose fill={btnCurrentColor} style={btnStyle} onMouseEnter={enableHoverStyle} onMouseLeave={disableHoverStyle} onClick={toggleModal}/>
        :
        <RxHamburgerMenu fill={btnCurrentColor} style={btnStyle} onMouseEnter={enableHoverStyle} onMouseLeave={disableHoverStyle} onClick={toggleModal} />
      }
      
      
    </div>
  )
}

export default BurgerMenuNavbarOptionsBtn