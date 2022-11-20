import "./Authentication.scss"
import { useState, useEffect, useContext } from "react"
import Cookies from "js-cookie";
import { LoginContext } from "./LoginContext"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
const Authentication = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const {isAuth, setIsAuth} = useContext(LoginContext)

  const tryToLogin = async (e) => {
    e.preventDefault()
    const data = {
      user: {
        email: email,
        password: password
      }
    }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    let response = []
    let token = []
    try {
      response = await fetch(`${BASE_URL}/users/sign_in`, config)
    } catch (e) {
      console.log(e)
    }
 
    if (response.status === 200) {
      token = await response.headers
      .get("authorization")
      .split("")
      .splice(7)
      .join("");
      Cookies.set("cie-lutin-auth-token", token);
      Cookies.set("cie-lutin-isAuth", true);
      // reload the page
      // setIsAuth(true)
      window.location.reload(false)
    } else {
      setErrorMessage("Mauvais mot de passe, ou mauvais identifiant.")
    }
  
  
  }

  const testInput = () => {
    console.log("test")
  }

  const displayErrorMessage = () => {
    if (errorMessage !== "") {
      return (<></>)
    } else {
      return (<div className="auth-error-message">{errorMessage}</div>)
    }
  }

  useEffect(() => {
    
  },[errorMessage])

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <h4 className="auth-title" >ADMIN</h4>

        <div className="auth-login">
          {errorMessage}
          <form className="auth-form">
          <label>Identifiant :</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} ></input>
          <label>Mot de passe :</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="submit" value="envoyer" onClick={(e)=>tryToLogin(e)}></input>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication