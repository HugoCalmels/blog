import { Link } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { ImFacebook } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const OwnerInfos = () => {
  const styleRegularIcons = {
    width: "15px",
    height: "15px",
    marginRight: "5px",
  };
  const styleSocialNetworkIcons = {
    color: "black",
    width: "15px",
    height: "15px",
  };
  return (
    <div className="b-footer-owner-infos-container">
      <div className="b-footer-links-wrapper">
        <ul className="b-footer-owner-infos-list">
          <li className="b-footer-owner-info location">
            <GoLocation style={styleRegularIcons} />
            <Link to={"/gaelle-boucherit"}>
              13, rue Pégot <br />
              31500 Toulouse
            </Link>
          </li>
          <li className="b-footer-owner-info">
            <BsTelephone style={styleRegularIcons} />
            <Link to={"/gaelle-boucherit"}>(+33)6.08.91.06.18</Link>
          </li>
          <li className="b-footer-owner-info">
            <GoMail style={styleRegularIcons} />
            <Link to={"/gaelle-boucherit"}>gaelle-boucherit@gmail.com</Link>
          </li>
          <li className="b-footer-owner-info">
            <TbWorld style={styleRegularIcons} />
            <Link to={"/gaelle-boucherit"}>www.gaelle-boucherit.com</Link>
          </li>
          <li className="b-footer-owner-info networks">
            <div className="b-footer-owner-social-network">
              <ImFacebook style={styleSocialNetworkIcons} />
            </div>
            <div className="b-footer-owner-social-network">
              <FaTwitter style={styleSocialNetworkIcons} />
            </div>
            <div className="b-footer-owner-social-network">
              <FaInstagram style={styleSocialNetworkIcons} />
            </div>
          </li>
        </ul>
        <div className="b-footer-copyright">
          GAELLE BOUCHERIT - COPYRIGHT &#169; 2022
        </div>
      </div>
    </div>
  );
};

export default OwnerInfos;
