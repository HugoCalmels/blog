import { useEffect, useRef } from "react";
import "./EditCarrousel.scss";
import { resizeImages } from "../../../../utils/resizeImages";
import { useState } from "react";
import crossIcon from "../../../../assets/icons/xCloseIcon.png"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const EditCarrousel = (props) => {
  const [optionSelected, setOptionSelected] = useState(0);

  const tryToEditImage = (e, index) => {
    e.preventDefault();
    resizeImages(e.target[1].files[0]).then((imageFile) => {
      const data = new FormData();
      data.append("home_temp_image[image]", imageFile);
      submitImageToAPI(data).then((res) => {
        editImageAPI(res, index);
      });
    });
  };

  const submitImageToAPI = async (newImage) => {
    const test1 = await fetch(`${BASE_URL}/api/v1/home_temp_images`, {
      method: "POST",
      body: newImage,
    });
    console.log("/////");
    console.log(test1);
    const res = await fetch(`${BASE_URL}/api/v1/home-latest`, {
      method: "GET",
    });
    const data = await res.json();

    return data;
  };

  const editImageAPI = async (newImage, index) => {
    const body = {
      home: {
        image_url: newImage.image_url,
      },
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(
      `${BASE_URL}/api/v1/homes/${optionSelected + 1}`,
      config
    );
    const data = await res.json();
    window.location.reload(false);
  };

  /*
  const tryToSubmitImage = (e) => {
    e.preventDefault();

    resizeImages(e.target[0].files[0]).then((imageFile) => {
      const data = new FormData();
      data.append("home_temp_image[image]", imageFile);
      submitImageToAPI(data)
        .then((res) => {
          postImageAPI(res)
        })

    });
  }



  
*/

  return (
    <div className="b-index-carrousel-edit-modal" ref={props.editCarrouselRef}>
      <h4>Editer carrousel</h4>
      <div
        className="b-index-carrousel-edit-modal-close-btn"
        onClick={(e) => props.closeEditModal(e)}
      >
        <img src={crossIcon} alt="close edit modal"/>
      </div>
      <form
        className="b-index-carrousel-edit-form"
        onSubmit={(e) => tryToEditImage(e)}
      >
        <div className="b-index-carrousel-edit-input">
          <label htmlFor="home-carrousel-image-edit">1. Selection image</label>
          <select
            id="b-index-carrousel-edit-options"
            onChange={(e) => setOptionSelected(e.target.selectedIndex)}
          >
            {props.carrouselArray.homes &&
              props.carrouselArray.homes.map((image, index) => (
                <option
                  className="bdl-custom-select-destroy"
                  key={index}
                  //data-id={image.id}
                >
                  image #{index + 1}
                </option>
              ))}
          </select>
        </div>

        <div className="b-index-carrousel-edit-input">
          <label htmlFor="home-carrousel-image-edit">2. Upload image</label>
          <input
            type="file"
            id="home-carrousel-image-edit"
            name="home-carrousel-image-edit"
          ></input>
        </div>

        <div className="b-index-carrousel-edit-input send">
          <input type="submit" value="valider" />
        </div>
      </form>
    </div>
  );
};

export default EditCarrousel;
