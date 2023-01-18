import "./ContactIndex.scss";
import { useState, useEffect , useRef} from "react"
import { AiOutlineMail } from "react-icons/ai"
import {GoLocation} from "react-icons/go"
import { BiUser } from "react-icons/bi"
import imageFriends from "../../../assets/images/imageTest3.jpg"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const ContactIndex = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [checked, setChecked] = useState(false)

  const [alertMessage, setAlertMessage] = useState("")

  const inputNameElemRef = useRef(null)
  const inputEmailElemRef = useRef(null)
  const inputTextareaElemRef = useRef(null)
  const inputCheckboxElemRef = useRef(null)

  const alertSuccessElemRef = useRef(null)
  const alertDangerElemRef = useRef(null)
  const canSave = Boolean(name) && Boolean(subject) && Boolean(checked)

  function isValidEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  }

  const btnStyle = { color: "737373", width: "15px", height: "15px" }
  const btnStyle2 = { color: "424242", width: "30px", height: "30px" }
    const btnStyle3 = { color: "424242" , width: "25px", height: "25px"}

  useEffect(() => {
    if (alertMessage === "success") {
      alertDangerElemRef.current.classList.remove("active")
      alertSuccessElemRef.current.classList.add("active")
         // alert success ref current classlist active
    }
    else if (alertMessage === "danger") {
      alertSuccessElemRef.current.classList.remove("active")
      alertDangerElemRef.current.classList.add("active")
      
      // alert danger ref current classlist active
    }
    },[alertMessage])

  const handleSubmit = (e) => {
    e.preventDefault()
    // test email
    if (isValidEmail(email) && canSave) {
      setAlertMessage("success")
      createContactDemandAPI()
    } else {
      setAlertMessage("danger")

    }
    setStylesForErrorHandling()
  }

  const createContactDemandAPI = async () => {
    const body = {
      contact_demand: {
        name: name,
        email: email,
        subject: subject
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${BASE_URL}/api/v1/contact_demands`, config)
    const data = await res.json()
    console.log("####################################")
    console.log("####################################")
    console.log("####################################")
    console.log("####################################")
    console.log('RES CONTACT DEMAND')
    console.log(data)
    console.log("####################################")
    console.log("####################################")
    console.log("####################################")
  }

  const setStylesForErrorHandling = () => {
    // remove all previous styles
    inputNameElemRef.current.classList.remove('error')
    inputEmailElemRef.current.classList.remove('error')
    inputTextareaElemRef.current.classList.remove('error')
    inputCheckboxElemRef.current.classList.remove('error')
    if (!Boolean(name)){
      inputNameElemRef.current.classList.add('error')
    } 
    if (!isValidEmail(email)){
      inputEmailElemRef.current.classList.add('error')
    } 
    if (!Boolean(subject)){
      inputTextareaElemRef.current.classList.add('error')
    }
    if (!Boolean(checked)){
      inputCheckboxElemRef.current.classList.add('error')
    }
  }

  
  
  return (
    <div className="b-contact-wrapper">


<div className="b-contact-hero"style={{ 
      backgroundImage: `url(${imageFriends})` 
      }}>
        <div className="b-contact-content-hero-infos-container">
        <h2 id="b-contact-content-title">CONTACT</h2>
          <p id="b-contact-content-paragraph">Une demande, une information ? Remplissez le formulaire ci dessous.</p>
        </div>
         
      </div>

      <div className="b-contact-content">

      <div className="b-contact-content-container">
        <div className="b-contact-content-left">
        <form onSubmit={(e) => handleSubmit(e)}>

        <div className="b-contact-input-default" ref={inputNameElemRef}>
        <label><BiUser style={btnStyle2}/> </label>
        <input placeholder="Nom / Prénom" type="text" onChange={(e)=>setName(e.target.value)}></input>
              </div>
              
              <div className="b-contact-input-default" ref={inputEmailElemRef}>
        <label><span>@</span></label>
        <input placeholder="E-mail" type="text" onChange={(e)=>setEmail(e.target.value)}></input>
              </div>
              
              <div className="b-contact-input-default" ref={inputTextareaElemRef}>

        <textarea placeholder="Merci de détailler votre demande. " onChange={(e) => setSubject(e.target.value)} ></textarea>
              </div>

              <div className="b-contact-input-checkbox" ref={inputCheckboxElemRef}>
                <div className="b-contact-input-center">
                  <input id="b-contact-input-checkbox-item" type="checkbox" onChange={()=>setChecked(!checked)}></input>
                  </div>
              <label id="label-checkbox">En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées afin de me permettre de vous recontacter.</label>

      </div>
              
              <div className="b-contact-input-default send">
                <input type="submit" value="ENVOYER" ></input>
                </div>
          </form>

            
        </div>
        
          <div className="b-contact-content-right">
            
          <div className="b-contact-form-alerts-wrapper-contact">
              <div className="b-contact-form-alert success" ref={alertSuccessElemRef}>
                <p>Le formulaire a été envoyé !</p>
              </div>
              <div className="b-contact-form-alert danger" ref={alertDangerElemRef}>
              <p>Veuillez remplir tous les champs.</p>
              </div>
            </div>

            <h4>GAELLE BOUCHERIT</h4>
            <div className="b-contact-info">
              <AiOutlineMail style={btnStyle} /> <p>gaelle-boucherit@gmail.com</p>
            </div>
            
            <div className="b-contact-info">
              <GoLocation style={btnStyle}/> <p>13, rue pégot</p>
            </div>
            
            <div className="b-contact-info">
              <span></span> <p>31500 Toulouse</p>
            </div>
            
         
        </div>
        </div>
        </div>
    </div>
  )
}

export default ContactIndex