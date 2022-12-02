import "./Content.scss";

import { useState, useContext, useRef } from "react";
import ImagesReader from "./images_reader/ImagesReader";
import EditPhoto from "./EditPhoto";
import { ImagesContext } from "../../../../context/ImagesContext";
import Cookies from "js-cookie";
import ImagesGrid from "./images_grid/ImagesGrid"

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const Content = (props) => {
  const [defaultCustomIndex, setDefaultCustomIndex] = useState("");
  const [defaultArrayAndIndex, setDefaultArrayAndIndex] = useState({
    category: [],
    imageIndex: "",
    arrayIndex: "",
  });
  const [editSelectedImage, setEditSelectedImage] = useState("");
  const [editSelectedCategory, setEditSelectedCategory] = useState("");
  const { value, setValue } = useContext(ImagesContext);

  const imagesReaderElement = useRef(null);
  const EditModalElem = useRef(null);

  const openImagesReader = (
    e,
    imageIndex,
    arrayIndex,
    category,
    customIndex
  ) => {
    e.preventDefault();
    console.log("--------------------------------------")
    console.log(category)
    console.log(imageIndex)
    console.log(arrayIndex)
    console.log(customIndex)
    console.log("--------------------------------------")
    imagesReaderElement.current.style.display = "flex";
    setDefaultArrayAndIndex({
      category: category,
      imageIndex: imageIndex,
      arrayIndex: arrayIndex,
    });
    setDefaultCustomIndex(customIndex);
  };

  const tryToDestroyImage = (image, category) => {
    let answer = window.confirm("voulez vous détruire cette image ?");
    if (answer) {
      submitImageDestroyAPI(image, category);
    }
  };

  const submitImageDestroyAPI = async (image, category) => {
    if (props.arg === "dessins") {
      await fetch(
        `${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`,
        {
          method: "DELETE",
        }
      );
    } else if (props.arg === "paysages") {
      await fetch(
        `${BASE_URL}/api/v1/paysage_categories/${category.id}/paysages/${image.id}`,
        {
          method: "DELETE",
        }
      );
    }

    const newValue = value.map((category) => {
      if (props.arg === "dessins") {
        return {
          ...category,
          dessins: category.dessins.filter((img) => {
            return image.id !== img.id;
          }),
        };
      } else if (props.arg === "paysages") {
        return {
          ...category,
          paysages: category.paysages.filter((img) => {
            return image.id !== img.id;
          }),
        };
      }
      
    });
    setValue(newValue);
  };

  const openEditModal = (image, category) => {
    document.querySelector(".bd-edit-photo").style.display = "flex";
    setEditSelectedImage(image);
    setEditSelectedCategory(category);
  };

  const handleHideImage = async (e, image, category) => {
    e.preventDefault()
    let body 
    if (props.arg === "dessins") {
      body = {
        dessin: {
          has_to_be_displayed: !image.has_to_be_displayed,
        },
      };
    } else if (props.arg === "paysages") {
      body = {
        paysage: {
          has_to_be_displayed: !image.has_to_be_displayed,
        },
      };
    }
    
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    let res
    if (props.arg === "dessins") {
      res = await fetch(
        `${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`,
        config
      );
    } else if (props.arg === "paysages") {
      res = await fetch(
        `${BASE_URL}/api/v1/paysage_categories/${category.id}/paysages/${image.id}`,
        config
      );
    }
   
    const data = await res.json();
    let newValue = value.map((category) => {
      if (props.arg === "dessins") {
        return {
          ...category,
          dessins: category.dessins.map((image) => {
            if (image.id === data.id) {
              return { ...image, has_to_be_displayed: data.has_to_be_displayed };
            } else {
              return image;
            }
          }),
        };
      } else if (props.arg === "paysages") {
        return {
          ...category,
          paysages: category.paysages.map((image) => {
            if (image.id === data.id) {
              return { ...image, has_to_be_displayed: data.has_to_be_displayed };
            } else {
              return image;
            }
          }),
        };
      }
      
    });
    setValue(newValue);
  };

  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");
  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }

  const displayedTitle = () => {
    if (props.arg === "dessins"){
      return (<h2>Dessins et croquis</h2>)
    } else if (props.arg === "paysages"){
      return (<h2>Paysages</h2>)
    }
  }

  return (
    <section className="bd-category-wrapper">
      <ImagesReader
        totalImagesCount={props.totalImagesCount}
        defaultCustomIndex={defaultCustomIndex}
        defaultArrayAndIndex={defaultArrayAndIndex}
        images={props.images}
        imagesReaderElement={imagesReaderElement}
        arg={props.arg}
      />
      <EditPhoto
        editSelectedImage={editSelectedImage}
        editSelectedCategory={editSelectedCategory}
        EditModalElem={EditModalElem}
        arg={props.arg}
      />
      <div className="bd-images-container">
        <div className="bd-dessins-title">
          <h2>{displayedTitle()} : {props.selectedCategory}</h2>
  
        </div>
        {props.images &&
          props.images.map((imageCategory, cateIndex) => (
            <>
              <ImagesGrid
                   arg={props.arg}
                   cateIndex={cateIndex}
                   cookieIsAuth={cookieIsAuth}
                   handleHideImage={handleHideImage}
                   imageCategory={imageCategory}
                   openEditModal={openEditModal}
                   tryToDestroyImage={tryToDestroyImage}
                   openImagesReader={openImagesReader}
              />
            </>
          ))}
      </div>
    </section>
  );
};

export default Content;
