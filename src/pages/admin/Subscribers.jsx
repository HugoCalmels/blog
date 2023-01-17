import "./Subscribers.scss"
import { useState, useEffect } from "react"
import { FaTrashAlt } from "react-icons/fa"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

  

const Subscribers = () => {
  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");

  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }
 const btnStyle = { color: "424242" , width: "18px", height: "18px", marginTop: "2px", cursor:"pointer"}
  const [guests, setGuests] = useState([])

  useEffect(() => {
    getAllGuestsAPI()
  }, [])
  
  const tryToDestroyGuest = (e, guest) => {
    e.preventDefault()
    console.log("hi")
    let answer = window.confirm(
      `voulez vous supprimer "${guest.email}" ?`
    );
    if (answer) {
      // destroyCategoryAPI(foundSelect[0].dataset.id); DESTROY BY ID ? BY NAME ?
      destroyGuestAPI(guest.id)
    }
  }

  const destroyGuestAPI = async (guestID) => {
    const res = await fetch(`${BASE_URL}/api/v1/guests/${guestID}`, {method: 'DELETE'})

    console.log("11111111111111111111")
    console.log("11111111111111111111")
    console.log("11111111111111111111")

    console.log("11111111111111111111")
    console.log("11111111111111111111")
    console.log("11111111111111111111")

    const newGuestList = guests.filter(guest => guest.id !== guestID)
    setGuests(newGuestList)
  }

  const getAllGuestsAPI = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/guests`, { method: 'GET' })
    const data = await res.json();
    setGuests(data)
  }

  console.log(guests)

  const generateFormatedDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
    });
    return formattedDate
  }
  return (
    <div className="admin-subscribers">

      {cookieIsAuth ?
        <>
          <table className="admin-subs-table">
  <tr>
    <td className="b-td-index">Index</td>
          <td className="b-td-email">Email</td>
          <td className="b-td-joindate">Date d'inscription</td>
    <td className="b-td-destroy-guest">Supprimer</td>
        </tr>
        {guests.map((guest, index) => (
            <tr>
            <td className="b-td-index">{index+1}</td>
            <td className="b-td-email">{guest.email}</td>
            <td className="b-td-joindate">{generateFormatedDate(guest.created_at)}</td>
            <td className="b-td-destroy-guest"><span><FaTrashAlt style={btnStyle} onClick={(e)=>tryToDestroyGuest(e,guest)} /></span></td>
                </tr>
        ))}
</table>
        </>
        :
        <>
          <h3>Accès interdit.</h3>
        </>
      }
      
    </div>
  )
}


export default Subscribers