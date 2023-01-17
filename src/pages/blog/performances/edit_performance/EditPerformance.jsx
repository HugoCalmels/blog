import "./EditPerformance.scss"
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import { useState, useRef } from "react"
import { useEffect } from "react";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const EditPerformance = (props) => {
  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }
  const [title, setTitle] = useState("")
  const [featuring, setFeaturing] = useState("")
  const [description, setDescription] = useState("")
  const [websiteLink, setWebsiteLink] = useState("")
  const [imagesFilesLength, setImagesFilesLength] = useState(0)
  const btnSend = useRef(null)


  const closeModal = () => {
    props.editPerformanceModalRef.current.classList.remove("active")
  }

  const handleSubmit = (e) => {


    e.preventDefault();
    props.setIsLoading(true)
      console.dir(e.target)
      const data = new FormData()
    data.append("performance_temp_video[video]", e.target[0].files[0])
    
      // if file is touched
      // if filed isnt touched
      let id = props.selectedValue.id
    if (imagesFilesLength > 0) {
      submitTempVideoToAPI(data).then((data) => {
         
        editPerformanceAPI(data, id).then(() => {
          window.location.reload(false)
        })
      })
    } else {
      editPerformanceAPIonlyText(id).then(() => {
        window.location.reload(false)
      })
    }

      //submitTempVideoToAPI(data).then((data) => {
      //  createNewPerformanceAPI(data).then(() => {
      //    window.location.reload(false)
      //  })
      //})

  }

  const submitTempVideoToAPI = async (item) => {
    
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
      body: item,
    };
    await fetch(`${BASE_URL}/api/v1/performance_temp_videos`, config)
  
    const response = await fetch(`${BASE_URL}/api/v1/video-latest`, {
      method: "GET"
    })
    const data = await response.json()

    console.log('?????????')
    console.log(data)
    console.log('?????????')
    return data

  }

  const editPerformanceAPI = async (file, id) => {
    const body = {
      performance: {
        video_url: file.image_url,
        title: title,
        desc: description,
        featuring: featuring,
        website_link: websiteLink
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
    const response = await fetch(`${BASE_URL}/api/v1/performances/${id}`, config)
    const data = await response.json()
    console.log("!!!!!!!!!!!!!!")
    console.log(data)
    console.log("!!!!!!!!!!!!!!")
    return data
  }

  const editPerformanceAPIonlyText = async ( id) => {
    const body = {
      performance: {
        video_url: props.selectedValue.video_url,
        title: title,
        desc: description,
        featuring: featuring,
        website_link: websiteLink
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
    const response = await fetch(`${BASE_URL}/api/v1/performances/${id}`, config)
    const data = await response.json()
    console.log("!!!!!!!!!!!!!!")
    console.log(data)
    console.log("!!!!!!!!!!!!!!")
    return data
  }

  useEffect(() => {
    setTitle(props.selectedValue.title)
    setDescription(props.selectedValue.desc)
    setWebsiteLink(props.selectedValue.website_link)
    setFeaturing(props.selectedValue.featuring)
  }, [props.selectedValue])
  
  console.log(props.selectedValue)

  return (
 
    <div className="bp-perf-edit-perf-modal-wrapper" ref={props.editPerformanceModalRef}>
  

       <h4 id="bp-perf-edit-perf-modal-title">Editer : {props.selectedValue.title}</h4>
       <div className="bp-close-modal-container" onClick={closeModal}>
         <img src={xCloseIcon} alt="close"></img>
         </div>
         <form onSubmit={(e) => handleSubmit(e)}>
         <div className="bp-edit-perf-input">
         <label htmlFor="main-video">Upload vidéo :</label>
         <input type="file" id="main-video" name="main-video" onChange={(e)=>setImagesFilesLength(e.target.files.length)}></input>
         </div>
 
         <div className="bp-edit-perf-input">
         <label>Titre :</label>
         <input value={title} className="bp-input-text"type="text" onChange={(e) => setTitle(e.target.value)}></input>
         </div>
         
         <div className="bp-edit-perf-input">
         <label>Avec la participation de (optionnel) :</label>
         <input value={featuring}  className="bp-input-text" type="text" onChange={(e) => setFeaturing(e.target.value)}></input>
         </div>
 
         <div className="bp-edit-perf-input">
         <label>Site internet de l'invité (optionnel) :</label>
         <input value={websiteLink} className="bp-input-text" type="text" onChange={(e) => setWebsiteLink(e.target.value)}></input>
         </div>
 
         <div className="bp-edit-perf-input">
         <label>Description (optionnel) :</label>
         <textarea value={description} className="bp-input-text textarea" type="text" onChange={(e) => setDescription(e.target.value)}></textarea>
         </div>
         
         <div className="bp-edit-perf-input send"ref={btnSend}>
           <input type="submit" value="Valider"  ></input>
         </div>
         
       </form>
      
    </div>
  )
}

export default EditPerformance