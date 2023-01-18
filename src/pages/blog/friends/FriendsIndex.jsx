
import "./FriendsIndex.scss"
import { useRef } from "react"
import CreateFriend from "./create_friend/CreateFriend"
import { useEffect, useState } from "react"
import { RxGear } from "react-icons/rx"
import DeleteFriend from "./delete_friend/DeleteFriend"
import LeftBar from "./left_bar/LeftBar"
import Loader from "./Loader"
import imageFriends from "../../../assets/images/testImage4.jpg"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const FriendsIndex = () => {
  const btnStyle = { color: "#424242", width: "20px", height: "20px" }
  const leftBarElemRef = useRef(null)
  const leftBarTriggerBtnElem = useRef(null)
  const loaderElem = useRef(null)
  const [friends, setFriends] = useState([])
  const [isLoading, setIsLoading ] = useState(false)
  const createFriendModalRef = useRef(null)
  const deleteFriendModalRef = useRef(null)
  const openCreateFriendModal = () => {

    createFriendModalRef.current.classList.toggle("active")
    deleteFriendModalRef.current.classList.remove("active")
  }
  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");

  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }

  const getAllFriendsAPI = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/friends`, { method: "GET" })
    const data = await res.json()
    //return data
    setFriends(data)
  }

  useEffect(() => {
    getAllFriendsAPI()
  }, [])
  
  
  const openPage = (url) => {
    window.open(url)
  }

  const openLeftBar = (e) => {
    e.preventDefault();

    leftBarElemRef.current.classList.add("active")
    leftBarTriggerBtnElem.current.classList.add("inactive")
  }

  const closeLeftBar = (e) => {
    e.preventDefault();
    if (leftBarElemRef.current && leftBarTriggerBtnElem.current) {
      leftBarElemRef.current.classList.remove("active")
      leftBarTriggerBtnElem.current.classList.remove("inactive")
    }

  }
  const openDeleteFriendModal = () => {
    deleteFriendModalRef.current.classList.toggle("active")
    createFriendModalRef.current.classList.remove("active")
  }
  
  useEffect(() => {

    if(isLoading ) {
      loaderElem.current.classList.add('active')
    } else {
      loaderElem.current.classList.remove('active')
    }

  }, [isLoading])
  

  return (
    <div className="b-friends-wrapper">

      {cookieIsAuth ?
       <div className="bp-left-bar-trigger-btn" ref={leftBarTriggerBtnElem} onClick={(e) => openLeftBar(e)}>
       <h5>Paramètres</h5>
        <RxGear style={btnStyle} />
   </div>
        :
        <></>
      }

      <LeftBar openDeleteFriendModal={openDeleteFriendModal} leftBarElemRef={leftBarElemRef} closeLeftBar={closeLeftBar} openCreateFriendModal={openCreateFriendModal} />
      <Loader loaderElem={loaderElem} />
      <CreateFriend createFriendModalRef={createFriendModalRef} setIsLoading={setIsLoading}/>
      <DeleteFriend deleteFriendModalRef={deleteFriendModalRef} setIsLoading={setIsLoading} friends={friends} />
      

      <div className="b-friends-hero"style={{ 
      backgroundImage: `url(${imageFriends})` 
      }}>
        <div className="b-friends-content-hero-infos-container">
        <h2 id="b-friends-content-title">COUPS DE COEUR</h2>
          <p id="b-friends-content-paragraph">Ici vous pourrez trouver tous les sites des personnes que j'apprécie le plus.</p>
        </div>
         
      </div>
      <div className="b-friend-content">
  

        <div className="b-friends-list-wrapper">
        {friends.map((friend) => (
        
        <div className="b-friends-single-friend-container">
          <div className="bp-link-preview-wrapper" onClick={() => openPage(friend.url)}>
              {friend.image !== "no img" ?
                <img id="b-friends-single-friend-img"src={friend.image} />
               
                :
                <div className="b-friends-no-img"/>
              }
                    
        
  
          <div className="bp-link-preview-righ-side">
          <h5> {friend.title}</h5>
        <p>{friend.description}</p>
        <a>{friend.url}</a>  
              </div>
              </div>
          
        </div>
        ))}
           </div>
</div>
    </div>
  )
}

export default FriendsIndex