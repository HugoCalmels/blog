import "./LeftBar.scss";
import Cookies from "js-cookie";
import { RxCross1 } from "react-icons/rx";
const LeftBar = (props) => {
  const btnStyle = { color: "#424242", width: "20px", height: "20px" };

  const toggleModalCreateYearDisplay = () => {
    const mainModalElem = document.querySelector(".bdl-create-year-modal");
    const secondaryModalElem = document.querySelector(
      ".bdl-create-photo-modal"
    );
    if (mainModalElem.classList.contains("active")) {
      mainModalElem.classList.remove("active");
    } else {
      mainModalElem.classList.add("active");
    }
    if (secondaryModalElem.classList.contains("active")) {
      secondaryModalElem.classList.remove("active");
    }
  };

  const toggleModalCreatePhotoDisplay = () => {
    const mainModalElem = document.querySelector(".bdl-create-photo-modal");
    const secondaryModalElem = document.querySelector(".bdl-create-year-modal");
    if (mainModalElem.classList.contains("active")) {
      mainModalElem.classList.remove("active");
    } else {
      mainModalElem.classList.add("active");
    }
    if (secondaryModalElem.classList.contains("active")) {
      secondaryModalElem.classList.remove("active");
    }
  };

  const toggleImagesHiding = (e) => {
    props.setHideImages(!props.hideImages);
  };

  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");
  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }


  return (
    <aside className="bd-left-bar" ref={props.leftBarElem}>
      <div
        className="bd-left-bar-btn-to-display-elem"
        onClick={(e) => props.closeLeftBar(e)}
      >
        <h5>Retour</h5>
        <RxCross1 style={btnStyle} />
      </div>

      <div className="bdl-create-year" onClick={toggleModalCreateYearDisplay}>
        <h5>Créer catégorie</h5>
      </div>
      <div className="bdl-create-photo" onClick={toggleModalCreatePhotoDisplay}>
        <h5>Créer image</h5>
      </div>
      <div className="bdl-create-photo hide">
        <h5>Démasquer</h5>
        <input
          type="checkbox"
          checked={!props.hideImages}
          onChange={(e) => toggleImagesHiding(e)}
        ></input>
      </div>
    </aside>
  );
};

export default LeftBar;
