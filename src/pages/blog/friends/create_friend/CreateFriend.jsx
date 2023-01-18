import "./CreateFriend.scss"
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import { useState, useRef } from "react"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const CreateFriend = (props) => {
  const btnSend = useRef(null)
  const [websiteLink, setWebsiteLink] = useState("")
  const canSave = Boolean(websiteLink)
  const closeModal = () => {
    props.createFriendModalRef.current.classList.remove("active")
  }

  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setIsLoading(true)

    createFriendAPI()
  }

  const createFriendAPI = async () => {
    const body = {
      friend: {
        website_link: websiteLink
      }
    }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${BASE_URL}/api/v1/friends`, config)
    const data = await res.json()

    window.location.reload(false)
  }

  

  return (
    <div className="b-friends-create-friend-wrapper" ref={props.createFriendModalRef}>
      <h4 className="bp-create-friend-modal-title">Créer performance</h4>
      <div className="bp-close-modal-container" onClick={closeModal}>
        <img src={xCloseIcon} alt="close"></img>
      </div>

      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="bp-create-perf-input">
        <label>Lien site web :</label>
        <input  className="bp-input-text"type="text" onChange={(e) => setWebsiteLink(e.target.value)}></input>
        </div>

        
        <div className="bp-create-friend-input send"ref={btnSend}>
          <input type="submit" value="Valider" disabled={!canSave} ></input>
        </div>

      </form>
    </div>
  )
}

export default CreateFriend