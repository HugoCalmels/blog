import "./Login.scss";

const Login = (props) => {
  return (
    <div className="auth-login">
      {props.errorMessage}
      <form className="auth-form">
        <label>Identifiant :</label>
        <input type="text" onChange={(e) => props.setEmail(e.target.value)}></input>
        <label>Mot de passe :</label>
        <input
          type="password"
          onChange={(e) => props.setPassword(e.target.value)}
        ></input>
        <input
          type="submit"
          value="envoyer"
          onClick={(e) => props.tryToLogin(e)}
        ></input>
      </form>
    </div>
  );
};

export default Login;
