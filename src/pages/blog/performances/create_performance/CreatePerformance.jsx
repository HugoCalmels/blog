import { useEffect , useState, useRef} from "react";
import "./CreatePerformance.scss"
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const CreatePerformance = (props) => {

  const [title, setTitle] = useState("")
  const [featuring, setFeaturing] = useState("")
  const [description, setDescription] = useState("")
  const [secondaryTitles, setSecondaryTitles] = useState([])
  const [title2, setTitle2] = useState("")
  const [title3, setTitle3] = useState("")
  const [title4, setTitle4] = useState("")
  const [imagesFilesLength, setImagesFilesLength] = useState(0)
  const btnSend = useRef(null)
  const canSave = Boolean(imagesFilesLength) && Boolean(title)|| false 

  const [websiteLink, setWebsiteLink] =useState("")

  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }

  const handleSubmit = (e) => {
    if (canSave) {
      props.setIsLoading(true)
      e.preventDefault();

      const data = new FormData()
      data.append("performance_temp_video[video]", e.target[0].files[0])
      submitTempVideoToAPI(data).then((data) => {
        createNewPerformanceAPI(data).then(() => {
          window.location.reload(false)
        })
      })
    }
  }

  const createExtraPerformanceVideoAPI = async (extraTitle, file, performanceID) => {
    // ACTUALLY, I need to post a temp video to get the url FIRST
    const test = await fetch(`${BASE_URL}/api/v1/performance_temp_videos`, {
      method: "POST",
      body: file,
    })
    const test2 = await test.json()

    const response = await fetch(`${BASE_URL}/api/v1/video-latest`, {
      method: "GET"
    })
    const data = await response.json()

    
 
    const body = {
      extra_performance_video: {
        video_url: data.image_url,
        title: extraTitle,
        performance_id: performanceID
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const extraVideoResponse = await fetch(`${BASE_URL}/api/v1/performances/${performanceID}/extra_performance_videos`, config)
    const extraVideoData = await extraVideoResponse.json()



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

    return data

  }

  const createNewPerformanceAPI = async (file) => {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${BASE_URL}/api/v1/performances`, config)
    const data = await response.json()

    return data
  }


  
  const closeModal = () => {
    props.performanceModalRef.current.classList.remove("active")
  }

  useEffect(() => {
    if (canSave) {
      btnSend.current.classList.add("active")
    } else {
      btnSend.current.classList.remove("active")
    }
  },[canSave])

  return (
    <div className="bp-create-performance-modal" ref={props.performanceModalRef}>
      <h4 className="bp-create-performance-modal-title">Créer performance</h4>
      <div className="bp-close-modal-container" onClick={closeModal}>
        <img src={xCloseIcon} alt="close"></img>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="bp-create-perf-input">
        <label htmlFor="main-video">Upload vidéo :</label>
        <input type="file" id="main-video" name="main-video" onChange={(e)=>setImagesFilesLength(e.target.files.length)}></input>
        </div>

        <div className="bp-create-perf-input">
        <label>Titre :</label>
        <input  className="bp-input-text"type="text" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        
        <div className="bp-create-perf-input">
        <label>Avec la participation de (optionnel) :</label>
        <input className="bp-input-text" type="text" onChange={(e) => setFeaturing(e.target.value)}></input>
        </div>

        <div className="bp-create-perf-input">
        <label>Site internet de l'invité (optionnel) :</label>
        <input className="bp-input-text" type="text" onChange={(e) => setWebsiteLink(e.target.value)}></input>
        </div>

        <div className="bp-create-perf-input">
        <label>Description (optionnel) :</label>
        <textarea className="bp-input-text textarea" type="text" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        
        <div className="bp-create-perf-input send"ref={btnSend}>
          <input type="submit" value="Valider" disabled={!canSave} ></input>
        </div>
        
      </form>
    </div>
  )
}


export default CreatePerformance