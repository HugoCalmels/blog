import { useState, useContext, useRef } from "react";
import "./CreatePhoto.scss";
import { ImagesContext } from "../../../../context/ImagesContext";
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import imageCompression from "browser-image-compression";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const CreatePhoto = (props) => {

  const [imageRef, setImageRef] = useState(0);
  const [imageTitle, setImageTitle] = useState("");
  const [imageMaterial, setImageMaterial] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const formCreatePhoto = useRef(null);
  const modalCreatePhoto = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    resizeImageFunction(e.target[1].files[0]).then((imageFile) => {
      const data = new FormData();
      if (props.arg === "dessins"){
        data.append("dessin_temp_image[image]", imageFile);
      } else if (props.arg === "paysages"){
        data.append("paysage_temp_image[image]", imageFile);
      }

      let getSelects = document.querySelectorAll(".bdl-custom-select");
      const foundSelect = Array.from(getSelects).filter(
        (select) => select.value == e.target[0].value
      );
      const categoryID = foundSelect[0].dataset.id;
      createTempImage(data).then((data) => {
        createImage(data, categoryID);
      });
    });
  };

  const resizeImageFunction = async (file) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 4000,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  };

  const createTempImage = async (data) => {

    if (props.arg === "dessins") {
      await fetch(`${BASE_URL}/api/v1/dessin_temp_images`, {
        method: "POST",
        body: data,
      });
    } else if (props.arg === "paysages") {
      await fetch(`${BASE_URL}/api/v1/paysage_temp_images`, {
        method: "POST",
        body: data,
      });
    }
    // get latest image
    let latestImageResponse
    if (props.arg === "dessins") {
      latestImageResponse = await fetch(`${BASE_URL}/api/v1/dessin-latest`);
    } else if (props.arg === "paysages") {
      latestImageResponse = await fetch(`${BASE_URL}/api/v1/paysage-latest`);
    }
    const latestImage = await latestImageResponse.json();
    return latestImage;
  };

  const createImage = async (image, categoryID) => {
    let body
    if (props.arg === "dessins"){
      body = {
        dessin: {
          dessin_category_id: categoryID,
          image_url: image.image_url,
          title: imageTitle,
          ref: imageRef,
          material: imageMaterial,
          width: imageWidth,
          height: imageHeight,
        },
      };
    } else if (props.arg === "paysages") {
      body = {
        paysage: {
          paysage_category_id: categoryID,
          image_url: image.image_url,
          title: imageTitle,
          ref: imageRef,
          material: imageMaterial,
          width: imageWidth,
          height: imageHeight,
        },
      };
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    let res
    if (props.arg === "dessins") {
      res = await fetch(
        `${BASE_URL}/api/v1/dessin_categories/${categoryID}/dessins`,
        config
      );
    } else if (props.arg === "paysages") {
      res = await fetch(
        `${BASE_URL}/api/v1/paysage_categories/${categoryID}/paysages`,
        config
      );
    }
    const data = await res.json();
    let subArrayToChange = value.map((category) => {
      if (props.arg === "dessins") {
        if (category.id === data.dessin_category_id) {
          category.dessins.push(data);
          return category;
        } else {
          return category;
        }
      } else if (props.arg === "paysages") {
        if (category.id === data.paysage_category_id) {
          category.paysages.push(data);
          return category;
        } else {
          return category;
        }
      }

     
    });
    formCreatePhoto.current.reset();
    modalCreatePhoto.current.classList.remove("active");
    setValue(subArrayToChange);
  };

  const closeModal = () => {
    const modal = document.querySelector(".bdl-create-photo-modal");
    modal.classList.remove("active");
  };

  const { value, setValue } = useContext(ImagesContext);
  const submitInput = useRef(null);

  if (
    imageWidth !== "" &&
    imageHeight !== "" &&
    imageTitle !== "" &&
    imageRef !== "" &&
    submitInput.current !== null
  ) {
    // weak filter to disable send btn
    submitInput.current.disabled = false;
  } else if (submitInput.current !== null) {
    submitInput.current.disabled = true;
  }

  return (
    <div className="bdl-create-photo-modal" ref={modalCreatePhoto}>
      <h5>Créer une image</h5>
      <div className="bdl-create-photo-close" onClick={closeModal}>
        <img src={xCloseIcon} alt="close photo creation" />
      </div>
      <form
        className="bdl-create-photo-form"
        onSubmit={(e) => handleSubmit(e)}
        ref={formCreatePhoto}
      >
        <div className="bdl-create-photo-form-input">
          <label>1.Sélectionner une catégorie</label>

          <select id="select-categories">
            {props.categories && props.categories.length > 0 && props.categories.map((category) => (
              <option
                className="bdl-custom-select"
                key={category.id}
                data-id={category.id}
              >
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="bdl-create-photo-form-input">
          <label htmlFor="dessin-image">2. Upload de l'image</label>
          <input type="file" id="dessin-image" name="dessin-image"></input>
        </div>

        <div className="bdl-create-photo-form-input">
          <label>3. Titre de l'image</label>
          <input
            type="text"
            onChange={(e) => setImageTitle(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input number">
          <label>4. Référence de l'image ( par exemple : 5 ) </label>
          <input
            type="number"
            onChange={(e) => setImageRef(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input number">
          <label>5. Longueur en cm ( par exemple : 24 )</label>
          <input
            type="number"
            onChange={(e) => setImageWidth(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input number">
          <label>6. Largeur en cm ( par exemple : 21 )</label>
          <input
            type="number"
            onChange={(e) => setImageHeight(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input">
          <label>7. Matériau utilisé ( optionnel )</label>
          <input
            type="text"
            onChange={(e) => setImageMaterial(e.target.value)}
          ></input>
        </div>
        <div className="bdl-create-photo-form-input submit">
          <input
            type="submit"
            value="Valider"
            disabled={true}
            ref={submitInput}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default CreatePhoto;
