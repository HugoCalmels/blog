import "./Content.scss";
import Masonry from "react-masonry-css";
import { useEffect, useState, useContext, useRef } from "react";
import ImagesReader from "./ImagesReader";
import EditPhoto from "./EditPhoto";
import { DessinsContext } from "./DessinsContext";
import deleteIcon from "../../../../assets/icons/deleteIcon.png";
import hideIcon from "../../../../assets/icons/hideIcon.png";
import editIcon from "../../../../assets/icons/editIcon.png";
import Cookies from "js-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
  const { value, setValue } = useContext(DessinsContext);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
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
    const res = await fetch(
      `${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    const newValue = value.map((category) => {
      return {
        ...category,
        dessins: category.dessins.filter((img) => {
          return image.id !== img.id;
        }),
      };
    });
    setValue(newValue);
  };

  const openEditModal = (image, category) => {
    document.querySelector(".bd-edit-photo").style.display = "flex";
    setEditSelectedImage(image);
    setEditSelectedCategory(category);
  };

  const handleHideImage = async (image, category) => {
    const body = {
      dessin: {
        has_to_be_displayed: !image.has_to_be_displayed,
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
      `${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`,
      config
    );
    const data = await res.json();
    let newValue = value.map((category) => {
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
    });
    setValue(newValue);
  };

  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");
  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }

  return (
    <div className="bd-content-wrapper">
      <ImagesReader
        totalImagesCount={props.totalImagesCount}
        defaultCustomIndex={defaultCustomIndex}
        defaultArrayAndIndex={defaultArrayAndIndex}
        images={props.images}
        imagesReaderElement={imagesReaderElement}
      />
      <EditPhoto
        editSelectedImage={editSelectedImage}
        editSelectedCategory={editSelectedCategory}
        EditModalElem={EditModalElem}
      />
      <div className="bd-images-container">
        <div className="bd-dessins-title">
          <h2>Dessins et croquis</h2>
        </div>
        {props.images &&
          props.images.map((imageCategory, cateIndex) => (
            <>
              <div className={`bd-images-grid ${imageCategory.title}`}>
                <h5>{imageCategory.title}</h5>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {imageCategory.dessins.map((dessin, imageIndex) => (
                    <>
                      {dessin.has_to_be_displayed === true ? (
                        <div className="grid-item" key={dessin.id}>
                          {cookieIsAuth === true ? (
                            <>
                              <div
                                className="bd-image-hide-btn"
                                onClick={() =>
                                  handleHideImage(dessin, imageCategory)
                                }
                              >
                                <img src={hideIcon} alt="hide" />
                              </div>
                              <div
                                className="bd-image-edit"
                                onClick={() =>
                                  openEditModal(dessin, imageCategory)
                                }
                              >
                                <img src={editIcon} alt="edit" />
                              </div>
                              <div
                                className="bd-image-destroy"
                                onClick={() =>
                                  tryToDestroyImage(dessin, imageCategory)
                                }
                              >
                                <img src={deleteIcon} alt="delete" />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}

                          <LazyLoadImage
                            width={"100%"}
                            effect="blur"
                            className="bd-image"
                            onClick={(e) =>
                              openImagesReader(
                                e,
                                imageIndex,
                                cateIndex,
                                imageCategory,
                                dessin.customIndex
                              )
                            }
                            src={dessin.image_url}
                            alt="drawing"
                          />
                        </div>
                      ) : (
                        <div className="grid-item red" key={dessin.id}>
                          {cookieIsAuth === true ? (
                            <>
                              <div
                                className="bd-image-hide-btn"
                                onClick={() =>
                                  handleHideImage(dessin, imageCategory)
                                }
                              >
                                <img src={hideIcon} alt="hide" />
                              </div>
                              <div
                                className="bd-image-edit"
                                onClick={() =>
                                  openEditModal(dessin, imageCategory)
                                }
                              >
                                <img src={editIcon} alt="edit" />
                              </div>
                              <div
                                className="bd-image-destroy"
                                onClick={() =>
                                  tryToDestroyImage(dessin, imageCategory)
                                }
                              >
                                <img src={deleteIcon} alt="delete" />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <LazyLoadImage
                            width={"100%"}
                            effect="blur"
                            className="bd-image"
                            onClick={(e) =>
                              openImagesReader(
                                e,
                                imageIndex,
                                cateIndex,
                                imageCategory,
                                dessin.customIndex
                              )
                            }
                            src={dessin.image_url}
                            alt="drawing"
                          />
                        </div>
                      )}
                    </>
                  ))}
                </Masonry>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Content;
