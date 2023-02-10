import { useState } from "react";
import { ImFacebook } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useRef } from "react";
const Icon = (props) => {
  const iconFacebookRef = useRef(null);
  const iconTwitterRef = useRef(null);
  const iconInstaRef = useRef(null);
  const [btnCurrentColor, setBtnCurrentColor] = useState("#424242");

  const btnStyle = {
    color: { btnCurrentColor },
    width: "15px",
    height: "15px",
  };
  const disableHoverStyle = () => {
    console.log("leave");
    setBtnCurrentColor("#424242");
  };
  const enableHoverStyle = () => {
    console.log("enter");
    setBtnCurrentColor("#3598D8");
  };
  return (
    <>
      {props.name === "facebook" ? (
        <div
          className="b-footer-owner-social-network"
          onMouseEnter={enableHoverStyle}
          onMouseLeave={disableHoverStyle}
          ref={iconFacebookRef}
        >
          <a href="https://www.facebook.com/gaelle.boucherit" target="_blank">
            <ImFacebook style={btnStyle} fill={btnCurrentColor} />
          </a>
        </div>
      ) : props.name === "twitter" ? (
        <div
          className="b-footer-owner-social-network"
          onMouseEnter={enableHoverStyle}
          onMouseLeave={disableHoverStyle}
          ref={iconTwitterRef}
        >
          <a href="https://twitter.com/gaelleboucherit" target="_blank">
            <FaTwitter style={btnStyle} fill={btnCurrentColor} />
          </a>
        </div>
      ) : props.name === "insta" ? (
        <div
          className="b-footer-owner-social-network"
          onMouseEnter={enableHoverStyle}
          onMouseLeave={disableHoverStyle}
          ref={iconInstaRef}
        >
          <a
            href="https://www.instagram.com/gaelle.boucherit/?hl=fr"
            target="_blank"
          >
            <FaInstagram style={btnStyle} fill={btnCurrentColor} />
          </a>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Icon;
