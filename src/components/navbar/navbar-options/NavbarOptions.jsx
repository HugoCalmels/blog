import "./NavbarOptions.scss";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
const NavbarOptions = (props) => {
  const navigate = useNavigate();
  const isAuthCookie = Cookies.get("cie-lutin-isAuth")
    ? JSON.parse(Cookies.get("cie-lutin-isAuth"))
    : null;
  const optionEffectContact = useRef(null);
  const linebarElemContact = useRef(null);
  const optionEffectPartenaires = useRef(null);
  const linebarElemPartenaires = useRef(null);
  const optionEffectPerformances = useRef(null);
  const linebarElemPerformances = useRef(null);
  const optionEffectDessins = useRef(null);
  const linebarElemDessins = useRef(null);
  const optionEffectAdmin = useRef(null);
  const linebarElemAdmin = useRef(null);
  // dropdown
  const dropdownElemDessins = useRef(null);
  const dropdownSubmenuDessins = useRef(null);
  const dropdownSubmenuPaysages = useRef(null);
  const dropdownSubmenuCarnets = useRef(null);

  const dessinsIconContainerElem = useRef(null);
  const linebarElemPhotos = useRef(null);
  const linebarSelectedOptionPhotosRef = useRef(null);
  const linebarSelectedOptionFriendsRef = useRef(null);
  const linebarSelectedOptionPerformancesRef = useRef(null);
  const linebarSelectedOptionAdminRef = useRef(null);
  const linebarSelectedOptionDessinsRef = useRef(null);
  const optionEffectPhotos = useRef(null);

  const linebarSelectedOptionContactRef = useRef(null);

  const selectMenu = (e, tag, willOpen) => {
    e.preventDefault();

    switch (tag) {
      case "contact":
        fontAnimation(optionEffectContact, willOpen);
        linebarAnimation(linebarElemContact, willOpen);
        break;
      case "partenaires":
        fontAnimation(optionEffectPartenaires, willOpen);
        linebarAnimation(linebarElemPartenaires, willOpen);
        break;
      case "performances":
        fontAnimation(optionEffectPerformances, willOpen);
        linebarAnimation(linebarElemPerformances, willOpen);
        break;
      case "dessins":
        fontAnimation(optionEffectDessins, willOpen);
        linebarAnimation(linebarElemDessins, willOpen, tag);
        dropdownAnimation(dropdownElemDessins, willOpen);
        break;
      case "admin":
        fontAnimation(optionEffectAdmin, willOpen);
        linebarAnimation(linebarElemAdmin, willOpen);
        break;
      case "photos":
        fontAnimation(optionEffectPhotos, willOpen);
        linebarAnimation(linebarElemPhotos, willOpen);
        break;
    }
  };

  const fontAnimation = (elem, willOpen) => {
    if (willOpen) {
      elem.current.style.transform = "translateY(calc(-0.975rem - 4px))";
    } else {
      elem.current.style.transform = "translateY(0)";
    }
  };

  const linebarAnimation = (elem, willOpen, tag) => {
    if (willOpen) {
      elem.current.style.width = "100%";
      if (tag) {
        elem.current.style.width = "calc(100% + 20px)";
      }
    } else {
      elem.current.style.width = "0";
    }
  };

  const dropdownAnimation = (tag, willOpen) => {
    if (willOpen) {
      tag.current.style.height = "140px";
      tag.current.style.width = "205px";
      dessinsIconContainerElem.current.classList.add("active");
    } else {
      tag.current.style.height = "0";
      tag.current.style.width = "0";
      dessinsIconContainerElem.current.classList.remove("active");
      // reset submenu
      dropdownSubmenuDessins.current.style.opacity = "1";
      dropdownSubmenuPaysages.current.style.opacity = "1";
      dropdownSubmenuCarnets.current.style.opacity = "1";
    }
  };

  const selectDropdownMenu = (e, tag) => {
    e.preventDefault();

    switch (tag) {
      case "dessins":
        console.log("1");
        dropdownSubmenuDessins.current.style.opacity = "1";
        dropdownSubmenuPaysages.current.style.opacity = ".5";
        dropdownSubmenuCarnets.current.style.opacity = ".5";
        break;
      case "paysages":
        console.log("1");
        dropdownSubmenuDessins.current.style.opacity = ".5";
        dropdownSubmenuPaysages.current.style.opacity = "1";
        dropdownSubmenuCarnets.current.style.opacity = ".5";
        break;
      case "carnets":
        console.log("1");
        dropdownSubmenuDessins.current.style.opacity = ".5";
        dropdownSubmenuPaysages.current.style.opacity = ".5";
        dropdownSubmenuCarnets.current.style.opacity = "1";
        break;
    }
  };

  const navigateTo = (arg) => {
    window.scrollTo({ top: "0px" });
    navigate(`/${arg}`);
  };

  if (linebarSelectedOptionDessinsRef.current) {
    // remove all styles 1st
    linebarSelectedOptionDessinsRef.current.classList.remove("active");

    // linebarSelectedOptionDessinsRef.current.classList.remove("active")
    if (
      props.pathname === "/gaelle-boucherit/dessins-et-croquis" ||
      props.pathname === "/gaelle-boucherit/paysages" ||
      props.pathname === "/gaelle-boucherit/carnets-de-voyages"
    ) {
      linebarSelectedOptionDessinsRef.current.classList.add("active");
    }
  }

  if (linebarSelectedOptionAdminRef.current) {
    linebarSelectedOptionAdminRef.current.classList.remove("active");
    if (props.pathname === "/admin") {
      linebarSelectedOptionAdminRef.current.classList.add("active");
    }
  }

  if (linebarSelectedOptionPhotosRef.current) {
    linebarSelectedOptionPhotosRef.current.classList.remove("active");
    if (props.pathname === "/gaelle-boucherit/photos") {
      linebarSelectedOptionPhotosRef.current.classList.add("active");
    }
  }

  if (linebarSelectedOptionPerformancesRef.current) {
    linebarSelectedOptionPerformancesRef.current.classList.remove("active");
    if (props.pathname === "/gaelle-boucherit/performances") {
      linebarSelectedOptionPerformancesRef.current.classList.add("active");
    }
  }

  if (linebarSelectedOptionFriendsRef.current) {
    linebarSelectedOptionFriendsRef.current.classList.remove("active");
    if (props.pathname === "/gaelle-boucherit/coups-de-coeur") {
      linebarSelectedOptionFriendsRef.current.classList.add("active");
    }
  }

  if (linebarSelectedOptionContactRef.current) {
    linebarSelectedOptionContactRef.current.classList.remove("active");
    if (props.pathname === "/gaelle-boucherit/contact") {
      linebarSelectedOptionContactRef.current.classList.add("active");
    }
  }

  return (
    <ul className="b-nabvar-options-list">
      {isAuthCookie === true ? (
        <li
          className="b-navbar-option-btn-container admin"
          onMouseEnter={(e) => selectMenu(e, "admin", true)}
          onMouseLeave={(e) => selectMenu(e, "admin", false)}
          onClick={() => navigateTo("admin")}
        >
          <div className="b-navbar-option__btn">
            <span className="b-navbar-option__btn__first-span">ADMIN</span>
            <div className="b-navbar-option__effect" ref={optionEffectAdmin}>
              <span>ADMIN</span>
              <span>ADMIN</span>
            </div>
          </div>
          <div className="b-navbar-option__linebar_effect-container">
            <div
              className="b-navbar-option__linebar_effect"
              ref={linebarElemAdmin}
            ></div>
          </div>
          <div className="b-navbar-option__linebar_effect-container">
            <div
              className="b-navbar-option__linebar_selected_option"
              ref={linebarSelectedOptionAdminRef}
            ></div>
          </div>
        </li>
      ) : (
        <></>
      )}

      <li
        className="b-navbar-option-btn-container dessins"
        onMouseEnter={(e) => selectMenu(e, "dessins", true)}
        onMouseLeave={(e) => selectMenu(e, "dessins", false)}
      >
        <div className="b-navbar-option-icon" ref={dessinsIconContainerElem}>
          <SlArrowDown />
        </div>
        <div className="b-navbar-option__btn">
          <span className="b-navbar-option__btn__first-span">DESSINS</span>
          <div className="b-navbar-option__effect" ref={optionEffectDessins}>
            <span>DESSINS</span>
            <span>DESSINS</span>
          </div>
        </div>

        <div className="b-navbar-option__linebar_effect-container dessins">
          <div
            className="b-navbar-option__linebar_effect dessins"
            ref={linebarElemDessins}
          ></div>
        </div>
        <div className="b-navbar-option__linebar_effect-container selected-dessins">
          <div
            className="b-navbar-option__linebar_selected_option dessins"
            ref={linebarSelectedOptionDessinsRef}
          ></div>
        </div>
        <div
          className="b-navbar-option-dessins__dropdown"
          ref={dropdownElemDessins}
        >
          <div
            className="dessins__dropdown-menu"
            onMouseEnter={(e) => selectDropdownMenu(e)}
          >
            <a
              ref={dropdownSubmenuDessins}
              onClick={() => navigateTo("gaelle-boucherit/dessins-et-croquis")}
            >
              DESSINS ET CROQUIS
            </a>
            <a
              ref={dropdownSubmenuPaysages}
              onClick={() => navigateTo("gaelle-boucherit/paysages")}
            >
              PAYSAGES
            </a>
            <a
              ref={dropdownSubmenuCarnets}
              onClick={() => navigateTo("gaelle-boucherit/carnets-de-voyages")}
            >
              CARNETS DE VOYAGES
            </a>
          </div>
        </div>
      </li>
      <li
        className="b-navbar-option-btn-container"
        onMouseEnter={(e) => selectMenu(e, "photos", true)}
        onMouseLeave={(e) => selectMenu(e, "photos", false)}
        onClick={() => navigateTo("gaelle-boucherit/photos")}
      >
        <div className="b-navbar-option__btn">
          <span className="b-navbar-option__btn__first-span">PHOTOS</span>
          <div className="b-navbar-option__effect" ref={optionEffectPhotos}>
            <span>PHOTOS</span>
            <span>PHOTOS</span>
          </div>
        </div>
        <div className="b-navbar-option__linebar_effect-container">
          <div
            className="b-navbar-option__linebar_effect"
            ref={linebarElemPhotos}
          ></div>
        </div>
        <div className="b-navbar-option__linebar_effect-container photos">
          <div
            className="b-navbar-option__linebar_selected_option photos"
            ref={linebarSelectedOptionPhotosRef}
          ></div>
        </div>
      </li>
      <li
        className="b-navbar-option-btn-container"
        onMouseEnter={(e) => selectMenu(e, "performances", true)}
        onMouseLeave={(e) => selectMenu(e, "performances", false)}
        onClick={() => navigateTo("gaelle-boucherit/performances")}
      >
        <div className="b-navbar-option__btn">
          <span className="b-navbar-option__btn__first-span">PERFORMANCES</span>
          <div
            className="b-navbar-option__effect"
            ref={optionEffectPerformances}
          >
            <span>PERFORMANCES</span>
            <span>PERFORMANCES</span>
          </div>
        </div>
        <div className="b-navbar-option__linebar_effect-container">
          <div
            className="b-navbar-option__linebar_effect"
            ref={linebarElemPerformances}
          ></div>
        </div>
        <div className="b-navbar-option__linebar_effect-container perfs">
          <div
            className="b-navbar-option__linebar_selected_option perfs"
            ref={linebarSelectedOptionPerformancesRef}
          ></div>
        </div>
      </li>
      <li
        className="b-navbar-option-btn-container"
        onMouseEnter={(e) => selectMenu(e, "partenaires", true)}
        onMouseLeave={(e) => selectMenu(e, "partenaires", false)}
        onClick={() => navigateTo("gaelle-boucherit/coups-de-coeur")}
      >
        <div className="b-navbar-option__btn">
          <span className="b-navbar-option__btn__first-span">
            COUPS DE COEUR
          </span>
          <div
            className="b-navbar-option__effect"
            ref={optionEffectPartenaires}
          >
            <span>COUPS DE COEUR</span>
            <span>COUPS DE COEUR</span>
          </div>
        </div>
        <div className="b-navbar-option__linebar_effect-container">
          <div
            className="b-navbar-option__linebar_effect"
            ref={linebarElemPartenaires}
          ></div>
        </div>
        <div className="b-navbar-option__linebar_effect-container friends">
          <div
            className="b-navbar-option__linebar_selected_option friends"
            ref={linebarSelectedOptionFriendsRef}
          ></div>
        </div>
      </li>

      <li
        className="b-navbar-option-btn-container contact"
        onMouseEnter={(e) => selectMenu(e, "contact", true)}
        onMouseLeave={(e) => selectMenu(e, "contact", false)}
        onClick={() => navigateTo("gaelle-boucherit/contact")}
      >
        <div className="b-navbar-option__btn">
          <span className="b-navbar-option__btn__first-span">CONTACT</span>
          <div className="b-navbar-option__effect" ref={optionEffectContact}>
            <span>CONTACT</span>
            <span>CONTACT</span>
          </div>
        </div>
        <div className="b-navbar-option__linebar_effect-container">
          <div
            className="b-navbar-option__linebar_effect"
            ref={linebarElemContact}
          ></div>
        </div>
        <div className="b-navbar-option__linebar_effect-container friends">
          <div
            className="b-navbar-option__linebar_selected_option friends"
            ref={linebarSelectedOptionContactRef}
          ></div>
        </div>
      </li>
      <li className="b-navbar-option-btn-container newsletter">
        <button
          className="b-navbar-subscribe-newsletter-open-btn"
          onMouseEnter={(e) => selectMenu(e, "newsletter", true)}
          onMouseLeave={(e) => selectMenu(e, "newsletter", false)}
          onClick={() => navigateTo("gaelle-boucherit/newsletter")}
        >
          NEWSLETTER
        </button>
      </li>
    </ul>
  );
};

export default NavbarOptions;
