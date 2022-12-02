
import { useNavigate, Link } from "react-router-dom";
const Links = () => {
  return (
    <div className="b-footer-links-container">

      <div className="b-footer-links-wrapper">
    

      <ul className="b-footer-links-list">

    <li className="b-footer-link link">
      <Link to={"/gaelle-boucherit"}>Index</Link>
    </li>
    <li className="b-footer-link link">
      <Link to={"/gaelle-boucherit/dessins-et-croquis"}>Dessins</Link>
    </li>
    <li className="b-footer-link link">
      <Link to={"/gaelle-boucherit/performances"}>Performances</Link>
    </li>
    <li className="b-footer-link link">
      <Link to={"/gaelle-boucherit/partenaires"}>Partenaires</Link>
    </li>
    <li className="b-footer-link link">
      <Link to={"/gaelle-boucherit/contact"}>Contact</Link>
    </li>
    <li className="b-footer-link link">
      <Link to={"/cie"}>Site compagnie</Link>
        </li>
  
        </ul>
        <div className="b-footer-mentions">
            MENTIONS L&#xC9;GALES
          </div>
      </div>
      </div>
  )
}

export default Links