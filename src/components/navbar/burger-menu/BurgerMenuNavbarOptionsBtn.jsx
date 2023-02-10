import "./BurgerMenuNavbarOptionsBtn.scss";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
const BurgerMenuNavbarOptionsBtn = (props) => {
  const [btnCurrentColor, setBtnCurrentColor] = useState("#424242");
  const btnStyle = { color: "#424242", width: "35px", height: "30px" };

  const toggleModal = () => {
    if (props.modalIsOpen === false) {
      props.burgerModalElem.current.style.transform = "translateY(0px)";
    } else {
      props.burgerModalElem.current.style.transform = "translateY(-100vh)";
    }
    props.setModalIsOpen(!props.modalIsOpen);
  };

  return (
    <div className="b-navbar-burger-menu-btn-container">
      {props.modalIsOpen ? (
        <GrClose
          fill={btnCurrentColor}
          style={btnStyle}
          onClick={toggleModal}
        />
      ) : (
        <RxHamburgerMenu
          fill={btnCurrentColor}
          style={btnStyle}
          onClick={toggleModal}
        />
      )}
    </div>
  );
};

export default BurgerMenuNavbarOptionsBtn;
