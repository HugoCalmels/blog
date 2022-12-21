import "./Policy.scss"
import closeIcon from "../../../assets/icons/xCloseIcon.png"
import { RiCloseFill } from "react-icons/ri"
import { IconContext } from "react-icons";
import {useState} from "react"
const Policy = (props) => {
  let btnCloseStyle = { width: "20px", height: "20px", color: "green" }

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
           <b>www.gaelle-boucherit.com</b>,l'identité des différents intervenants du site et de sa publication.</p>
 
          <p className="b-footer-policy-spe-paragraph"> <b>Propriétaire</b> : Gaelle Boucherit - 13 rue pégot, 31500 Toulouse</p>
          <p className="b-footer-policy-spe-paragraph"> <b>Créateur</b> : Hugo Calmels - <a>www.portofolio-hugo-calmels.com</a> </p>
          <p className="b-footer-policy-spe-paragraph"> <b>Responsable publication</b> : Gaelle Boucherit - gaelle-boucherit@gmail.com  </p> 
          <p className="b-footer-policy-spe-paragraph"> <b>Hébergeur</b> : NAMECHEAP INC - abuse@namecheap.com - tel:+1.9854014545</p>
           <div className="b-footer-policy-custom-hr"></div>
          <h6>2. Description du site.</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p>Le site "www.gaelle.com" est un site de publication d'oeuvres réalisées par Gaelle boucherit.</p>
          <p></p>
          <div className="b-footer-policy-custom-hr"></div>
          <h6>3. Propriété intellectuelle et droit d'auteur.</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p> ( pas certain d'être obligé de publier ça, mais pk pas ? )</p>
          <p>Sauf mention contraire, toutes les informations sur ce serveur Internet et documents contenus dans le site ainsi que tous les éléments crées pour le site sont la propriété de "Gaelle Boucherit" et sont protégés par les droits de la propriété intellectuelle.</p>
          <p>La reproduction et l'utilisation de tous documents et informations publiées sur ce site sont seulement autorisées aux fins exclusives d'information pour un usage strictement personnel et privé, et moyennant mention de la source. Toute reproduction, utilisation, adaption, incorporation, modification ou diffusion de copies réalisées à d'autres fins est expressément interdite et sanctionnée pénalement.</p>
          <p>Toute reproduction de la structure du site et de ses éléments et également strictement interdite.</p>
          <div className="b-footer-policy-custom-hr"></div>
          <h6>4. Liens Hypertextes & Cookies</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p> ( pas certain non plus, mais il vaut mieux je pense )</p>
          <p>Nous déclinons fortement toute responsabilité quant aux contenus des sites vers lesquels elle offre des liens. Les éventuels liens proposés aux utilisateurs du site "www.gaelle.com" le sont à titre de service. La décision d'activer les liens appartient exclusivement aux utilisateurs du site "www.gaelle"</p>
          <p>Par ailleurs ce site ne dispose pas de cookies.</p>
     

          <div className="b-footer-policy-custom-hr"></div>
          <h6>5. Newsletter</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p>( si on a un bouton sur le site, pour s'abonner à la newsletter, c'est intéressant )</p>
          <p>Chaque utilisateur a la possibilité de s'abonner à notre newsletter, son addresse email sera enregistrée sur notre serveur.</p>
          <p>Pour se désabonner de notre newsletter, un bouton est disponible directement dans le contenu de l'email, en bas de la page.</p>

          <p> "vie privée et mentions légales" a rajouter sur chaque email, + sur le form d'inscription </p>
             <div className="b-footer-policy-custom-hr"></div>
          <h6>6. Respect de votre vie privée</h6>
          <div className="b-footer-policy-custom-hr"></div>
          <p> ( obligatoire si on prend des informations, IP, géolocation, cookies .. )</p>
          <p>Nous nous préoccupons du respect de la vie privée et nous engagons à protéger vos données personnelles.  </p>
          <p>Nous nous engagons à ne pas échanger, vendre ou transmettre vos informations, qui seront conservées dans notre base de données.</p>
        
   
         
          
        </div>
      </div>
      <div className="b-footer-policy-overlay"  onClick={props.closePolicyModal}></div>
      </div>

  )
}

export default Policy