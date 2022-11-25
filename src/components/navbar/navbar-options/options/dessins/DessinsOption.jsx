import "./DessinsOption.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const DessinsOption = (props) => {

  const navigate = useNavigate()
  const [menuIsBeingOpened, setMenuIsBeingOpened] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const hidenMenuDessinsElem = useRef(null)

  const openMenu = async (e) => {

      setMenuIsBeingOpened(true)
      const menuElem = document.querySelector(
        ".b-navbar-dessins-opened-menu-list"
      );
      const menuLiElems = document.querySelectorAll(
        ".b-navbar-dessins-opened-menu-unit"
      );
      let overlay = document.querySelector(".b-navbar-overlay");
     
    
      setTimeout(() => {
     
        animateMenuForward(menuElem);
      }, 5);
      //menuElem.style.padding = "8px";
        //menuElem.style.top = "28px";
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
              //setMenuIsBeingOpened(false)
              setMenuIsOpen(true)
            }, 200);
           
          });
          
        });
       
      })
      await aPromise

      



    
 
  };

  const animateMenuForward = (elem) => {
    elem.style.opacity = "1";
    elem.style.width = "180px";
    elem.style.height = "126px";
    elem.style.width = "250px";
    elem.style.height = "160px";
    props.setMenuOpenedDessins(true);
  };

  const closeMenu = (e) => {
    e.preventDefault();

      const menuElem = document.querySelector(
        ".b-navbar-dessins-opened-menu-list"
      );
      const menuLiElems = document.querySelectorAll(
        ".b-navbar-dessins-opened-menu-unit"
      );
      let overlay = document.querySelector(".b-navbar-overlay");
      overlay.style.display = "none";
      menuElem.style.opacity = "1";
      menuElem.style.width = "0px";
    menuElem.style.height = "0px";


        
      menuLiElems.forEach((elem) => {
        //elem.style.opacity = "0";
        setTimeout(() => {
          //elem.style.display = "none";
          menuElem.style.padding = "0px";
          //menuElem.style.top = "0px";
          setMenuIsOpen(false)
        }, 100);
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

  const navigateToCroquis = (e) => {
    closeMenu(e)
    navigate('/gaelle-boucherit/dessins-et-croquis')
  }
  const navigateToPaysages = (e) => {
    closeMenu(e)
    navigate('/gaelle-boucherit/paysages')
  }

  const navigateToCarnets = (e) => {
    closeMenu(e)
    navigate('/gaelle-boucherit/carnets-de-voyages')
  }

  const navigateToAdmin = (e) => {
    closeMenu(e)
    navigate('/admin')
  }


  const testMouseMove = (e) => {
    console.log("MOUSE MOVE")
    console.log("MOUSE MOVE")
    console.log("MOUSE MOVE")
    console.log(e)
    console.log(e.target.className)
    console.log("MOUSE MOVE")
    console.log("MOUSE MOVE")
    if (menuIsOpen === false && e.target.id === "dessin__nav__btn_option_list") {
      openMenu()
    }
  }

//testToggleMenu
  // onMouseEnter={(e)=>openMenu(e)} onMouseLeave={(e)=>closeMenu(e)}
  return (
    <>
      <li className="b-navbar-option-container" >
        <div className="b-navbar-option dessins" onMouseEnter={(e)=>openMenu(e)} onMouseLeave={(e)=>closeMenu(e)}>
          <span id="dessin__nav__btn_option_list"  >Dessins</span>
          <div className="b-navbar-dessins-opened-menu-list">
        
          <ul id="b-navbar-dropdown-menu" ref={hidenMenuDessinsElem}>
          <li className="b-navbar-dessins-opened-menu-unit dessins" onClick={navigateToCroquis}>
            <span>Dessins et croquis</span>
          </li>
          <li className="b-navbar-dessins-opened-menu-unit paysages"onClick={navigateToPaysages}>
          <span>Paysages</span>
          </li>
          <li className="b-navbar-dessins-opened-menu-unit carnets"onClick={navigateToCarnets}>
          <span>Carnets de voyages</span>
          </li>
            </ul>
            </div>
        </div>
        <div className="b-navbar-dropdown-menu-2">
       
        </div>
      </li>
    </>
  );
};

export default DessinsOption;
