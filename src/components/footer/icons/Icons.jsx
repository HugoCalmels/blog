import {useState} from "react"
import { useNavigate, Link } from "react-router-dom";
import {GoLocation} from "react-icons/go"
import { BsTelephone } from "react-icons/bs"
import { GoMail } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { ImFacebook } from "react-icons/im";
import { FaTwitter } from "react-icons/fa"
import {FaInstagram} from "react-icons/fa"
import { IconContext } from "react-icons";
import Icon from "./Icon"
const Icons = () => {
  const [btnCloseHover, setBtnCloseHover] = useState("#424242")
  const styleRegularIcons = { width: "15px", height: "15px", marginRight: "5px",  color: "purple"}
  const styleSocialNetworkIcons = { color: {btnCloseHover} , width: "20px", height: "20px"}

  const disableHoverStyle = () => {
    console.log("leave")
    setBtnCloseHover("#424242")
    console.log(styleRegularIcons)
  }
  const enableHoverStyle = () => {
    console.log("enter")
    setBtnCloseHover("#3598D8")
    console.log(styleRegularIcons)
  }
  

  return (

    <div className="b-footer-icons-wrapper">
      <div className="b-footer-icons-container">
        <Icon name={"facebook"} />
        <Icon name={"twitter"} />
        <Icon name={"insta"} />
   
        </div>
</div>

  )
}

export default Icons