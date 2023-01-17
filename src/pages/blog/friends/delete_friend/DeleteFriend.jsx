

import "./DeleteFriend.scss"
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const DeleteFriend = (props) => {

  const closeModal = () => {
    props.deleteFriendModalRef.current.classList.remove("active")
  }
  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }
  const tryToDestroyFriend = (e) => {
    e.preventDefault()
    props.setIsLoading(true)
    let getSelects = document.querySelectorAll(".bdl-custom-select-destroy");
    const foundSelect = Array.from(getSelects).filter(
      (select) => select.value == e.target[0].value
    );
    let answer = window.confirm(
      `voulez vous supprimer "${foundSelect[0].value}" ?`
    );
    if (answer) {
      console.log("TESTTTT")
      console.log(foundSelect[0].value)
      console.log(foundSelect[0].dataset.id)
      console.log("TESTTTT")
      destroyFriendAPI(foundSelect[0].dataset.id);
    }
  };

  const destroyFriendAPI = async (id) => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },

    };
    await fetch(`${BASE_URL}/api/v1/friends/${id}`, config)
    window.location.reload(false)
  }


  return (
    <div className="bp-perf-delete-performances-wrapper" ref={props.deleteFriendModalRef}>
    <h4 id="bp-perf-delete-perf-modal-title">Supprimer une performance</h4>
    <div className="bp-close-modal-container" onClick={closeModal}>
      <img src={xCloseIcon} alt="close"></img>
    </div>

    <form id="bp-perf-delete-perf-form"  onSubmit={(e) => tryToDestroyFriend(e)}>
    <select id='remove-perf-select'>
      {props.friends && props.friends.map((friend) => (
      <>
    
            <option  data-id={friend.id} className="bdl-custom-select-destroy">{friend.website_link}</option>
        
      
          </>
    ))}
      </select>
      <div className="bp-delete-perf-input send">
        <input type="submit" value="Valider" ></input>
      </div>
      </form>
  </div>
  )
}

export default DeleteFriend