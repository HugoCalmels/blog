import "./EditPhoto.scss";
import { useState, useEffect, useContext, useRef } from "react";
import { DessinsContext } from "./DessinsContext";
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const EditPhoto = (props) => {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const { value, setValue } = useContext(DessinsContext);
  const [imageRef, setImageRef] = useState(0);
  const [imageTitle, setImageTitle] = useState("");
  const [imageMaterial, setImageMaterial] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const editFormElem = useRef(null);

  const submitEditImageToAPI = async (newImage, cateID) => {
    let data;
    if (newImage === null) {
      data = {
        dessin: {
          dessin_category_id: cateID,
          title: imageTitle,
          ref: imageRef,
          material: imageMaterial,
          width: imageWidth,
          height: imageHeight,
        },
      };
    } else {
      data = {
        dessin: {
          image_url: newImage.image_url,
          dessin_category_id: cateID,
          title: imageTitle,
          ref: imageRef,
          material: imageMaterial,
          width: imageWidth,
          height: imageHeight,
        },
      };
    }
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      `${BASE_URL}/api/v1/dessin_categories/${props.editSelectedCategory.id}/dessins/${props.editSelectedImage.id}`,
      config
    );
    const datafetched = await res.json();
    let newValue;
    // handle context
    if (props.editSelectedCategory.id !== datafetched.dessin_category_id) {
      // changement de catégorie
      const removedImage = value.map((category) => {
        return {
          ...category,
          dessins: category.dessins.filter((image) => {
            return image.id !== datafetched.id;
          }),
        };
      });
      const reAddedImage = removedImage.map((category) => {
        if (category.id === datafetched.dessin_category_id) {
          category.dessins.push(datafetched);
          return category;
        } else {
          return category;
        }
      });
      newValue = reAddedImage;
    } else {
      // aucun changement de catégorie
      let test = value.map((category) => {
        return {
          ...category,
          dessins: category.dessins.map((img) => {
            if (img.id === datafetched.id) {
              return datafetched;
            } else {
              return img;
            }
          }),
        };
      });
      newValue = test;
    }
    editFormElem.current.reset();
    props.EditModalElem.current.style.display = "none";
    setValue(newValue);
  };
  const tryToEditImage = (e) => {
    e.preventDefault();
    let cateID;
    if (categorySelected === null) {
      // category unchanged
      console.log(props.editSelectedCategory.id);
      cateID = props.editSelectedCategory.id;
    } else {
      // the user changed the category
      cateID =
        categorySelected.target.options[categorySelected.target.selectedIndex]
          .dataset.id;
    }
    const data = new FormData();
    data.append("dessin_temp_image[image]", e.target[0].files[0]);
    if (e.target[0].files[0] !== undefined) {
      console.log(e.target[0].files[0]);
      createTempImage(data).then((res) => {
        submitEditImageToAPI(res, cateID);
      });
    } else {
      submitEditImageToAPI(null, cateID);
    }
  };

  const createTempImage = async (data) => {
    await fetch(`${BASE_URL}/api/v1/dessin_temp_images`, {
      method: "POST",
      body: data,
    });
    // get latest image
    const latestImageResponse = await fetch(`${BASE_URL}/api/v1/dessin-latest`);
    const latestImage = await latestImageResponse.json();
    return latestImage;
  };

  const closeModal = () => {
    props.EditModalElem.current.style.display = "none";
  };

  const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/dessin_categories`, {
      method: "GET",
    });
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setImageRef(props.editSelectedImage.ref);
    setImageTitle(props.editSelectedImage.title);
    setImageMaterial(props.editSelectedImage.material);
    setImageWidth(props.editSelectedImage.width);
    setImageHeight(props.editSelectedImage.height);
  }, [props.editSelectedImage]);

  return (
    <div className="bd-edit-photo" ref={props.EditModalElem}>
      <div className="bdl-edit-year-photo-title">
        <h5>Editer une image</h5>
      </div>

      <div className="bd-edit-close-btn" onClick={closeModal}>
        <img src={xCloseIcon} alt="close" />
      </div>
      <form
        className="bd-edit-form"
        onSubmit={(e) => tryToEditImage(e)}
        ref={editFormElem}
      >
        <div className="bd-edit-input-container-upload">
          <label htmlFor="bd-edit-image">
            1. Upload nouvelle image ( optionnel )
          </label>
          <input id="bd-edit-image" type="file"></input>
        </div>

        <div className="bd-edit-input-container">
          <label>2. Sélectionner catégorie</label>

          <select
            id="select-categories-edit"
            onChange={(e) => setCategorySelected(e)}
          >
            {categories.map((category) => (
              <option
                className="bdl-custom-select-edit"
                key={category.id}
                data-id={category.id}
                selected={category.id === props.editSelectedCategory.id}
              >
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="bd-edit-input-container">
          <label>3. Titre de l'image</label>
          <input
            type="text"
            onChange={(e) => setImageTitle(e.target.value)}
            value={imageTitle}
          ></input>
        </div>

        <div className="bd-edit-input-container">
          <label>4. Référence de l'image </label>
          <input
            type="number"
            onChange={(e) => setImageRef(e.target.value)}
            value={imageRef}
          ></input>
        </div>

        <div className="bd-edit-input-container">
          <label>5. Longueur en cm</label>
          <input
            type="text"
            onChange={(e) => setImageWidth(e.target.value)}
            value={imageWidth}
          ></input>
        </div>

        <div className="bd-edit-input-container">
          <label>6. Largeur en cm</label>
          <input
            type="text"
            onChange={(e) => setImageHeight(e.target.value)}
            value={imageHeight}
          ></input>
        </div>

        <div className="bd-edit-input-container">
          <label>7. Matériau utilisé ( optionnel )</label>
          <input
            type="text"
            onChange={(e) => setImageMaterial(e.target.value)}
            value={imageMaterial}
          ></input>
        </div>

        <div className="bd-edit-input-send-container">
          <input type="submit" value="valider"></input>
        </div>
      </form>
    </div>
  );
};

export default EditPhoto;
