import "./Footer.scss";
import Links from "./links/Links"
import Icons from "./icons/Icons"
import Policy from "./policy/Policy"
import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom";
const Footer = (props) => {
  const navigate = useNavigate()

  /*
     <div className="b-footer-mentions">
            MENTIONS L&#xC9;GALES
          </div>
        <div className="b-footer-copyright">GAELLE BOUCHERIT - COPYRIGHT &#169; 2022</div>
        </div>
    
  */

  
  const navigateTo = (dest) => {
    navigate(`/${dest}`)
    window.scrollTo({ top: '0px'});
  }
  
  const closePolicyModal = () => {
    console.log('hi')
    props.policyModalRef.current.classList.remove("active")
  }
  
  return (
    <footer className="b-footer-wrapper">
      <div className="b-footer-container">
          <div className="b-footer-top-wrapper">
          <div className="b-footer-top-container">
            <div className="b-footer-top-small-wrapper">
            <p>Retrouvez moi sur les réseaux </p>
          <Icons />
            </div>
    
            </div>
         
        </div>
        
        <div className="b-footer-bot-wrapper">
          <div className="b-footer-bot-container">
          <div className="b-footer-mentions" onClick={props.openPolicyModal}>
            MENTIONS L&#xC9;GALES
          </div>
     

        <Link className="b-footer-cie" to={"/cie"}>SITE COMPAGNIE</Link>
          <div className="b-footer-copyright" onClick={()=>navigateTo("gaelle-boucherit")}>GAELLE BOUCHERIT - COPYRIGHT &#169; 2022</div>
        </div>
       
          </div>
         
   
     
 
      </div>
      <Policy  closePolicyModal={closePolicyModal} policyModalRef={props.policyModalRef} />
    </footer>
  );
};

export default Footer;
