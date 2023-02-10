import "./NewsLetterIndex.scss";
import { useState, useRef, useEffect } from "react";
import imageFriends from "../../../assets/images/testImage7.png";

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const NewsLetterIndex = (props) => {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const alertSuccessElemRef = useRef(null);
  const alertDangerElemRef = useRef(null);
  const canSave = Boolean(email) && Boolean(checked);
  function isValidEmail(email) {
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(email) && canSave) {
      setAlertMessage("success");
      createGuestAPI();
    } else {
      setAlertMessage("danger");
    }
  };

  const createGuestAPI = async () => {
    const body = {
      guest: {
        email: email,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${BASE_URL}/api/v1/guests`, config);
    const data = await res.json();
  };

  useEffect(() => {
    if (alertMessage === "success") {
      alertDangerElemRef.current.classList.remove("active");
      alertSuccessElemRef.current.classList.add("active");
      // alert success ref current classlist active
    } else if (alertMessage === "danger") {
      alertSuccessElemRef.current.classList.remove("active");
      alertDangerElemRef.current.classList.add("active");

      // alert danger ref current classlist active
    }
  }, [alertMessage]);

  return (
    <div className="b-newsletter-wrapper">
      <div
        className="b-newsletter-hero"
        style={{
          backgroundImage: `url(${imageFriends})`,
        }}
      >
        <div className="b-newsletter-content">
          <h2 id="b-newsletter-content-title">NEWSLETTER</h2>

          <div className="b-newsletter-content-container">
            <div className="b-newsletter-cc-wrapper">
              <div className="b-newsletter-subtitle">
                <h3>Vous souhaitez vous abonner ?</h3>
                <div className="b-contact-form-alerts-wrapper">
                  <div
                    className="b-contact-form-alert success"
                    ref={alertSuccessElemRef}
                  >
                    <p>Le formulaire a été envoyé !</p>
                  </div>
                  <div
                    className="b-contact-form-alert danger"
                    ref={alertDangerElemRef}
                  >
                    <p>Veuillez remplir tous les champs.</p>
                  </div>
                </div>
              </div>
              <div className="b-newsletter-content-container-sub">
                <p id="b-newsletter-subscribe-infos">
                  Pour vous abonner à notre newsletter, merci de remplir le
                  formulaire ci dessous.
                </p>
                <form
                  id="b-newsletter-join-form"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <input
                    id="b-newsletter-input-email"
                    type="text"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>

                  <div className="b-newsletter-input-checkbox-container">
                    <div className="b-newsletter-checkbox-wrapper">
                      <input
                        id="b-newsletter-input-checkbox"
                        type="checkbox"
                        onChange={() => setChecked(!checked)}
                      ></input>
                    </div>
                    <label id="b-newsletter-label-rgpd">
                      En soumettant ce formulaire, vous acceptez nos{" "}
                      <span onClick={() => props.openPolicyModal()}>
                        conditions générales d'utilisation
                      </span>
                      .{" "}
                    </label>
                  </div>

                  <div className="b-newsletter-input-send-container">
                    <input type="submit" value="ENVOYER"></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterIndex;
