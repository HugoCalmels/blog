import "./ImagesReader.scss";
import { useEffect, useState, useRef } from "react";
import customChevron from "../../../../../assets/icons/chevronDroit.png";
import closeMenuIcon from "../../../../../assets/icons/xCloseIcon.png";
import ImagesReaderCategory from "./ImagesReaderCategory"
const ImagesReader = (props) => {
  const [defaultCurrentIndex, setDefaultCurrentIndex] = useState("");
  const readerMain = useRef(null);
  const paginateLeft = useRef(null);
  const paginateRight = useRef(null);



  const closeMenu = () => {
    props.imagesReaderElement.current.style.display = "none";
    props.leftBarTriggerBtnElem.current.classList.remove("inactive")
  };

  useEffect(() => {
    if (props.defaultCustomIndex !== "") {
      readerMain.current.style.transform = `translateX(-${
        100 * props.defaultCustomIndex - 100
      }vw)`;
      setDefaultCurrentIndex(props.defaultCustomIndex);
    }
  }, [props.defaultCustomIndex]);

  let spacing = -100;
  const addDistance = () => {
    spacing += 100;
    return spacing;
  };

  const paginateForward = (e) => {
    e.preventDefault();
    readerMain.current.style.transform = `translateX(-${
      defaultCurrentIndex * 100
    }vw)`;
    setDefaultCurrentIndex(defaultCurrentIndex + 1);
  };
  const paginateBackward = (e) => {
    e.preventDefault();
    setDefaultCurrentIndex(defaultCurrentIndex - 1);
    readerMain.current.style.transform = `translateX(-${
      (defaultCurrentIndex - 2) * 100
    }vw)`;
  };

  useEffect(() => {
    displayRightAndLeftPaginationBtns(defaultCurrentIndex);
  }, [defaultCurrentIndex]);

  const displayRightAndLeftPaginationBtns = (index) => {
    if (index === 1) {
      paginateLeft.current.style.display = "none";
    } else {
      paginateLeft.current.style.display = "block";
    }
    if (index > props.totalImagesCount - 1) {
      paginateRight.current.style.display = "none";
    } else {
      paginateRight.current.style.display = "block";
    }
  };

  console.log("REALLY FROM IMAGES READER")
  console.log(props.images)
  console.log("REALLY FROM IMAGES READER")


  return (
    <div className="bd-images-reader" ref={props.imagesReaderElement}>
      <div className="bd-images-reader-carrousel">
        <div className="bd-images-reader-main" ref={readerMain}>
          {props.images.map((category) => (
          <>
              <ImagesReaderCategory
                arg={props.arg}
                category={category}
                addDistance={addDistance}
              />
            </>
          ))}
        </div>

        <div className="bd-images-reader-chevron left" ref={paginateLeft}>
          <img
            src={customChevron}
            id="chevron-left"
            alt="chevron"
            onClick={(e) => paginateBackward(e)}
          />
        </div>
        <div className="bd-images-reader-chevron right" ref={paginateRight}>
          <img
            src={customChevron}
            id="chevron-right"
            alt="chevron"
            onClick={(e) => paginateForward(e)}
          />
        </div>
        <div className="bd-images-reader-close-modal" onClick={closeMenu}>
          <img src={closeMenuIcon} alt="close" />
        </div>
      </div>
    </div>
  );
};

export default ImagesReader;
