import "./CreateYear.scss";
import {useRef } from "react";
import xCloseIcon from "../../../../assets/icons/xCloseIcon.png";
import {useState, useEffect} from "react"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const CreateYear = (props) => {

  const [category, setCategory] = useState("")

  const createYearBtn = useRef(null);

  const canSave = Boolean(category) || false

  const closeModal = () => {
    const modal = document.querySelector(".bdl-create-year-modal");
    modal.classList.remove("active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body
    if (props.arg === "dessins") {
      body = {
        dessin_category: {
          title: e.target[0].value,
        },
      };
    } else if (props.arg === "paysages") {
      body = {
        paysage_category: {
          title: e.target[0].value,
        },
      };
    }
   
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    if (props.arg === "dessins") {
      await fetch(`${BASE_URL}/api/v1/dessin_categories`, config);
    } else if (props.arg === "paysages") {
      await fetch(`${BASE_URL}/api/v1/paysage_categories`, config);
    }

    window.location.reload(false);
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
    if (props.arg === "dessins") {
      await fetch(`${BASE_URL}/api/v1/dessin_categories/${id}`, {
        method: "DELETE",
      });
    } else if (props.arg === "paysages") {
      await fetch(`${BASE_URL}/api/v1/paysage_categories/${id}`, {
        method: "DELETE",
      });
    }
    
    window.location.reload(false);
  };

  useEffect(() => {

    if (canSave && createYearBtn.current !== undefined) {
      createYearBtn.current.classList.add('active')
    } else {
      createYearBtn.current.classList.remove('active')
    }
  
  },[category])

  return (
    <div className="bdl-create-year-modal" ref={props.modalCreateCate}>
      <div className="bdl-create-year-modal-title">
        <h5>Créer une catégorie</h5>
      </div>

      <div className="bdl-create-year-modal-close" onClick={closeModal}>
        <img src={xCloseIcon} alt="close" />
      </div>
      <form className="bdl-create-year-form" onSubmit={(e) => handleSubmit(e)}>
        <label>Ajouter une catégorie :</label>
        <input id="bdl-create-year-text-input" type="text" value={category} onChange={(e)=>setCategory(e.target.value)}></input>
        <div className="bdl-send-input">
          <input
            className="bdl-create-year-form-send-btn"
            type="submit"
            value="Valider"
            disabled = {!canSave}
            ref={createYearBtn}
          ></input>
        </div>
      </form>

      <div className="bdl-custom-hr"></div>
      <div className="bdl-create-year-modal-title">
        <h5>Supprimer une catégorie</h5>
      </div>

      <form
        className="bdl-year-delete-year-form"
        onSubmit={(e) => tryToDestroyCategory(e)}
      >
        <select id="remove-categories">
          {props.categories && props.categories.map((category) => (
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
          <input
            id="bdl-submit-delete-year"
            type="submit"
            value="Supprimer"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default CreateYear;
