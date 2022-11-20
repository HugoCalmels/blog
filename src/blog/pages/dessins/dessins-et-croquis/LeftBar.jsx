import "./LeftBar.scss";
import Cookies from "js-cookie";
const LeftBar = (props) => {
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
    props.setUnhideImages(!props.unhideImages);
  };

  let cookieIsAuth = false
  const cookie = Cookies.get("cie-lutin-isAuth")
  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie)
  }
 


  console.log("LLLLLLLLLLLLLLLLLLLLLLLL")
  console.log(cookie)
  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL")

  return (
    <div className="bd-left-bar">

      {cookieIsAuth === true  ?
        <>
          <div className="bdl-create-year" onClick={toggleModalCreateYearDisplay}>
        <h5>Créer une catégorie</h5>
      </div>
      <div className="bdl-create-photo" onClick={toggleModalCreatePhotoDisplay}>
        <h5>Créer une image</h5>
      </div>
      <div className="bdl-create-photo hide">
        <h5>Démasquer</h5>
        <input
          type="checkbox"
          checked={props.unhideImages}
          onChange={(e) => toggleImagesHiding(e)}
        ></input>
      </div>
        </>
        :
        <></>
      }
      
      <div className="bdl-years-list">
        {props.categories.map((category) => (
          <h5
            key={category.id}
            onClick={() => props.displaySelectedCategory(category.title)}
          >
            {category.title}
          </h5>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
