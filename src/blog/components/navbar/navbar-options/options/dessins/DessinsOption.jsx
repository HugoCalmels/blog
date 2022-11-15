import "./DessinsOption.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const DessinsOption = (props) => {

  const navigate = useNavigate()

  const [menuIsBeingOpened, setMenuIsBeingOpened] = useState(false)

  const openMenu = async (number) => {
    setMenuIsBeingOpened(true)
    const menuElem = document.querySelector(
      ".b-navbar-dessins-opened-menu-list"
    );
    const menuLiElems = document.querySelectorAll(
      ".b-navbar-dessins-opened-menu-unit"
    );
    let overlay = document.querySelector(".b-navbar-overlay");
    if (props.menuOpenedPerformances === true) {
      const performancesMenuElem = document.querySelector('.b-navbar-performances-opened-menu-list')
      performancesMenuElem.classList.remove('active')
      performancesMenuElem.style.width = "0px"
      performancesMenuElem.style.height = "0px"
      props.setMenuOpenedPerformances(false)
    }
  
    setTimeout(() => {
   
      animateMenuForward(menuElem);
    }, 5);
    menuElem.classList.add("active");
    overlay.style.display = "block";
    props.setMenuOpenedDessins(true);

    // reset text
    menuLiElems.forEach((el) => {
      el.style.display = "none";
      el.style.opacity = "0";
    })

    const aPromise = new Promise((accept) => {
      setTimeout(() => {
        menuLiElems.forEach((elem) => {
          elem.style.display = "flex";
          setTimeout(() => {
            elem.style.opacity = "1";
            accept()
            setMenuIsBeingOpened(false)
          }, 400);
         
        });
        
      });
     
    })
    await aPromise
 
  };

  const animateMenuForward = (elem) => {
    elem.style.opacity = "1";
    elem.style.width = "180px";
    elem.style.height = "126px";
    props.setMenuOpenedDessins(true);
  };

  const closeMenu = () => {
    const menuElem = document.querySelector(
      ".b-navbar-dessins-opened-menu-list"
    );
    const menuLiElems = document.querySelectorAll(
      ".b-navbar-dessins-opened-menu-unit"
    );
    let overlay = document.querySelector(".b-navbar-overlay");
    overlay.style.display = "none";
    menuElem.style.opacity = "0";
    menuElem.style.width = "0px";
    menuElem.style.height = "0px";

    menuLiElems.forEach((elem) => {
      elem.style.opacity = "0";
      setTimeout(() => {
        elem.style.display = "none";
      }, 50);
    });
    props.setMenuOpenedDessins(false);
  };

  const toggleMenu = (e) => {
    if (props.menuOpenedDessins === false) {
      
      openMenu();
    } else {
      closeMenu();
    }
  };

  useEffect(() => {
    const overlay = document.querySelector(".b-navbar-overlay");
    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("TEST");
      closeMenu();
    });
  });

  const navigateToCroquis = () => {
    closeMenu()
    navigate('/gaelle-boucherit/dessins-et-croquis')
  }
  const navigateToPaysages = () => {
    closeMenu()
    navigate('/gaelle-boucherit/paysages')
  }

  const navigateToCarnets = () => {
    closeMenu()
    navigate('/gaelle-boucherit/carnets-de-voyages')
  }


  return (
    <>
      <li className="b-navbar-option-container">
        <div className="b-navbar-option dessins" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
          <span>Dessins</span>
          <ul className="b-navbar-dessins-opened-menu-list">
          <li className="b-navbar-dessins-opened-menu-unit dessins" onClick={navigateToCroquis}>
            Dessins et croquis
          </li>
          <li className="b-navbar-dessins-opened-menu-unit paysages"onClick={navigateToPaysages}>
            Paysages
          </li>
          <li className="b-navbar-dessins-opened-menu-unit carnets"onClick={navigateToCarnets}>
            Carnets de voyages
          </li>
        </ul>
        </div>
        
      </li>
    </>
  );
};

export default DessinsOption;
