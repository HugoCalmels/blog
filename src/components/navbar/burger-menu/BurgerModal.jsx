import "./BurgerModal.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const BurgerModal = (props) => {
  const navigate = useNavigate();

  const navigateTo = (dest) => {
    props.burgerModalElem.current.style.transform = "translateY(-100vh)";
    navigate(`/${dest}`);
    props.setModalIsOpen(!props.modalIsOpen);
  };

  const isAuthCookie = Cookies.get("cie-lutin-isAuth")
    ? JSON.parse(Cookies.get("cie-lutin-isAuth"))
    : null;
  return (
    <div
      className="b-navbar-burger-modal-container"
      ref={props.burgerModalElem}
    >
      <ul className="b-navbar-burger-modal-ul">
        {isAuthCookie ? (
          <li onClick={() => navigateTo("admin")}>ADMIN</li>
        ) : (
          <></>
        )}

        <li onClick={() => navigateTo("gaelle-boucherit/dessins-et-croquis")}>
          DESSINS
        </li>
        <li onClick={() => navigateTo("gaelle-boucherit/photos")}>PHOTOS</li>
        <li onClick={() => navigateTo("gaelle-boucherit/performances")}>
          PERFORMANCES
        </li>
        <li onClick={() => navigateTo("gaelle-boucherit/coups-de-coeur")}>
          COUPS DE COEUR
        </li>
        <li onClick={() => navigateTo("gaelle-boucherit/contact")}>CONTACT</li>
        <li onClick={() => navigateTo("gaelle-boucherit/newsletter")}>
          NEWSLETTER
        </li>
      </ul>
    </div>
  );
};

export default BurgerModal;
