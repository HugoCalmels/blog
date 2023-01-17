import "./Policy.scss"
import closeIcon from "../../../assets/icons/xCloseIcon.png"
import { RiCloseFill } from "react-icons/ri"
import { IconContext } from "react-icons";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
const Policy = (props) => {
  let btnCloseStyle = { width: "20px", height: "20px", color: "green" }
  const navigate = useNavigate()
  const [btnCloseHover, setBtnCloseHover] = useState("#bbbbbb")
  
  const styleRegularIcons = { width: "20px", height: "20px", color: {btnCloseHover} }
  
  const disableCloseBtnHoverStyle = () => {
    console.log("leave")
    setBtnCloseHover("#bbbbbb")
    console.log(styleRegularIcons)
  }
  const enableCloseBtnHoverStyle = () => {
    console.log("enter")
    setBtnCloseHover("#737373")
    console.log(styleRegularIcons)
  }

  const navigateTo = (dest) => {
    navigate(`/gaelle-boucherit`)
  }
  return (

    <div className="b-footer-policy-wrapper" ref={props.policyModalRef} >
      <div className="b-footer-policy-container">
        <div className="b-footer-policy-close-btn" onClick={props.closePolicyModal} >
          <RiCloseFill fill={btnCloseHover} style={styleRegularIcons} className="b-footer-policy-close-btn-svg" onMouseEnter={enableCloseBtnHoverStyle} onMouseLeave={disableCloseBtnHoverStyle}/>
        </div>
        <div className="b-footer-policy-header">
          <h5>Mentions légales</h5>
        </div>
        <div className="b-footer-policy-content">
          <h6>1. Présentation du site</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la
            Confiance dans l’économie numérique, dite L.C.E.N., il est précisé aux visiteurs du site 
           <span className="b-website-text-link" onClick={()=>navigateTo("/gaelle-boucherit")}>&nbsp;www.gaelle-boucherit.com&nbsp;</span>,l'identité des différents intervenants du site et de sa publication.</p>
 
          <p className="b-footer-policy-spe-paragraph"> <b>Propriétaire</b> : Gaelle Boucherit - 13 rue pégot, 31500 Toulouse</p>
          <p className="b-footer-policy-spe-paragraph"> <b>Créateur</b> : Hugo Calmels - <a className="b-website-text-link-external" href="https://www.portofolio-hugo-calmels.com/" target="_blank">www.portofolio-hugo-calmels.com</a> </p>
          <p className="b-footer-policy-spe-paragraph"> <b>Responsable publication</b> : Gaelle Boucherit - gaelle-boucherit@gmail.com  </p> 
          <p className="b-footer-policy-spe-paragraph"> <b>Hébergeur</b> : NAMECHEAP INC - abuse@namecheap.com - tel:+1.9854014545</p>
           <div className="b-footer-policy-custom-hr"></div>
          <h6>2. Description du site.</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p>Le site <span className="b-website-text-link" onClick={()=>navigateTo("/gaelle-boucherit")}>&nbsp;www.gaelle-boucherit.com&nbsp;</span> est un site de publication, qui référence les dernières oeuvres réalisées par Gaëlle Boucherit.
            Ce site comprend des dessins, des photos, des vidéos, des liens internet, et une newsletter.
          </p>

          <div className="b-footer-policy-custom-hr"></div>
          <h6>3. Newsletter</h6>
          <div className="b-footer-policy-custom-hr"></div>
          
          <p>Chaque utilisateur a la possibilité de s'abonner à notre newsletter, son addresse email sera enregistrée sur notre serveur.</p>
          <p>Pour se désabonner de notre newsletter, un bouton est disponible directement dans le contenu de l'email, en bas de la page.</p>


          <div className="b-footer-policy-custom-hr"></div>
          <h6>4. Propriété intellectuelle et droit d'auteur.</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p>Sauf mention contraire, toutes les informations sur ce serveur Internet et documents contenus dans le site ainsi que tous les éléments crées pour le site sont la propriété de "Gaelle Boucherit" et sont protégés par les droits de la propriété intellectuelle.</p>
       
          <div className="b-footer-policy-custom-hr"></div>
          <h6>5. Liens Hypertextes & Cookies</h6>
          <div className="b-footer-policy-custom-hr"></div>

          <p>Nous déclinons fortement toute responsabilité quant aux contenus des sites vers lesquels elle offre des liens. Les éventuels liens proposés aux utilisateurs du site "www.gaelle.com" le sont à titre de service. La décision d'activer les liens appartient exclusivement aux utilisateurs du site "www.gaelle"</p>
          <p>Ce site ne dispose pas de cookies.</p>
     

  
          
             <div className="b-footer-policy-custom-hr"></div>
          <h6>6. Respect de votre vie privée</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p>Nous nous préoccupons du respect de la vie privée et nous engagons à protéger vos données personnelles.  </p>
          <p>Nous nous engagons à ne pas échanger, vendre ou transmettre vos informations, qui seront conservées dans notre base de données.</p>
        
   
         
          
        </div>
      </div>
      <div className="b-footer-policy-overlay"  onClick={props.closePolicyModal}></div>
      </div>

  )
}

export default Policy