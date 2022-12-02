import "./Card.scss"
import gearIcon from "../../../../../assets/icons/gearIcon.png"
import { useRef } from "react"
import EditCard from "./EditCard"
import Cookies from "js-cookie";
const Card = (props) => {
  const modalEditRef = useRef(null)
  const editModalOpenButtonRef = useRef(null)
  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null

  const openEditModal = () => {
    modalEditRef.current.classList.add("active")
    editModalOpenButtonRef.current.classList.remove("active")
  }
  const closeEditModal = () => {
    modalEditRef.current.classList.remove("active")
    editModalOpenButtonRef.current.classList.add("active")
  }

  const descriptionWithLineBreaks = props.data.desc.split("<br/>")
  console.log('CARD')
  console.log("===================")
  console.log(props.data.desc.split("<br/>"))
  console.log(props.data.desc)
  console.log("===================")
  let newArrayOfStrings = []
  descriptionWithLineBreaks.forEach((subString) => {
    newArrayOfStrings.push(subString)
  })


  console.log("TESTTTTTTTTTTTTTTTTTTTTTTT")
  console.log(newArrayOfStrings)
  console.log("TESTTTTTTTTTTTTTTTTTTTTTTT")


  return (
    <div className="b-index-content-card">
      {isAuthCookie ?
        <div className="b-index-content-card-edit-btn-open-modal active" onClick={openEditModal} ref={editModalOpenButtonRef}>
        <img src={gearIcon} alt="open edit modal"></img>
        </div>
        :
        <></>}
      
      <EditCard modalEditRef={modalEditRef} closeEditModal={closeEditModal} data={props.data} />
       {props.index % 2 === 0 ?
        <>
           <div className="b-index-content-card-image">
        <img src={props.data.homes[0].image_url} alt={props.data.title} />
      </div>
      <div className="b-index-content-card-text">
        <h4>{props.data.title}</h4>
            {newArrayOfStrings.map((string) => (
              <p>{string}</p>
        ))}
      </div>
        </>
        :
        <>
         
      <div className="b-index-content-card-text">
        <h4>{props.data.title}</h4>
        {newArrayOfStrings.map((string) => (
              <p>{string}</p>
        ))}
          </div>
          <div className="b-index-content-card-image odd">
        <img src={props.data.homes[0].image_url} alt={props.data.title} data={props.data} />
      </div>
        </>
      }
     
    </div>
  )
}

export default Card