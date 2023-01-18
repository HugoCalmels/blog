import "./Content.scss";

import { useState, useContext, useRef , useEffect} from "react";
import ImagesReader from "./images_reader/ImagesReader";
import EditPhoto from "./EditPhoto";
import { ImagesContext } from "../../../../context/ImagesContext";
import Cookies from "js-cookie";
import ImagesGrid from "./images_grid/ImagesGrid"

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
  const imagesGaleryContainerElem = useRef(null)

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

    

    if (props.leftBarTriggerBtnElem.current) {
      props.leftBarTriggerBtnElem.current.classList.add("inactive")
    }
   

    props.scrollToTopElem.current.classList.remove("active")
  };

  const tryToDestroyImage = (image, category) => {
    let answer = window.confirm("voulez vous détruire cette image ?");
    if (answer) {
      submitImageDestroyAPI(image, category);
    }
  };

  const submitImageDestroyAPI = async (image, category) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },

    };
    await fetch(
      `${BASE_URL}/api/v1/photo_categories/${category.id}/photos/${image.id}`,
     config
    );
    

    const newValue = value.map((category) => {
      return {
        ...category,
        photos: category.photos.filter((img) => {
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

  const handleHideImage = async (e, image, category) => {
    e.preventDefault()
    let body 
    body = {
      photo: {
        has_to_be_displayed: !image.has_to_be_displayed,
      },
    };
    
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`,
      },
      body: JSON.stringify(body),
    };
    let res
    res = await fetch(
      `${BASE_URL}/api/v1/photo_categories/${category.id}/photos/${image.id}`,
      config
    );
   
    const data = await res.json();
    let newValue = value.map((category) => {
      return {
        ...category,
        photos: category.photos.map((image) => {
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



  useEffect(() => {

    imagesGaleryContainerElem.current.style.marginTop = `calc((${props.topBarElem.current.offsetHeight}px) - 20px)`
  }, [])
  
  useEffect(() => {
    imagesGaleryContainerElem.current.style.marginTop = `calc((${props.topBarElem.current.offsetHeight}px) - 20px)`

    window.scrollTo({ top: '0px'});
    
    
  }, [props.selectedCategory])




  const capitalizeAndStyleString = (string) => {
    return "PHOTOS"
  }



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
      <h2 id="b-images-galery-title">{capitalizeAndStyleString(props.arg)} {props.selectedCategory ? <>: {props.selectedCategory}</>:<></>}</h2>
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
