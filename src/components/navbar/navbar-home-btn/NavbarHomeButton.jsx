import "./NavbarHomeButton.scss";
import { useRef, useState } from "react";
import { useNavigate} from "react-router-dom";

const NavbarHomeButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const indexListModalElem = useRef(null);
  const plusElem = useRef(null);
  const optionEffectIndex = useRef(null);
  const linebarElemIndex = useRef(null);
  const linebarSelectedOptionRef = useRef(null);
  const navigate = useNavigate();

  const selectMenu = (e, tag, willOpen) => {
    e.preventDefault();
    fontAnimation(optionEffectIndex, willOpen);
    linebarAnimation(linebarElemIndex, willOpen);
  };

  const fontAnimation = (tag, willOpen) => {
    if (willOpen) {
      tag.current.style.transform = "translateY(calc(-0.975rem - 4px))";
    } else {
      tag.current.style.transform = "translateY(0)";
    }
  };
  const linebarAnimation = (tag, willOpen) => {
    if (willOpen) {
      tag.current.style.width = "100%";
    } else {
      tag.current.style.width = "0";
    }
  };

  const navigateTo = (arg) => {
    navigate(`/${arg}`);
    if (modalIsOpen) {
      props.burgerModalElem.current.style.transform = "translateY(-100vh)";
      props.setModalIsOpen(false);
    }
  };

  if (
    props.pathname === "/gaelle-boucherit" &&
    linebarSelectedOptionRef.current
  ) {
    linebarSelectedOptionRef.current.classList.add("active");
  } else if (linebarSelectedOptionRef.current) {
    linebarSelectedOptionRef.current.classList.remove("active");
  }

  return (
    <div className="b-navbar-home-button-wrapper">
      <div className="b-navbar-main-home-button">
        <div
          className="b-navbar-option-btn-container-index"
          onMouseEnter={(e) => selectMenu(e, "index", true)}
          onMouseLeave={(e) => selectMenu(e, "index", false)}
          onClick={() => navigateTo("gaelle-boucherit")}
        >
          <div className="b-navbar-option__btn">
            <span className="b-navbar-option__btn__first-span">
              GAËLLE BOUCHERIT
            </span>
            <div className="b-navbar-option__effect" ref={optionEffectIndex}>
              <span>GAËLLE BOUCHERIT</span>
              <span>GAËLLE BOUCHERIT</span>
            </div>
          </div>
          <div className="b-navbar-option__linebar_effect-container home">
            <div
              className="b-navbar-option__linebar_effect home"
              ref={linebarElemIndex}
            ></div>
          </div>
          <div className="b-navbar-option__linebar_effect-container home">
            <div
              className="b-navbar-option__linebar_selected_option"
              ref={linebarSelectedOptionRef}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarHomeButton;
