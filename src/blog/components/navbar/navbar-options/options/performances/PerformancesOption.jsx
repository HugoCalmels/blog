import "./PerformancesOption.scss"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
const PerformancesOption = (props) => {

  const navigate = useNavigate()
  const openMenu = async () => {
    const menuElem = document.querySelector(
      ".b-navbar-performances-opened-menu-list"
    );
    const menuLiElems = document.querySelectorAll(
      ".b-navbar-performances-opened-menu-unit"
    );
    let overlay = document.querySelector(".b-navbar-overlay");
    if (props.menuOpenedDessins === true) {
      const dessinsMenuElem = document.querySelector('.b-navbar-dessins-opened-menu-list')
      dessinsMenuElem.classList.remove('active')
      dessinsMenuElem.style.width = "0px"
      dessinsMenuElem.style.height = "0px"
      props.setMenuOpenedDessins(false)
    }
  
    setTimeout(() => {
   
      animateMenuForward(menuElem);
    }, 5);
    menuElem.classList.add("active");
    overlay.style.display = "block";
    props.setMenuOpenedPerformances(true);

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
          }, 400);
         
        });
        
      });
     
    })
    await aPromise
 
  };

  const closeMenu = () => {
    const menuElem = document.querySelector(
      ".b-navbar-performances-opened-menu-list"
    );
    const menuLiElems = document.querySelectorAll(
      ".b-navbar-performances-opened-menu-unit"
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
    props.setMenuOpenedPerformances(false);
  };

  const animateMenuForward = (elem) => {
    elem.style.opacity = "1";
    elem.style.width = "180px";
    elem.style.height = "90px";
    props.setMenuOpenedPerformances(true);
  };


  const toggleMenu = () => {
    if (props.menuOpenedPerformances === false) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  useEffect(() => {
    const overlay = document.querySelector(".b-navbar-overlay");
    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("TEST");
      closeMenu();
    });
  });

  const navigateToPerformancesSolo = () => {
    closeMenu()
    navigate('/gaelle-boucherit/performances/solo')
  }
  const navigateToPerformancesGroup = () => {
    closeMenu()
    navigate('/gaelle-boucherit/performances/à-plusieurs')
  }

  
  return (
    <>
      <li className="b-navbar-option-container">
        <div className="b-navbar-option">
          <span  >Performances</span>
      
            
        
   
        </div>

        
       
      </li>
    </>
  )
}

export default PerformancesOption