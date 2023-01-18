import "./NewsLetter.scss"
import { useEffect, useState, useRef } from "react"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const NewsLetter = (props) => {
  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");

  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }

  let cookieToken = "";
  const cookie2 = Cookies.get("cie-lutin-auth-token");

  if (cookie2 !== undefined) {
    cookieToken = cookie2;
  }
  const templateEmailPreviewElemRef = useRef(null)
  const [templateEmail, setTemplateEmail] = useState("")
  const btnSend = useRef(null)
  const canSave = Boolean(templateEmail)

  const handleSubmitNewsLetter = (e) => {
    e.preventDefault();
    if (canSave) {
      props.setIsLoading(true)
      sendTemplateToAPI().then(() => {
        props.setIsLoading(false)
      })
      // send form to backend
    }
  }

  useEffect(() => {
    if (cookieIsAuth) {
      if (canSave) {
        btnSend.current.classList.add("active")
      } else {
        btnSend.current.classList.remove("active")
      }
    }
  
  }, [canSave])

  useEffect(() => {
    if (cookieIsAuth) { 
      if (templateEmail) {
        templateEmailPreviewElemRef.current.innerHTML = templateEmail
      }
    }


  }, [templateEmail])

  const sendTemplateToAPI = async () => {
    const body = {
      body: {
        template: templateEmail
      }
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${BASE_URL}/api/v1/send-to-all-guests`, config)

    const data = await res.json();
    return "123"
    
  }
  
  return (

    <div className="admin-newsletter">
      {cookieIsAuth ?
        <>
          <div className="admin-newsletter-paragraph">
        <h3>Comment ça marche ?</h3>
        <p>1. Aller sur <a href="https://stripo.email/fr/" target="_blank">https://stripo.email/fr/</a> pour créer son template</p>
      <p>2. Cliquer sur "Commencez gratuitement".</p>
      <p>3. Cliquer sur "Modèle vierge".</p>
      <p>4. Remplir son template.</p>
      <p>5. Une fois le template terminé, cliquer sur "Exporter".</p>
      <p>6. Pour finir cliquer sur "HTML", ensuite "Code HTML", et pour finir cliquer sur "Copier dans le presse-papiers".</p>
      <p>7. Une fois le code copié, il faut le coller dans la zone de texte ci dessous.</p>
      </div>
  




            <form className="admin-newsletter-input-form" onSubmit={(e)=>handleSubmitNewsLetter(e)}>
        <textarea placeholder="Insérer le code HTML du template d'email ici."onChange={(e)=>setTemplateEmail(e.target.value)}></textarea>
        <div className="b-admin-template-email-preview-container" ref={templateEmailPreviewElemRef}></div>
        <input disabled={!canSave} className="admin-newsletter-send-input" type="submit" value="Envoyer newsletter" ref={btnSend}></input>
        </form>
        
   
        

        </>
        :
        <>
          <h3>Accès interdit.</h3>
        </>
      }
     
      
    </div>
  )
}

export default NewsLetter