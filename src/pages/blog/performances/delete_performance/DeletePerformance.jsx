
import "./DeletePerformance.scss"
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import { useRef } from "react"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const DeletePerformance = (props) => {
  const btnSend = useRef(null)
  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }


  const tryToDestroyPerformance = (e) => {
    e.preventDefault()
    let getSelects = document.querySelectorAll(".bdl-custom-select-destroy");
    const foundSelect = Array.from(getSelects).filter(
      (select) => select.value == e.target[0].value
    );
    let answer = window.confirm(
      `voulez vous supprimer "${foundSelect[0].value}" ?`
    );
    if (answer) {

      destroyPerformanceAPI(foundSelect[0].dataset.id);
    }
  };

  const destroyPerformanceAPI = async (perfID) => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    };
    await fetch(`${BASE_URL}/api/v1/performances/${perfID}`, config)
    window.location.reload(false)
  }

  const closeModal = () => {
    props.deletePerformancesModalRef.current.classList.remove("active")
  }
 
  return (
    <div className="bp-perf-delete-performances-wrapper" ref={props.deletePerformancesModalRef}>
      <h4 id="bp-perf-delete-perf-modal-title">Supprimer une performance</h4>
      <div className="bp-close-modal-container" onClick={closeModal}>
        <img src={xCloseIcon} alt="close"></img>
      </div>

      <form id="bp-perf-delete-perf-form"  onSubmit={(e) => tryToDestroyPerformance(e)}>
      <select id='remove-perf-select'>
        {props.value && props.value.map((perf) => (
        <>
            {props.selectedValue.title === perf.title ?
              <option  data-id={perf.id} className="bdl-custom-select-destroy"selected>{perf.title}</option>
              :
              <option  data-id={perf.id} className="bdl-custom-select-destroy">{perf.title}</option>
            }
        
            </>
      ))}
        </select>
        <div className="bp-delete-perf-input send"ref={btnSend}>
          <input type="submit" value="Valider" ></input>
        </div>
        </form>
    </div>
  )
}

export default DeletePerformance