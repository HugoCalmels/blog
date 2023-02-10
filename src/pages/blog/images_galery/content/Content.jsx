import "./Content.scss";

import { useState, useContext, useRef, useEffect } from "react";
import ImagesReader from "./images_reader/ImagesReader";
import EditPhoto from "./EditPhoto";
import { ImagesContext } from "../../../../context/ImagesContext";
import Cookies from "js-cookie";
import ImagesGrid from "./images_grid/ImagesGrid";

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const Content = (props) => {
  let cookieToken = "";
  const cookie2 = Cookies.get("cie-lutin-auth-token");

  if (cookie2 !== undefined) {
    cookieToken = cookie2;
  }
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
  const imagesGaleryContainerElem = useRef(null);

  const openImagesReader = (
    e,
    imageIndex,
    arrayIndex,
    category,
    customIndex
  ) => {
    e.preventDefault();

    imagesReaderElement.current.style.display = "flex";
    props.scrollToTopElem.current.classList.remove("active");
    setDefaultArrayAndIndex({
      category: category,
      imageIndex: imageIndex,
      arrayIndex: arrayIndex,
    });
    setDefaultCustomIndex(customIndex);
    if (props.leftBarTriggerBtnElem.current) {
      props.leftBarTriggerBtnElem.current.classList.add("inactive");
    }
  };

  const tryToDestroyImage = (image, category) => {
    let answer = window.confirm("voulez vous détruire cette image ?");
    if (answer) {
      submitImageDestroyAPI(image, category);
    }
  };

  const submitImageDestroyAPI = async (image, category) => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    };
    if (props.arg === "dessins") {
      await fetch(
        `${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`,
        config
      );
    } else if (props.arg === "paysages") {
      await fetch(
        `${BASE_URL}/api/v1/paysage_categories/${category.id}/paysages/${image.id}`,
        config
      );
    } else if (props.arg === "carnets") {
      await fetch(
        `${BASE_URL}/api/v1/carnet_categories/${category.id}/carnets/${image.id}`,
        config
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
      } else if (props.arg === "carnets") {
        return {
          ...category,
          carnets: category.carnets.filter((img) => {
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
    e.preventDefault();
    let body;
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
    } else if (props.arg === "carnets") {
      body = {
        carnet: {
          has_to_be_displayed: !image.has_to_be_displayed,
        },
      };
    }

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`,
      },
      body: JSON.stringify(body),
    };
    let res;
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
    } else if (props.arg === "carnets") {
      res = await fetch(
        `${BASE_URL}/api/v1/carnet_categories/${category.id}/carnets/${image.id}`,
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
              return {
                ...image,
                has_to_be_displayed: data.has_to_be_displayed,
              };
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
              return {
                ...image,
                has_to_be_displayed: data.has_to_be_displayed,
              };
            } else {
              return image;
            }
          }),
        };
      } else if (props.arg === "carnets") {
        return {
          ...category,
          carnets: category.carnets.map((image) => {
            if (image.id === data.id) {
              return {
                ...image,
                has_to_be_displayed: data.has_to_be_displayed,
              };
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

  useEffect(() => {
    imagesGaleryContainerElem.current.style.marginTop = `calc((${props.topBarElem.current.offsetHeight}px) - 20px)`;
  }, []);

  useEffect(() => {
    imagesGaleryContainerElem.current.style.marginTop = `calc((${props.topBarElem.current.offsetHeight}px) - 20px)`;

    window.scrollTo({ top: "0px" });
  }, [props.selectedCategory]);

  const capitalizeAndStyleString = (string) => {
    if (string === "dessins") {
      return "DESSINS ET CROQUIS";
    }
    if (string === "paysages") {
      return "PAYSAGES";
    }
    if (string === "carnets") {
      return "CARNETS DE VOYAGE";
    }
  };

  return (
    <section className="bd-category-wrapper" ref={props.contentWrapperRef}>
      <ImagesReader
        scrollToTopElem={props.scrollToTopElem}
        totalImagesCount={props.totalImagesCount}
        defaultCustomIndex={defaultCustomIndex}
        defaultArrayAndIndex={defaultArrayAndIndex}
        images={props.unpaginatedImages}
        imagesReaderElement={imagesReaderElement}
        arg={props.arg}
        leftBarTriggerBtnElem={props.leftBarTriggerBtnElem}
      />
      <EditPhoto
        editSelectedImage={editSelectedImage}
        editSelectedCategory={editSelectedCategory}
        EditModalElem={EditModalElem}
        arg={props.arg}
        setIsLoading={props.setIsLoading}
      />
      <div className="bd-images-container" ref={imagesGaleryContainerElem}>
        <h2 id="b-images-galery-title">
          {capitalizeAndStyleString(props.arg)}{" "}
          {props.selectedCategory ? <>: {props.selectedCategory}</> : <></>}
        </h2>
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
