import "./Login.scss";

const Login = (props) => {
  return (
    <div className="auth-login">
      {props.errorMessage}
      <form className="auth-form">

        <div className="auth-form-input">
        <label>Identifiant :</label>
        <input type="text" onChange={(e) => props.setEmail(e.target.value)}></input>
        </div>

        <div className="auth-form-input">
          <label>Mot de passe :</label>
        <input
          type="password"
          onChange={(e) => props.setPassword(e.target.value)}
    
          ></input>
           </div>
           
           <div className="auth-form-input send">
        <input
          type="submit"
          value="Se connecter"
          onClick={(e) => props.tryToLogin(e)}
          ></input>
  
          <button onClick={(e)=>props.tryToLogout(e)}>Se déconnecter</button>
          </div>
      </form>
      
    </div>
  );
};

export default Login;
