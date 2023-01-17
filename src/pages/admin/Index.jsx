import "./Index.scss"
import { useState, useEffect, useContext, useRef } from "react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Login from "./Login"
import TopBar from "./topbar/TopBar"
import NewsLetter from "./NewsLetter"
import Subscribers from "./Subscribers"
import Loader from "./Loader"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
const Index = () => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [selectedSubMenu, setSelectedSubMenu] =useState("Connexion") // => METTRE MENU 1

  const loaderElemRef = useRef(null)

  useEffect(() => {
    console.log("LOADER TRIGGERED")
    console.log("LOADER TRIGGERED")
    console.log("LOADER TRIGGERED")
    if(isLoading ) {
      loaderElemRef.current.classList.add('active')
    } else {
      loaderElemRef.current.classList.remove('active')
    }

  },[isLoading])
 
  const topBarElemRef = useRef(null)

  const tryToLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
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
  
  const tryToLogout = (e) => {
    e.preventDefault()
    setIsLoading(true)
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
      Cookies.remove("cie-lutin-auth-token");
      Cookies.remove("cie-lutin-isAuth");
      window.location.reload(false);
    }
  }




  
  useEffect(() => {
    console.log(selectedSubMenu)
  },[selectedSubMenu])

  return (
    <div className="auth-wrapper">
      <Loader loaderElemRef={loaderElemRef} />
      <TopBar topBarElemRef={topBarElemRef} setSelectedSubMenu={setSelectedSubMenu} />
      <div className="auth-content">
        <h4 className="auth-title" >{selectedSubMenu}</h4>

        <div className="admin-content-container">
        {selectedSubMenu === "Connexion" ?
            <Login
            setIsLoading={setIsLoading}
            tryToLogin={tryToLogin}
            errorMessage={errorMessage}
            setEmail={setEmail}
              setPassword={setPassword}
              tryToLogout={tryToLogout}
          />
          : selectedSubMenu === "Newsletter" ?
              <NewsLetter setIsLoading={setIsLoading}/>
          : selectedSubMenu === "Statistiques" ?
          <></>
          :  selectedSubMenu === "Subscribers" ?
                  <Subscribers/>
                  :
          <></>
        }
        </div>




      </div>



    </div>
  )
}

export default Index