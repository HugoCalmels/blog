import "./Index.scss"
import { useState, useEffect, useContext } from "react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Login from "./Login"

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
const Index = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

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
      //navigate('/gaelle-boucherit/index')
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
    
  }, [errorMessage])
  
  const tryToLogout = () => {
    submitLogoutAPI()
  }

  const submitLogoutAPI = async () => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("cie-lutin-auth-token")}`,
      },
    };
    const response = await fetch(`${BASE_URL}/users/sign_out`, config);
    if (response.status === 200) {
      Cookies.remove("cie-lutin-auth");
      Cookies.remove("cie-lutin-isAuth");
      window.location.reload(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <h4 className="auth-title" >ADMIN</h4>
        <h1>gaelle-boucherit@gmail.com</h1>

        <h1>123123</h1>

        <button onClick={tryToLogout}>logout</button>

        <Login
          tryToLogin={tryToLogin}
          errorMessage={errorMessage}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </div>
    </div>
  )
}

export default Index