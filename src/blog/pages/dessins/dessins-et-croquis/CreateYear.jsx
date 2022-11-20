import "./CreateYear.scss";
import { useEffect, useState, useRef } from "react";
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
const CreateYear = () => {
  const [categories, setCategories] = useState([]);
  const createYearBtn = useRef(null)

  const closeModal = () => {
    const modal = document.querySelector(".bdl-create-year-modal");
    modal.classList.remove("active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      dessin_category: {
        title: e.target[0].value,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch(`${BASE_URL}/api/v1/dessin_categories`, config);
    window.location.reload(false);
  };

  const getCategories = async () => {
    const response = await fetch(
      `${BASE_URL}/api/v1/dessin_categories`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setCategories(data);
  };

  const tryToDestroyCategory = (e) => {
    let getSelects = document.querySelectorAll(".bdl-custom-select-destroy");
    const foundSelect = Array.from(getSelects).filter(
      (select) => select.value == e.target[0].value
    );
    let answer = window.confirm(
      `voulez vous supprimer "${foundSelect[0].value}" ?`
    );
    if (answer) {
      destroyCategoryAPI(foundSelect[0].dataset.id);
    }
  };

  const destroyCategoryAPI = async (id) => {
    await fetch(`${BASE_URL}/api/v1/dessin_categories/${id}`, {
      method: "DELETE",
    });
    window.location.reload(false);
  };

  useEffect(() => {
    getCategories();
  }, []);



  return (
    <div className="bdl-create-year-modal">
      <div className="bdl-create-year-modal-title">
      <h5>Créer une catégorie</h5>
      </div>

      
      <div className="bdl-create-year-modal-close" onClick={closeModal}><img src={xCloseIcon} alt="close"/></div>
      <form className="bdl-create-year-form" onSubmit={(e) => handleSubmit(e)}>
        <label>Ajouter une catégorie ( exemple : 2022 )</label>
        <input id="bdl-create-year-text-input"type="text"></input>
        <div className="bdl-send-input">
          <input className="bdl-create-year-form-send-btn"type="submit" value="Valider"ref={createYearBtn}></input>
        </div>

      </form>

      <div className="bdl-custom-hr"></div>
      <div className="bdl-create-year-modal-title">
      <h5>Supprimer une catégorie existante</h5>
      </div>

      <form className="bdl-year-delete-year-form"onSubmit={(e) => tryToDestroyCategory(e)}>
        <select id="remove-categories">
          {categories.map((category) => (
            <option
              className="bdl-custom-select-destroy"
              key={category.id}
              data-id={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>
        <div className="bdl-send-input-container">
          <input id="bdl-submit-delete-year"type="submit" value="supprimer"></input>
        </div>

      </form>
    </div>
  );
};

export default CreateYear;
