import "./Footer.scss";
import Links from "./links/Links"
import OwnerInfos from "./owner_infos/OwnerInfos"

const Footer = () => {

  /*
     <div className="b-footer-mentions">
            MENTIONS L&#xC9;GALES
          </div>
        <div className="b-footer-copyright">GAELLE BOUCHERIT - COPYRIGHT &#169; 2022</div>
        </div>
    
  */
  return (
    <footer className="b-footer-wrapper">
      <div className="b-footer-container">
      <div className="b-footer-top">
      <Links />
      <OwnerInfos />
      </div>
      <div className="b-footer-bottom">
        </div>
        </div>
    </footer>
  );
};

export default Footer;
