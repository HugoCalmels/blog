import "./EditCard.scss"
import { useState, useRef } from "react"
import {resizeImages} from "../../../../../utils/resizeImages"
import { useEffect } from "react"
import closeIcon from "../../../../../assets/icons/xCloseIcon.png"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const EditCard = (props) => {
  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const textareaRef = useRef(null)

  useEffect(() => {

     setTitle(props.data.title)
     setDesc(props.data.desc)
    

  },[props.data])

  const tryToEditCard = (e) => {
    e.preventDefault();
 props.setIsLoading(true)

    if (e.target[0].files.length > 0) {
      resizeImages(e.target[0].files[0]).then((imageFile) => {
        const data = new FormData();
        data.append("home_temp_image[image]", imageFile);
        submitImageToAPI(data).then((res) => {
          editCardImageAPI(res).then(() => {
            editCardAPI().then(() => {
              props.setIsLoading(false)
            })
          })
        });
      });
    } else {
      editCardAPI().then(() => {
        props.setIsLoading(false)
      })
    }
  
  };

  const submitImageToAPI = async (newImage) => {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
      body: newImage,
    };
    const test1 = await fetch(`${BASE_URL}/api/v1/home_temp_images`, config);

    const res = await fetch(`${BASE_URL}/api/v1/home-latest`, {
      method: "GET",
    });
    const data = await res.json();

    return data;
  };

  const editCardImageAPI = async (newImage) => {

    const body = {
      home: {
        image_url: newImage.image_url,

      },
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(
      `${BASE_URL}/api/v1/homes/${props.data.homes[0].id}`,
      config
    );

    const data = await res.json();


      window.location.reload(false);
    

  };

  const editCardAPI = async () => {
    const body = {
      type: {
        title: title,
        desc: desc

      },
    };
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(
      `${BASE_URL}/api/v1/types/${props.data.id}`,
      config
    );
    const data = await res.json();

      window.location.reload(false);

  }


  const addBr = (e) => {
    e.preventDefault()
    let stringBeforeBr = desc.substring(0, textareaRef.current.selectionStart)
    let stringAfterBr = desc.substring(textareaRef.current.selectionEnd, desc.length)
    let newValue = stringBeforeBr + "<br/>" + stringAfterBr
    setDesc(newValue)
  }



  return (
    <div className="b-index-content-card-edit-modal__elem" ref={props.modalEditRef}>
      <div className="b-index-content-card-edit-modal__elem__close-btn" onClick={props.closeEditModal}>
        <img src={closeIcon} al="close edit bloc"/>
      </div>
      <h4>Editer un bloc</h4>
      <form onSubmit={(e)=>tryToEditCard(e)}>

        <div className="b-index-content-card-edit-modal-top">
      <div className="b-index-content-card-edit-modal__input file">
          <label htmlFor="home-card-image-edit">1. Upload image</label>
          <input
            type="file"
            id="home-card-image-edit"
            name="home-card-image-edit"
          ></input>
        </div>

        <div className="b-index-content-card-edit-modal__input">
        <label>2. Editer titre</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
        </div>
        </div>
        <div className="b-index-content-card-edit-modal__input  textarea">
        <label onClick={addBr}>3. Editer description <span onClick={(e)=>addBr(e)}>{`< sauter une ligne >`}</span></label>
          <textarea
            ref={textareaRef}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          </div>

        <div className="b-index-content-card-edit-modal__input send">
          <input type="submit" value="valider" />
        </div>
    </form>
  </div>
  )
}


export default EditCard