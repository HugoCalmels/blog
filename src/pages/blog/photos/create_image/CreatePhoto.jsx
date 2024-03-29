import { useState, useContext, useRef } from "react";
import "./CreatePhoto.scss";
import { ImagesContext } from "../../../../context/ImagesContext";
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import {useEffect} from "react"
import { resizeImages } from "../../../../utils/resizeImages"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const CreatePhoto = (props) => {
  const [imagesFilesLength, setImagesFilesLength] = useState(0)
  const [category, setCategory] = useState("")
  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }
  useEffect(() => {

    setCategory(props.selectedCategory);
  },[props.selectedCategory])

  const [imageRef, setImageRef] = useState(0);
  const [imageTitle, setImageTitle] = useState("");
  const [imageMaterial, setImageMaterial] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const formCreatePhoto = useRef(null);



  const canSave = Boolean(imageTitle) && Boolean(imageHeight) && Boolean(imageWidth) &&  Boolean(imagesFilesLength) && Boolean(imageRef)|| false 
  

  useEffect(() => {
      

  },[category])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      props.setIsLoading(true)

    resizeImages(e.target[0].files[0]).then((imageFile) => {
      const data = new FormData();
      data.append("photo_temp_image[image]", imageFile);
      createTempImage(data).then((data) => {
        // I need the category ID, I dont want anymore this select menu.
        
        createImage(data, props.selectedCategoryID);
      });
    });
    }

    
  };



  const createTempImage = async (data) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
      body: data,
    };
    await fetch(`${BASE_URL}/api/v1/photo_temp_images`, config);
    
    // get latest image
    let latestImageResponse
    latestImageResponse = await fetch(`${BASE_URL}/api/v1/photo-latest`);
    const latestImage = await latestImageResponse.json();
    return latestImage;
  };

  const createImage = async (image, categoryID) => {
    let body
    body = {
      photo: {
        photo_category_id: categoryID,
        image_url: image.image_url,
        title: imageTitle,
        ref: imageRef,
        material: imageMaterial,
        width: imageWidth,
        height: imageHeight,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };
    let res
    let subArrayToChange
    try {
      res = await fetch(
        `${BASE_URL}/api/v1/photo_categories/${categoryID}/photos`,
        config
      );
      const data = await res.json();
      subArrayToChange = value.map((category) => {

        if (category.id === data.photo_category_id) {
          category.photos.push(data);
          return category;
        } else {
          return category;
        }
  
       
      });
    } catch (e) {
      console.log(e)
    } finally {
      props.setIsLoading(false)
      formCreatePhoto.current.reset();
      props.modalCreatePhoto.current.classList.remove("active");
      setValue(subArrayToChange);
      setImagesFilesLength(0)
      setImageTitle("")
      setImageRef("")
      setImageHeight("")
      setImageWidth("")
      setImageMaterial("")
      setCategory(props.selectedCategory)
    }
    
    
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



  useEffect(() => {
    if (canSave ) {
      submitInput.current.classList.add("active")
    } else {
      submitInput.current.classList.remove("active")
    }
  
  }, [canSave])
  
  const testDisabledBtn = () => {

  }

  return (
    <div className="bdl-create-photo-modal" ref={props.modalCreatePhoto}>
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
          <label>Catégorie : {props.selectedCategory}</label>

          
        </div>

        <div className="bdl-create-photo-form-input">
          <label htmlFor="dessin-image">Upload image :</label>
          <input type="file" id="dessin-image" name="dessin-image" onChange={(e)=>setImagesFilesLength(e.target.files.length)}></input>
        </div>

        <div className="bdl-create-photo-form-input">
          <label>Titre image :</label>
          <input
            type="text"
            onChange={(e) => setImageTitle(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input number">
          <label>Référence image : </label>
          <input
            type="number"
            onChange={(e) => setImageRef(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input number">
          <label>Longueur image :</label>
          <input
            type="number"
            onChange={(e) => setImageWidth(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input number">
          <label>Largeur image :</label>
          <input
            type="number"
            onChange={(e) => setImageHeight(e.target.value)}
          ></input>
        </div>

        <div className="bdl-create-photo-form-input">
          <label>Matériau utilisé (optionnel) :</label>
          <input
            type="text"
            onChange={(e) => setImageMaterial(e.target.value)}
          ></input>
        </div>
        <div className="bdl-create-photo-form-input submit">
          <input
            type="submit"
            value="Valider"
            disabled={!canSave}
            ref={submitInput}
            onClick={testDisabledBtn}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default CreatePhoto;
