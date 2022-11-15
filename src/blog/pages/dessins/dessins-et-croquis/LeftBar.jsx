import "./LeftBar.scss";

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



  return (
    <div className="bd-left-bar">

      <div className="bdl-create-year" onClick={toggleModalCreateYearDisplay}>
        <h5>Créer/supprimer une année</h5>
      </div>
      <div className="bdl-create-photo" onClick={toggleModalCreatePhotoDisplay}>
        <h5>Créer une photo</h5>
      </div>
      <div className="bdl-create-photo">
        <h5>Demasquer les images</h5>
        <input
          type="checkbox"
          checked={props.unhideImages}
          onChange={(e) => toggleImagesHiding(e)}
        ></input>
      </div>
      <div className="bdl-years-list">
        {props.categories.map((category) => (
          <h5
            key={category.id}
            onClick={() => props.scrollToElement(category.title)}
          >
            {category.title}
          </h5>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
