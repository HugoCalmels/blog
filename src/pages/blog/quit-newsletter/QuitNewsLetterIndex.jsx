import "./QuitNewsLetterIndex.scss";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const QuitNewsLetterIndex = () => {
  let querry = useParams();

  const alertElemRef = useRef(null);
  const alertDangerElemRef = useRef(null);
  const contentElemRef = useRef(null);

  const [verificationToken, setVerificationToken] = useState("");

  useEffect(() => {
    setVerificationToken(querry.token);
  }, [querry]);

  const handleSubmitQuitNewsletter = (e) => {
    e.preventDefault();
    sendConfirmationToDeleteGuestFromNewsletterToAPI();
    // remove this email from the guests list
  };

  const sendConfirmationToDeleteGuestFromNewsletterToAPI = async () => {
    const res = await fetch(
      `${BASE_URL}/api/v1/quit-newsletter/${verificationToken}`
    );
    const data = await res.json();

    if (data.message === "User destroyed") {
      alertElemRef.current.classList.add("active");
      contentElemRef.current.classList.remove("active");
    } else {
      alertDangerElemRef.current.classList.add("active");
      contentElemRef.current.classList.remove("active");
    }
  };
  return (
    <div className="b-quit-newsletter-wrapper">
      <div className="b-quit-newsletter-content">
        <h2 id="b-quit-newsletter-content-title">DÉSABONNEMENT NEWSLETTER</h2>

        <div
          className="b-quit-newsletter-content-container active"
          ref={contentElemRef}
        >
          <h4>Souhaitez vraiment vous désabonner ?</h4>

          <p>
            Pour se désabonner, veuillez cliquer sur le bouton ci-dessous.
            <br />
            Vous pourrez vous ré-abonner avec la même addresse email quand vous
            le souhaiterez.
          </p>
          <button
            id="b-quit-newsletter-leave-btn"
            onClick={(e) => handleSubmitQuitNewsletter(e)}
          >
            Se désabonner
          </button>
        </div>

        <div className="b-quit-newsletter-alert" ref={alertElemRef}>
          <p>Vous n'êtes plus abonné à notre newsletter.</p>
        </div>

        <div
          className="b-quit-newsletter-alert danger"
          ref={alertDangerElemRef}
        >
          <p>Une erreur est survenue.</p>
        </div>
      </div>
    </div>
  );
};

export default QuitNewsLetterIndex;
