import "./DessinsOption.scss";

import { useEffect, useRef, useState } from "react";
const DessinsOption = () => {

  let menuOpened = false;

  const openMenu = () => {
    if (menuOpened === false) {
      console.log("why does this ttrigger ?????????????");
      let dessinsTextElem = document.querySelectorAll(
        ".b-navbar-dessins-opened-menu-unit.dessins span"
      );
      let paysagesTextElem = document.querySelectorAll(
        ".b-navbar-dessins-opened-menu-unit.paysages span"
      );
      let carnetsTextElem = document.querySelectorAll(
        ".b-navbar-dessins-opened-menu-unit.carnets span"
      );
      let menuLiElems = document.querySelectorAll(
        ".b-navbar-dessins-opened-menu-unit"
      );

      let menuElem = document.querySelector(
        ".b-navbar-dessins-opened-menu-list"
      );
      let overlay = document.querySelector(".b-navbar-overlay");

      menuElem.classList.add("active");

      const timeout = setTimeout(() => {
        menuElem.style.opacity = "1";
        menuElem.style.width = "175px";
        menuElem.style.height = "126px";

        let indexDessins = 0;
        let indexPaysages = 0;
        let indexCarnets = 0;

        setTimeout(() => {
          setInterval(() => {
            if (dessinsTextElem[indexDessins] !== undefined) {
              dessinsTextElem[indexDessins].style.opacity = "1";
              dessinsTextElem[indexDessins].style.display = "block";
            }
     
      
  
            indexDessins += 1;
          }, 20);
        }, 200)
      
        setTimeout(() => {
          setInterval(() => {
            if (paysagesTextElem[indexPaysages] !== undefined) {
              paysagesTextElem[indexPaysages].style.opacity = "1";
              paysagesTextElem[indexPaysages].style.display = "block";
            }
            indexPaysages += 1;
          }, 20)
        }, 300)
   

        setTimeout(() => {
          setInterval(() => {
            if (carnetsTextElem[indexCarnets] !== undefined) {
              carnetsTextElem[indexCarnets].style.opacity = "1";
              carnetsTextElem[indexCarnets].style.display = "block";
            }
            indexCarnets += 1;
          }, 20)
        },400)
      
        menuOpened = true;
        overlay.style.display = "block";
      }, 400);
    }
  };

  const closeMenu = () => {
    let menuElem = document.querySelector(".b-navbar-dessins-opened-menu-list");

    let dessinsTextElem = document.querySelectorAll(
      ".b-navbar-dessins-opened-menu-unit.dessins span"
    );
    let paysagesTextElem = document.querySelectorAll(
      ".b-navbar-dessins-opened-menu-unit.paysages span"
    );

    let carnetsTextElem = document.querySelectorAll(
      ".b-navbar-dessins-opened-menu-unit.carnets span"
    );
    let overlay = document.querySelector(".b-navbar-overlay");

    menuElem.style.opacity = "0";
    menuElem.style.width = "0px";
    menuElem.style.height = "0px";
    dessinsTextElem.forEach((elem) => {
      elem.style.opacity = "0";
      elem.style.display ="none"
    });
    paysagesTextElem.forEach((elem) => {
      elem.style.opacity = "0";
      elem.style.display ="none"
    });
    carnetsTextElem.forEach((elem) => {
      elem.style.opacity = "0";
      elem.style.display ="none"
    });

    setTimeout(() => {
      menuElem.classList.remove("active");
      menuOpened = false;
      overlay.style.display = "none";
    }, 300);
  };

  const toggleMenu = () => {
    if (menuOpened === false) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  useEffect(() => {
    const overlay = document.querySelector(".b-navbar-overlay");
    overlay.addEventListener("click", () => {
      closeMenu();
    });
  });

  return (
    <>
      <li className="b-navbar-option" onClick={toggleMenu}>
        <span>Dessins</span>
        <ul className="b-navbar-dessins-opened-menu-list">
          <li
            className="b-navbar-dessins-opened-menu-unit dessins"
          >
            <span>D</span>
            <span>e</span>
            <span>s</span>
            <span>s</span>
            <span>i</span>
            <span>n</span>
            <span>s</span>
            <span>&nbsp;</span>
            <span>e</span>
            <span>t</span>
            <span>&nbsp;</span>
            <span>c</span>
            <span>r</span>
            <span>o</span>
            <span>q</span>
            <span>u</span>
            <span>i</span>
            <span>s</span>
          </li>
          <li
            className="b-navbar-dessins-opened-menu-unit paysages"
          >
            <span>P</span>
            <span>a</span>
            <span>y</span>
            <span>s</span>
            <span>a</span>
            <span>g</span>
            <span>e</span>
            <span>s</span>
          </li>
          <li
            className="b-navbar-dessins-opened-menu-unit carnets"
          >
            <span>C</span>
            <span>a</span>
            <span>r</span>
            <span>n</span>
            <span>e</span>
            <span>t</span>
            <span>s</span>
            <span>&nbsp;</span>
            <span>d</span>
            <span>e</span>
            <span>&nbsp;</span>
            <span>v</span>
            <span>o</span>
            <span>y</span>
            <span>a</span>
            <span>g</span>
            <span>e</span>
            <span>s</span>
          </li>
        </ul>
      </li>
    </>
  );
};

export default DessinsOption;
